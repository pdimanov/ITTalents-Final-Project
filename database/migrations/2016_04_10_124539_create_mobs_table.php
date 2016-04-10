<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMobsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mobs', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name')->unique();
            $table->integer('health')->unsigned();
            $table->integer('attack')->unsigned();
            $table->integer('defense')->unsigned();
            $table->integer('map_x')->unsigned();
            $table->integer('map_y')->unsigned();
            $table->integer('spawn_width')->usnigned();
            $table->integer('spawn_height')->unsigned();
            $table->integer('gold')->unsigned();
            $table->integer('experience')->unsigned();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('mobs');
    }
}
