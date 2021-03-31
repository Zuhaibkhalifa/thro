<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Pat_section_seven extends Model
{
  protected $fillable = [
    'sec_seven_id',  'cognitive_heart_failure', 'high_blood_pressure', 'diabetes', 'mitral_stenosis',
    'stroke_or_mini_stroke', 'not_sure', 'none_of_above', 'user_id',
  ];

public $timestamps = false;
  public $table = "pat_section_seven";
}
