<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Pat_section_sixteen extends Model
{
  protected $fillable = [
    'sec_thirteen_id',  'type_of_procedure', 'date_of_procedure',  'user_id', 
  ];

  public $timestamps = false;
  public $table = "pat_section_sixteen";
}
