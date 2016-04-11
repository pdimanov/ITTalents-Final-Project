<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateInventoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('inventories', function (Blueprint $table) {
            $table->integer('hero_id')->unsigned()->index();
            $table->integer('item_id')->unsigned()->index();
            $table->boolean('equipped')->default(0);
            $table->timestamps();

            $table->foreign('item_id')
                ->references('id')
                ->on('items')
                ->onDelete('cascade');

            $table->foreign('hero_id')
                ->references('id')
                ->on('heroes')
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
        Schema::drop('inventories');
    }
}
