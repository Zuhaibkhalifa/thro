<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Pat_section_two extends Model
{
  protected $fillable = [
    'sec_two_id',  'age', 'weight', 'weight_unit', 'physicianName',
    'weightSelected','unit_weight', 'genderSelected','gender','user_id','patient_id'
  ];

  public $timestamps = false;
  public $table = "pat_section_two";
}
