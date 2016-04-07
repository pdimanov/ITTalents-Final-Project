<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'username' => 'stefan',
            'email' => 'asd@abv.bg',
            'password' => bcrypt('stefan'),
            'api_token' => str_random(60)
        ]);

        DB::table('users')->insert([
            'username' => 'ivan',
            'email' => 'asdasd@abv.bg',
            'password' => bcrypt('ivan'),
            'api_token' => str_random(60)
        ]);

        DB::table('users')->insert([
            'username' => 'nina',
            'email' => 'nina@abv.bg',
            'password' => bcrypt('nina'),
            'api_token' => str_random(60)
        ]);
    }
}
