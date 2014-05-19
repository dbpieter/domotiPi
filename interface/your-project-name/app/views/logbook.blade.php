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
        <div id="logbook-entries">

        </div>
      </div>
    </div>

  </div>
@stop

@section('js')
  <script>

    var apiUrl = 'http://' + '192.168.0.163' + ':8080';

    var addLogEntryHTML = function(date, message) {
      var html = '<div class="logbook-entry">';
      html += '      <div class="row">';
      html += '        <div class="col-md-3">';
      html += '          <div class="logbook-entry-time">';
      html += date;
      html += '          </div>';
      html += '        </div>';
      html += '        <div class="col-md-9">';
      html += '          <div class="logbook-entry-action">';
      html += message;
      html += '          </div>';
      html += '        </div>';
      html += '      </div>';
      html += '    </div>';
      html += '    <hr>';
      $('#logbook-entries').prepend(html);
    }

    var loadLogs = function() {

      $.ajax({
        url: apiUrl + '/logs',
        type: 'GET',
        success: function(result) {
          $.each(result, function() {
            addLogEntryHTML(this['time'], this['message']);
          });
        }
      });
    }

    // var auto_refresh = setInterval(function() {
    //   $('#logbook-entries').html('');
    //   loadLogs();
    // }, 10000);

    $(document).ready(function() {
      loadLogs();
    });
  </script>
@stop
