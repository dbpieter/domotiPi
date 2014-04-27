<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>PiControl | Login</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Loading Bootstrap -->
    <link href="assets/css/alt/yetibootstrap.min.css" rel="stylesheet">

    <!-- Loading switch css -->
    <link href="assets/css/bootstrap-switch.min.css" rel="stylesheet">

    <!-- Loading custom CSS -->
    <link href="assets/css/interface.css" rel="stylesheet">

    <!-- favicon -->
    <link rel="shortcut icon" href="favicon.ico">

    <!-- HTML5 shim, for IE6-8 support of HTML5 elements. All other JS at the end of file. -->
    <!--[if lt IE 9]>
      <script src="js/html5shiv.js"></script>
      <script src="js/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-sm-8 col-md-6 col-sm-offset-2 col-md-offset-3">
      		{{ Form::open(array('url' => 'login', 'id' => 'loginForm')) }}
      			<fieldset>
      				<legend>PiControl / Sign in</legend>
              <div class="form-errors">
                @if($errors->has('email'))
                  <div class="alert alert-danger">{{ $errors->first('email') }}</div>
                @endif
                @if($errors->has('password'))
                  <div class="alert alert-danger">{{ $errors->first('password') }}</div>
                @endif
                @if(Session::has('error'))
                  <div class="alert alert-danger">{{ Session::get('error') }}</div>
                @endif
              </div>
      				<div class="form-group">
                {{ Form::label('email', 'Email Address') }}
                {{ Form::text('email', Input::old('email'), array('class' => 'form-control input-lg')) }}
      				</div>
      				<div class="form-group">
                {{ Form::label('password', 'Password') }}
			          {{ Form::password('password', array('class' => 'form-control input-lg')) }}
      				</div>
              <div class="form-group">
                <label>{{ Form::checkbox('rememberme', 'rememberme') }} Remember me</label>
              </div>
              {{ Form::submit('Sign in', array('class' => 'btn btn-info')) }}
      			</fieldset>
      		{{ Form::close() }}
      	</div>
      </div>
    </div>

    <!-- Load JS here for greater good =============================-->
    <script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
    <script src="assets/js/bootstrap.min.js"></script>
    <script src="assets/js/bootstrap-switch.min.js"></script>
  </body>
</html>
