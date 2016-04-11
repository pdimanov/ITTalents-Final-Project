<?php

namespace App\Http\Controllers;

use App\Item;
use App\Mob;
use App\Quest;
use App\User;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Hero;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Response;

class HeroController extends Controller
{
    private function getHero()
    {
        return Hero::where('user_id', Auth::id())->first();
    }

    private function getHeroWithItems()
    {
        return Hero::where('user_id', Auth::id())->with('items')->first();
    }

    private function getHeroWithQuest()
    {
        return Hero::with('quest.mob')->where('user_id', Auth::id())->first();
    }

    private function saveHeroLocation(Request $request, Hero $hero)
    {
        $this->validate($request,[
            'map_x' => 'min:0',
            'map_y' => 'min:0'
        ]);

        $hero = $this->getHero();
        $hero->map_x = $request->input('map_x');
        $hero->map_y = $request->input('map_y');
        $hero->save();
    }

    public function index()
    {
        $heroInfo = Hero::where('user_id', Auth::id())->with('items')->first();
        $allQuests = Quest::with('mob')->with('questgiver')->get();
        $allItems = Item::all();

        $data['heroInfo'] = $heroInfo;
        $data['allQuests'] = $allQuests;
        $data['allItems'] = $allItems;

        return $data;
    }

    public function deleteHero()
    {
        $hero = Hero::where('user_id', Auth::id());

        if($hero->count()){
            $hero->delete();
            return Response::json(['message' => 'Hero deleted successfully'], 200);
        } else {
            return Response::json(['error' => 'The user already doesn\'t have any heroes.'], 200);
        }
    }

