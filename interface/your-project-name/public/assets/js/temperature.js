var apiUrl = 'http://' + window.location.hostname + ':8080';
var labels;
var temps;
var d;

var getChartData = function() {
  var link = apiUrl + '/templog/20';
  var jqxhr = $.ajax(link)
  .done(function(data) {
    d = data;
    console.log('Temperature data is available');
    generateTemperatureData();
    createChart();
  })
  .fail(function() {
    showError('Could not get temperature');
  })
}

var generateTemperatureData = function() {
    labels = new Array();
    temps = new Array();
    for (var i = 0; i < d.length; i++) {
      temps.push(Math.round( parseFloat(d[i].temperature) * 10 ) / 10);
      labels.push(d[i].time.substring(10));
    }
}

var createChart = function() {
    var options = {
      scaleOverride : true,
      //** Required if scaleOverride is true **
      //Number - The number of steps in a hard coded scale
      scaleSteps : 10,
      //Number - The value jump in the hard coded scale
      scaleStepWidth : 3,
      //Number - The scale starting value
      scaleStartValue : 0,
    }

    //Get context with jQuery - using jQuery's .get() method.
    var ctx = $("#temperature").get(0).getContext("2d");
    var data = {
        labels: labels,
        datasets: [
            {
                fillColor: "rgba(151,187,205,0.5)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                data: temps
            }
        ]
    }
    new Chart(ctx).Line(data, options);
}

$(document).ready(function() {
    getChartData();
});
