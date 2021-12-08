<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StreamingController;


Route::get("stream/{fileId}.{extension}", [
  StreamingController::class, "streaming"
])->name("stream");
Route::view('/{path?}', "app" )->where([
  "path"=>".*"
])
  ->where('path', '^((?!@node_modules).)*$')
  ->where('path', '^((?!storage).)*$')
  ->where('path', '^((?!stream).)*$')
  ->where('path', '^((?!vendor).)*$');
