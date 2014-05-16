var init = function() {
  $('#enable-all-schedules').on('click', function() {
    $('.schedule .schedule-enable').prop('checked', true)
  });
  $('#disable-all-schedules').on('click', function() {
    $('.schedule .schedule-enable').prop('checked', false)
  });
}

var addEventHandlers = function() {
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
}

$(document).ready(function() {
  init();
  addEventHandlers();
});
