<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('game.index');
});



Route::group(['prefix' => 'api'],function(){

    Route::post('/user/register', 'UserController@register');
    Route::post('/user/login', 'UserController@login');

    Route::group(['middleware' => ['api.token.auth', 'api']], function(){
        Route::get('/test', function(){
            dd(Auth::user());
        });

        Route::resource('hero', 'HeroController');

        Route::resource('shop', 'ShopController');
    });
});

Route::auth();
