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
            'map_x' => 150,
            'map_y' => 150,
            'name' => 'stefcho',
            'health' => 200,
            'level' => 1,
            'experience' => 1,
            'gold' => 100,
            'gender' => 'male',
            'attack' => 5,
            'defense' => 2,
            'user_id' => 1,
        ]);

        DB::table('heroes')->insert([
            'map_x' => 150,
            'map_y' => 150,
            'name' => 'ivan',
            'health' => 200,
            'level' => 2,
            'experience' => 1,
            'gold' => 100,
            'gender' => 'male',
            'attack' => 7,
            'defense' => 4,
            'user_id' => 2,
        ]);

        DB::table('heroes')->insert([
            'map_x' => 150,
            'map_y' => 150,
            'name' => 'iva',
            'health' => 200,
            'level' => 1,
            'experience' => 1,
            'gold' => 100,
            'gender' => 'female',
            'attack' => 5,
            'defense' => 2,
            'user_id' => 3,
        ]);
    }
}
