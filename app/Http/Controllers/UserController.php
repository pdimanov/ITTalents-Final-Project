<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function register(Request $request)
    {
        //If not validated correctly this JSON response will be sent with a 422 HTTP status code.
        $this->validate($request, [
            'username' => 'required|min:2',
            'email' => 'required|email|unique:users,email',
            'password' => 'min:4|max:8|confirmed',
            'password_confirmation' => 'min:4|max:8|same:password'
        ]);

        $user = new User();
        $user->username = $request->input('username');
        $user->email = $request->input('email');
        $user->password = bcrypt($request->input('password'));
        $user->api_token = str_random(60);

        $user->save();

        return $user;
    }

    public function login(Request $request)
    {
        $this->validate($request,[
            'email' => 'required|email',
            'password' => 'min:4|max:8'
        ]);

        $email = $request->input('email');
        $password = $request->input('password');

        if(Auth::attempt(['email' => $email, 'password' => $password])){
            return Auth::user();
        } else {
            return response(['message' => 'There is no such user.'], 404);
        }
    }
}
