<?php

namespace App\Http\Middleware;

use App\User;
use Closure;
use Illuminate\Support\Facades\Auth;

class ApiTokenAuthMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $token = $request->header('X-Api-Token');

        if(!$token){
            return response(['error' => 'Token required.'], 403);
        }

        $user = User::where('api_token', $token)->first();

        if(!$user){
            return response(['error' => 'User not found.'], 404);
        }

        Auth::login($user);
        return $next($request);
    }
}
