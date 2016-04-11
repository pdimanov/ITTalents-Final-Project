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

        DB::table('inventories')->insert([
            'hero_id' => 4,
            'item_id' => 4,
            'equipped' => false,
        ]);

        DB::table('inventories')->insert([
            'hero_id' => 4,
            'item_id' => 24,
            'equipped' => false,
        ]);

        DB::table('inventories')->insert([
            'hero_id' => 5,
            'item_id' => 3,
            'equipped' => false,
        ]);

        DB::table('inventories')->insert([
            'hero_id' => 5,
            'item_id' => 15,
            'equipped' => false,
        ]);

        DB::table('inventories')->insert([
            'hero_id' => 6,
            'item_id' => 4,
            'equipped' => false,
        ]);

        DB::table('inventories')->insert([
            'hero_id' => 6,
            'item_id' => 12,
            'equipped' => false,
        ]);

        DB::table('inventories')->insert([
            'hero_id' => 6,
            'item_id' => 8,
            'equipped' => false,
        ]);
    }
}
