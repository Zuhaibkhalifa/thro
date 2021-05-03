<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\Profile\UpdateProfileRequest;
use App\Http\Requests\Profile\UpdatePassword;
use App\Http\Resources\User as UserResource;
use Illuminate\Support\Facades\Hash;

use \App\Pat_section_two;
use \App\Pat_section_three;
use \App\Pat_section_four;
use \App\Pat_section_five;
use \App\Pat_section_six;
use \App\Pat_section_seven;
use \App\Pat_section_eight;


use \App\Pat_section_ten;
use \App\Pat_section_eleven;
use \App\Pat_section_twelve;
use \App\Pat_section_thirteen;
use \App\Pat_section_fourteen;
use \App\Pat_section_fifteen;
use \App\Pat_section_sixteen;



use \App\Nurse_section_five;
use \App\Nurse_section_one;
use \App\Nurse_section_three;

use \App\MedicationJsonData;




use DB;

class PatientController extends Controller
{
   

	public function page2(Request $request)
	{
		$data = array( 'age' => $request->age,  'gender' =>$request->gender,
						'weight_unit'=>$request->weightSelected, 'physicianName' =>$request->physicianName,
						'weight' =>$request->weight, 'patient_id'=> rand(10411,14400),
						'user_id'=> Auth::user()->id  );

		$chk = Pat_section_two::where('user_id', Auth::user()->id)->get();

		if ($chk=='[]') {
			$one = Pat_section_two::Create($data);
		} 
		else {
			$one = Pat_section_two::where('user_id', Auth::user()->id)->delete();
			$one = Pat_section_two::create($data);
		}

		return response()->json(['success' => $chk], 200);
	}


	public function page3(Request $request)
	{  
		$data= array( 'blood_clot_blood_thinner_interrupted' => $request->blood_clot_blood_thinner_interrupted,
							'user_id'=> Auth::user()->id);

		$chk=Pat_section_three::where('user_id',Auth::user()->id)->get();

		if ($chk=='[]') {
			$one = Pat_section_three::Create($data);
		} 
		else {
			$one = Pat_section_three::where('user_id', Auth::user()->id)->delete();
			$one = Pat_section_three::create($data);
		}

		return response()->json(['success' => $chk], 200);		
	}

	
	public function page4Post(Request $request)
	{
	$data= array('user_id'=> Auth::user()->id,
			'venous_thromboelism' => $request->venous_thromboelism,
			'pe' => $request->pe,
			'dvt' => $request->dvt,
			'dvt_how_long_ago' => $request->dvt_how_long_ago,
			'pe_dvt_how_long_ago' => $request->pe_dvt_how_long_ago,
			'atrial_fibrillation_of_flutter' => $request->atrial_fibrillation_of_flutter,
			'heart_valve_replacement' => $request->heart_valve_replacement,
			'blood_clot_in_heart' => $request->blood_clot_in_heart,
			'arterial_peripheral_thrombosis' => $request->arterial_peripheral_thrombosis,
			'peripheral_arterial_disease' => $request->peripheral_arterial_disease,
			'other' => $request->other,
			'none' => $request->none
		);

		$chk = DB::table('pat_section_four')->where('user_id',Auth::user()->id)->select('*')->get();

		if ($chk != '[]') {
			DB::table('pat_section_four')->where('user_id', Auth::user()->id)->delete(); 
		}
		
		
		$chk = DB::table('pat_section_four')->insert($data);
		return response()->json(['success' => $chk], 200);
	}



	public function page6Post(Request $request)
			{
				
		$data= array( 
		'mechanical_heart_valve' => $request->mechanical_heart_valve,
		'tissue_heart_valve' => $request->tissue_heart_valve,
		'dont_know' => $request->dont_know,
		'mechanical_heart_valve_Is_the_valve_bileaflet' => $request->mechanical_heart_valve_Is_the_valve_bileaflet,
		'mechanical_heart_valve_Is_the_valve_ball_and_cage' => $request->mechanical_heart_valve_Is_the_valve_ball_and_cage,
		'mechanical_heart_valve_Is_the_valve_tilting_disc' => $request->mechanical_heart_valve_Is_the_valve_tilting_disc,
		'mechanical_heart_valve_Is_the_valve_dont_know' => $request->mechanical_heart_valve_Is_the_valve_dont_know,
		'location_aortic' => $request->location_aortic,
		'location_mitral' => $request->location_mitral,
		'location_other' => $request->location_other,
		'location_dont_know' => $request->location_dont_know,
		'user_id'=> Auth::user()->id);

		$chk=array();

		$chk= DB::table('pat_section_six')->where('user_id',Auth::user()->id)->select('*')->get();

	if ($chk=='[]') {
		$chk=DB::table('pat_section_six')->insert($data);
	} else {
		DB::table('pat_section_six')->where('user_id', Auth::user()->id)->delete();
		$chk=DB::table('pat_section_six')->insert($data);
	}

		return response()->json(['success' => $chk], 200);
	}


