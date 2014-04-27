<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Author: Hans Ott <hans.ott@kahosl.be>
| Date: 28/05/2014
| Projecten 1: PiControl
|
*/

Route::get('/', function() {
	return Redirect::route('login');
});

// route to show the login form
Route::get('login', array('as' => 'login', 'uses' => 'HomeController@showLogin'));

// route to process the form
Route::post('login', array('uses' => 'HomeController@doLogin'));

// route to logout
Route::get('logout', array('as' => 'logout', 'uses' => 'HomeController@doLogout'));

// admin section
Route::group(array('before' => 'auth'), function() {
	Route::get('overview', array('as' => 'overview', 'uses' => 'HomeController@showOverview'));
	Route::get('schedules', array('as' => 'schedules', 'uses' => 'HomeController@showSchedules'));
	Route::get('settings', array('as' => 'settings', 'uses' => 'HomeController@showSettings'));
	Route::get('logbook', array('as' => 'logbook', 'uses' => 'HomeController@showLogbook'));
	Route::get('settings/users/add', array('as' => 'settings/users/add', 'uses' => 'UsersController@showAddUser'));
	Route::post('settings/users/add', array('uses', 'UsersController@addUser'));
});
