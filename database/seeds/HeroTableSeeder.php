<?php

use Illuminate\Database\Seeder;

class HeroTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('heroes')->insert([
            'name' => 'stefcho',
            'gender' => 'male',
            'user_id' => 1,
            'completed_quest' => null,
            'current_quest' => 1
        ]);

        DB::table('heroes')->insert([
            'name' => 'ivan',
            'gender' => 'male',
            'level' => 2,
            'experience' => 100,
            'user_id' => 2,
            'completed_quest' => 1,
            'current_quest' => 2
        ]);

        DB::table('heroes')->insert([
            'name' => 'iva',
            'gender' => 'female',
            'level' => 2,
            'experience' => 50,
            'user_id' => 3,
            'completed_quest' => 1,
            'current_quest' => 2
        ]);

        DB::table('heroes')->insert([
            'name' => 'goshko',
            'gender' => 'female',
            'level' => 4,
            'experience' => 210,
            'gold' => 300,
            'user_id' => 4,
            'completed_quest' => 2,
            'current_quest' => null
        ]);

        DB::table('heroes')->insert([
            'name' => 'toshko',
            'gender' => 'female',
            'level' => 4,
            'experience' => 250,
            'gold' => 350,
            'user_id' => 5,
            'completed_quest' => null,
            'current_quest' => 1
        ]);

        DB::table('heroes')->insert([
            'name' => 'ivancho',
            'gender' => 'male',
            'level' => 4,
            'experience' => 210,
            'gold' => 320,
            'user_id' => 6,
            'completed_quest' => null,
            'current_quest' => null
        ]);
    }
}
