<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Nurse_section_five extends Model
{
    



   protected $fillable = [

      'sec_five_id',  'procedure', 'date_of_procedure', 'age',  'sex', 'weight', 'indication_for_anticoagulation'
      ,  'chads_score_and_distribution', 'poc_inr', 'poc_creat',  'hb', 'plt', 'details_on_recomemendation','user_id'

    ];

    public $timestamps = false;

  public $table = "nurse_section_five";

}
