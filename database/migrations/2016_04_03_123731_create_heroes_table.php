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
            $table->string('name')->unique();
            $table->integer('map_x')->unsigned()->default(150);
            $table->integer('map_y')->unsigned()->default(150);
            $table->integer('health')->unsigned()->default(100);
            $table->integer('attack')->unsigned()->default(10);
            $table->integer('defense')->unsigned()->default(2);
            $table->integer('gold')->unsigned()->default(50);
            $table->integer('level')->unsigned()->default(1);
            $table->integer('experience')->unsigned()->default(1);
            $table->string('gender')->default('male');
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
