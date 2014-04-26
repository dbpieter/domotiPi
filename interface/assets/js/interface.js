var ipaddress = '10.129.17.17';

function addDevice(id, name, pin) {
  var html = '<div class="col-md-4">';
  html += '  <div class="device" data-id="' + id + '" data-pin="' + pin + '">';
  html += '    <div class="well well-sm">';
  html += '      <h4 class="title">' + name + '</h4>';
  html += '      <input class="switch" type="checkbox" /><br>';
  html += '      <p class="edit">';
  html += '        <a href="#" data-toggle="modal" data-target="#deviceSettings">Modify</a>';
  html += '      </p>';
  html += '    </div>';
  html += '  </div>';
  html += '</div>';
  $('#devices > .row').prepend(html);
}

function initDevices() {
  var link = "http://" + ipaddress + ":8080/devices";
  var jqxhr = $.ajax(link)
  .done(function(data) {
    for (var i = 0; i < data.length; i++) {
      addDevice(data[i].id, data[i].name, data[i].pinnumber);
    }
    initSwitches();
  })
  .fail(function() {
    showError('Oops. Could not connect to hardware.');
  })
}

function setInitState() {
  var link = "http://" + ipaddress + ":8080/pins";
  var devices = $('.device');
  var jqxhr = $.ajax(link)
  .done(function(data) {
    $.each($(devices), function(index) {
      var pin = $(this).attr('data-pin');
      for (var i = 0; i < data.length; i++) {
        if (data[i].pin == pin) {
          $(this).find('.switch').bootstrapSwitch('state', Boolean(data[i].enabled));
          break;
        }
      }
    });
  })
  .fail(function() {
      showError('Oops. Could not connect to hardware.');
  })
}

function turnPin(pin, state) {
  var link = "http://" + ipaddress + ":8080/pins/" + pin + "/";
  if (state) {
    link += "on";
  }
  else {
    link += "off";
  }
  // AJAX CALL
  var jqxhr = $.ajax(link)
  .done(function() {
    console.log('turnPin:' + pin + ' ' + state);
  })
  .fail(function() {
    showError('Could not switch on device on pin ' + pin + '.');
  })
}

function turnSwitches(state) {
  $.each($('.switch'), function(index) {
      $(this).bootstrapSwitch('state', state);
  });
}

function createAutoClosingAlert(selector, delay) {
    var alert = $(selector).alert();
    window.setTimeout(function() {
        alert.alert('close')
    }, delay);
}

function showError(msg) {
    var error = '<div class="alert alert-danger alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><strong><i class="glyphicon glyphicon-warning-sign"></i></strong> ' + msg + '</div>';
    $('#errors').append(error);
    createAutoClosingAlert('.alert', 5000);
}

function initSwitches() {
    // init all switches
    $('.switch').bootstrapSwitch();
    setInitState();
}

function addEventHandlers() {
  $('#turn-on-all-devices').on('click', function() {
      turnSwitches(true);
  });

  $('#turn-off-all-devices').on('click', function() {
      turnSwitches(false);
  });

  $('.switch').on('switchChange.bootstrapSwitch', function(event, state) {
    var pin = $(this).parent().parent().parent().parent().attr('data-pin')[0];
    turnPin(pin, state);
  });
}


function createChart() {
    //Get context with jQuery - using jQuery's .get() method.
    var ctx = $("#temperature").get(0).getContext("2d");
    var data = {
        labels: ["12:00", "12:15", "12:30", "12:45", "13:00", "13:15", "13:30"],
        datasets: [
            {
                fillColor: "rgba(151,187,205,0.5)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                data: [17, 18, 18, 16, 17, 20, 21]
            }
        ]
    }
    new Chart(ctx).Line(data);
}

$(document).ready(function() {
    initDevices();
    addEventHandlers();
    createChart();
});
