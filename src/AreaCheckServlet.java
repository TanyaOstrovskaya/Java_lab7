import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

@WebServlet(name = "AreaCheckServlet")
public class AreaCheckServlet extends HttpServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response ) throws ServletException, IOException {
       doGet(request, response);
    }

    protected void doGet( HttpServletRequest request, HttpServletResponse response ) throws ServletException, IOException {
        double x = 0;
        double y = 0;
        double r = 0;

        HttpSession currentSession = request.getSession(true);

        if ( currentSession.getAttribute("prev_results") == null ) {
            currentSession.setAttribute("prev_results", new ArrayList<Point>() );
        }

        PrintWriter toClient = response.getWriter();

        try {
            x = Double.parseDouble( request.getParameter("x_in[]"));
            y = Double.parseDouble( request.getParameter("y_in") );
            r = Double.parseDouble( request.getParameter("r_in[]"));

        } catch ( NumberFormatException nfe ) {
            toClient.println("error");
            toClient.println( nfe.getMessage() );
            return;
        }

        ArrayList<Point> results = (ArrayList<Point>)currentSession.getAttribute("prev_results");

        results.add (
                new Point( x, y, r, Point.isInArea(x, y, r) )
        );

        for ( Point result : results ) {
            result.setResult(Point.isInArea(
                    result.getX(),
                    result.getY(),
                    r
            ));
        }


        printTable( results, toClient );
    }

    private void printTable( ArrayList<Point> results, PrintWriter toClient ) {
        ResultTable table = new ResultTable(toClient);
        table.printTableHeader();

        for ( Point result : results ) {
            table.printRowWithResult( result );
        }

        table.closeTable();
    }
}