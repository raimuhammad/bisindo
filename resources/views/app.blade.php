<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>
    {{env("APP_NAME")}}
  </title>
  <link rel="stylesheet" href="{{mix("css/app.css")}}">
</head>
<body>
<main id="root"></main>
@if(env("APP_DEBUG"))
  <script>
    var global = window;
  </script>
  <script type="module">
    import RefreshRuntime from "http://localhost:3000/@react-refresh"
    RefreshRuntime.injectIntoGlobalHook(window)
    window.$RefreshReg$ = () => {}
    window.$RefreshSig$ = () => (type) => type
    window.__vite_plugin_react_preamble_installed__ = true
  </script>
  <script type="module" src="http://localhost:3000/@vite/client"></script>
  <script type="module" src="http://localhost:3000/vitejs/entry.ts"></script>
@endif

</body>
</html>
