<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuizAnswer extends Model
{
  use HasFactory;
  protected $guarded = ["id"];

  private function parseMetadata(string $key){
    $metadata = json_decode($this->meta_data, true);
    return $metadata[$key]??null;
  }
  /**
   * @attributes
   */
  public function getToAttribute(){
    return $this->parseMetadata("to");
  }
  /**
   * @attributes
   */
  public function getFromAttribute(){
    return $this->parseMetadata("from");
  }
  /**
   * @attributes
   */
  public function getItemsAttribute(){
    return $this->parseMetadata("items");
  }
  /**
   * @attributes
   */
  public function getSelectedAttribute(){
    return $this->parseMetadata("selected");
  }
}
