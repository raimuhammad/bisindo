<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\VideoGrade
 *
 * @method static \Illuminate\Database\Eloquent\Builder|VideoGrade newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|VideoGrade newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|VideoGrade query()
 * @mixin \Eloquent
 * @property int $id
 * @property int $video_id
 * @property int $grade_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|VideoGrade whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|VideoGrade whereGradeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|VideoGrade whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|VideoGrade whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|VideoGrade whereVideoId($value)
 */
class VideoGrade extends Model
{
	use HasFactory;
	protected $guarded = ['id'];
}
