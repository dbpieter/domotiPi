var apiUrl = 'http://' + location.host + ':8080';

var addDevice = function(id, name, pin) {
  var html = '<div class="col-md-4">';
  html += '  <div class="device" data-id="' + id + '" data-pin="' + pin + '">';
  html += '    <div class="well well-sm">';
  html += '      <h4 class="title">' + name + '</h4>';
  html += '      <input class="switch" type="checkbox" /><br>';
  html += '      <p class="edit">';
  html += '        <a href="#">Modify</a>';
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

var getAvailablePins = function() {
  var link = apiUrl + '/pins/available';
  var jqxhr = $.ajax(link)
  .done(function(data) {
    var available = data;
    var select = $('#addDevice #selectGPIO');
    $(select).html("");
    for (var i = 0; i < available.length; i++) {
      if (available[i] != null) {
        $(select).append($("<option></option>").attr("value", available[i]['pin']).text("Pin " + available[i]['pin']));
      }
    };
  })
  .fail(function() {
    showError('Oops. Could not connect to hardware.');
  })
}

var getDevice = function(pin) {
  var link = apiUrl + '/devices';
  var response = $.parseJSON($.ajax({
    type: "GET",
    url: link,
    async: false
  }).responseText);
  for (var i = 0; i < response.length; i++) {
    if (response[i]['pin'] == pin) {
      return response[i];
    }
  };
  return -1;
}

var saveDevice = function(name, pin) {
  var link = apiUrl + '/devices' + '?pin=' + pin + '&name=' + name;
  var jqxhr = $.post(link)
  .done(function(data) {
    var device = getDevice(pin);
    addDevice(device['id'], name, pin);
    $('.device[data-pin=' + pin + '] .switch').bootstrapSwitch('state', false);
    $('.device[data-pin=' + pin + '] .switch').on('switchChange.bootstrapSwitch', function(event, state) {
      var pin = $(this).parent().parent().parent().parent().attr('data-pin')[0];
      turnPin(pin, state);
    });
    $('.device[data-pin=' + pin + '] .edit a').on('click', function() {
      var device = $(this).parent().parent().parent();
      var title = $(device).find('.title').html();
      var pin = $(device).attr('data-pin');
      var id = $(device).attr('data-id');
      $('#connectedPin').html(pin);
      $('#btnDeviceDelete').attr('data-pin', pin);
      $('#btnDeviceDelete').attr('data-id', id);
      $('#deviceSettings').find('#naamApparaat').val(title);
      $('#deviceSettings').modal('show');
    });
    $('#addDevice').modal('hide');
  })
  .fail(function() {
    showError('Oops. Could not connect to hardware.');
  })
}

var deleteDevice = function(deviceId) {
  $('.device[data-id=' + deviceId + ']').parent().remove();
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

  $('#addDevice').on('shown.bs.modal', function() {
    getAvailablePins();
  });

  $('#btnAddDevice').on('click', function() {
    var pin = $('#addDevice #selectGPIO').val();
    var name = $('#addDevice #nameDevice').val();
    if (name != '') {
      saveDevice(name, pin);
    }
    else {
      $('#addDevice #nameDevice').parent().addClass('has-error');
      $('#addDevice #nameDevice').parent().find('.new-device-errors').html('Provide a name for the new device.');
    }
  });

  $('#deviceSettings #btnDeviceDelete').on('click', function() {
    var deviceId = $(this).attr('data-id');
    $.ajax({
      url: apiUrl + '/devices/delete?id=' + deviceId,
      type: 'POST',
      success: function(result) {
        deleteDevice(deviceId);
        console.log(result);
        $('#deviceSettings').modal('hide');
      }
    });
  });

  $('#deviceSettings #btnModifyDevice').on('click', function() {
    var id = $('#deviceSettings #btnDeviceDelete').attr('data-id');
    var name = $('#deviceSettings #naamApparaat').val();
    var pin = $('#deviceSettings #btnDeviceDelete').attr('data-pin');
    $.ajax({
      url: apiUrl + '/devices/update?id=' + id + '&name=' + name + '&pin=' + pin,
      type: 'POST',
      success: function(result) {
        $('#deviceSettings').modal('hide');
        $('.device[data-id=' + id + ']').find('.title').html(name);
      }
    });
  });

  $('.edit a').on('click', function() {
    var device = $(this).parent().parent().parent();
    var title = $(device).find('.title').html();
    var pin = $(device).attr('data-pin');
    var id = $(device).attr('data-id');
    $('#connectedPin').html(pin);
    $('#btnDeviceDelete').attr('data-pin', pin);
    $('#btnDeviceDelete').attr('data-id', id);
    $('#deviceSettings').find('#naamApparaat').val(title);
    $('#deviceSettings').modal('show');
  });

  $('#open-new-device-modal').on('click', function() {
    $('#addDevice #nameDevice').parent().removeClass('has-error');
    $('#addDevice #nameDevice').parent().find('.new-device-errors').html('');
  });
}

$(document).ready(function() {
    initDevices();
});
