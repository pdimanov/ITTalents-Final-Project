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

Route::get('/redirect', 'SocialAuthController@redirect');
Route::get('/callback', 'SocialAuthController@callback');

Route::group(['prefix' => 'api'],function(){
    Route::post('/user/register', 'UserController@register');
    Route::post('/user/login', 'UserController@login');

    Route::group(['middleware' => ['api.token.auth', 'api']], function(){

        // U S E R
        Route::get('/user', 'UserController@getUserInfo');
        Route::post('/user/avatar', 'UserController@uploadAvatar');

        // H E R O
        Route::get('/hero/info', 'HeroController@index');
        Route::post('/hero', 'HeroController@createHero');
        Route::post('/hero/buy', 'HeroController@buyItem');
        Route::post('/hero/sell', 'HeroController@sellItem');
        Route::delete('/hero', 'HeroController@deleteHero');
        Route::put('/hero/equip', 'HeroController@equipItem');

        // H E R O - Q U E S T S
        Route::put('/hero/kill', 'HeroController@trackMobKill');
        Route::put('/hero/acceptQuest', 'HeroController@acceptQuest');
        Route::put('/hero/returnQuest', 'HeroController@returnQuest');

        // H E R O - S A V E S
        Route::group(['prefix' => '/save'], function(){
            Route::put('/location', 'HeroController@saveHeroLocation');
        });

        // S H O P
        Route::get('/shop', 'ShopController@index');

        // S T A T I S T I C S
        Route::get('/statistics', 'StatisticsController@orderBy');

        // S E A R C H
        Route::get('/hero', 'SearchController@search');
    });
});
