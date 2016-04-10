<?php

use Illuminate\Database\Seeder;

class Hero_QuestTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('hero_quest')->insert([
            'hero_id' => 1,
            'quest_id' => 1,
            'progress' => 0,
        ]);

        DB::table('hero_quest')->insert([
            'hero_id' => 2,
            'quest_id' => 2,
            'progress' => 2,
        ]);
    }
}
