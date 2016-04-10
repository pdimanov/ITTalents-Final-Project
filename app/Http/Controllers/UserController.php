<?php

namespace App\Http\Controllers;

use App\Hero;
use App\Item;
use App\Quest;
use App\User;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Input;
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

    public function getUserInfo()
    {
        $data = User::with('hero')->where('id', Auth::id())->first();
        unset($data['api_token']);

        return Response::json(['message' => 'Hero has been successfully created.', 'data' => $data], 200);
    }

    public function uploadAvatar(Request $request) {
        $this->validate($request,[
            'image' => 'image|mimes:jpeg,bmp,png|max:1024',
        ]);
        $file = Input::file('image');
        $filename = Auth::user()->username . '-avatar.png';
        $fullPath = 'avatars/' . $filename;

        if(!file_exists($fullPath) && $file || file_exists($fullPath)) {
            if($file) {
                $file->move('avatars/', $filename);

                $user = User::findOrFail(Auth::id());
                $user->avatar = $fullPath;
                $user->save();
                Image::make($fullPath)->fit(150, 150)->save();
            }

            return Response::json(['message' => $fullPath], 200);
        } else {
            return Response::json(['message' => User::where('id', Auth::id())->first()->avatar], 200);
        }
    }
}