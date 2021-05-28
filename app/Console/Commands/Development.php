<?php

namespace App\Console\Commands;

use App\Constants\AppRole;
use App\Models\Grade;
use App\Models\Quiz;
use App\Models\QuizAnswer;
use App\Models\QuizMetadata;
use App\Models\StudentGrade;
use App\Models\User;
use App\Models\Video;
use Faker\Factory;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Schema;

class Development extends Command
{
  protected $signature = 'dev';
  protected $description = '';
  private User $user;
  private \Faker\Generator $faker;

  public function __construct()
  {
    parent::__construct();
    $this->faker = Factory::create();
  }

  private $modelStacks = [
    QuizAnswer::class,
    QuizMetadata::class,
    Quiz::class,
    Video::class,
    StudentGrade::class,
    Grade::class,
    User::class,
  ];

  public function resetDb(){
    $this->info("resetting database");
    AppRole::register();
    Schema::disableForeignKeyConstraints();
    foreach ($this->modelStacks as $modelStack){
      $modelStack::query()->truncate();
    }
    Schema::enableForeignKeyConstraints();
  }

  public function makeUser(string $email, string $role, bool $isActive = false){
    $user = User::factory()->create([
      "email"=> $email,
      'active'=>$isActive
    ]);
    $user->assignRole($role);
    $this->info("user ". $user->email . " has been created ");
    return $user;
  }

  public function makeVideos(Grade $grade){
    $c = Factory::create()->numberBetween(1,5);
    /**
     * @var Video $video
     */
    $video = Video::factory()
      ->count($c)
      ->create([
        "grade_id"=>$grade->id
      ])->each(function (Video $video){
        for ($i = 0; $i < 10; $i++){
          $metadata = [
            "question"=> $this->faker->text(100),
            "answer"=>$this->faker->randomElement([0,1,2,3])
          ];
          $isImage = $i % 3 === 0;

          $quiz = Quiz::create([
            "video_id"=>$video->id,
            "meta_data"=>json_encode($metadata),
            "show_at"=>$this->faker->numberBetween(1, $video->duration),
            "type"=>"MULTIPLE_CHOICE",
          ]);
          if ($isImage){
            $quiz->addAdditionalImage(public_path() . "/quiz.jpg");
          }
          $quizInfos[] = [];
          $metas = [];
          for ($j = 0; $j < 4; $j++){
            $quizMeta = [
              "index"=>$j,
            ];
            if (!$isImage){
              $quizMeta['text'] = $this->faker->text(30);
            }
            $quizInfos[] = $quizMeta;
            $metas[] = QuizMetadata::create([
              "quiz_id"=>$quiz->id,
              "meta_data"=>json_encode($quizMeta)
            ]);
          }
          if ($isImage)
          foreach ($metas as $index=>$meta){
            $meta->addOptionImage(public_path() . "/option-". $index .".jpg");
          }
        }
      });
  }

  public function handle()
  {
    $this->resetDb();
    $admin = $this->makeUser(env("DEV_EMAIL", "admin@app.com"), AppRole::ADMIN, true);
    Grade::factory()->count(5)->create()->each(function (Grade $grade){
      User::factory()->count(20)->create()->each(function (User $user) use ($grade){
        $user->assignRole(AppRole::SUBSCRIBER);
        StudentGrade::create([
          "user_id"=>$user->id,
          "grade_id"=>$grade->id,
        ]);
      });
      $this->makeVideos($grade);
    });
    return 1;
  }
}
