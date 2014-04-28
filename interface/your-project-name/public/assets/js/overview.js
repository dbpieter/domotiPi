var apiUrl = 'http://' + window.location.hostname + ':8080';

var addDevice = function(id, name, pin) {
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

var initDevices = function() {
  var link = apiUrl + '/devices';
  console.log('Getting devices at ' + link);
  var jqxhr = $.ajax(link)
  .done(function(data) {
    console.log('Yes, here are the devices!');
    for (var i = 0; i < data.length; i++) {
      addDevice(data[i].id, data[i].name, data[i].pin);
      console.log('Device added');
    }
    initSwitches();
  })
  .fail(function() {
    showError('Oops. Could not connect to hardware.');
  })
}

var setInitState = function() {
  var link = apiUrl + '/pins';
  var devices = $('.device');
  console.log('Getting pin status');
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
    addEventHandlers();
  })
  .fail(function() {
      showError('Oops. Could not connect to hardware.');
  })
}

var turnPin = function(pin, state) {
  var link = apiUrl + '/pins/' + pin + '/';
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

var turnSwitches = function(state) {
  $.each($('.switch'), function(index) {
      $(this).bootstrapSwitch('state', state);
  });
}

var createAutoClosingAlert = function(selector, delay) {
    var alert = $(selector).alert();
    window.setTimeout(function() {
        alert.alert('close')
    }, delay);
}

var showError = function(msg) {
    var error = '<div class="alert alert-danger alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><strong><i class="glyphicon glyphicon-warning-sign"></i></strong> ' + msg + '</div>';
    $('#errors').append(error);
    createAutoClosingAlert('.alert', 5000);
}

var initSwitches = function() {
    // init all switches
    $('.switch').bootstrapSwitch();
    setInitState();
}

var addEventHandlers = function() {
  console.log('Added event handlers');

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

$(document).ready(function() {
    initDevices();
});
