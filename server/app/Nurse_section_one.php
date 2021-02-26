<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Nurse_section_one extends Model
{
    



   protected $fillable = [

      'section_one_id ',  'date', 'referred_by', 'procedure','cabg','user_id'

    ];

    public $timestamps = false;

  public $table = "nurse_section_one";

}
