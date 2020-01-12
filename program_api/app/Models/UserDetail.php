<?php

namespace App\Models;

use App\Http\Extend\GeoHash;
use Illuminate\Database\Eloquent\Model;

class UserDetail extends Model
{
    protected $table = 'userdetails';

    protected $guarded = [];


    public function post($arr)
    {
        $data = [
            'u_id'=>$arr['u_id'],
            'sex'=>isset($arr['sex'])?$arr['sex']:0,
            'age'=>isset($arr['age'])?$arr['age']:null,
            'latitude'=>isset($arr['latitude'])?$arr['latitude']:null,
            'longitude'=>isset($arr['longitude'])?$arr['longitude']:null,
            'geohash'=>isset($arr['latitude']) && isset($arr['longitude'])?GeoHash::encode($arr['latitude'], $arr['longitude']):null,
        ];

        return $this->create($data);
    }
}