	public function page7(Request $request)
	{
		$data= array('cognitive_heart_failure' => $request->cognitive_heart_failure,
			'high_blood_pressure' => $request->high_blood_pressure,
			'diabetes' => $request->diabetes,
			'mitral_stenosis' => $request->mitral_stenosis,
			'stroke_or_mini_stroke' => $request->stroke_or_mini_stroke,
			'stroke_how_long' => $request->stroke_how_long,
			'none_of_above' => $request->none_of_above,
			'user_id'=> Auth::user()->id
		);

		$one = array();

		$chk = Pat_section_seven::where('user_id', Auth::user()->id)->get();

		if ($chk=='[]') {
			$one = Pat_section_seven::create($data);
		}
		else {
			$one = Pat_section_seven::where('user_id', Auth::user()->id)->delete();
			$one = Pat_section_seven::create($data);
		}

		return response()->json(['success' => $request->$one], 200);
	}



	public function page8(Request $request)
			{
				
				
	$data= array( 
		'pradaxa' => $request->pradaxa,
		'pradaxa_dosage' => $request->pradaxa_dosage,
		'xarelto' => $request->xarelto,


		'xarelto_dosage' => $request->xarelto_dosage,
		'xarelto_dosage_time' => $request->xarelto_dosage_time,
		'eliquis' => $request->eliquis,

		'eliquis_dosage' => $request->eliquis_dosage,



		'eliquis_dosage_time' => $request->eliquis_dosage_time,
		'edoxabon' => $request->edoxabon,
		'edoxabon_dosage' => $request->edoxabon_dosage,

		'edoxabon_dosage_time' => $request->edoxabon_dosage_time,


		'user_id'=> Auth::user()->id);

	$chk= DB::table('pat_section_eight')->where('user_id',Auth::user()->id)->select('*')->get();



	if ($chk=='[]') {

	$chk=DB::table('pat_section_eight')->insert($data);



	} else {

	DB::table('pat_section_eight')->where('user_id', Auth::user()->id)->delete();
	$chk=DB::table('pat_section_eight')->insert($data);

	}
	return response()->json(['success' => $chk], 200);
			
	}



	public function page10(Request $request)
			{
				
	$data= array( 
		'coumadin' => $request->coumadin,
		'coumadin_monday' => $request->coumadin_monday,
		'coumadin_tuesday' => $request->coumadin_tuesday,


		'coumadin_wednesday' => $request->coumadin_wednesday,
		'coumadin_thursday' => $request->coumadin_thursday,
		'coumadin_friday' => $request->coumadin_friday,

		'coumadin_saturday' => $request->coumadin_saturday,



		'coumadin_sunday' => $request->coumadin_sunday,
		'sintrom' => $request->sintrom,
		'sintrom_monday' => $request->sintrom_monday,

		'sintrom_tuesday' => $request->sintrom_tuesday,

			'sintrom_wednesday' => $request->sintrom_wednesday,
		'sintrom_thursday' => $request->sintrom_thursday,

		'sintrom_friday' => $request->sintrom_friday,


		'sintrom_saturday' => $request->sintrom_saturday,
	'not_sure' => $request->not_sure,

		'user_id'=> Auth::user()->id);


	$chk= DB::table('pat_section_ten')->where('user_id',Auth::user()->id)->select('*')->get();



	if ($chk=='[]') {

	$chk=DB::table('pat_section_ten')->insert($data);



	} else {

	DB::table('pat_section_ten')->where('user_id', Auth::user()->id)->delete();
	$chk=DB::table('pat_section_ten')->insert($data);

	}
	return response()->json(['success' => $chk], 200);
			
	}




	public function page11(Request $request)
	{
		$data= array( 
			'aspirin' => $request->aspirin,
			'aspirin_dosage' => $request->aspirin_dosage,
			'aspirin_dosage_time' => $request->aspirin_dosage_time,

			'plavix' => $request->plavix,
			'plavix_dosage' => $request->plavix_dosage,
			'plavix_dosage_time' => $request->plavix_dosage_time,

			'brillinta' => $request->brillinta,
			'brillinta_dosage' => $request->brillinta_dosage,
			'brillinta_dosage_timie' => $request->brillinta_dosage_timie,

			'effient_dosage' => $request->effient_dosage,
			'effient_dosage_time' => $request->effient_dosage_time,
			'not_using_drugs' => $request->not_using_druhs,

			'user_id'=> Auth::user()->id
		);

		$chk= DB::table('pat_section_eleven')->where('user_id',Auth::user()->id)->select('*')->get();

		if ($chk=='[]') {
			$chk=DB::table('pat_section_eleven')->insert($data);
		} else {
			DB::table('pat_section_eleven')->where('user_id', Auth::user()->id)->delete();
			$chk=DB::table('pat_section_eleven')->insert($data);
		}

		return response()->json(['success' => $chk], 200);     
	}




