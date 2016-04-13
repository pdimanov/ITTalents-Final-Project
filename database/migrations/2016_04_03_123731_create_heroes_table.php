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
            $table->string('name')->unique()->index();
            $table->integer('map_x')->unsigned()->default(200);
            $table->integer('map_y')->unsigned()->default(2944);
            $table->integer('health')->usnigned()->default(100)->index();
            $table->integer('max_health')->unsigned()->default(100);
            $table->integer('attack')->unsigned()->default(10)->index();
            $table->integer('defense')->unsigned()->default(2)->index();
            $table->integer('gold')->unsigned()->default(50)->index();
            $table->integer('level')->unsigned()->default(1)->index();
            $table->integer('experience')->unsigned()->default(1);
            $table->integer('experience_to_next_level')->unsigned()->default(100);
            $table->string('gender')->default('male');
            $table->integer('completed_quest')->unsigned()->nullable()->default(null);
            $table->integer('current_quest')->unsigned()->nullable()->default(null);
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
