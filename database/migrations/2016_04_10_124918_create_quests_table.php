<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateQuestsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('quests', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('questgiver_id')->unsigned()->index();
            $table->integer('mob_id')->unsigned()->index();
            $table->string('name');
            $table->text('description');
            $table->integer('count')->unsigned();
            $table->integer('gold')->unsigned();
            $table->integer('experience')->unsigned();
            $table->timestamps();

            $table->foreign('questgiver_id')
                ->references('id')
                ->on('questgivers');

            $table->foreign('mob_id')
                ->references('id')
                ->on('mobs');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('quests');
    }
}
