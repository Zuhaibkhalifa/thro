<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisterRequest;
use App\User;
use Illuminate\Support\Facades\Hash;
use App\Http\Resources\User as UserResource;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Support\Facades\Mail;

class RegisterController extends Controller
{
    use RegistersUsers;
    
    /**
     * Register
     * 
     * @param RegisterRequest $request
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Validation\ValidationException
     */
    public function register(RegisterRequest $request)
    {
        // Create user data
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        //  Generate token
        $token = auth()->fromUser($user);

        // Transform user data
        $data = new UserResource($user);
        $origin = strval($_SERVER['HTTP_REFERER']);
        $api_route = strval('api/auth/verify?email=');
        $param_token = strval('&token=');
        $verify_url = $origin.$api_route.$data['email'].$param_token.$token;

        $title = array('name'=>$data['name']);
        $email = $data['email'];
        Mail::send('mail', $title, function($message) use ($email, $verify_url) {
            $message->to($email, 'Hello! Please click this link to verify the account.');
            $message->subject($verify_url); 
            $message->from('support@thrombolink.com','Thrombo Link');
        });
            
        return response()->json(['message' => 'Account has been created. We sent you an email for account activation '], 200);
    }
}
