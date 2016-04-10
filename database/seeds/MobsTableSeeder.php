<?php

use Illuminate\Database\Seeder;

class MobsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('mobs')->insert([
            'name' =>  'wolf',
            'health' =>  50,
            'attack' =>  5,
            'defense' =>  5,
            'map_x' =>  1088,
            'map_y' =>  2240,
            'spawn_width' =>  128,
            'spawn_height' =>  224,
            'gold' =>  5,
            'experience' =>  10,
            'quest_id' => 1,
        ]);

        DB::table('mobs')->insert([
            'name' => 'spnameer',
            'health' => 90,
            'attack' =>  10,
            'defense' =>  10,
            'map_x' =>  608,
            'map_y' =>  672,
            'spawn_width' =>  288,
            'spawn_height' =>  160,
            'gold' =>  10,
            'experience' =>  20,
            'quest_id' => 2,
        ]);

        DB::table('mobs')->insert([
            'name' =>  'zombie',
            'health' =>  200,
            'attack' =>  30,
            'defense' =>  10,
            'map_x' =>  2400,
            'map_y' =>  1056,
            'spawn_width' =>  352,
            'spawn_height' =>  96,
            'gold' =>  15,
            'experience' =>  30,
            'quest_id' => 3,
        ]);

        DB::table('mobs')->insert([
            'name' =>  'angel_death',
            'health' =>  600,
            'attack' =>  100,
            'defense' =>  100,
            'map_x' =>  2640,
            'map_y' =>  2736,
            'spawn_width' =>  416,
            'spawn_height' =>  272,
            'gold' =>  100,
            'experience' =>  100,
            'quest_id' => 4,
        ]);
    }
}
