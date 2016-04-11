<?php

namespace App\Http\Controllers;

use App\Item;
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

    private function getHeroCurrentQuest()
    {

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
            return $hero->items()->detach($item->id);
            $hero->gold += $item->price / 2;
            $hero->save();

            return Response::json(['message' => 'Successfully sold an item.'], 200);
        } else {
            return Response::json(['error' => 'The hero doesn\'t have such an item.'], 404);
        }
    }

    public function saveHeroLocation(Request $request)
    {
        $this->validate($request,[
            'map_x' => 'min:0',
            'map_y' => 'min:0'
        ]);

        $hero = $this->getHero();
        $hero->map_x = $request->input('map_x');
        $hero->map_y = $request->input('map_y');
        $hero->save();

        return Response::json(['message' => 'Hero\'s location has been successfully saved.'], 200);
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

    public function obtainItem(Request $request)
    {
        $item = $request->input('id');
        if(!Item::find($item)){
            return Response::json(['error' => 'No such item found.'], 404);
        }
        $hero = $this->getHero();
        $hero->items()->attach($item);

        return Response::json(['message' => 'Item successfully obtained by the hero.'], 200);
    }

    public function equipItem(Request $request)
    {
        $itemId = $request->input('id');
        return Hero::find(1)->with('items')->first();
        Item::findOrFail($itemId);
    }
}
