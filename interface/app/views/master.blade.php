<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>PiControl | {{{ $pageTitle }}}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="assets/css/alt/yetibootstrap.min.css" rel="stylesheet">
    <link href="assets/css/bootstrap-switch.min.css" rel="stylesheet">
    <link href="assets/css/interface.css" rel="stylesheet">
    <link rel="shortcut icon" href="favicon.ico">
    <!-- HTML5 shim, for IE6-8 support of HTML5 elements. All other JS at the end of file. -->
    <!--[if lt IE 9]>
      <script src="js/html5shiv.js"></script>
      <script src="js/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>
    <div class="container">

      <!-- Navigation bar -->
      <nav class="navbar navbar-inverse navbar-default" role="navigation">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar-collapse-01">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="{{ URL::to('overview') }}">PiControl</a>
        </div>
        <div class="collapse navbar-collapse" id="navbar-collapse-01">
          <ul class="nav navbar-nav">
            <li @if(Route::currentRouteName() == 'overview') class="active" @endif><a href="{{ URL::to('overview') }}"><i class="glyphicon glyphicon-th"></i> Overview</a></li>
            <li @if(Route::currentRouteName() == 'schedules') class="active" @endif><a href="{{ URL::to('schedules') }}"><i class="glyphicon glyphicon-calendar"></i> Schedules</a></li>
            <li @if(Route::currentRouteName() == 'logbook') class="active" @endif><a href="{{ URL::to('logbook') }}"><i class="glyphicon glyphicon-list-alt"></i> Logbook</a></li>
            <li @if(Route::currentRouteName() == 'settings') class="active" @endif><a href="{{ URL::to('settings') }}"><i class="glyphicon glyphicon-cog"></i> Settings</a></li>
           </ul>
           <ul class="nav navbar-nav navbar-right">
             <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="glyphicon glyphicon-user"></i> {{{ $username }}} <b class="caret"></b></a>
              <ul class="dropdown-menu">
                <li><a href="{{ URL::to('logout') }}">Logout</a></li>
              </ul>
            </li>
           </ul>
        </div>
      </nav>
      <!-- end navigation -->

      <!-- start content -->
      @yield('content')
      <!-- end content -->

    </div>


    <!-- Load JS here for greater good -->
    <script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
    <script src="assets/js/bootstrap.min.js"></script>
    <script src="assets/js/bootstrap-switch.min.js"></script>
    @yield('js')
  </body>
</html>
