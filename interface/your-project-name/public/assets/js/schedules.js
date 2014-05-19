var port = '8080';
var ipaddress = '192.168.0.163';
var apiUrl = 'http://' + ipaddress + ':' + port;

var init = function() {
  $.ajax({
    url: apiUrl + '/schedules',
    type: 'GET',
    success: function(result) {
      $.each(result, function() {
        addScheduleHTML(this['id'], this['name'], this['enabled']);
        getAllRules();
      });
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

var addSchedule = function(name, enabled) {
  $.ajax({
    url: apiUrl + '/schedules?enabled=' + enabled + '&name=' + name,
    type: 'POST',
    success: function(result) {
      console.log(result);
    }
  });
}

var addScheduleHTML = function(id, name, enabled) {
  html = '<div data-id="' + id + '" class="schedule">';
  html += '    <div class="panel panel-default">';
  html += '      <div class="panel-heading">';
  html += '        <h4 class="panel-title">';
  html += '          <input type="checkbox" class="schedule-enable" />';
  html += '          <a class="schedule-title" data-toggle="collapse" data-parent="#accordion" href="#collapse' + id + '">';
  html += name;
  html += '          </a>';
  html += '        </h4>';
  html += '      </div>';
  html += '      <div id="collapse' + id + '" class="panel-collapse in">';
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
    url: apiUrl + '/schedules?enabled=' + enabled + '&name=' + name,
    type: 'POST',
    success: function(result) {
      console.log(result);
    }
  });
}

var addRuleHTML = function(schedules_id, devices_id, rules_id, cron, onoff, name) {
  var html = '<li class="rule" data-id="' + rules_id + '" data-cron="' + cron  + '" data-onoff="' + onoff + '">';
  html +=  '  <div class="rule-description">';
  html +=  prettyCron.toString(cron, true);
  html +=  '    / Device: <strong><span class="rule-device-name">' + name + '</span></strong>: <span class="rule-device-value">' + (onoff ? 'ON' : 'OFF' )  + '</span> <a href="#" class="edit-rule-link"><i class="glyphicon glyphicon-pencil"></i></a>';
  html +=  '  </div>';
  html +=  '</li>';
  $('.schedule[data-id="' + schedules_id + '"]').find('.rules').prepend(html);
}

var modifyRule = function() {

}

var addEventHandlers = function() {
  $('#enable-all-schedules').on('click', function() {
    $('.schedule .schedule-enable').prop('checked', true)
  });

  $('#disable-all-schedules').on('click', function() {
    $('.schedule .schedule-enable').prop('checked', false)
  });

  $('.edit-rule').on('click', function() {
    var cron = $(this).parent().parent().attr('data-cron');
    var ruleId = $(this).parent().parent().attr('data-rule-id');
    $('#editRuleModal').attr('data-rule-id', ruleId);
    $('#editRuleModal .cron').remove();
    $('#editRuleModal .modal-body').prepend('<div class="cron"></div>');
    $('#editRuleModal .cron').cron({
      initial: cron
    });
    // TODO get all available devices for rule
    $('#editRuleModal').modal('toggle');
  });

  $('#btnEditRule').on('click', function() {
    var ruleId = $('#editRuleModal').attr('data-rule-id');
    var newCron = $('#editRuleModal .cron').cron('value');
    console.log('ruleId:' + ruleId + ' newCron:' + newCron);
    // TODO update rule with ajax call
  });

  $('#btnAddSchedule').on('click', function() {
    var name = $('#addSchedule').find('#nameSchedule').val();
    addSchedule(name, false);
  });

  $('.edit-rule-link').on('click', function() {
    $('#editRuleModal').modal('show');
  });

  $('.add-rule-link').on('click', function() {
    alert('ok');
    $('#new-rule-modal').modal('show');
  });

}

$(document).ready(function() {
  init();
});
