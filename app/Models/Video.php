<?php

namespace App\Models;

use FFMpeg\FFProbe;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\FileAdder;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Video extends Model implements HasMedia
{
  use HasFactory, InteractsWithMedia;

  protected $guarded = ["id"];

  public function registerMediaCollections(): void
  {
    $this->addMediaCollection('content')->singleFile();
    $this->addMediaCollection('description')->singleFile();
  }
  public function registerMediaConversions(Media $media = null): void
  {
    $this->addMediaConversion('thumbnail')
      ->extractVideoFrameAtSecond(1)
      ->performOnCollections("content");
  }

  /**
   * @utility
   * @param $fileOrUrl
   * @throws \Spatie\MediaLibrary\MediaCollections\Exceptions\FileCannotBeAdded
   * @throws \Spatie\MediaLibrary\MediaCollections\Exceptions\FileDoesNotExist
   * @throws \Spatie\MediaLibrary\MediaCollections\Exceptions\FileIsTooBig
   */
  private function attachMedia($fileOrUrl, string $collection = ""){
    /**
     * @var FileAdder $media
     */
    $media = null;
    if (is_string($fileOrUrl)){
      $media = $this->addMediaFromUrl($fileOrUrl);
    }else{
      $media = $this->addMedia($fileOrUrl);
    }
    $media
      ->preservingOriginal()
      ->toMediaCollection($collection);
  }
  /**
   * @utility
   */
  public function attachContent($fileOrUrl) : void {
    $this->attachMedia($fileOrUrl, 'content');
  }
  /**
   * @utility
   */
  public function attachDescription($fileOrUrl) : void {
    $file = UploadedFile::fake()->createWithContent("description.json",json_encode($fileOrUrl));
    $this->attachMedia($file, 'description');
  }
  /**
   * @attributes
   * @return string
   */
  public function getContentAttribute() : string {
    return $this->getFirstMediaUrl("content");
  }
  /**
   * @attributes
   * @return string
   */
  public function getThumbnailAttribute() : string {
    return $this->getFirstMediaUrl("content", 'thumbnail');
  }

  /**
   * @attributes
   */
  public function getDurationAttribute(){
    $probe = FFProbe::create();
    $video = $this->getFirstMedia('content');
    $dur = $probe->format($video->getPath())->get("duration");
    return (int) $dur;
  }
}
