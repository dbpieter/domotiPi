<?php

class UserTableSeeder extends Seeder
{

	public function run()
	{
		DB::table('users')->delete();
		User::create(array(
			'name'     => 'Hans Ott',
			'email'    => 'hans.ott@kahosl.be',
			'password' => Hash::make('Azerty123')
		));
		User::create(array(
			'name'     => 'Alexander Delemarre',
			'email'    => 'alexander.delemarre@kahosl.be',
			'password' => Hash::make('Azerty123')
		));
		User::create(array(
			'name'     => 'Pieter De Bruyne',
			'email'    => 'pieter.debruyne@kahosl.be',
			'password' => Hash::make('Azerty123')
		));
	}

}
