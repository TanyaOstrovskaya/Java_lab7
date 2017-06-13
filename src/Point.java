
public class Point {
    private double x;
    private double y;
    private double r;

    private boolean result;

    public Point ( double x, double y, double r, boolean result ) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.result = result;
    }

    public double getX() {
        return x;
    }

    public double getY() {
        return y;
    }

    public double getR() {
        return r;
    }

    public void setResult( boolean result) {
        this.result = result;
    }

    public boolean getResult() {
        return result;
    }

    public static boolean isInArea(double x, double y, double r) {
        if ((x<=0) && (y>=0) && (x*x + y*y <= r*r))
            return true;
        if ((x>=0) && (y>=0) && (x <= r) && (y <= r/2))
            return true;
        if ((x <= 0) && (y<=0) && (y >= -x-r/2))
            return true;

        return false;
    }
}
