<?php

use Illuminate\Database\Seeder;

class QuestsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('quests')->insert([
            'name' => 'Wolf Slayer',
            'description' => 'Save us from the wolves..',
            'count' => 3,
            'gold' => 50,
            'experience' => 100,
        ]);

        DB::table('quests')->insert([
            'name' => 'Spiders everywhere',
            'description' => 'We are all afraid of spiders. Please, help us..',
            'count' => 7,
            'gold' => 110,
            'experience' => 300,
        ]);

        DB::table('quests')->insert([
            'name' => 'Zombieland',
            'description' => 'Wolves and spiders? Nah, we have real problems. IT\'S ZOMBIE APOCALYPSE!',
            'count' => 5,
            'gold' => 150,
            'experience' => 500,
        ]);

        DB::table('quests')->insert([
            'name' => 'Angel of Death',
            'description' => 'Kill Azrael',
            'count' => 1,
            'gold' => 250,
            'experience' => 700,
        ]);
    }
}