	public function page12(Request $request)
			{
				
	$data= array( 
		'lab_location_for_inr_test' => $request->lab_location_for_inr_test,


		'user_id'=> Auth::user()->id);






	$chk= DB::table('pat_section_twelve')->where('user_id',Auth::user()->id)->select('*')->get();





	if ($chk=='[]') {

	$chk=DB::table('pat_section_twelve')->insert($data);



	} else {

	DB::table('pat_section_twelve')->where('user_id', Auth::user()->id)->delete();
	$chk=DB::table('pat_section_twelve')->insert($data);

	}
	return response()->json(['success' => $chk], 200);
			
	}

	public function page13(Request $request) {
	$data= array( 
		'bleeding_requiring_treatment' => $request->bleeding_requiring_treatment,
		'bleeding_requiring_treatment_last_three_months' => $request->bleeding_requiring_treatment_last_three_months,
		'bleeding_from_stomach' => $request->bleeding_from_stomach,
		'bleeding_from_stomach_last_three_months' => $request->bleeding_from_stomach_last_three_months,
		'ulcer_in_stomach_or_bowel' => $request->ulcer_in_stomach_or_bowel,
		'ulcer_in_stomach_or_bowel_last_three_months' => $request->ulcer_in_stomach_or_bowel_last_three_months,
		'liver_disease' => $request->liver_disease,
		'kidney_disease' => $request->kidney_disease,
		'not_sure' => $request->not_sure,
		'had_transfusion_in_last_three_months' => $request->had_transfusion_in_last_three_months,
		'had_transfusion_in_last_three_months_when' => $request->had_transfusion_in_last_three_months_when,


		'user_id'=> Auth::user()->id);




	$chk= DB::table('pat_section_thirteen')->where('user_id',Auth::user()->id)->select('*')->get();
	if ($chk=='[]') {

	$chk=DB::table('pat_section_thirteen')->insert($data);



	} else {

	DB::table('pat_section_thirteen')->where('user_id', Auth::user()->id)->delete();
	$chk=DB::table('pat_section_thirteen')->insert($data);

	}
	return response()->json(['success' => $chk], 200);
			
	}

	public function page14(Request $request)
			{
				
	$data= array( 
		'cirrhosis_of_liver' => $request->cirrhosis_of_liver,
		'antiphospholipid_antibody_syndrome' => $request->antiphospholipid_antibody_syndrome,
		'user_id'=> Auth::user()->id);

	$chk= DB::table('pat_section_fourteen')->where('user_id',Auth::user()->id)->select('*')->get();
	if ($chk=='[]') {

	$chk=DB::table('pat_section_fourteen')->insert($data);



	} else {

	DB::table('pat_section_fourteen')->where('user_id', Auth::user()->id)->delete();
	$chk=DB::table('pat_section_fourteen')->insert($data);

	}
	return response()->json(['success' => $chk], 200);
			
	}


	public function page15(Request $request)
			{
				
	$data= array( 
		'being_treated_cancer' => $request->being_treated_cancer,
		'cancer' => $request->cancer,
		'radiation' => $request->radiation,
		'radiation_ongoing' => $request->radiation_ongoing,
			'chemotherapy' => $request->chemotherapy,
		'chemotherapy_ongoing' => $request->chemotherapy_ongoing,
			'chemotherapy_finished' => $request->chemotherapy_finished,

		'user_id'=> Auth::user()->id);


	$chk= DB::table('pat_section_fifteen')->where('user_id',Auth::user()->id)->select('*')->get();
	if ($chk=='[]') {

	$chk=DB::table('pat_section_fifteen')->insert($data);



	} else {

	DB::table('pat_section_fifteen')->where('user_id', Auth::user()->id)->delete();
	$chk=DB::table('pat_section_fifteen')->insert($data);

	}
	return response()->json(['success' => $chk], 200);
			
	}


	public function page16(Request $request)
			{
				
	$data= array( 
		'type_of_procedure' => $request->type_of_procedure,
		'date_of_procedure' => $request->date_of_procedure,
		
		'user_id'=> Auth::user()->id);



	$chk= DB::table('pat_section_sixteen')->where('user_id',Auth::user()->id)->select('*')->get();
	if ($chk=='[]') {

	$chk=DB::table('pat_section_sixteen')->insert($data);



	} else {

	DB::table('pat_section_sixteen')->where('user_id', Auth::user()->id)->delete();
	$chk=DB::table('pat_section_sixteen')->insert($data);

	}
	return response()->json(['success' => $chk], 200);
			
	}

