<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

use App\Http\Requests;

class SocialAuthController extends Controller
{
    public function redirect()
    {
        return Socialite::driver('facebook')->redirect();
    }

    public function callback()
    {
        try {
            $user = \Socialite::driver('facebook')->user();
        } catch (Exception $e){

        }

        $authUser = $this->findOrCreateUser($user);
        Auth::login($authUser);

        return redirect('/');
    }

    private function findOrCreateUser($facebookUser)
    {
        $authUser = User::where('facebook_id', $facebookUser->user['id'])->first();

        if($authUser){
            return $authUser;
        }

        return $this->createUser($facebookUser);
    }

    private function createUser($user)
    {
        $user = User::create([
            'username' => $user->name,
            'email' => $user->email,
            'api_token' => str_random(60),
            'facebook_id' => $user->user['id'],
            'avatar' => $user->avatar,
        ]);

        return $user;
    }
}
