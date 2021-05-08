<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Pat_section_four extends Model
{
  protected $fillable = [
    'sec_four_id',  'venous_thromboelism', 'dvt', 'dvt_how_long_ago', 'pe',  'pe_dvt_how_long_ago', 
    'atrial_fibrillation_of_flutter', 'heart_valve_replacement', 
    'blood_clot_in_heart', 'arterial_peripheral_thrombosis',
    'peripheral_arterial_disease', 'other', 'none', 
    'user_id', 
  ];

  public $timestamps = false;
  public $table = "patient_section_four";
}
