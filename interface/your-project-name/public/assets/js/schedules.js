var port = '8080';
var ipaddress = '192.168.0.163';
var apiUrl = 'http://' + ipaddress + ':' + port;

var init = function() {
  $.ajax({
    url: apiUrl + '/schedules',
    type: 'GET',
    success: function(result) {
      var i = 0;
      if (result.length == 0) {
        $('#schedules-info').html('No schedules found. Add one!');
      }
      $.each(result, function() {
        addScheduleHTML(this['id'], this['name'], this['enabled']);
      });
      getAllRules();
    }
  });
}

var getAllRules = function() {
  $.ajax({
    url: apiUrl + '/schedules/rules',
    type: 'GET',
    success: function(result) {
      $.each(result, function() {
        addRuleHTML(this['schedules_id'], this['devices_id'], this['rules_id'], this['cron'], this['onoff'], this['name']);
      });
      addEventHandlers();
    }
  });
}

var addScheduleToPage = function(id) {
  $.ajax({
    url: apiUrl + '/schedules',
    type: 'GET',
    success: function(result) {
      $.each(result, function() {
        if (this['id'] == id) {
          addScheduleHTML(id, this['name'], this['enabled']);
        }
      });
    }
  });
}

var addSchedule = function(name, enabled) {
  $.ajax({
    url: apiUrl + '/schedules?enabled=' + enabled + '&name=' + name,
    type: 'POST',
    success: function(result) {
      var id = result;
      addScheduleToPage(id);
      $('#schedules-info').html('');
      $('#addSchedule').modal('hide');
    }
  });
}

var addScheduleHTML = function(id, name, enabled) {
  html = '<div data-id="' + id + '" class="schedule">';
  html += '    <div class="panel panel-default">';
  html += '      <div class="panel-heading">';
  html += '        <h4 class="panel-title">';
  html += '          <input type="checkbox" class="schedule-enable" ' + (enabled ? 'checked=checked' : '')  + ' />';
  html += '          <a class="schedule-title" data-toggle="collapse" data-parent="#accordion" href="#collapse' + id + '">';
  html += name;
  html += '          </a>';
  html += '        </h4>';
  html += '      </div>';
  html += '      <div id="collapse' + id + '" class="panel-collapse collapse">';
  html += '        <div class="panel-body">';
  html += '          <div class="row">';
  html += '            <div class="col-md-12">';
  html += '              <ul class="rules">';              
  html += '                <li>';
  html += '                  <div class="add-rule">';
  html += '                    <a href="#" class="add-rule-link">Add a rule</a>';
  html += '                  </div>';
  html += '                </li>';
  html += '              </ul>';
  html += '            </div>';
  html += '          </div>';
  html += '        </div>';
  html += '      </div>';
  html += '    </div>';
  html += '  </div>';
  $('#schedules > .panel-group').prepend(html);
}

var addRule = function(schedules_id, devices_id, cron, onoff) {
  $.ajax({
    url: apiUrl + '/rules?schedules_id=' + schedules_id + '&devices_id=' + devices_id + '&cron=' + cron + '&onoff=' + onoff,
    type: 'POST',
    success: function(result) {
      var rules_id = result;
      var devices = getDevices();
      $.each(devices, function() {
        if (this['id'] == devices_id) {
          addRuleHTML(schedules_id, devices_id, rules_id, cron, onoff, this['name']);
          $('#new-rule-modal').modal('hide');
        }
      });
    }
  });
}

var editRule = function(rules_id, schedules_id, devices_id, cron, onoff) {
  $.ajax({
    url: apiUrl + '/rules/update?id=' + rules_id + '&schedules_id=' + schedules_id + '&devices_id=' + devices_id + '&cron=' + cron + '&onoff=' + onoff,
    type: 'POST',
    success: function(result) {
      var rule = $('.rule[data-id=' + rules_id + ']');
      var devices = getDevices();
      $.each(devices, function() {
        if (this['id'] == devices_id) {
          rule.find('.rule-device-name').html(this['name']);
        }
      });
      rule.find('.rule-device-value').html(onoff ? 'ON' : 'OFF');
      rule.attr('data-cron', cron);
      rule.attr('data-devices-id', devices_id);
    }
  });
}

