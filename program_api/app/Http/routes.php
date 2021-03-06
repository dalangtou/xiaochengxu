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

//Route::get('/', function () {
//    return view('welcome');
//});

//accessToken严格模式
Route::group(['middleware'=>'header'], function () {

    Route::group(['prefix' => 'user', 'namespace' => '\User'], function () {
        Route::post('/update', 'UserController@update');
    });

    Route::group(['prefix' => 'Info', 'namespace' => '\Information'], function () {
        Route::post('/post', 'InformationController@post');
        Route::post('/comment', 'InformationController@comment');
        Route::post('/update', 'InformationController@update');
        Route::post('/uploadFile', 'InformationController@uploadFile');
        
        Route::get('/special', 'InformationController@specialInfo');
    });
});

//accessToken宽松模式
Route::group([], function () {

    Route::get('Info/list', 'Information\InformationController@nearbyList');
    Route::post('Info/look', 'Information\InformationController@look');

    Route::get('Info/postInfo', 'Information\InformationController@postInfo');

    Route::get('verifyUser', 'User\UserController@verifyUser');

    Route::group(['prefix' => 'user', 'namespace' => '\User'], function () {
        Route::post('/login', 'UserController@login');
    });
});