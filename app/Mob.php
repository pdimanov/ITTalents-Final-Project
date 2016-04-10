<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Mob extends Model
{
    protected $hidden = ['mob_id', 'quest_id'];

    public function quest()
    {
        return $this->belongsTo(Quest::class);
    }
}
