function initSwitches() {
  // init all switches
  $('.switch').bootstrapSwitch();

}

function createChart() {
  //Get context with jQuery - using jQuery's .get() method.
  var ctx = $("#temperature").get(0).getContext("2d");
  var data = {
  	labels : ["12:00","12:15","12:30","12:45","13:00","13:15","13:30"],
  	datasets : [
  		{
  			fillColor : "rgba(151,187,205,0.5)",
        strokeColor : "rgba(151,187,205,1)",
        pointColor : "rgba(151,187,205,1)",
  			pointStrokeColor : "#fff",
  			data : [17,18,18,16,17,20,21]
  		}
  	]
  }
  new Chart(ctx).Line(data);
}

$(document).ready(function() {
  initSwitches();
  createChart();
});
