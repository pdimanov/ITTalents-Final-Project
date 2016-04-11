<?php

namespace App\Http\Controllers;

use App\Hero;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Response;

class SearchController extends Controller
{
    public function search(Request $request)
    {
        $data = Hero::with('user')->where('name' , 'like', '%' . $request->input('search') . '%')->get();

        if(!$data){
            return Response::json(['error' => 'There is no such hero name.'], 404);
        }
        for($i = 0; $i < count($data); $i++){
            unset($data[$i]['user']['api_token']);
        }
        return Response::json(['message' => $data], 200);
    }
}