	//============================================ patient Load data ======================================
	public function page2LoadData() {
	$chk=Pat_section_two::where('user_id',Auth::user()->id)->get();
	if ($chk !=='[]') {
	return response()->json(['success' => 'not_found'], 200);
	} else {
	return response()->json(['success' => $chk], 200);
	}
	}

	public function page3LoadData() {
	$chk=Pat_section_three::where('user_id',Auth::user()->id)->get();
	if ($chk !=='[]') {
	return response()->json(['success' => 'not_found'], 200);
	} else {
	return response()->json(['success' => $chk], 200);
	}
	}

	public function page4LoadData() {
		$chk=array();


		$chk= DB::table('pat_section_four')->where('user_id',Auth::user()->id)->select('*')->get();


	if($chk=='[]'){
	return response()->json(['success' => 'not_found'], 200);
	} else {
	return response()->json(['success' => $chk], 200);
	}
	}

	public function page6LoadData() {
		$chk= DB::table('pat_section_six')->where('user_id',Auth::user()->id)->select('*')->get();

		if ($chk !=='[]') {
			return response()->json(['success' => 'not_found'], 200);
		} else {
			return response()->json(['success' => $chk], 200);
		}
	}

	public function page7LoadData() {
	$chk=Pat_section_seven::where('user_id',Auth::user()->id)->get();
	if ($chk !=='[]') {
	return response()->json(['success' => 'not_found'], 200);
	} else {
	return response()->json(['success' => $chk], 200);
	}
	}

	public function page8LoadData() {
	$chk= DB::table('pat_section_eight')->where('user_id',Auth::user()->id)->select('*')->get();
	if ($chk !=='[]') {
	return response()->json(['success' => 'not_found'], 200);
	} else {
	return response()->json(['success' => $chk], 200);
	}
	}


	public function page10LoadData() {
	$chk= DB::table('pat_section_ten')->where('user_id',Auth::user()->id)->select('*')->get();
	if ($chk !=='[]') {
	return response()->json(['success' => 'not_found'], 200);
	} else {
	return response()->json(['success' => $chk], 200);
	}
	}

	public function page11LoadData() {
		$chk= DB::table('pat_section_eleven')->where('user_id',Auth::user()->id)->select('*')->get();
		
		if ($chk !=='[]') {
			return response()->json(['success' => 'not_found'], 200);
		} else {
			return response()->json(['success' => $chk], 200);
		}
	}

	public function page12LoadData() {
	$chk=Pat_section_twelve::where('user_id',Auth::user()->id)->get();
	if ($chk !=='[]') {
	return response()->json(['success' => 'not_found'], 200);
	} else {
	return response()->json(['success' => $chk], 200);
	}
	}

	public function page13LoadData() {
	$chk=Pat_section_thirteen::where('user_id',Auth::user()->id)->get();
	if ($chk !=='[]') {
	return response()->json(['success' => 'not_found'], 200);
	} else {
	return response()->json(['success' => $chk], 200);
	}
	}


	public function page14LoadData() {
	$chk=Pat_section_fourteen::where('user_id',Auth::user()->id)->get();
	if ($chk !=='[]') {
	return response()->json(['success' => 'not_found'], 200);
	} else {
	return response()->json(['success' => $chk], 200);
	}
	}


	public function page15LoadData() {
	$chk= DB::table('pat_section_fifteen')->where('user_id',Auth::user()->id)->select('*')->get();
	if ($chk !=='[]') {
	return response()->json(['success' => 'not_found'], 200);
	} else {
	return response()->json(['success' => $chk], 200);
	}
	}


	public function page16LoadData() {
	$chk= DB::table('pat_section_sixteen')->where('user_id',Auth::user()->id)->select('*')->get();
	if ($chk !=='[]') {
	return response()->json(['success' => 'not_found'], 200);
	} else {
	return response()->json(['success' => $chk], 200);
	}
	}

	//============================================Nure Section Post =============================================

	public function nurse1(Request $request)
			{
				
	$data= array( 
		'date' => $request->date,
		'procedure1' => $request->procedure,
		'referred_by' => $request->referred_by,

		'user_id'=> Auth::user()->id);


	
	$chk=Nurse_section_one::where('user_id',Auth::user()->id)->get();



	if ($chk=='[]') {



	$one = Nurse_section_one::Create($data);

	} else {

	$one = Nurse_section_one::where('user_id', Auth::user()->id)->delete();
	$one = Nurse_section_one::create($data);

	}
	return response()->json(['success' => $chk], 200);
			
	}

