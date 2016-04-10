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

        // U S E R
        Route::get('/user', 'UserController@getUserInfo');
        Route::post('/user/avatar', 'UserController@uploadAvatar');

        // H E R O
        Route::get('/hero', 'HeroController@index');
        Route::post('/hero', 'HeroController@createHero');
        Route::post('/hero/buy', 'HeroController@buyItem');
        Route::post('/hero/sell', 'HeroController@sellItem');
        Route::post('/hero/obtain-item', 'HeroController@obtainItem');
        Route::delete('/hero', 'HeroController@deleteHero');
        // H E R O - S A V E S
        Route::group(['prefix' => '/save'], function(){
            Route::put('/location', 'HeroController@saveHeroLocation');
            Route::put('/gold', 'HeroController@saveHeroGold');
            Route::put('/level', 'HeroController@saveHeroLevelAndExperience');
        });

        // S H O P
        Route::get('/shop', 'ShopController@index');
        Route::get('/shop/{slot_type}', 'ShopController@show');

        // S T A T I S T I C S
        Route::post('/statistics', 'StatisticsController@orderBy');

        // S E A R C H
        Route::post('/search', 'SearchController@search');
    });
});

//Route::auth();
