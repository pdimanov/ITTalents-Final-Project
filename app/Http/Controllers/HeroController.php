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

    private function saveHeroLocation(Hero $hero, Request $request)
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

    private function heroLevelUp($hero, $currentHeroExperience, $experienceFromSource, $experienceToNextLevel){
        $hero->level += 1;
        $hero->experience = $currentHeroExperience + $experienceFromSource - $experienceToNextLevel;
        $hero->experience_to_next_level = $hero->level * 100;
        $hero->max_health += 50;
    }

    private function saveHeroLevelAndExperience($hero, $experienceFromSource)
    {
        $currentHeroExperience = $hero->experience;
        $experienceToNextLevel = $hero->experience_to_next_level;

        if($currentHeroExperience + $experienceFromSource >= $experienceToNextLevel){
            $this->heroLevelUp($hero, $currentHeroExperience, $experienceFromSource, $experienceToNextLevel);
        } else {
            $hero->experience = $currentHeroExperience + $experienceFromSource;
        }
    }

    private function getBasicDynamicVariables($hero)
    {
        $data['gold'] = $hero->gold;
        $data['experience'] = $hero->experience;
        $data['level'] = $hero->level;
        $data['experience_to_next_level'] = $hero->experience_to_next_level;
        $data['health'] = $hero->health;
        $data['max_health'] = $hero->max_health;
        $data['map_x'] = $hero->map_x;
        $data['map_y'] = $hero->map_y;

        return $data;
    }

    private function changeHeroStats($hero, $item, $action)
    {
        if($action === 'equip'){
            $hero->attack += $item->attack;
            $hero->defense += $item->defense;
            $hero->save();
        } else if ($action === 'unequip'){
            $hero->attack -= $item->attack;
            $hero->defense -= $item->defense;
            $hero->save();
        }
    }

    public function index()
    {
        $heroInfo = $this->getHeroWithItems();

        if(!$heroInfo){
            return Response::json(['error' => 'The user doesn\'t have a hero yet.'], 404);
        }

        $data['heroInfo'] = $heroInfo;
        if(!$heroInfo->quest->isEmpty()){
            $data['heroInfo']['progress'] = $heroInfo->quest()->first()->pivot->progress;
        } else {
            $data['heroInfo']['progress'] = 0;
        }

        $allQuests = Quest::with('mob')->with('questgiver')->with('items')->get();
        $allItems = Item::all();


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
        $item = Item::findOrFail($request->input('id'));
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
        $itemsFromSameSlotTypeInInventory = $hero->items()->where('slot_type', $slotType)->get();

        for($currentItem = 0; $currentItem < count($itemsFromSameSlotTypeInInventory); $currentItem++){
            if($itemsFromSameSlotTypeInInventory[$currentItem]->pivot->equipped){
                $alreadyEquippedItemID = $itemsFromSameSlotTypeInInventory[$currentItem]->id;
                $hero->items()->sync([$alreadyEquippedItemID => ['equipped' => 0]], false);
                $this->changeHeroStats($hero, $itemsFromSameSlotTypeInInventory[$currentItem], 'unequip');
            }
        }

        $hero->items()->sync([$itemId => ['equipped' => 1]], false);
        $this->changeHeroStats($hero, $item, 'equip');

        return Response::json(['message' => 'Item equipped successfully.', 'data' => $this->getHeroWithItems()], 200);
    }

    public function acceptQuest(Request $request)
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
            $this->saveHeroLocation($heroWithQuest, $request);
        } if ($lastCompletedQuest > 3){
            return Response::json(['message' => 'The hero has already completed all the quests in the game. No quests left.'], 200);
        }

        return Hero::with('quest.mob')->with('quest.items')->where('user_id', Auth::id())->first();
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


        $this->saveHeroLocation($heroWithQuest, $request);
        $this->saveHeroLevelAndExperience($heroWithQuest, $mob->experience);
        $heroWithQuest->health = $request->input('health');
        $heroWithQuest->gold += $mob->gold;
        $heroWithQuest->save();

        $data = $this->getBasicDynamicVariables($heroWithQuest);

        if(isset($questKillProgress)){
            $data['progress'] = $questKillProgress;
        } else {
            $data['progress'] = $questOfHero->pivot->progress;
        }

        return Response::json(['message' => 'Successfully saved the kill result.', 'data' => $data], 200);
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
            $heroWithQuest->health = $heroWithQuest->max_health;
            $this->saveHeroLevelAndExperience($heroWithQuest, $questOfHero->experience);
            $this->saveHeroLocation($heroWithQuest, $request);
            $heroWithQuest->save();

            $data = $this->getBasicDynamicVariables($heroWithQuest);
            $data['progress'] = 0;
            $data['inventory'] = $heroWithQuest->items()->get();

            return Response::json(['message' => 'The hero has successfully completed the quest.', 'data' => $data], 200);
        } else {
            return Response::json(['message' => 'The hero needs to kill more mobs.'], 200);
        }
    }

    public function heroDie()
    {
        $hero = $this->getHero();
        $hero->gold -= floor($hero->gold / 2);
        $hero->map_x = 200;
        $hero->map_y = 2944;
        $hero->health = $hero->max_health;
        $hero->save();

        $data = $this->getBasicDynamicVariables($hero);

        return Response::json(['message' => 'Hero died and respawned.', 'data' => $data]);
    }
}
