<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Nurse_section_three extends Model
{
  protected $fillable = [
    'sec_three_id',  'who_is_completing_this_form', 'patient_accompanied_by', 
    'lmwh',  'administration', 'understanding',  'explained', 'user_id'
  ];

  public $timestamps = false;
  public $table = "nurse_section_three";

}
