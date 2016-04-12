<?php

use Illuminate\Database\Seeder;

class ItemsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('items')->insert([
            'name' => 'Leather Armor',
            'attack' => 0,
            'defense' => 10,
            'slot_type' => 'armor',
            'price' => 50,
            'pic' => 'assets/images/shopItems/armor1.png'
        ]);

        DB::table('items')->insert([
            'name' => 'Iron Armor',
            'attack' => 0,
            'defense' => 20,
            'slot_type' => 'armor',
            'price' => 100,
            'pic' => 'assets/images/shopItems/armor2.png'
        ]);

        DB::table('items')->insert([
            'name' => 'Better Iron Armor',
            'attack' => 0,
            'defense' => 30,
            'slot_type' => 'armor',
            'price' => 140,
            'pic' => 'assets/images/shopItems/armor3.png'
        ]);

        DB::table('items')->insert([
            'name' => 'Shiny Brass-Iron Armor',
            'attack' => 0,
            'defense' => 40,
            'slot_type' => 'armor',
            'price' => 180,
            'pic' => 'assets/images/shopItems/armor4.png'
        ]);

        DB::table('items')->insert([
            'name' => 'Dragon Armor',
            'attack' => 0,
            'defense' => 70,
            'slot_type' => 'armor',
            'price' => 350,
            'pic' => 'assets/images/shopItems/armor5.png'
        ]);

        DB::table('items')->insert([
            'name' => 'Leather Boots',
            'attack' => 0,
            'defense' => 5,
            'slot_type' => 'boots',
            'price' => 30,
            'pic' => 'assets/images/shopItems/boots6.png'
        ]);

        DB::table('items')->insert([
            'name' => 'Green Leather Boots',
            'attack' => 5,
            'defense' => 10,
            'slot_type' => 'boots',
            'price' => 70,
            'pic' => 'assets/images/shopItems/boots7.png'
        ]);

        DB::table('items')->insert([
            'name' => 'Plated Leather Boots',
            'attack' => 10,
            'defense' => 20,
            'slot_type' => 'boots',
            'price' => 150,
            'pic' => 'assets/images/shopItems/boots8.png'
        ]);

        DB::table('items')->insert([
            'name' => 'Iron Boots',
            'attack' => 15,
            'defense' => 30,
            'slot_type' => 'boots',
            'price' => 220,
            'pic' => 'assets/images/shopItems/boots9.png'
        ]);

        DB::table('items')->insert([
            'name' => 'Fire Mage Boots',
            'attack' => 25,
            'defense' => 40,
            'slot_type' => 'boots',
            'price' => 280,
            'pic' => 'assets/images/shopItems/boots10.png'
        ]);

        DB::table('items')->insert([
            'name' => 'Leather Gloves',
            'attack' => 0,
            'defense' => 5,
            'slot_type' => 'gloves',
            'price' => 30,
            'pic' => 'assets/images/shopItems/gloves11.png'
        ]);

        DB::table('items')->insert([
            'name' => 'Green Leather Gloves',
            'attack' => 5,
            'defense' => 10,
            'slot_type' => 'gloves',
            'price' => 70,
            'pic' => 'assets/images/shopItems/gloves12.png'
        ]);

        DB::table('items')->insert([
            'name' => 'Plated Leather Gloves',
            'attack' => 10,
            'defense' => 20,
            'slot_type' => 'gloves',
            'price' => 150,
            'pic' => 'assets/images/shopItems/gloves13.png'
        ]);

        DB::table('items')->insert([
            'name' => 'Iron Gloves',
            'attack' => 15,
            'defense' => 30,
            'slot_type' => 'gloves',
            'price' => 220,
            'pic' => 'assets/images/shopItems/gloves14.png'
        ]);

        DB::table('items')->insert([
            'name' => 'Fire Mage Gloves',
            'attack' => 25,
            'defense' => 40,
            'slot_type' => 'gloves',
            'price' => 280,
            'pic' => 'assets/images/shopItems/gloves15.png'
        ]);

        DB::table('items')->insert([
            'name' => 'Leather Helmet',
            'attack' => 0,
            'defense' => 10,
            'slot_type' => 'head',
            'price' => 50,
            'pic' => 'assets/images/shopItems/head16.png'
        ]);

        DB::table('items')->insert([
            'name' => 'Iron Helmet',
            'attack' => 0,
            'defense' => 20,
            'slot_type' => 'head',
            'price' => 100,
            'pic' => 'assets/images/shopItems/head17.png'
        ]);

        DB::table('items')->insert([
            'name' => 'Shiny Brass-Iron Helmet',
            'attack' => 0,
            'defense' => 30,
            'slot_type' => 'head',
            'price' => 150,
            'pic' => 'assets/images/shopItems/head18.png'
        ]);

        DB::table('items')->insert([
            'name' => 'Apprentice Hat',
            'attack' => 10,
            'defense' => 35,
            'slot_type' => 'head',
            'price' => 220,
            'pic' => 'assets/images/shopItems/head19.png'
        ]);

        DB::table('items')->insert([
            'name' => 'Fire Mage Hat',
            'attack' => 20,
            'defense' => 40,
            'slot_type' => 'head',
            'price' => 270,
            'pic' => 'assets/images/shopItems/head20.png'
        ]);

        DB::table('items')->insert([
            'name' => 'Iron Sword',
            'attack' => 10,
            'defense' => 0,
            'slot_type' => 'weapon',
            'price' => 50,
            'pic' => 'assets/images/shopItems/weapon21.png'
        ]);

        DB::table('items')->insert([
            'name' => 'Spiked Iron Sword',
            'attack' => 15,
            'defense' => 0,
            'slot_type' => 'weapon',
            'price' => 80,
            'pic' => 'assets/images/shopItems/weapon22.png'
        ]);

        DB::table('items')->insert([
            'name' => 'Thunder Sword',
            'attack' => 25,
            'defense' => 0,
            'slot_type' => 'weapon',
            'price' => 150,
            'pic' => 'assets/images/shopItems/weapon23.png'
        ]);

        DB::table('items')->insert([
            'name' => 'Fire Sword',
            'attack' => 35,
            'defense' => 10,
            'slot_type' => 'weapon',
            'price' => 220,
            'pic' => 'assets/images/shopItems/weapon24.png'
        ]);

        DB::table('items')->insert([
            'name' => 'Sword of Darkness',
            'attack' => 45,
            'defense' => 15,
            'slot_type' => 'weapon',
            'price' => 300,
            'pic' => 'assets/images/shopItems/weapon25.png'
        ]);
    }
}
