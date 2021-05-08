<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Pat_section_nine extends Model
{
  protected $fillable = [
    'id',  
    'dalteparin', 'dalteparin_dosage', 'dalteparin_freq', 
    'enoxaparin', 'enoxaparin_dosage', 'enoxaparin_freq', 
    'tinzaparin', 'tinzaparin_dosage', 'tinzaparin_freq',
    'none',
    'user_id', 
  ];

  public $timestamps = false;
  public $table = "patient_section_nine";
}
