<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Item;
use Illuminate\Support\Facades\Response;

class ShopController extends Controller
{
    public function index()
    {
        return Response::json(['message' => Item::all()], 200);
    }

    public function show($slot_type)
    {
        $items = Item::where('slot_type', $slot_type)->get();

        if($items){
            return Response::json(['message' => 'Found the items.', 'items' => $items], 200);
        } else {
            return Response::json(['error' => 'No such slot types exist.'], 200);
        }
    }
}
