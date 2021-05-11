<?php

namespace App\Console\Commands;

use App\Constants\AppRole;
use App\Models\Grade;
use App\Models\Quiz;
use App\Models\QuizAnswer;
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

  public function __construct()
  {
    parent::__construct();
  }

  private $modelStacks = [
    QuizAnswer::class,
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
    Video::factory()
      ->count($c)
      ->create([
      "grade_id"=>$grade->id
    ]);
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
