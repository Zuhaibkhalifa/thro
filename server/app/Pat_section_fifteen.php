<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Pat_section_fifteen extends Model
{
    


       protected $fillable = [

      'sec_thirteen_id     ',  'being_treated_cancer', 'cancer', 
      ,  'radiation', 'radiation_ongoing', 
      ,  'chemotherapy', 'chemotherapy_ongoing', 
      ,  'user_id', 'user_id', 
  
    ];


  public $table = "pat_section_fifteen";
}
