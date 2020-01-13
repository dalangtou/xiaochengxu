<?php

namespace App\Http\Controllers\Information;

use App\Http\Controllers\Base\BaseController;
use App\Http\Extend\GeoHash;
use App\Models\Comment;
use App\Models\Information;
use Illuminate\Http\Request;
use mysql_xdevapi\Collection;

class InformationController extends BaseController
{
    public $mInformation;
    public $mComment;

    public function __construct(Request $request)
    {
        parent::__construct($request);
        $this->mInformation = new Information();
        $this->mComment = new Comment();
    }

    //附近列表
    public function nearbyList()
    {
        $u_id = $this->request->input('u_id', 0);
        $latitude = $this->request->input('latitude');
        $longitude = $this->request->input('longitude');

        $geohash = GeoHash::encode($latitude, $longitude);

        $list = $this->mInformation->nearbyList(getScope($geohash,GeoHash::M_2400), $u_id);

        $this->clearData($list);
        return $this->_response(200,config('code.200'), $list);
    }

    //发布
    public function post()
    {
        $data = $this->request->all();

        if (!isset($data['u_id'])) return $this->_response(1001,config('code.1001'));

        $data['i_geohash'] = GeoHash::encode($data['i_latitude'], $data['i_longitude']);

        $data['i_type'] = isset($data['img']) ? 1 : 0;

        $data['i_stale_at'] = isset($data['i_stale_at']) ? $data['i_stale_at'] : date('Y/m/d H:i:s', time()+Information::DEF_VALID_TIME);

        $res = $this->mInformation->post($data);

        if (!$res) return $this->_response(1001, config('code.1001'));

        //在缓存中读取用户信息
//        $res->load(['user' => function ($query) {
//            $query->select('id', 'nickname', 'we_name','avatar');
//        }, 'userDetails' => function ($query) {
//            $query->select('u_id', 'title', 'sex');
//        }]);

        return $this->_response(200,config('code.200'), $res);
    }

    //评论
    public function comment()
    {
        $data = $this->request->all();

        if (!isset($data['u_id']) || !isset($data['i_id']) || !isset($data['to_u_id']) || !isset($data['c_content'])) return $this->_response(1001,config('code.1001'));

        $information = $this->mInformation->getInformationById($data['i_id']);

        if (is_null($information)) return $this->_response(3001,config('code.3001'));

        $res = $this->mComment->post($data);

        return $this->_response(200,config('code.200'), $res);
    }

    //更新
    public function update()
    {
        $data = $this->request->all();

        if (!isset($data['u_id']) || !isset($data['id'])) return $this->_response(1001,config('code.1001'));

        $i_id = $data['id'];

        $information = $this->mInformation->find($i_id);

        if (empty($information) || $information->u_id != $data['u_id']) return $this->_response(2001,config('code.2001'));

        unset($data['id'],$data['u_id'],$data['i_latitude'], $data['i_longitude']);

//        $data['i_geohash'] = GeoHash::encode($data['i_latitude'], $data['i_longitude']);

        $res = $this->mInformation->updateInfo($information, $data);

        if (!$res) return $this->_response(1000,config('code.1000'));

        return $this->_response(200,config('code.200'));
    }

    //浏览查看
    public function look()
    {
        $i_id = $this->request->input('id');

        if (!isset($i_id)) return $this->_response(1001,config('code.1001'));

        $information = $this->mInformation->find($i_id);

        $this->mInformation->incrementByInfo($information, 'i_look');

        return $this->_response(200,config('code.200'));

    }

    /**
     * @param Collection $list
     */
    public function clearData($list)
    {
        return $list->map(function ($item){
            $item->iconPath = '../../img/marker_yellow.png';
            $item->iconTapPath = '../../img/marker_yellow.png';
        });
    }

}