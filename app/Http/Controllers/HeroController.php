<?php

namespace App\Http\Controllers;

use App\Item;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Hero;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Response;

class HeroController extends Controller
{
    public function index()
    {
        return Hero::with('items')
            ->where('user_id', Auth::id())
            ->first();
    }

    public function show($id)
    {
        return Hero::with('items')
            ->where('id', $id)
            ->first();
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

        return Hero::where('user_id', Auth::id())->first();
    }

    public function buyItem(Request $request)
    {
        $item = Item::where('id', $request->input('id'))->first();
        $hero = Hero::where('user_id', Auth::id())->first();
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
            $hero->items()->detach($item->id);
            $hero->gold += $item->price / 2;
            $hero->save();
            
            return Response::json(['message' => 'Successfully sold an item.'], 200);
        } else {
            return Response::json(['error' => 'The hero doesn\'t have such an item.'], 200);
        }
    }
}
