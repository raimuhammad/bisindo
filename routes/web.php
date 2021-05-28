<?php

use Illuminate\Support\Facades\Route;

Route::view('/{path?}', "app" )->where([
  "path"=>".*"
])
  ->where('path', '^((?!@node_modules).)*$')
  ->where('path', '^((?!storage).)*$')
  ->where('path', '^((?!vendor).)*$');
