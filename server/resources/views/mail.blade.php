<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email</title>
</head>
<body>
    <h1>Hello {{ $name }}!</h1>
    <h3>
        <strong>'Thrombo Link Account Verification Email.'</strong>
    </h3>
    <p>Please click the button below to verify your email address.<br>
    <a href="{{ $message->getSubject() }}">click me.</a>or
    visit : {{ $message->getSubject() }}
    <br>If you did not create an account, no further action is required.</p>
</body>
</html>
