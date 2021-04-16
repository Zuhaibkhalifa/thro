<?php
use Illuminate\Http\Request;
ini_set('memory_limit', '64M');
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


Route::get('/', function () {
    return [
        'app' => 'Laravel 6 API Boilerplate',
        'version' => '1.0.0',
    ];
});


Route::group(['namespace' => 'Auth'], function () {

    Route::post('auth/login', ['as' => 'login', 'uses' => 'AuthController@login']);

    Route::post('auth/register', ['as' => 'register', 'uses' => 'RegisterController@register']);
    // Send reset password mail
    Route::post('auth/recovery', 'ForgotPasswordController@sendPasswordResetLink');
    // handle reset password form process
    Route::post('auth/reset', 'ResetPasswordController@callResetPassword');
    // handle reset password form process
    Route::get('auth/verify', 'VerifyAccountController@verify');

});

Route::group(['middleware' => ['jwt', 'jwt.auth']], function () {

    Route::group(['namespace' => 'Profile'], function () {

    Route::get('profile', ['as' => 'profile', 'uses' => 'ProfileController@me']);

    Route::put('profile', ['as' => 'profile', 'uses' => 'ProfileController@update']);

    Route::put('profile/password', ['as' => 'profile', 'uses' => 'ProfileController@updatePassword']);



  

  // Route::post('profile/page2', ['as' => 'page2', 'uses' => 'ProfileController@page2']);

   // Route::post('profile/page2','ProfileController@page2');

   });



 
   Route::post('patient/page2','PatientController@page2');
   Route::post('patient/page3','PatientController@page3');
   Route::post('patient/page4Post','PatientController@page4Post');
   Route::post('patient/page5','PatientController@page5');
   Route::post('patient/page6Post','PatientController@page6Post');
   Route::post('patient/page7','PatientController@page7');
   Route::post('patient/page8','PatientController@page8');
   Route::post('patient/page9','PatientController@page9');
   Route::post('patient/page10','PatientController@page10');
   Route::post('patient/page11','PatientController@page11');
   Route::post('patient/page12','PatientController@page12');
   Route::post('patient/page13','PatientController@page13');
   Route::post('patient/page14','PatientController@page14');
   Route::post('patient/page15','PatientController@page15');
   Route::post('patient/page16','PatientController@page16');

//==============load patients Data========================================

   Route::get('patient/page2LoadData','PatientController@page2LoadData');
   Route::get('patient/page3LoadData','PatientController@page3LoadData');

   Route::get('patient/page4LoadData','PatientController@page4LoadData');



   Route::get('patient/page5LoadData','PatientController@page5LoadData');



   Route::get('patient/page6LoadData','PatientController@page6LoadData');
   Route::get('patient/page7LoadData','PatientController@page7LoadData');
   Route::get('patient/page8LoadData','PatientController@page8LoadData');
   Route::get('patient/page9LoadData','PatientController@page9LoadData');
   Route::get('patient/page10LoadData','PatientController@page10LoadData');
   Route::get('patient/page11LoadData','PatientController@page11LoadData');
   Route::get('patient/page12LoadData','PatientController@page12LoadData');
   Route::get('patient/page13LoadData','PatientController@page13LoadData');
   Route::get('patient/page14LoadData','PatientController@page14LoadData');
   Route::get('patient/page15LoadData','PatientController@page15LoadData');
   Route::get('patient/page16LoadData','PatientController@page16LoadData');


//========================nurse==================================


  Route::post('nurse/page1', 'PatientController@nurse1');
  Route::post('nurse/page3', 'PatientController@nurse3');
  Route::post('nurse/page5', 'PatientController@nurse5');

  Route::get('nurse/page1LoadData', 'PatientController@nursePage1LoadData');
  Route::get('nurse/page1LoadData', 'PatientController@nursePage1LoadData');
  Route::get('nurse/page3LoadData', 'PatientController@nursePage3LoadData');
  Route::get('nurse/page5LoadData', 'PatientController@nursePage5LoadData');
  Route::get('nurse/page6LoadData', 'PatientController@nursePage6LoadData');
  Route::get('nurse/page8LoadData', 'PatientController@nursePage8LoadData');
  Route::get('nurse/page8','PatientController@nurse8');

  Route::get('nurse/medicationAlgoDetails', 'PatientController@medicationAlgoDetails');

});

 
 
 