	public function nurse3(Request $request)   {
				
	$data= array( 
		'who_is_completing_this_form' => $request->who_is_completing_this_form,
		'patient_accompanied_by' => $request->patient_accompanied_by,
		'lmwh' => $request->lmwh,
		'administration' => $request->administration,
		'explained' => $request->explained,
		'understanding' => $request->understanding,
		'user_id'=> Auth::user()->id);

	$chk=Nurse_section_three::where('user_id',Auth::user()->id)->get();
	if ($chk=='[]') {
	$one = Nurse_section_three::Create($data);
	} else {
	$one = Nurse_section_three::where('user_id', Auth::user()->id)->delete();
	$one = Nurse_section_three::create($data);
	}
	return response()->json(['success' => $chk], 200);
	}




	public function nurse5(Request $request)   {
				
		$nurse_five= array( 
			'month_year' => $request->month_year,
			'year' => $request->year,

			'procedure' => $request->procedure,
			'date_of_procedure' => $request->date_of_procedure,
			'indication_for_anticoagulation' => $request->indication_for_anticoagulation,
			'chads_score_and_distribution' => $request->chads_score_and_distribution,
			
			'poc_inr_date' => $request->poc_inr_date,
			'poc_inr_text' => $request->poc_inr_text,
			'poc_creat_date' => $request->poc_creat_date,
			'poc_creat_text' => $request->poc_creat_text,
			'hb_date' => $request->hb_date,
			'hb_text' => $request->hb_text,
			'plt_date' => $request->plt_date,
			'plt_text' => $request->plt_text,
			
			'details_on_recomemendation' => $request->details_on_recomemendation,
			'reviewed_by' => $request->reviewed_by,
			'user_id'=> Auth::user()->id);

		$pat_two= array( 
			'age' => $request->age,
			'gender' => $request->gender,
			'weight' => $request->weight,

			'user_id'=> Auth::user()->id);

		$pat_sixteen= array( 
			'type_of_procedure' => $request->procedure,
			'date_of_procedure' => $request->date_of_procedure,

			'user_id'=> Auth::user()->id);

		$nurse_three= array( 
			'understanding' => $request->understanding,
			'who_is_completing_this_form' => $request->who_is_completing_this_form,

			'user_id'=> Auth::user()->id);

		$chk = Nurse_section_five::where('user_id', Auth::user()->id)->get();



		if ($chk=='[]') {
			$one = Nurse_section_five::Create($nurse_five);
			$one = Pat_section_two::where('user_id', Auth::user()->id)->update($pat_two);
			$one = Pat_section_sixteen::where('user_id', Auth::user()->id)->update($pat_sixteen);
			$one = Nurse_section_three::where('user_id', Auth::user()->id)->update($nurse_three);
			
			return response()->json(['success' => $chk], 200);
		} 
		else {
			$one = Nurse_section_five::where('user_id', Auth::user()->id)->delete();
			$one = Nurse_section_five::create($nurse_five);
			$one = Pat_section_two::where('user_id', Auth::user()->id)->update($pat_two);
			$one = Pat_section_sixteen::where('user_id', Auth::user()->id)->update($pat_sixteen);
			$one = Nurse_section_three::where('user_id', Auth::user()->id)->update($nurse_three);
			
			return response()->json(['success' => $chk], 200);
		}    
	}


	public function nurse6(Request $request)   {
				
	$nurse_five= array( 
		'month_year' => $request->month_year,
		'indication_for_anticoagulation' => $request->indication_for_anticoagulation,
		'chads_score_and_distribution' => $request->chads_score_and_distribution,
		
		'poc_inr_date' => $request->poc_inr_date,
		'poc_inr_text' => $request->poc_inr_text,
		'poc_creat_date' => $request->poc_creat_date,
		'poc_creat_text' => $request->poc_creat_text,
		'hb_date' => $request->hb_date,
		'hb_text' => $request->hb_text,
		'plt_date' => $request->plt_date,
		'plt_text' => $request->plt_text,

		'details_on_recomemendation' => $request->details_on_recomemendation,
		'reviewed_by' => $request->reviewed_by,
		'user_id'=> Auth::user()->id);

	$pat_two= array( 
		'age' => $request->age,
		'gender' => $request->gender,
		'weight' => $request->weight,

		'user_id'=> Auth::user()->id);

	$pat_sixteen= array( 
		'procedure' => $request->procedure,
		'date_of_procedure' => $request->date_of_procedure,

		'user_id'=> Auth::user()->id);

	$nurse_three= array( 
		'understanding' => $request->understanding,
		'who_is_completing_this_form' => $request->who_is_completing_this_form,

		'user_id'=> Auth::user()->id);

	$chk=Nurse_section_five::where('user_id',Auth::user()->id)->get();



	if ($chk=='[]') {



	$one = Nurse_section_five::Create($data);
	$one = Pat_section_two::where('user_id', Auth::user()->id)->update($pat_two);
	$one = Pat_section_sixteen::where('user_id', Auth::user()->id)->update($pat_sixteen);
	$one = Nurse_section_three::where('user_id', Auth::user()->id)->update($nurse_three);
	return response()->json(['success' => $chk], 200);
	} else {

	$one = Nurse_section_three::where('user_id', Auth::user()->id)->delete();
	$one = Nurse_section_three::create($data);
	$one = Pat_section_two::where('user_id', Auth::user()->id)->update($pat_two);
	$one = Pat_section_sixteen::where('user_id', Auth::user()->id)->update($pat_sixteen);
	$one = Nurse_section_three::where('user_id', Auth::user()->id)->update($nurse_three);
	return response()->json(['success' => $chk], 200);
	}

			
	}


