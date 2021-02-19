<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class  Pat_section_eleven extends Model
{
    


       protected $fillable = [

      'sec_eleven_id ', 'aspirin ', 'aspirin_dosage', 'aspirin_dosage_time', 'plavix', 
  , 'plavix_dosage ', 'plavix_dosage_time', 'brillinta', 'brillinta_dosage', 
  , 'brillinta_dosage_timie ', 'effient_dosage', 'effient_dosage_time', 'not_using_druhs', 'user_id', 
  
    ];

public $timestamps = false;
  public $table = "pat_section_eleven";
}
