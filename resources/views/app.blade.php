<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>
    {{env("APP_NAME")}}
  </title>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/@vime/core@^5/themes/default.css"
  />
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/@vime/core@^5/themes/light.css"
  />
@if(env("MIX_BUILD", true))
    <link href="{{mix("css/app.css")}}" rel="stylesheet">
  @endif
</head>
<body>
<main id="root"></main>
@if(! env("MIX_BUILD", true))
  <link href="{{env("APP_URL")}}:3000/node_modules/@fontsource/roboto/index.css" rel="stylesheet">
  <script>
    var global = window;
  </script>
  <script type="module">
    import RefreshRuntime from "{{env("APP_URL")}}:3000/@react-refresh"
    RefreshRuntime.injectIntoGlobalHook(window)
    window.$RefreshReg$ = () => {}
    window.$RefreshSig$ = () => (type) => type
    window.__vite_plugin_react_preamble_installed__ = true
  </script>
  <script type="module" src="{{env("APP_URL")}}:3000/@vite/client"></script>
  <script type="module" src="{{env("APP_URL")}}:3000/views/loader.tsx"></script>
@else
  <script src="{{mix("js/app.js")}}"></script>
@endif

</body>
</html>
