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

}