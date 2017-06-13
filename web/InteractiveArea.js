/**
 * Created by vld on 4/11/17.
 */

class InteractiveArea {
    /**
     * @return {number}
     */
    static get DEFAULT_STEP() {
        return 30;
    }

    constructor( radius, graphicContext, width, height ) {
        this.radius = radius * InteractiveArea.DEFAULT_STEP;
        this.gcontext = graphicContext;
        this.height = height;
        this.width = width;

        this.axis_color ="#000";
        this.fill_color = "#87CEEB";
    }

    setRadius( newRadius ) {
        this.radius = newRadius * InteractiveArea.DEFAULT_STEP;
        this.clearArea();
    }

    clearArea() {
        this._clearCanvas();
        this.drawArea();
    }

    getCoordinatesByCurrentLayout( x, y ) {
        return {
            x: x - this.width / 2.0,
            y: y - this.height / 2.0
        };
    }

    drawArea() {
        this._drawRectPart();
        this._drawArcPart();
        this._drawTrianglePart();
        drawAxis( this.gcontext, this.width, this.height );
    }

    drawPoint( x, y, color = "#000" ) {
        y = -y;

        this.gcontext.fillStyle = color;
        this.gcontext.beginPath();

        this.gcontext.arc( x, y, 3, 0, 2 * Math.PI  );

        this.gcontext.closePath();
        this.gcontext.stroke();
        this.gcontext.fill();
    }

    _clearCanvas() {
        this.gcontext.clearRect(
            -this.width / 2.0,
            -this.height / 2.0,
            this.width,
            this.height
        )
    }

    _drawRectPart() {
        this.gcontext.strokeStyle = this.axis_color;
        this.gcontext.fillStyle = this.fill_color;

        this.gcontext.fillRect( -this.radius / 2, -this.radius, this.radius / 2, this.radius );
        this.gcontext.strokeRect( -this.radius / 2, -this.radius, this.radius / 2, this.radius );
    }

    _drawArcPart() {
        this.gcontext.fillStyle = this.fill_color;

        this.gcontext.beginPath();

        this.gcontext.arc( 0, 0, this.radius / 2, 0, Math.PI / 2 );
        this.gcontext.lineTo(0, 0);
        this.gcontext.moveTo(0, 0);
        this.gcontext.lineTo( this.radius / 2.0, 0 );

        this.gcontext.closePath();
        this.gcontext.stroke();
        this.gcontext.fill();
    }

    _drawTrianglePart() {
        this.gcontext.fillStyle = this.fill_color;

        this.gcontext.beginPath();

        this.gcontext.moveTo(0, 0);
        this.gcontext.lineTo( -this.radius / 2, 0 );
        this.gcontext.lineTo( 0, this.radius );

        this.gcontext.fill();
        this.gcontext.closePath();
        this.gcontext.stroke();
    }
}