	public function nurse8(Request $request)
	{	
		$data = array( 
			'who_is_completing_this_form' => $request->who_is_completing_this_form,
			'patient_accompanied_by' => $request->patient_accompanied_by,
			'lmwh' => $request->lmwh,
			'administration' => $request->administration,
			'understanding' => $request->understanding,
			'user_id'=> Auth::user()->id
		);

		$chk=Nurse_section_three::where('user_id',Auth::user()->id)->get();

		if ($chk=='[]') {
			$one = Nurse_section_three::Create($data);
		} else {
			$one = Nurse_section_three::where('user_id', Auth::user()->id)->delete();
			$one = Nurse_section_three::create($data);
		}

		return response()->json(['success' => $chk], 200);		
	}

	//==========================================Nurse section Load data===============================================\


	public function nursePage1LoadData() {
	//$chk=Pat_section_two::where('user_id',Auth::user()->id)->get();

	//  $chk= DB::table('nurse_section_one')->where('user_id',Auth::user()->id)->select('*')->get();

		$chk = DB::table('nurse_section_one')->where('nurse_section_one.user_id',Auth::user()->id)
			->leftJoin('nurse_section_five', 'nurse_section_one.user_id', '=', 'nurse_section_five.user_id')
			->leftJoin('pat_section_two', 'nurse_section_one.user_id', '=', 'pat_section_two.user_id')
			->select('*')
			->get();

	return response()->json(['success' => $chk], 200);
	}


	public function nursePage6LoadData() {
	//$chk=Pat_section_two::where('user_id',Auth::user()->id)->get();

		$chk = DB::table('nurse_section_five')
					->where('nurse_section_five.user_id', Auth::user()->id)
					->Join('pat_section_sixteen', 'nurse_section_five.user_id', '=', 'pat_section_sixteen.user_id')
					->Join('nurse_section_three', 'nurse_section_five.user_id', '=', 'nurse_section_three.user_id')
					->Join('pat_section_two', 'nurse_section_five.user_id', '=', 'pat_section_two.user_id')
					->select('*')
					->get();

	/*
		$chk= DB::table('pat_section_two')
		->where('pat_section_two.user_id',Auth::user()->id)
			->Join('pat_section_sixteen', 'pat_section_two.user_id', '=', 'pat_section_sixteen.user_id')
			->Join('nurse_section_three', 'pat_section_two.user_id', '=', 'nurse_section_three.user_id')
					->Join('nurse_section_five', 'pat_section_two.user_id', '=', 'nurse_section_five.user_id')
			->select('*')
			->get();
			*/

		return response()->json(['success' => $chk], 200);
	}


