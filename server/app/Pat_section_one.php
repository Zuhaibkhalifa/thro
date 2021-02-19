<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Pat_section_one extends Model
{
    

    protected $fillable = [

      'pat_section_one  ',  'age', 'gender','weight ',  'weight_unit', 'doc_name', 'user_id','updated_at','created_at'

    ];

public $timestamps = false;
  public $table = "pat_section_one";
}
