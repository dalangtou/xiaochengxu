<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Base\BaseController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserController extends BaseController
{
    public $mUser;

    public function __construct(Request $request)
    {
        parent::__construct($request);
        $this->mUser = new User();
    }

    public function sign()
    {
        $info = User::find(1);

        dd($info);
    }

    public function login()
    {
        $phone = $this->request->input('phone');
        $info = $this->mUser->where('phone', $phone)->find(1);

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