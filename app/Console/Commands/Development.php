<?php

namespace App\Console\Commands;

use App\Constants\AppRole;
use App\Models\Quiz;
use App\Models\QuizAnswer;
use App\Models\User;
use App\Models\Video;
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
  }

  public function makeVideos(){
    $count = 3;
    $this->info("making ". $count . " video");
    Video::factory()->count(3)->create();
  }

  public function handle()
  {
    $this->resetDb();
    $this->makeUser(env("DEV_EMAIL", "laravel@laravel.dev"), AppRole::ADMIN, true);
    User::factory()->count(5)->create([
      'password'=>env("APP_KEY")
    ])->each(function (User $user){
      return $user->assignRole(AppRole::SUBSCRIBER);
    });
    $this->makeVideos();
    return 1;
  }
}
