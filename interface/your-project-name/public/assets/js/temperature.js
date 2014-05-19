var apiUrl = 'http://' + '192.168.0.163' + ':8080';
var labels;
var temps;
var d;
var amountGraph = 25;

var getChartData = function() {
  var link = apiUrl + '/templog/' + amountGraph;
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
    for (var i = d.length - 1; i >= 0; i--) {
      temps.push(Math.round(parseFloat(d[i].temperature) * 10 ) / 10);
      labels.push(d[i].time.substring(10));
    }
}

var createChart = function() {
    var options = {
      scaleOverride : true,
      //** Required if scaleOverride is true **
      //Number - The number of steps in a hard coded scale
      scaleSteps : 7,
      //Number - The value jump in the hard coded scale
      scaleStepWidth : 2,
      //Number - The scale starting value
      scaleStartValue : 16
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

var addTempWidget = function(temp) {
  var html = '<div class="col-md-4">';
  html += '  <div class="tempature-widget">';
  html += '    <div class="well well-sm">';
  html += '      <h4 class="title">Current temperature</h4>';
  html += '      <p class="lead temp">' + Math.round( temp * 10 ) / 10 + '&deg;C</p>'
  html += '    </div>';
  html += '  </div>';
  html += '</div>';
  $('#devices > .row').prepend(html);
}

var getCurrentTemp = function() {
  var link = apiUrl + '/temp';
  var jqxhr = $.ajax(link)
  .done(function(data) {
    addTempWidget(data);
  })
  .fail(function() {
    showError('Could not get temperature');
  })
}

$(document).ready(function() {
    getChartData();
    getCurrentTemp();
});
