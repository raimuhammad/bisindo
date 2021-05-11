<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class VideoMigrator extends Migration
{
  public function up()
  {
    Schema::create('videos', function (Blueprint $table) {
      $table->id();
      $table->unsignedBigInteger('grade_id');
      $table->string("title");
      $table->string("caption");
      $table->json("description");
      $table->timestamps();
    });
    \App\Shared\RelationHelper::AttachRelation('videos', ['grade_id']);
  }
  public function down()
  {
    Schema::dropIfExists('videos');
  }
}
