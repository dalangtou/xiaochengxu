<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $table = 'comment';
    protected $guarded = [];

    public function information()
    {
        $this->belongsTo(Information::class ,'i_id', 'id');
    }

    public function post($data)
    {
        return $this->create($data);
    }


}
