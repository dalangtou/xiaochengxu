<?php

namespace App\Http\Controllers\Information;

use App\Http\Controllers\Base\BaseController;
use App\Http\Extend\GeoHash;
use App\Models\Comment;
use App\Models\Information;
use App\Models\Infect;
use App\Models\Tags;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use mysql_xdevapi\Collection;

class InformationController extends BaseController
{
    public $mInformation;
    public $mComment;
    public $mTags;
    public $mInfect;

    public function __construct(Request $request)
    {
        parent::__construct($request);
        $this->mInformation = new Information();
        $this->mComment = new Comment();
        $this->mTags = new Tags();
        $this->mInfect = new Infect();
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

        $data['i_type'] = 0;
        $data['i_type'] = isset($data['img']) ? 1 : $data['i_type'];
        $data['i_type'] = isset($data['voice']) ? 2 : $data['i_type'];
        $data['i_type'] = isset($data['video']) ? 3 : $data['i_type'];

        $data['i_stale_at'] = isset($data['i_stale_at']) ?
            Carbon::parse("+{$data['i_stale_at']} hours")->toDateTimeString() :
            Carbon::parse('+'.Information::DEF_VALID_TIME.' hours')->toDateTimeString();

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
            $item->callout = [
                'content'=>$item->i_content,
                'color'=>'#f00',
                'fontSize'=>'34',
                'borderRadius'=>'10',
                'borderWidth'=>'1',
                'width'=>'300',
                'height'=>'250',
                'borderColor'=>'#fff',
                'bgColor'=>'#F5F5F5',
                'padding'=>'10',
                'display'=>'ALWAYS',
                'textAlign'=>'center',
                'boxShadow'=>'4px 8px 16px 0 rgba(0)'
            ];
//            $item->label = [
//                'content'=>$item->i_content,
//                'color'=>'#f00',
//                'fontSize'=>'24',
//                'anchorX'=>'-24',
//                'anchorY'=>'-26',
//                'borderRadius'=>'350',
//                'borderWidth'=>'2',
//                'borderColor'=>'#fff',
//                'bgColor'=>'#F5F5F5',
//                'padding'=>'10',
//            ];
        });
    }

    public function postInfo()
    {
        $tags = $this->mTags->getValidTags();

        $data = [
            'tags'=>$tags,
            'confine'=>['无', '仅男性可见', '仅女性可见', '18~25岁', '我的标记*'],
            'time'=>[2,4,10,24,72],
        ];

        return $this->_response(200,config('code.200'), $data);
    }

    public function uploadFile()
    {
        if (! $this->request->hasFile('file')) return $this->_response(1001,config('code.1001'));

        $file = $this->request->file('file');

        // 获取后缀名
        $ext = $file->getClientOriginalExtension();

        switch ($ext){
            case 'mp3':
                $dir = './voice';break;
            case 'mp4':
                $dir = './video';break;
            default :
                $dir = './photo';break;
        }
        // 新文件名
        $saveName = time() . rand() . "." . $ext;

        $newFile = $file->move($dir, $saveName);

        return $this->_response(200,config('code.200'), $newFile->getPath().'/'.$newFile->getBasename());
    }

    public function specialInfo()
    {
        header("Content-Type: text/html; charset=utf-8");

        $province = $this->request->input('province');//省
        $city = $this->request->input('city');//市
        $district = $this->request->input('district');//区,县

        $data = [
            'province'=>$province,
            'city'=>$city,
            'district'=>$district,
        ];
        $infect = $this->mInfect->where($data)->first();
        if(empty($infect)){
            $APIKEY = env('TX_KEY');
            $url = "http://api.tianapi.com/txapi/ncovnearby/index?key={$APIKEY}&province={$province}&city={$city}&district={$district}";
    
            $info = file_get_contents ($url);//API接口
            $json = json_decode($info,true);//将json解析成数组
            if($json['code'] == 200){ //判断状态码
                $list = $json['newslist'];
                $data['data'] = json_encode($list);
                $this->mInfect->insert($data);
            }else{	
                $list = [];
                Log::info("返回错误，状态消息：".$json['msg']);
            }
        }else{
            $list = json_decode($infect->data,true);
        }

        if(!empty($list)) $list = $this->clearList($list);
        return $this->_response(200,config('code.200'), $list);
        
    }

    public function clearList($list)
    {
        $arr = [];
        foreach($list as $k=>&$v){
            $arr[$k]['id'] = $k+1;
            $arr[$k]['longitude'] = $v['lng'];
            $arr[$k]['latitude'] = $v['lat'];
            $arr[$k]['locale'] = $v['locale'];
            $arr[$k]['address'] = $v['address'];
            $arr[$k]['source'] = $v['source'];

            $arr[$k]['iconPath'] = '../../img/virus.png';
            $arr[$k]['iconTapPath'] = '../../img/virus.png';
        }
        return $arr;
    }

}