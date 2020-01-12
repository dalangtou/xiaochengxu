<?php

namespace App\Models;

use App\Http\Extend\ScopeRelation;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Information extends Model
{
    use ScopeRelation;

    protected $table = 'information';
    protected $guarded = [];

    const DEF_VALID_TIME = 7200;

    public function tag()
    {
        return $this->hasOne(Tags::class,'id', 'i_tag');
    }

    public function comment()
    {
        return $this->hasMany(Comment::class,'i_id', 'id');
    }

    public function user()
    {
        return $this->belongsTo(User::class,'u_id', 'id');
    }

    public function userDetails()
    {
        return $this->belongsTo(UserDetail::class,'u_id', 'u_id');
    }

    public function nearbyList($geohash, $u_id = 0)
    {
        return $this->withU()->withUD()->withC($u_id)
            ->notDel()
            ->status('i_status', 1)
            ->where('i_geohash', 'like', "%{$geohash}%")
            ->where('i_stale_at', '>', Carbon::now())
            ->orderBy('updated_at', 'desc')
            ->get();
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

    public function getInformationById($i_id)
    {
        return $this->notDel()
            ->status('i_status', 1)
            ->find($i_id);
    }
}
