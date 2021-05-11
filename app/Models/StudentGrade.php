<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentGrade extends Model
{
  use HasFactory;
  protected $guarded = ['id'];

  public function grade(){
    return $this->belongsTo(Grade::class);
  }
  public function student(){
    return $this->belongsTo(User::class, 'user_id');
  }

}
