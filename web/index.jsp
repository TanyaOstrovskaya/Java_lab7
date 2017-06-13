<%--
  Created by IntelliJ IDEA.
  User: user
  Date: 08.05.2017
  Time: 12:51
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Lab7</title>
</head>
<body>
<header id="header">
    <h1>Островская Татьяна; группа P3211; вариант 3170</h1>
</header>
<div id="frame">
    <div id="main-frame">
        <canvas id="interactive-area" height="500px" width="500px"></canvas>
    </div>
    <div id="results-block">
    </div>

    <div id="user-form">
        <form action="controller" method="post" name="input-field">

            <div class="input-field">
                <p>Select X:</p>
                <div align="center">
                <table id="input_x_table">
                    <tr>
                        <%
                            for (float i = -2; i <= 2 ; i += 0.5) {
                                out.println(
                                        "<td><input type=\"checkbox\" name=\"x_in[]\" value=\"" + i + "\" onclick=\"return uncheckAllExcept_X(" + (2*i+4)+ ")\"/></td>"
                                );
                            }
                        %>
                    </tr>
                    <tr>
                        <% for (float i = -2; i <= 2; i += 0.5 ) out.println("<td>" + i + "</td>"); %>
                    </tr>
                </table>
                </div>
            </div>

            <div class="input-field">
                <p>Enter Y value (-3 .. 3): </p>
                <input id="y_in" type="text" name="y_in" />
            </div>

            <div class="input-field">
                <p>Select R:</p>
                <div align="center">
                    <table id="input_r_table">
                        <tr>
                            <%
                                for (float i = 1; i <= 3 ; i += 0.5) {
                                    out.println(
                                            "<td><input type=\"checkbox\" name=\"r_in[]\" value=\"" + i + "\" onclick=\"return uncheckAllExcept_R(" + (2*i-2) + ")\"/></td>"
                                    );
                                }
                            %>
                        </tr>
                        <tr>
                            <%  for (float i = 1; i <= 3 ; i += 0.5) out.println("<td>" + i + "</td>"); %>
                        </tr>
                    </table>
                </div>
            </div>

            <div class="buttons-area">
                <input id="restore-btn" class="button" type="button" onclick="return restoreHandler();" value="RESET" disabled/>
                <input class="button" type="button" onclick="return computeClickHandler();" value="SUBMIT"/>
            </div>

        </form>
    </div>

    <script src="InteractiveArea.js"></script>
    <script src="GeomitryUtil.js"></script>
    <script src="Handlers.js"></script>
    <script>
        var canvas = document.getElementById("interactive-area");

        replaceOriginOfCoordinatesToCenter( canvas.getContext("2d"), canvas.width, canvas.height );

        window.interactiveArea = new InteractiveArea(
                0,
                canvas.getContext("2d"),
                canvas.width,
                canvas.height
        );

        interactiveArea.drawArea();

        canvas.addEventListener("click", canvasClickHandler );
        var r_array = document.getElementsByName("r_in[]");
        r_array.forEach(function (entry) {
            entry.addEventListener("change", radiusChangedHandler);

        })


        function uncheckAllExcept_X( idx ) {
            var checkboxes_x = document.getElementsByName("x_in[]");

            for ( var i = 0; i < checkboxes_x.length; i++ ) {
                if ( i != idx && checkboxes_x[i].checked ) {
                    checkboxes_x[i].checked = false;
                }
            }
        }

        function uncheckAllExcept_R( idr ) {
            var checkboxes_r = document.getElementsByName("r_in[]");

            for ( var i = 0; i < checkboxes_r.length; i++ ) {
                if ( i != idr && checkboxes_r[i].checked ) {
                    checkboxes_r[i].checked = false;
                }
            }
        }
    </script>

</div>
</body>
</html>
