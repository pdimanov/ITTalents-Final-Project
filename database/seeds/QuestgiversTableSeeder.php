<?php

use Illuminate\Database\Seeder;

class QuestgiversTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('questgivers')->insert([
            'name' => 'Jimmy',
            'map_x' =>  '832',
            'map_y' =>  '2912',
            'frame' =>  '7',
            'quote' =>  'Hello, traveler! Be careful, there are wolfs in this town.',
        ]);

        DB::table('questgivers')->insert([
            'name' =>  'Brok',
            'map_x' =>  '992',
            'map_y' =>  '1152',
            'frame' =>  '49',
            'quote' =>  'Hello!',
        ]);

        DB::table('questgivers')->insert([
            'name' =>  'David',
            'map_x' =>  '2208',
            'map_y' =>  '640',
            'frame' =>  '1',
            'quote' =>  'Did you know the villagers in the previous town are afraid of little spiders? Ha-ha',
        ]);

        DB::table('questgivers')->insert([
            'name' =>  'Harold',
            'map_x' =>  '2336',
            'map_y' =>  '1792',
            'frame' =>  '58',
            'quote' =>  'Are you afraid of death?',
        ]);
    }
}
