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

    public function index(Request $request)
    {
        $slot_type = $request->input('slot-type');

        if(Auth::user()->hero()->first()){
            $data['heroGold'] = $this->getHeroGold();
        }

        $data['items'] = Item::where('slot_type', $slot_type)->get();
        if($data['items']->isEmpty()){
            $data['items'] = Item::all();
        }

        return Response::json(['message' => $data], 200);
    }
}
