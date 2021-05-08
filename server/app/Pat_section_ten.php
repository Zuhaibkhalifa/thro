<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Pat_section_eight extends Model
{
  protected $fillable = [
    'sec_ten_id ', 'user_id', 
    'coumadin', 
    'coumadin_monday', 'coumadin_tuesday', 'coumadin_wednesday', 
    'coumadin_thursday', 'coumadin_friday', 'coumadin_saturday', 'coumadin_sunday', 
    'sintrom', 
    'sintrom_monday', 'sintrom_tuesday', 'sintrom_wednesday', 'sintrom_thursday', 
    'sintrom_friday', 'sintrom_saturday', 'sintrom_sunday'
  ];

  public $timestamps = false;
  public $table = "pat_section_ten";
}
