<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Pat_section_five extends Model
{
    protected $fillable = [
      'sec_five_id',  'procedure', 'date_of_procedure', 'age', 'sex','weight',
      'indication_for_anticoagulation', 'chads_score_and_distribution',
      'poc_inr','poc_creat','hb','plt','details_on_recomemendation','user_id'
    ];


  public $table = "pat_section_five";
}
