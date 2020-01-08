<?php

namespace App\Http\Controllers\Base;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BaseController extends Controller
{
    public $request;

    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    /**
     * 返回数据封装
     *
     * @param int $code
     * @param string $message
     * @param array $data
     * @return JsonResponse
     * @author jreey
     */
    public function _response($code, $message, $data = [])
    {
        $array = array(
            'message' => $message,
            'status' => $code
        );
        if(!empty($data)) $array['data'] = $data;
        return response()->json($array);
    }

}