	public function nursePage5LoadData() {


		$chk= DB::table('pat_section_two')
		->where('pat_section_two.user_id',Auth::user()->id)
		->leftJoin('pat_section_sixteen', 'pat_section_two.user_id', '=', 'pat_section_sixteen.user_id')
		->leftJoin('pat_section_seven', 'pat_section_two.user_id', '=', 'pat_section_seven.user_id')
		->leftJoin('nurse_section_three', 'pat_section_two.user_id', '=', 'nurse_section_three.user_id')
		->leftJoin('nurse_section_five', 'pat_section_two.user_id', '=', 'nurse_section_five.user_id')
		->leftJoin('pat_section_eleven', 'pat_section_two.user_id', '=', 'pat_section_eleven.user_id')
		->leftJoin('pat_section_ten', 'pat_section_two.user_id', '=', 'pat_section_ten.user_id')
		->leftJoin('pat_section_twelve', 'pat_section_two.user_id', '=', 'pat_section_twelve.user_id')    
		->leftJoin('pat_section_thirteen', 'pat_section_two.user_id', '=', 'pat_section_thirteen.user_id')  
		->leftJoin('pat_section_eight', 'pat_section_two.user_id', '=', 'pat_section_eight.user_id')  
							
		->select('nurse_section_five.poc_inr_date',
		'nurse_section_five.poc_inr_text',
		'nurse_section_five.poc_creat_date',
		'nurse_section_five.poc_creat_text',
		'nurse_section_five.hb_date',
		'nurse_section_five.hb_text',
		'nurse_section_five.plt_date',
		'nurse_section_five.plt_text',

		'nurse_section_five.details_on_recomemendation',
		'nurse_section_five.chads_score_and_distribution',
		'nurse_section_five.indication_for_anticoagulation',
		'nurse_section_five.date_of_procedure',
		'nurse_section_five.procedure',
		'nurse_section_five.year',

		'pat_section_seven.cognitive_heart_failure',
		'pat_section_seven.high_blood_pressure',
		'pat_section_seven.diabetes',
		'pat_section_seven.stroke_or_mini_stroke',

		'pat_section_two.gender',
		'pat_section_two.weight_unit',
		'pat_section_two.physicianName',
		'pat_section_two.patient_id',
		'pat_section_two.weight',
		'pat_section_two.age',

		'pat_section_sixteen.type_of_procedure',
		'pat_section_sixteen.date_of_procedure',

		'nurse_section_three.understanding',
		'nurse_section_three.administration',
		'nurse_section_three.lmwh',
		'nurse_section_three.patient_accompanied_by',
		'nurse_section_three.who_is_completing_this_form',

		'pat_section_eleven.aspirin',
		'pat_section_eleven.aspirin_dosage',
		'pat_section_eleven.aspirin_dosage_time',
		'pat_section_eleven.plavix',
		'pat_section_eleven.plavix_dosage',
		'pat_section_eleven.plavix_dosage_time',
		'pat_section_eleven.brillinta',
		'pat_section_eleven.brillinta_dosage',
		'pat_section_eleven.brillinta_dosage_timie',
		'pat_section_eleven.effient',
		'pat_section_eleven.effient_dosage',
		'pat_section_eleven.effient_dosage_time',
		'pat_section_eleven.not_using_drugs',

		'pat_section_thirteen.ulcer_in_stomach_or_bowel',
		'pat_section_thirteen.bleeding_requiring_treatment_last_three_months',
		'pat_section_thirteen.ulcer_in_stomach_or_bowel_last_three_months',
		'pat_section_thirteen.had_transfusion_in_last_three_months_when',

		DB::raw('DATE_FORMAT(pat_section_thirteen.had_transfusion_in_last_three_months_when, "%m-%d-%Y") as had_transfusion_in_last_three_months_when'),
		'pat_section_thirteen.had_transfusion_in_last_three_months',
		'pat_section_thirteen.liver_disease',

		'pat_section_twelve.lab_location_for_inr_test',

		'pat_section_eight.pradaxa',
		'pat_section_eight.pradaxa_dosage',
		'pat_section_eight.xarelto',
		'pat_section_eight.xarelto_dosage',
		'pat_section_eight.xarelto_dosage_time',
		'pat_section_eight.eliquis',
		'pat_section_eight.eliquis_dosage',
		'pat_section_eight.eliquis_dosage_time',
		'pat_section_eight.edoxabon',
		'pat_section_eight.edoxabon_dosage',
		'pat_section_eight.edoxabon_dosage_time'
		)->get();

		$data= DB::table('pat_section_four')
		->where('pat_section_four.user_id', Auth::user()->id)->get();

		$indication_for_Anticoagulation='';
		foreach ($data[0] as $key => $value) {
			if ($value === 'Yes') 
			$indication_for_Anticoagulation = $indication_for_Anticoagulation.$key.', ';
		}

		$chk['anticoagulation'] = $data[0];

		return response()->json(['success' => $chk], 200);
	}




	public function nursePage8LoadData() {	
		$chk = DB::table('nurse_section_eight')
					->where('user_id',Auth::user()->id)
					->select('*')
					->get();


		return response()->json(['success' => 'Ok'], 200);
	}

	public function nursePage3LoadData() {
		$chk= DB::table('nurse_section_three')->where('user_id', Auth::user()->id)->select('*')->get();
		return response()->json(['success' => $chk], 200);
	}


