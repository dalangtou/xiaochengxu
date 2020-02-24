<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Support\Facades\Auth;

class Header
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|null  $guard
     * @return mixed
     */
    public function handle($request, Closure $next, $guard = null)
    {
        if (!$request->header('token') ||
            $request->header('token') != '122b86a4c20dd9ccab58c48042d1f7fd')
        {
            return response('Unauthorized.', 401);
        }

        $openid = $request->input('openid','');
        $mUser = new User();
        $user = $mUser->getUserIdByOpenId($openid);
        if ($user) {
            $request->attributes->set('u_id', $user->id);
        }
        unset($request['openid']);

        return $next($request);
    }
}
