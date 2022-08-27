<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserInfo;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        if (! $token = auth()->attempt(['username' => $request->username, 'password' => $request->password])) {
            return response()->json(['error' => 'Your account is not authorized'], 401);
        }

        return $this->respondWithToken($token);
    }

    public function register(Request $request)
    {
        $newInfo = UserInfo::create($request->all());

        $newData = User::create([
            'username'     => $request->username,
            'password'     => $request->password,
            'role_id'      => $request->role_id,
            'user_info_id' => $newInfo->id
        ]);

        return response()->json(['success' => 'Your registration has been submitted and waiting for approval.'], 200);
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        $me = User::where('id', auth()->user()->id)->with(['userinfo', 'role'])->first();
        return response()->json($me);
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['success' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        $me = User::where('id', auth()->user()->id)->first();
        return response()->json([
            'access_token' => $token,
            'token_type'   => 'bearer',
            'role'         => $me->role->role
        ]);
    }
}
