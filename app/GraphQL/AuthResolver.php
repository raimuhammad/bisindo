<?php


namespace App\GraphQL;


//use App\Models\PasswordReset;
use App\Models\User;
//use App\Notifications\PasswordResetNotification;
use Faker\Factory;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;

class AuthResolver
{
  public function login($_, array $args) : bool {
    $credential = Arr::except($args, ['directive']);
    $guard = auth()->guard();
    $check = $guard->attempt($credential);
    if ($check){
      return auth()->user()->active;
    }
    return false;
  }

  public function register($_, array $args) : bool {
    $inputs = \Arr::except($args, ['password_confirmation', 'directive']);
    $inputs['password'] = Hash::make($args['password']);
    User::create($inputs);
    return true;
  }
  public function logout($_, array $__):bool{
    $user = auth()->user();
    if ($user){
      auth()->logout();
      return true;
    }
    return false;
  }

//  public function generateToken(){
//    $faker = Factory::create();
//    $str = $faker->regexify('[A-Z0-9._%+-][A-Z0-9.-][A-Z]{5,3}');
//    $check = PasswordReset::whereToken($str)->count();
//    if ($check) return $this->generateToken();
//    return $str;
//  }
//
//  public function resetPassword($_, array $args){
//    $user = User::whereEmail($args['email'])->first();
//    $token = $this->generateToken();
//    PasswordReset::where("email", $args['email'])->delete();
//    PasswordReset::create([
//      "email"=>$user->email,
//      "token"=>$token
//    ]);
//    $user->notifyNow(new PasswordResetNotification($user, $token));
//    return true;
//  }
//
//  public function passwordResetCallback($_, array $args){
//    $where = [
//      "email"=>$args['email'],
//      "token"=>$args['code']
//    ];
//    /**
//     * @var PasswordReset $find
//     */
//    $find = PasswordReset::where($where)->first();
//    if ($find->is_expire){
//      $find->delete();
//      return false;
//    }
//    $user = User::whereEmail($args['email'])->first();
//    $user->password = Hash::make($args['password']);
//    $user->save();
//    $find->delete();
//    return true;
//  }
}
