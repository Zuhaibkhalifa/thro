<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Pat_section_three extends Model
{
    


       protected $fillable = [

      'sec_three_id',  'blood_clot_blood_thinner_interrupted','user_id', 
    ];

public $timestamps = false;
  public $table = "pat_section_three";
}
