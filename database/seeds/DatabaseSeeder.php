<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call(UsersTableSeeder::class);
        $this->call(ItemsTableSeeder::class);
        $this->call(HeroTableSeeder::class);
        $this->call(InventoryTableSeeder::class);
        $this->call(QuestsTableSeeder::class);
        $this->call(QuestgiversTableSeeder::class);
        $this->call(MobsTableSeeder::class);
        $this->call(Item_QuestTableSeeder::class);
        $this->call(Hero_QuestTableSeeder::class);
    }
}
