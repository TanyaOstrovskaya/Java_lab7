
function drawAxis( graphicContext, width, height, color ) {
    color = "#0000";
    graphicContext.strokeStyle = color;

    graphicContext.beginPath();
    graphicContext.moveTo( -width / 2.0, 0.0 );
    graphicContext.lineTo( width / 2.0, 0.0 );

    graphicContext.moveTo( 0.0, height / 2.0 );
    graphicContext.lineTo( 0.0, -height / 2.0 );
    graphicContext.stroke();
    graphicContext.closePath();
}

function replaceOriginOfCoordinatesToCenter( graphicContext, width, height ) {
   graphicContext.translate( height / 2.0, width / 2.0 );
}


