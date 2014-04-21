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
    $('#turn-on-all-devices').on('click', function() {
        $.each($('.switch'), function(index) {
            $(this).bootstrapSwitch('state', true);
        });
        var link = "http://192.168.0.163:8080/pins/allon";
        // AJAX CALL
        var jqxhr = $.ajax(link)
                .done(function() {
                    console.log("success");
                })
                .fail(function() {
                    console.log("error");
                })
                .always(function() {
                    console.log("complete");
                });
    });
    // showError('There was a problem. Check logbook!');
    $('#turn-off-all-devices').on('click', function() {
        $.each($('.switch'), function(index) {
            $(this).bootstrapSwitch('state', false);
            // AJAX CALL
            var link = "http://192.168.0.163:8080/pins/alloff";
            // AJAX CALL
            var jqxhr = $.ajax(link)
                    .done(function() {
                        console.log("success");
                    })
                    .fail(function() {
                        console.log("error");
                    })
                    .always(function() {
                        console.log("complete");
                    });
        });
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
    initSwitches();
    createChart();
});
