<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Quest extends Model
{
    protected $hidden = ['created_at', 'updated_at', 'questgiver_id', 'mob_id'];

    public function questgiver()
    {
        return $this->hasOne(Questgiver::class);
    }

    public function mob()
    {
        return $this->hasOne(Mob::class);
    }

    public function items()
    {
        return $this->belongsToMany(Item::class);
    }

    public function hero()
    {
        return $this->belongsToMany(Hero::class);
    }
}
