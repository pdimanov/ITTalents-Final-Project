<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    protected $fillable = ['name', 'slot_type', 'attack', 'defense','price', 'pic' ];

    protected $hidden = ['created_at', 'updated_at'];

    public function toArray()
    {
        $attributes = $this->attributesToArray();
        $attributes = array_merge($attributes, $this->relationsToArray());
        unset($attributes['pivot']['created_at']);
        unset($attributes['pivot']['updated_at']);
        unset($attributes['pivot']['hero_id']);
        unset($attributes['pivot']['item_id']);
        return $attributes;
    }
}
