<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Pat_section_twelve extends Model
{
    


       protected $fillable = [

      'sec_twelve_id',  'lab_location_for_inr_test', 'user_id', 
    ];

public $timestamps = false;
  public $table = "pat_section_twelve";
}
