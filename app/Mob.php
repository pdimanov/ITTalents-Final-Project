<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Mob extends Model
{
    public function quest()
    {
        return $this->belongsTo(Quest::class);
    }
}
