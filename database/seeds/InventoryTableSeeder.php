<?php

use Illuminate\Database\Seeder;

class InventoryTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('inventories')->insert([
            'hero_id' => 1,
            'item_id' => 1,
            'equipped' => false,
        ]);

        DB::table('inventories')->insert([
            'hero_id' => 1,
            'item_id' => 2,
            'equipped' => false,
        ]);

        DB::table('inventories')->insert([
            'hero_id' => 1,
            'item_id' => 4,
            'equipped' => false,
        ]);

        DB::table('inventories')->insert([
            'hero_id' => 2,
            'item_id' => 1,
            'equipped' => false,
        ]);

        DB::table('inventories')->insert([
            'hero_id' => 2,
            'item_id' => 3,
            'equipped' => false,
        ]);

        DB::table('inventories')->insert([
            'hero_id' => 3,
            'item_id' => 1,
            'equipped' => false,
        ]);

        DB::table('inventories')->insert([
            'hero_id' => 3,
            'item_id' => 2,
            'equipped' => false,
        ]);

        DB::table('inventories')->insert([
            'hero_id' => 3,
            'item_id' => 4,
            'equipped' => false,
        ]);
    }
}
