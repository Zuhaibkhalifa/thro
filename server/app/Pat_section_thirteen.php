<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Pat_section_thirteen extends Model
{
  protected $fillable = [
    'sec_thirteen_id',  
    'bleeding_requiring_treatment',
    'bleeding_requiring_treatment_last_three_months', 
    
    'bleeding_from_stomach', 
    'bleeding_from_stomach_last_three_months', 
      
    'ulcer_in_stomach_or_bowel',
    'ulcer_in_stomach_or_bowel_last_three_months', 
    
    'liver_disease',
    'kidney_disease', 
    'not_sure', 
    
    'had_transfusion_in_last_three_months', 
    'had_transfusion_in_last_three_months_when', 
    'user_id', 
  ];

  public $timestamps = false;
  public $table = "pat_section_thirteen";
}
