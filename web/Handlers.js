
function restoreHandler() {
    document.getElementById("restore-btn").setAttribute("disabled", "");
    document.getElementById("results-block").innerHTML = "";

    var xhr = new XMLHttpRequest();

    xhr.open(
        "GET",
        '/Lab7_08_05_17_war_exploded/controller?restore=true',
        true
    );

    xhr.send();

    window.interactiveArea.clearArea();
}

function radiusChangedHandler( event ) {
    var rect = this.getBoundingClientRect();

    var coordinates = window.interactiveArea.getCoordinatesByCurrentLayout(
        event.clientX - rect.left,
        event.clientY - rect.top
    );

    var checkboxes = document.getElementsByName("r_in[]");
    var currentRadius;
    var i;
    for ( i = 0; i < checkboxes.length; i++ ) {
        if ( checkboxes[i].checked == true){
            currentRadius = checkboxes[i].value;
        }
    }

    window.interactiveArea.setRadius( currentRadius );
    var step = InteractiveArea.DEFAULT_STEP;

    console.log("x: " + coordinates.x / step + "    y: " + (-coordinates.y / step) );

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if ( xhr.readyState == 4 && xhr.status == 200 ) {
            var parser = new DOMParser();
            var tableDOM = parser.parseFromString("<html><body>" + this.responseText + "</body></html>", "text/html");

            var rows = tableDOM.getElementsByTagName("tr");

            var currentRow;
            for( var i = 1; i < rows.length ; i++ ) {
                currentRow = rows[i];
                var result = currentRow.getElementsByTagName("td");

                var x = result[0].innerText;
                var y = result[1].innerText;
                var color = /inside/.test(result[3].innerText) ? "#00FF00" : "#FF0000";

                window.interactiveArea.drawPoint( x * step, y * step, color );
            }
        }
    };

    xhr.open(
        "GET",
        '/Lab7_08_05_17_war_exploded/controller?x_in[]=' + coordinates.x / step +
        '&y_in=' + (-coordinates.y / step) +
        '&r_in[]=' + currentRadius,
        true
    );

    xhr.send();
}

function canvasClickHandler( event ) {
    var currentRadius;
    var i;
    var checkboxes = document.getElementsByName("r_in[]");
    for ( i = 0; i < checkboxes.length; i++ ) {
        if ( checkboxes[i].checked == true){
            currentRadius = checkboxes[i].value;
        }
    }
    if ( isNaN(currentRadius) ) {
        alert(" R must be defined ");
        return;
    }

    var rect = this.getBoundingClientRect();
    document.getElementById("restore-btn").removeAttribute("disabled");

    var coordinates = window.interactiveArea.getCoordinatesByCurrentLayout(
        event.clientX - rect.left,
        event.clientY - rect.top
    );

    var step = InteractiveArea.DEFAULT_STEP;

    console.log("x: " + coordinates.x / step + "    y: " + (-coordinates.y / step) );

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if ( xhr.readyState == 4 && xhr.status == 200 ) {
            var parser = new DOMParser();
            var tableDOM = parser.parseFromString("<html><body>" + this.responseText + "</body></html>", "text/html");

            var rows = tableDOM.getElementsByTagName("tr");
            var currentResult = rows[rows.length - 1].getElementsByTagName("td");

            window.interactiveArea.drawPoint(
                currentResult[0].innerText * step,
                currentResult[1].innerText * step,
                /inside/.test(currentResult[3].innerText) ? "#00FF00" : "#FF0000"
            );

            document.getElementById("results-block").innerHTML = this.responseText;
        }
    };

    xhr.open(
        "GET",
        '/Lab7_08_05_17_war_exploded/controller?x_in[]=' + coordinates.x / step +
        '&y_in=' + (-coordinates.y / step) +
        '&r_in[]=' + currentRadius,
        true
    );

    xhr.send();
}

function isFormValid() {

    var checkboxes = document.getElementsByName("x_in[]");
    var i;
    for ( i = 0; i < checkboxes.length; i++ ) {
        if ( checkboxes[i].checked ) break;
    }

    if ( i == checkboxes.length ) {
        alert(" Choose X value ");
        return false;
    }

    var y = document.getElementById("y_in").value;

    if ( /^ *$/.test(y) || isNaN(y) ) {
        alert(" Y must be a number ");
        return false;

    } else if ( y > 3.0 || y < -3.0 ) {
        alert(" Y value must be in ( -3 .. 3 )");
        return false;

    }

    var checkboxes = document.getElementsByName("r_in[]");
    var i;
    for ( i = 0; i < checkboxes.length; i++ ) {
        if ( checkboxes[i].checked ) break;
    }

    if ( i == checkboxes.length ) {
        alert(" Choose R value ");
        return false;
    }


    return true;
}

function computeClickHandler( event ) {
    if ( !isFormValid() ) return;

    document.getElementById("restore-btn").removeAttribute("disabled");
    var xhr = new XMLHttpRequest();
    var step = InteractiveArea.DEFAULT_STEP;

    var checkboxes = document.getElementsByName("x_in[]");
    var x = 0;
    for ( var i = 0; i < checkboxes.length; i++ ) {
        if ( checkboxes[i].checked ) {
            x = checkboxes[i].value;
            break;
        }
    }

    var y = document.getElementById("y_in").value;

    var checkboxes = document.getElementsByName("r_in[]");
    var r = 0;
    for ( var i = 0; i < checkboxes.length; i++ ) {
        if ( checkboxes[i].checked ) {
            r = checkboxes[i].value;
            break;
        }
    }


    var msgBody = 'x_in=' + x + '&y_in=' + y + "&r_in=" + r;
    xhr.open("POST", "/Lab7_08_05_17_war_exploded/controller", true);
    xhr.setRequestHeader(
        "Content-Type",
        "application/x-www-form-urlencoded"
    );

    xhr.onreadystatechange = function() {
        if ( xhr.readyState == 4 && xhr.status == 200 ) {
            document.getElementById("results-block")
                .innerHTML = this.responseText;

            var parser = new DOMParser();
            var tableDOM = parser.parseFromString("<html><body>" + this.responseText + "</body></html>", "text/html");

            var rows = tableDOM.getElementsByTagName("tr");
            var currentResult = rows[rows.length - 1].getElementsByTagName("td");

            window.interactiveArea.drawPoint(
                currentResult[0].innerText * step,
                currentResult[1].innerText * step,
                /inside/.test(currentResult[3].innerText) ? "#00FF00" : "#FF0000"
            );

            document.getElementById("results-block").innerHTML = this.responseText;

        }
    };

    xhr.send( msgBody );
}
