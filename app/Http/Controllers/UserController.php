<?php

namespace App\Http\Controllers;

use App\Hero;
use App\Item;
use App\User;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Response;
use Intervention\Image\Facades\Image;

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
            return response(['error' => 'There is no such user.'], 404);
        }
    }

    public function getUserInfo(Request $request)
    {
        $user = User::join('heroes', 'users.id', '=', 'heroes.user_id')
            ->select('users.username', 'users.email', 'heroes.*')
            ->where('users.id', Auth::id())
            ->first();

        if(!$user){
            $user = User::where('id', Auth::id())->select('users.username', 'users.email')->first();
            $user['name'] = null;
        }

        return $user;
    }

    public function uploadAvatar(Request $request) {
        if($request->file('image'))
        {
            $image = Image::make($request->file('image'));
            $filename  =   Auth::user()->username . '.' . $image->getClientOriginalExtension();

            if(Image::make($image->getRealPath())->fit(150, 150)->save(public_path('avatars/' . $filename))){
                return Response::json(['message' => 'Avatar saved successfully'], 200);
            } else {
                return Response::json(['error' => 'Something went wrong.'], 400);
            }
        }
    }
}