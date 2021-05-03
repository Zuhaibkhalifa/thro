<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Pat_section_eight extends Model
{
  protected $fillable = [
    'sec_eight_id',  
    'pradaxa', 'pradaxa_dosage', 
    'Xarelto', 'xarelto_dosage',  'xarelto_dosage_timr', 
    'eliquis', 'eliquis_dosage', 'eliquis_dosage_time', 
    'edoxabon', 'edoxabon_dosage', 'edoxabon_dosage_rime', 
    'user_id', 
  ];

  public $timestamps = false;
  public $table = "patient_section_eight";
}
