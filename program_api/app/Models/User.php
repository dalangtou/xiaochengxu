<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $table = 'user';
    protected $guarded = [];

    public function detail()
    {
        return $this->hasOne(UserDetail::class,'u_id', 'id');
    }

    public function updateUserInfo($data, $uid)
    {
        return $this->where('id', $uid)->update($data);
    }

    public function post($arr)
    {
        $data = [
            'we_name'=>$arr['we_name'],
            'avatar'=>$arr['avatar'],
            'country'=>$arr['country'],
            'province'=>$arr['province'],
            'city'=>$arr['city'],
            'language'=>$arr['language'],
            'openid'=>$arr['openid'],
        ];

        return $this->create($data);
    }
}
