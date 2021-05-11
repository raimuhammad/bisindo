<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Grade extends Model
{
  use HasFactory;
  protected $guarded = ["id"];


  public function students(){
    return $this->hasMany(StudentGrade::class);
  }
  public function videos(){
    return $this->hasMany(Video::class);
  }

  public function getStudentCountAttribute(){
    return $this->students()->count();
  }
  public function getVideoCountAttribute(){
    return $this->videos()->count();
  }

}