    public function createHero(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|unique:heroes',
        ]);

        if(Hero::where('user_id', Auth::id())->count() === 0) {
            $hero = new Hero();
            $hero->name = $request->input('name');
            $hero->gender = $request->input('gender') === 'female' ? 'female' : 'male';
            $hero->user_id = Auth::id();
            $hero->save();
        } else {
            return Response::json(['error' => 'The user already has a hero.'], 200);
        }

        $data = User::with('hero')->where('id', Auth::id())->first();
        unset($data['api_token']);

        return Response::json(['message' => 'Hero has been successfully created.', 'data' => $data], 200);
    }

    public function buyItem(Request $request)
    {
        $item = Item::where('id', $request->input('id'))->first();

        if(!$item){
            return Response::json(['error' => 'No such item found.'], 404);
        }

        $hero = $this->getHero();
        $heroGold = $hero['gold'];

        if($hero->items()->get()->contains('id', $item->id)){
            return Response::json(['message' => 'The hero already has this item.'], 200);
        }

        if($heroGold >= $item->price){
            $hero->items()->attach($item->id);
            $hero->gold -= $item->price;
            $hero->save();

            return Response::json(['message' => 'Successfully bought an item.', 'item' => $item], 200);
        } else {
            return Response::json(['error' => 'The hero doesn\'t have enough gold.'], 200);
        }
    }

    public function sellItem(Request $request)
    {
        $item = Item::where('id', $request->input('id'))->first();
        $hero = Hero::whereHas('items', function($query){
            global $request;
            $query->where('item_id', $request->input('id'));
        })->first();

        //$hero returns true if he has the item which he wants to sell and false if he doesn't have it
        if($hero){
            $hero->items()->detach($item->id);
            $hero->gold += $item->price / 2;
            $hero->save();

            return Response::json(['message' => 'Successfully sold an item.'], 200);
        } else {
            return Response::json(['error' => 'The hero doesn\'t have such an item.'], 404);
        }
    }

    public function saveHeroGold(Request $request)
    {
        $this->validate($request, [
            'gold' => 'min:0'
        ]);

        $hero = $this->getHero();
        $hero->gold += $request->input('gold');
        if($hero->gold < 0){
            return Response::json(['error' => 'The hero cannot have less than zero gold.'], 200);
        }
        $hero->save();

        return Response::json(['message' => 'Hero\'s gold has been successfully saved.'], 200);
    }

    public function saveHeroLevelAndExperience(Request $request)
    {
        $this->validate($request,[
            'level' => 'min:1',
            'experience' => 'min:1'
        ]);

        $newLevel = $request->input('level');
        $newExperience = $request->input('level');

        $hero = $this->getHero();
        if($newLevel < $hero->level || $newLevel === $hero->level && $newExperience < $hero->experience){
            return Response::json(['error' => 'The hero can\'t be a lower level or lower experience than before.'], 200);
        }
        $hero->level = $newLevel;
        $hero->experience = $newExperience;
        $hero->save();

        return Response::json(['message' => 'Hero\'s level and experience have been successfully saved.'], 200);
    }

    public function equipItem(Request $request)
    {
        $itemId = $request->input('id');

        if(!Item::find($itemId)){
            return Response::json(['error' => 'There is no such item.'], 404);
        }

        $hero = Hero::where('user_id', Auth::id())->whereHas('items', function($query){
            global $request;

            $query->where('item_id', $request->input('id'));
        })->first();

        if(!$hero){
            return Response::json(['error' => 'The hero doesn\'t have such an item.'], 404);
        }

        $item = $hero->items()->where('id', $itemId)->first();
        $slotType = $item->slot_type;
        $itemsFromSameSlotTypeWhichAreInInventory = $hero->items()->where('slot_type', $slotType)->get();

        for($currentItem = 0; $currentItem < count($itemsFromSameSlotTypeWhichAreInInventory); $currentItem++){
            if($itemsFromSameSlotTypeWhichAreInInventory[$currentItem]->pivot->equipped){
                $alreadyEquippedItemID = $itemsFromSameSlotTypeWhichAreInInventory[$currentItem]->id;
                $hero->items()->sync([$alreadyEquippedItemID => ['equipped' => 0]], false);
            }
        }

        $hero->items()->sync([$itemId => ['equipped' => 1]], false);

        return Response::json(['message' => 'Item equipped successfully.', 'data' => $this->getHeroWithItems()], 200);
    }

    public function acceptQuest()
    {
        $heroWithQuest = $this->getHeroWithQuest();
        $lastCompletedQuest = $heroWithQuest->completed_quest;

        //The hero hasn't done any quests and doesn't have the first quest yet.
        if(!$lastCompletedQuest && !$heroWithQuest->current_quest){
            $heroWithQuest->quest()->attach(1);
            $heroWithQuest->current_quest = 1;
            $heroWithQuest->save();
        } else if ($heroWithQuest->current_quest){
            return Response::json(['message' => 'The hero hasn\'t finished his latest quest.'], 200);
        } else if ($lastCompletedQuest >= 1 && $lastCompletedQuest <= 3 && !count($heroWithQuest->quest)){
            $heroWithQuest->quest()->attach($lastCompletedQuest + 1);
            $heroWithQuest->current_quest = $lastCompletedQuest + 1;
            $heroWithQuest->save();
        }

        return Hero::with('quest.mob')->where('user_id', Auth::id())-first();
    }

    public function trackMobKill(Request $request)
    {
        $mobId = $request->input('mob_id');
        $mob = Mob::findOrFail($mobId);
        $heroWithQuest = $this->getHeroWithQuest();

        if($heroWithQuest->quest()->first() && $heroWithQuest->current_quest === $mobId){
            $questOfHero = $heroWithQuest->quest()->first();
            $questKillTarget = $questOfHero->count;
            $questKillProgress = $questOfHero->pivot->progress;
            if($questKillProgress < $questKillTarget){
                $questKillProgress++;
                $heroWithQuest->quest()->sync([$questOfHero->id => ['progress' => $questKillProgress]], false);
            }
        }

        $this->saveHeroLocation($request, $heroWithQuest);
        $heroWithQuest->gold += $mob->gold;
        $heroWithQuest->experience += $mob->experience;
        $heroWithQuest->save();

        return Response::json(['message' => 'Successfully saved the kill result.'], 200);
    }

    public function returnQuest(Request $request)
    {
        $heroWithQuest = $this->getHeroWithQuest();
        $questOfHero = $heroWithQuest->quest()->first();

        if(!$questOfHero){
            return Response::json(['error' => 'The hero doesn\'t have a quest to return.'], 404);
        }

        $questKillTarget = $questOfHero->count;
        $questKillProgress = $questOfHero->pivot->progress;
        $questItemsReward = $questOfHero->items()->get();
        foreach($questItemsReward as $item){
            $questItemsRewardIds[] = $item->id;
        }

        if($questKillTarget === $questKillProgress){
            $heroWithQuest->items()->sync($questItemsRewardIds, false);
            $heroWithQuest->quest()->detach($questOfHero->id);

            $heroWithQuest->completed_quest = $questOfHero->id;
            $heroWithQuest->current_quest = null;
            $heroWithQuest->gold += $questOfHero->gold;
            $heroWithQuest->experience += $questOfHero->experience;
            $this->saveHeroLocation($request, $heroWithQuest);
            $heroWithQuest->save();

            return Response::json(['message' => 'The hero has successfully completed the quest.'], 200);
        } else {
            return Response::json(['message' => 'The hero needs to kill more mobs.'], 200);
        }
    }
}
