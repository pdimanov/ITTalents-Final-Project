<?php

use Illuminate\Database\Seeder;

class Item_QuestTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('item_quest')->insert([
            'quest_id' => 1,
            'item_id' => 1,
        ]);

        DB::table('item_quest')->insert([
            'quest_id' => 1,
            'item_id' => 6,
        ]);

        DB::table('item_quest')->insert([
            'quest_id' => 2,
            'item_id' => 12,
        ]);

        DB::table('item_quest')->insert([
            'quest_id' => 2,
            'item_id' => 17,
        ]);

        DB::table('item_quest')->insert([
            'quest_id' => 2,
            'item_id' => 21,
        ]);

        DB::table('item_quest')->insert([
            'quest_id' => 3,
            'item_id' => 4,
        ]);

        DB::table('item_quest')->insert([
            'quest_id' => 3,
            'item_id' => 9,
        ]);

        DB::table('item_quest')->insert([
            'quest_id' => 4,
            'item_id' => 25,
        ]);
    }
}
