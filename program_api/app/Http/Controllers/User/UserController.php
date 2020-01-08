<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Base\BaseController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserController extends BaseController
{

    public function sign()
    {
        $info = User::find(1);

        dd($info);
    }

    public function login()
    {
        $phone = $this->request->input('phone');
        $info = User::where('phone', $phone)->find(1);

        return $this->_response(200, 'success', $info);
    }

}