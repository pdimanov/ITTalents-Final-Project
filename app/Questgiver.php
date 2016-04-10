<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Questgiver extends Model
{
    protected $hidden = ['created_at', 'updated_at'];

    public function quest()
    {
        return $this->belongsTo(Quest::class);
    }
}
