<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Hero extends Model
{
    protected $fillable = ['name', 'gender'];

    protected $hidden = ['user_id', 'inventory_id', 'created_at', 'updated_at'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function items()
    {
        return $this->belongsToMany(Item::class, 'inventories')->withPivot('equipped')->withTimestamps();
    }
}
