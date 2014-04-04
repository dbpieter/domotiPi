$(document).ready(function() {
  $('.cron').cron();
  $('#enable-all-schedules').on('click', function() {
    $('.schedule .schedule-enable').prop('checked', true)
  });
  $('#disable-all-schedules').on('click', function() {
    $('.schedule .schedule-enable').prop('checked', false)
  });
});
