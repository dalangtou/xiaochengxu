<?php

namespace App\Http\Extend;

//Scope 扩展
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

trait ScopeRelation
{
    /**
     *
     * @return Model
     */
//    public static function query(){
//        return new static();
//    }

    /**
     * @param Builder $builder
     * @param $field
     * @return Builder
     */
    public function scopeStatus(Builder $builder, $field, $status)
    {
        return $builder->where($field, $status);
    }

    /**
     * @param Builder $builder
     * @param $field
     * @return Builder
     */
    public function scopeNotDel(Builder $builder, $field = 'is_del')
    {
        return $builder->where($field, 0);
    }

    /**
     * @param Builder $builder
     * @return Builder
     */
    public function scopeWithU(Builder $builder)
    {
        return $builder->with(['user' => function ($query) {
            $query->select('id', 'nickname', 'we_name','avatar');
        }]);
    }

    /**
     * @param Builder $builder
     * @return Builder
     */
    public function scopeWithUD(Builder $builder)
    {
        return $builder->with(['userDetails' => function ($query) {
            $query->select('u_id', 'title', 'sex');
        }]);
    }

}