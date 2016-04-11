<?php

namespace App\Http\Controllers;

use App\Hero;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Schema;

class StatisticsController extends Controller
{
    public function orderBy(Request $request)
    {
        $direction = $request->input('direction') === 'asc' ? 'asc' : 'desc';
        $quantity = $request->input('quantity') <= 0 ? 5 : $request->input('quantity');
        $column = $request->input('column');

        if(!Schema::hasColumn('heroes', $column)){
            return Response::json(['error' => 'No such column exists in the database.'], 404);
        }

        $data = Hero::with('user')->orderBy($column, $direction)->take($quantity)->get();

        for($i = 0; $i < count($data); $i++){
            unset($data[$i]['user']['api_token']);
        }

        return Response::json(['message' => $data], 200);
    }
}
