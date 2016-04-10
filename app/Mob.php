<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Mob extends Model
{
    protected $hidden = ['created_at', 'updated_at'];

    public function quest()
    {
        return $this->belongsTo(Quest::class);
    }
}
