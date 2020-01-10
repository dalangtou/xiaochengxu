<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Information extends Model
{
    protected $table = 'information';
    protected $guarded = [];

    public function tag()
    {
        return $this->hasOne(Tags::class,'id', 'i_tag');
    }

    public function comment()
    {
        return $this->hasMany(Comment::class,'id', 'i_id');
    }

    public function nearbyList($geohash, $u_id)
    {

    }

    public function post($data)
    {
        return $this->create($data);
    }

    /**
     * @param Information $information
     * @param $data
     * @return mixed
     */
    public function updateInfo($information, $data)
    {
        return $information->update($data);
    }

    /**
     * @param Information $information
     * @param $field
     * @param int $num
     * @return mixed
     */
    public function incrementByInfo($information, $field, $num = 1)
    {
        return $information->increment($field, $num);
    }
}
