<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Pat_section_fourteen extends Model
{
    


       protected $fillable = [

      'sec_thirteen_id   ',  'cirrhosis_of_liver', 'antiphospholipid_antibody_syndrome', 
     'user_id', 
    ];

public $timestamps = false;
  public $table = "pat_section_fourteen";
}
