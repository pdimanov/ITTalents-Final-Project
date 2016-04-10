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
            'health' => 200,
            'level' => 1,
            'experience' => 1,
            'gold' => 100,
            'gender' => 'male',
            'attack' => 5,
            'defense' => 2,
            'completed_quest' => null,
            'current_quest' => 1,
            'user_id' => 1,
        ]);

        DB::table('heroes')->insert([
            'name' => 'ivan',
            'health' => 200,
            'level' => 2,
            'experience' => 1,
            'gold' => 100,
            'gender' => 'male',
            'attack' => 7,
            'defense' => 4,
            'completed_quest' => 1,
            'current_quest' => 2,
            'user_id' => 2,
        ]);

        DB::table('heroes')->insert([
            'name' => 'iva',
            'health' => 200,
            'level' => 1,
            'experience' => 1,
            'gold' => 100,
            'gender' => 'female',
            'attack' => 5,
            'defense' => 2,
            'completed_quest' => null,
            'current_quest' => null,
            'user_id' => 3,
        ]);
    }
}
