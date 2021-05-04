<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Quiz extends Model
{
  use HasFactory, SoftDeletes;
  protected $guarded = ["id"];

  private function parseMetadata(string $key){
    $metadata = json_decode($this->meta_data, true);
    return $metadata[$key]??null;
  }
  /**
   * @attributes
   */
  public function getLettersAttribute(){
    return $this->parseMetadata("letters");
  }
  /**
   * @attributes
   */
  public function getWordAttribute(){
    return $this->parseMetadata("word");
  }
  /**
   * @attributes
   */
  public function getQuestionAttribute(){
    return $this->parseMetadata("question");
  }
  /**
   * @attributes
   */
  public function getOptionsAttribute(){
    return $this->parseMetadata("options");
  }
  /**
   * @attributes
   */
  public function getQuestionAnswerAttribute(){
    return $this->parseMetadata("question_answer");
  }
}
