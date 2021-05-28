<?php

namespace App\Models;

use App\Utils\AttachMedia;
use App\Utils\DurationHelper;
use FFMpeg\FFProbe;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\FileAdder;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

/**
 * App\Models\Video
 *
 * @property int $id
 * @property int $grade_id
 * @property string $title
 * @property string $caption
 * @property int $duration
 * @property mixed $description
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read string $content
 * @property-read string $thumbnail
 * @property-read \App\Models\Grade $grade
 * @property-read \Spatie\MediaLibrary\MediaCollections\Models\Collections\MediaCollection|Media[] $media
 * @property-read int|null $media_count
 * @method static \Database\Factories\VideoFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|Video newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Video newQuery()
 * @method static \Illuminate\Database\Query\Builder|Video onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|Video query()
 * @method static \Illuminate\Database\Eloquent\Builder|Video whereCaption($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Video whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Video whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Video whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Video whereDuration($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Video whereGradeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Video whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Video whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Video whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|Video withTrashed()
 * @method static \Illuminate\Database\Query\Builder|Video withoutTrashed()
 * @mixin \Eloquent
 */
class Video extends Model implements HasMedia
{
  use HasFactory, InteractsWithMedia, SoftDeletes, AttachMedia;


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
   */
  public function grade(){
    return $this->belongsTo(Grade::class);
  }
  public function durationHelper() : int{
    $video = $this->getFirstMedia('content');
    $helper = new DurationHelper();
    return $helper->getVideoDuration($video->getPath());
  }
  /**
   * @utility
   */
  public function attachContent($fileOrUrl) : void {
    $this->attachMedia($fileOrUrl, 'content');
    $this->duration = $this->durationHelper();
    $this->save();
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
}