var addRuleHTML = function(schedules_id, devices_id, rules_id, cron, onoff, name) {
  var onoffs = (onoff == 'true' ? 'ON' : 'OFF');
  var html = '<li class="rule" data-id="' + rules_id + '" data-cron="' + cron  + '" data-onoff="' + onoff + '" data-devices-id="' + devices_id + '">';
  html +=  '  <div class="rule-description">';
  html +=  prettyCron.toString(cron, true);
  html +=  '    / Device: <strong><span class="rule-device-name">' + name + '</span></strong>: <span class="rule-device-value">' + onoffs + '</span> <a href="#" class="edit-rule-link"><i class="glyphicon glyphicon-pencil"></i></a>';
  html +=  '  </div>';
  html +=  '</li>';
  $('.schedule[data-id="' + schedules_id + '"]').find('.rules').prepend(html);
}

var getDevices = function() {
  var link = apiUrl + '/devices';
  var response = $.parseJSON($.ajax({
    type: "GET",
    url: link,
    async: false
  }).responseText);
  return response;
}

var addEventHandlers = function() {
  $('#enable-all-schedules').on('click', function() {
    $('.schedule .schedule-enable').prop('checked', true)
  });

  $('#disable-all-schedules').on('click', function() {
    $('.schedule .schedule-enable').prop('checked', false)
  });

  $('#btnEditRule').on('click', function() {
    var rules_id = $(this).attr('data-rules-id');
    var schedules_id = $(this).attr('data-schedules-id');
    var devices_id = $('#select-cron-device').val();
    var cron = '0 ' + $('#editRuleModal .cron').cron('value');
    var onoff = $('#select-cron-device-value').val() == 1 ? true : false;
    editRule(rules_id, schedules_id, devices_id, cron, onoff);
    $('#editRuleModal').modal('hide');
  });

  $('#btnAddSchedule').on('click', function() {
    var name = $('#addSchedule').find('#nameSchedule').val();
    addSchedule(name, false);
  });

  $('.edit-rule-link').on('click', function(e) {
    var schedules_id = $(this).parent().parent().parent().parent().parent().parent().parent().parent().parent().attr('data-id');
    var cron = $(this).parent().parent().attr('data-cron');
    var rules_id = $(this).parent().parent().attr('data-id');
    var devices_id = $(this).parent().parent().attr('data-devices-id');
    var onoff = $(this).parent().parent().attr('data-onoff');
    var devices = getDevices();
    $('#editRuleModal .cron').remove();
    $('#editRuleModal .modal-body').prepend('<div class="cron"></div>');
    $('#editRuleModal .cron').cron({
      initial: cron.split(' ').splice(1, 5).join(' ')
    });
    $('#select-cron-device').html("");
    for (var i = 0; i < devices.length; i++) {
      if (devices[i] != null) {
        $('#select-cron-device').append($("<option></option>").attr("value", devices[i]['id']).text(devices[i]['name']));
      }
    };
    $('#select-cron-device').find('option[value=' + devices_id +']').prop('selected', true);
    $('#select-cron-device-value').find('option[value=' + (onoff == 'true' ? 1 : 0) + ']').prop('selected', true);
    $('#btnEditRule').attr('data-schedules-id', schedules_id);
    $('#btnEditRule').attr('data-rules-id', rules_id);
    $('#editRuleModal').modal('show');
  });

  $('.add-rule-link').on('click', function(e) {
    var schedules_id = $(this).parent().parent().parent().parent().parent().parent().parent().parent().parent().attr('data-id');
    $('#new-rule-modal').modal('show');
    $('#new-rule-modal .cron').remove();
    $('#new-rule-modal .modal-body').prepend('<div class="cron"></div>');
    $('#new-rule-modal .cron').cron();
    var devices = getDevices();
    $('#select-cron-device-new-rule').html("");
    for (var i = 0; i < devices.length; i++) {
      if (devices[i] != null) {
        $('#select-cron-device-new-rule').append($("<option></option>").attr("value", devices[i]['id']).text(devices[i]['name']));
      }
    };
    $('#btnNewRule').attr('data-schedules-id', schedules_id);
  });

  $('#btnNewRule').on('click', function() {
    var schedules_id = $(this).attr('data-schedules-id');
    var devices_id = $('#select-cron-device-new-rule').val();
    var cron = '0 ' + $('#new-rule-modal .cron').cron('value');
    var onoff = $('#select-cron-device-value-new-rule').val() == 1 ? true : false;
    addRule(schedules_id, devices_id, cron, onoff);
  });

}

$(document).ready(function() {
  init();
});
