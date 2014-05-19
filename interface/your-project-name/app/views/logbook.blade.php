@extends('master')

@section('content')
  <div id="logbook">

    <!-- the errors will show here -->
    <div id="errors"></div>
    <!-- end errors -->

    <div class="row">

      <div class="col-md-3">
        <!-- start tools -->
        <div id="tools">
          <ul class="list-group">
            <li class="list-group-item"><a href="#">Clear logbook</a></li>
          </ul>
        </div>
        <!-- end tools -->
      </div>

      <!-- start logbook -->
      <div class="col-md-9">
        <h3>Logbook</h3>
        <br />
        <div class="logbook-entries">

          <div class="logbook-entry">
            <div class="row">
              <div class="col-md-3">
                <div class="logbook-entry-time">
                  03/03/2014 17:03:10
                </div>
              </div>
              <div class="col-md-9">
                <div class="logbook-entry-action">
                  User "Hans" switched on Kitchen lights
                </div>
              </div>
            </div>
          </div>

          <hr>

          <div class="logbook-entry">
            <div class="row">
              <div class="col-md-3">
                <div class="logbook-entry-time">
                  03/03/2014 14:10:10
                </div>
              </div>
              <div class="col-md-9">
                <div class="logbook-entry-action">
                  Schedule "Vacation" switched on kitchen lights, toilet light and TV
                </div>
              </div>
            </div>
          </div>

          <hr>

          <div class="logbook-entry">
            <div class="row">
              <div class="col-md-3">
                <div class="logbook-entry-time">
                  03/03/2014 13:07:10
                </div>
              </div>
              <div class="col-md-9">
                <div class="logbook-entry-action">
                  User "Hans" switched on toilet light
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
@stop

@section('js')

@stop
