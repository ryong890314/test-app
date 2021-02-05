<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Models\User;
use App\Models\Category;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

use App\Http\Controllers\CategoryController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// 카테고리
Route::middleware('auth:sanctum')->post('category', [CategoryController::class, 'list']);
Route::middleware('auth:sanctum')->post('category/create', [CategoryController::class, 'create']);
Route::middleware('auth:sanctum')->post('category/detail', [CategoryController::class, 'detail']);
Route::middleware('auth:sanctum')->post('category/update', [CategoryController::class, 'update']);
Route::middleware('auth:sanctum')->post('category/delete', [CategoryController::class, 'delete']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->post('/logout', function (Request $request) {
    // $request->user()->tokens()->delete();
    $tokenId = $request -> only('tokenId');
    
    $request->user()->tokens()->where('id', $tokenId)->delete();

    return response('Loggendout', 200);
});
Route::post('/sanctum/token', function (Request $request) {
    $request->validate([
        'email' => 'required|email',
        'password' => 'required',
        'device_name' => 'required',
    ]);

    $user = User::where('email', $request->email)->first();

    if (! $user || ! Hash::check($request->password, $user->password)) {
        throw ValidationException::withMessages([
            // 'email' => ['The provided credentials are incorrect.'],
            'email' => ['회원정보가 일치하지 않습니다.'],
        ]);
    }

    $token = $user->createToken($request->device_name)->plainTextToken;

    $response = [
        'user' => $user,
        'token' => $token,
    ];

    return response($response, 201);
});