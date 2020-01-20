<?php

namespace App\Http\Middleware;

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

        return $next($request);
    }
}
