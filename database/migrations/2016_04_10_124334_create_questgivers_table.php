<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateQuestgiversTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('questgivers', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name')->unique();
            $table->integer('map_x')->unsigned();
            $table->integer('map_y')->unsigned();
            $table->integer('frame')->unsigned();
            $table->text('quote');
            $table->integer('quest_id')->unsigned()->index();

            $table->foreign('quest_id')
                ->references('id')
                ->on('quests');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('questgivers');
    }
}
