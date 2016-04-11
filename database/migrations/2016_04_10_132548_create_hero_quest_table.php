<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateHeroQuestTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('hero_quest', function (Blueprint $table) {
            $table->integer('hero_id')->unsigned()->index();
            $table->integer('quest_id')->unsigned()->index();
            $table->integer('progress')->unsigned();
            $table->timestamps();

            $table->foreign('hero_id')
                ->references('id')
                ->on('heroes')
                ->onDelete('cascade');

            $table->foreign('quest_id')
                ->references('id')
                ->on('quests')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('hero_quest');
    }
}
