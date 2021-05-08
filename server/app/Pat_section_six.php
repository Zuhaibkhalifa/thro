<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Pat_section_six extends Model
{
    protected $fillable = [
      'sec_six_id',  
      'mechanical_heart_valve',
      'tissue_heart_valve',
      'dont_know', 
      'mechanical_heart_valve_Is_the_valve_bileaflet',
      'mechanical_heart_valve_Is_the_valve_ball_and_cage',
      'mechanical_heart_valve_Is_the_valve_tilting_disc',
      'mechanical_heart_valve_Is_the_valve_dont_know',
      'location_aortic',
      'location_mitral',
      'location_other',
      'location_dont_know',
      'user_id'
    ];

public $timestamps = false;
  public $table = "pat_section_six";
}
