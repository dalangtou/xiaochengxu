<?php

namespace App\Models;

use App\Http\Extend\ScopeRelation;
use Illuminate\Database\Eloquent\Model;

class Tags extends Model
{
    use ScopeRelation;

    protected $table = 'tags';

    //获取有效tags  做展示
    public function getValidTags()
    {
        return $this->notDel()
            ->pluck('name');
    }
}
