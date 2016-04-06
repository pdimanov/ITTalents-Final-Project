<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    protected $fillable = ['name', 'slot_type', 'attack', 'defense','price', 'pic' ];

    protected $hidden = ['created_at', 'updated_at'];
}
