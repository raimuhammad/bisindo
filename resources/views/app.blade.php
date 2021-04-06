<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
  <meta charset="utf-8">
  <meta name="app-name" content="{{env("APP_NAME")}}">
  <meta name="gapikey" content="{{env("GAPI")}}">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>
      {{env("APP_NAME")}}
  </title>
  <link rel="stylesheet" href="{{mix("css/app.css")}}">
</head>
<body>
<main id="app"></main>
</body>
<script src="https://apis.google.com/js/api.js"></script>
<script src="{{mix("js/app.js")}}"></script>
</html>
