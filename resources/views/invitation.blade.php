@component('mail::message')
Hallo, {{$user->name}} anda telah di daftarkan untuk menjadi anggota {{env("APP_NAME")}} silahkan klik tombol di bawah ini untuk login & mengganti password anda
@component('mail::button', ['url' => url("?invitation=".$user->invitation)])
Ganti password
@endcomponent
<p style="font-weight: bolder;text-align: center">Kode invitasi : {{$user->invitation}}</p>
<p>Link di atas tidak akan berlaku ketika anda telah mengganti password</p>
Thanks,<br>
{{ config('app.name') }}
@endcomponent
