<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateHeroesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('heroes', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned();
            $table->integer('inventory_id')->unsigned();
            $table->string('name')->unique();
            $table->integer('map_x')->unsigned();
            $table->integer('map_y')->unsigned();
            $table->integer('health')->unsigned();
            $table->integer('attack')->unsigned();
            $table->integer('defense')->unsigned();
            $table->integer('gold')->unsigned();
            $table->integer('level')->unsigned();
            $table->integer('experience')->unsigned();
            $table->string('gender');
            $table->timestamps();

            $table->foreign('user_id')
                ->references('id')
                ->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('heroes');
    }
}
