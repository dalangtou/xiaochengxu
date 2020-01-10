<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $table = 'user';
    protected $guarded = ['phone', 'openid'];

    public function detail()
    {
        return $this->hasOne(UserDetail::class,'u_id', 'id');
    }

    public function updateUserInfo($data, $uid)
    {
        return $this->where('id', $uid)->update($data);
    }
}
