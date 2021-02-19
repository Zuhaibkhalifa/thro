<?php

namespace App\Http\Controllers\Patient;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\Profile\UpdateProfileRequest;
use App\Http\Requests\Profile\UpdatePassword;
use App\Http\Resources\User as UserResource;
use Illuminate\Support\Facades\Hash;
use App\Patient_section_two;

class PatientController extends Controller
{
   

public function page2(Request $request)
        {
         
         print_r($request);
            die();
         $data= array(
            'age' => $request->age,
            'gender' =>$request->gender,
            'physicianName' =>$request->physicianName,
            'weight' =>$request->weight,
            'weightSelected'=> $request->weightSelected

             );
        Patient_section_two::create($data);
         return response()->json(compact('data'));
         //  return response()->json(['error' => 'Invalid current password'], 422);
        }
}
