<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

use App\Http\Requests;

class FacebookAuthController extends Controller
{
    private function randomNumber($length) {
        $result = '';

        for($i = 0; $i < $length; $i++) {
            $result .= rand(0, 9);
        }

        return $result;
    }

    public function register(Request $request)
    {
        $data['username'] = $request->input('username');
        $data['email'] = $request->input('email');
        $data['facebook_id'] = $request->input('facebook_id');
        $data['avatar'] = $request->input('picture');

        $facebookUser = User::where('facebook_id', $data['facebook_id'])->first();
//        return $data['facebook_id'];

        if(!$facebookUser){
            $newUser = new User();
            $newUser->username = $data['username'];
            $newUser->email = $data['email'];
            $newUser->password = bcrypt($this->randomNumber(20));
            $newUser->api_token = str_random(60);
            $newUser->facebook_id = $data['facebook_id'];
            $newUser->avatar = $data['avatar'];
            $newUser->save();

            return $newUser;
        } else {
            Auth::login();
            return $facebookUser;
        }
    }
}
