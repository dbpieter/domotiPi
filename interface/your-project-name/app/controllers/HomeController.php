<?php

/*
| Author: Hans Ott <hans.ott@kahosl.be>
| Date: 28/05/2014
| Projecten 1: PiControl
*/

class HomeController extends BaseController {

	public function showLogin()
	{
		// show the form
		if (Auth::check()) {
			return Redirect::to('overview');
		}
		return View::make('login');
	}

	public function doLogin()
	{
		// validate the info, create rules for the inputs
		$rules = array(
			'email'    => 'required|email', // make sure the email is an actual email
			'password' => 'required|alphaNum|min:3' // password can only be alphanumeric and has to be greater than 3 characters
		);

		// run the validation rules on the inputs from the form
		$validator = Validator::make(Input::all(), $rules);

		// if the validator fails, redirect back to the form
		if ($validator->fails()) {
			return Redirect::to('login')
				->withErrors($validator) // send back all errors to the login form
				->withInput(Input::except('password')); // send back the input (not the password) so that we can repopulate the form
		} else {

			// create our user data for the authentication
			$userdata = array(
				'email' => Input::get('email'),
				'password' => Input::get('password')
			);

			if (Input::has('rememberme')) {
				if (Auth::attempt($userdata, true)) {
					return Redirect::to('overview');
				} else {
					return Redirect::to('login')->withInput(Input::except('password'))->with('error', 'Invalid login credentials.');
				}
			}
			else if (Auth::attempt($userdata)) {
				return Redirect::to('overview');
			} else {
				return Redirect::to('login')->withInput(Input::except('password'))->with('error', 'Invalid login credentials.');
			}
		}
	}

	public function doLogout()
	{
		Auth::logout(); // log the user out of our application
		return Redirect::to('login'); // redirect the user to the login screen
	}

	public function showOverview() {
		return View::make('overview', array('pageTitle' => 'Overview', 'username' => Auth::user()->name));
	}

	public function showSettings() {
		return View::make('settings', array('pageTitle' => 'Settings', 'username' => Auth::user()->name));
	}

	public function showLogbook() {
		return View::make('logbook', array('pageTitle' => 'Logbook', 'username' => Auth::user()->name));
	}

	public function showSchedules() {
		return View::make('schedules', array('pageTitle' => 'Schedules', 'username' => Auth::user()->name));
	}

}
