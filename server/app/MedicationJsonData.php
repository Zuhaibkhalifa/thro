<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MedicationJsonData extends Model
{
  protected $fillable = [
    'id',  'jsonTable', 'user_id'
  ];

  public $timestamps = false;
  public $table = "medicationJsonData";
}
