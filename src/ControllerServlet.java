import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet(name = "ControllerServlet")
public class ControllerServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response ) throws ServletException, IOException {
        PrintWriter out = response.getWriter();

        if ( request.getParameter("restore") != null ) {
            HttpSession currentSession = request.getSession(true);
            currentSession.invalidate();
            return;
        }

        if ( !this.isNumber( request.getParameter("x_in[]"))
                || !this.isNumber( request.getParameter ("y_in") )
                || !this.isNumber( request.getParameter("r_in[]") )
                ) {
            out.println("Failed. External error.");
            return;
        }

        RequestDispatcher dispatcher = request.getRequestDispatcher("/area_checker");
        dispatcher.forward( request, response );
    }

    protected void doGet( HttpServletRequest request, HttpServletResponse response ) throws ServletException, IOException {
        doPost( request, response );
    }

    public boolean isNumber( String number ) {
        if ( number == null ) return false;

        try { Double.parseDouble(number); }
        catch ( NumberFormatException nfe ) {
            return false;
        }

        return true;
    }
}