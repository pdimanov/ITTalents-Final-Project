<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateItemQuestTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('item_quest', function (Blueprint $table) {
            $table->integer('quest_id')->unsigned()->index();
            $table->integer('item_id')->unsigned()->index();
            $table->timestamps();

            $table->foreign('quest_id')
                ->references('id')
                ->on('quests');

            $table->foreign('item_id')
                ->references('id')
                ->on('items');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('item_quest');
    }
}
