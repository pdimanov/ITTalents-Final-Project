<?php

namespace App\Http\Controllers;

use App\Hero;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Item;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Response;

class ShopController extends Controller
{
    private function getHeroGold()
    {
        return Hero::where('user_id', Auth::id())->first()->gold;
    }

    public function index()
    {
        $data['heroGold'] = $this->getHeroGold();
        $data['items'] = Item::all();
        return Response::json(['message' => $data], 200);
    }

    public function show($slot_type)
    {
        $data['heroGold'] = $this->getHeroGold();
        $data['items'] = Item::where('slot_type', $slot_type)->get();

        if($data['items']){
            return Response::json(['message' => $data], 200);
        } else {
            return Response::json(['error' => 'No such slot types exist.'], 200);
        }
    }
}