	public function medicationAlgoDetails() {

		$chk = DB::table('pat_section_six')->where('pat_section_six.user_id',Auth::user()->id)
			->leftJoin('pat_section_four', 'pat_section_six.user_id', '=', 'pat_section_four.user_id')
			->leftJoin('pat_section_two', 'pat_section_six.user_id', '=', 'pat_section_two.user_id')
			->leftJoin('nurse_section_five', 'pat_section_six.user_id', '=', 'nurse_section_five.user_id')
			->leftJoin('pat_section_seven', 'pat_section_six.user_id', '=', 'pat_section_seven.user_id')
			->leftJoin('pat_section_sixteen', 'pat_section_six.user_id', '=', 'pat_section_sixteen.user_id')
			->leftJoin('pat_section_fourteen', 'pat_section_six.user_id', '=', 'pat_section_fourteen.user_id')
			->leftJoin('pat_section_thirteen', 'pat_section_six.user_id', '=', 'pat_section_thirteen.user_id')
			->select(
				'nurse_section_five.chads_score_and_distribution',
				'nurse_section_five.poc_inr_text',
				'nurse_section_five.poc_creat_text',
				'nurse_section_five.procedure',

				'pat_section_sixteen.date_of_procedure',

				'pat_section_seven.stroke_or_mini_stroke',
				'pat_section_seven.stroke_how_long',
				'pat_section_seven.mitral_stenosis',
				
				'pat_section_six.mechanical_heart_valve',
				'pat_section_six.tissue_heart_valve',
				'pat_section_six.mechanical_heart_valve_Is_the_valve_bileaflet',
				'pat_section_six.mechanical_heart_valve_Is_the_valve_ball_and_cage',
				'pat_section_six.mechanical_heart_valve_Is_the_valve_tilting_disc',
				'pat_section_six.mechanical_heart_valve_Is_the_valve_dont_know',
				'pat_section_six.location_aortic',
				'pat_section_six.location_mitral',

				'pat_section_two.age',
				'pat_section_two.weight',
				'pat_section_two.weight_unit',
				'pat_section_two.gender',

				'pat_section_four.venous_thromboelism',
				'pat_section_four.dvt',
				'pat_section_four.dvt_how_long_ago',
				'pat_section_four.pe',
				'pat_section_four.pe_dvt_how_long_ago',
				'pat_section_four.atrial_fibrillation_of_flutter',

				'pat_section_fourteen.antiphospholipid_antibody_syndrome',

				'pat_section_thirteen.bleeding_requiring_treatment',
				'pat_section_thirteen.bleeding_requiring_treatment_last_three_months',
				'pat_section_thirteen.bleeding_from_stomach',
				'pat_section_thirteen.bleeding_from_stomach_last_three_months'
			)
			->get();

		if ($chk == '[]') {
			return response()->json(['success' => 'not_found'], 200);
		} else {
			return response()->json(['success' => $chk], 200);
		}
	}

	public function medicationDrugDetails() {

		$chk = DB::table('pat_section_eight')->where('pat_section_eight.user_id', Auth::user()->id)
			->leftJoin('pat_section_ten', 'pat_section_eight.user_id', '=', 'pat_section_ten.user_id')
			->select(
				'pat_section_eight.pradaxa',
				'pat_section_eight.pradaxa_dosage',
				'pat_section_eight.Xarelto',
				'pat_section_eight.xarelto_dosage',
				'pat_section_eight.xarelto_dosage_time',
				'pat_section_eight.eliquis',
				'pat_section_eight.eliquis_dosage',
				'pat_section_eight.eliquis_dosage_time',
				'pat_section_eight.edoxabon',
				'pat_section_eight.edoxabon_dosage',
				'pat_section_eight.edoxabon_dosage_time',

				'pat_section_ten.coumadin',
				'pat_section_ten.coumadin_monday',
				'pat_section_ten.coumadin_tuesday',
				'pat_section_ten.coumadin_wednesday',
				'pat_section_ten.coumadin_thursday',
				'pat_section_ten.coumadin_friday',
				'pat_section_ten.coumadin_saturday',
				'pat_section_ten.coumadin_sunday',
				'pat_section_ten.sintrom',
				'pat_section_ten.sintrom_monday',
				'pat_section_ten.sintrom_tuesday',
				'pat_section_ten.sintrom_wednesday',
				'pat_section_ten.sintrom_thursday',
				'pat_section_ten.sintrom_friday',
				'pat_section_ten.sintrom_saturday',
				'pat_section_ten.sintrom_sunday'
			)
			->get();

		if ($chk == '[]') {
			return response()->json(['success' => 'not_found'], 200);
		} else {
			return response()->json(['success' => $chk], 200);
		}
	}

	
	public function saveMedicationJsonData(Request $request) {
		$data = array( 
			'jsonTable' => $request->jsonTable,
			'user_id'=> Auth::user()->id
		);

		$chk=MedicationJsonData::where('user_id', Auth::user()->id)->get();

		if ($chk=='[]') {
			$chk = MedicationJsonData::Create($data);
		} else {
			$chk = MedicationJsonData::where('user_id', Auth::user()->id)->delete();
			$chk = MedicationJsonData::create($data);
		}

		return response()->json(['success' => $chk], 200);	
	}

	public function getMedicationJsonData() {
		$chk = DB::table('medicationJsonData')->where('medicationJsonData.user_id', Auth::user()->id)
			->select(
				'medicationJsonData.jsonTable'
			)
			->get();

		if ($chk == '[]') {
			return response()->json(['success' => 'not_found'], 200);
		} else {
			return response()->json(['success' => $chk], 200);
		}
	}
}




