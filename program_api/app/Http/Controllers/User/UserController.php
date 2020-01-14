<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Base\BaseController;
use App\Models\User;
use App\Models\UserDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class UserController extends BaseController
{
    public $mUser;
    public $mUserDetail;

    public function __construct(Request $request)
    {
        parent::__construct($request);
        $this->mUser = new User();
        $this->mUserDetail = new UserDetail();
    }

    public function sign()
    {
        $data = $this->request->all();

        $info = $this->mUser->where('phone', $data['phone'])->first();

        if (!is_null($info)) $this->login();

        try {
            DB::beginTransaction();

            $user = $this->mUser->post($data);

            $data['u_id'] = $user->id;

            $this->mUserDetail->post($data);

            DB::commit();
        } catch (\Exception $e) {

            DB::rollBack();

            Log::info($e);

            return $this->_response(1000, config('code.1000'));
        }

        return $this->login();
    }

    public function login()
    {
        $data = $this->request->all();

        $info = $this->mUser->where('phone', $data['phone'])->first();

        if (is_null($info)) return $this->sign();

        $info = $info->load('detail');

        return $this->_response(200, config('code.200'), $info);
    }

    public function update()
    {
        $data = $this->request->all();

        $uid = $data['uid'];
        unset($data['uid']);

        if (!empty($data)) {
            $this->mUser->updateUserInfo($data, $uid);
        }
    }

    //获取用户openid
    public function verifyUser()
    {
        $code = $this->request->input('code');

        $data = json_decode($this->send($code));

        if (isset($data->errcode)) return $this->_response(1000, config('code.1000'));
        return $this->_response(200, config('code.200'), $data);
    }

    private function send($code)
    {
        $url = env('GET_OPENID');
        $AppID = env('AppID');
        $AppSecret = env('AppSecret');
        $Grant_type = env('Grant_type');

        $url = $url.'?appid='.$AppID.'&secret='.$AppSecret.'&js_code='.$code.'&grant_type='.$Grant_type;

        // 初始化
        $curl = curl_init();
        // 设置url路径
        curl_setopt($curl, CURLOPT_URL, $url);
        // 将 curl_exec()获取的信息以文件流的形式返回，而不是直接输出。
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true) ;
        // 在启用 CURLOPT_RETURNTRANSFER 时候将获取数据返回
        curl_setopt($curl, CURLOPT_BINARYTRANSFER, true) ;
        // 不验证SSL
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE);
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, FALSE);
        // 执行
        $data = curl_exec($curl);
        // 打印请求头信息
//        echo curl_getinfo($curl, CURLINFO_HEADER_OUT);
        // 关闭连接
        curl_close($curl);

        return $data;
    }

}