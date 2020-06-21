package it.polimi.tiw_exam_js.controllers;

import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import it.polimi.tiw_exam_js.DAO.UtenteDAO;
import it.polimi.tiw_exam_js.beans.Utente;
import it.polimi.tiw_exam_js.utils.ConnectionHandler;


@WebServlet("/CheckLogin")
public class CheckLogin extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private Connection connection;
       
    
    public CheckLogin() {
        super();
        // TODO Auto-generated constructor stub
    }
    
    public void init() {
    	connection = ConnectionHandler.getConnection(getServletContext());
    }
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String username = request.getParameter("username"); // mi salvo gli attributi che mi arrivano dalla request
		String password = request.getParameter("password");
		
		
		UtenteDAO userDAO = new UtenteDAO(connection);
		Utente userBean = null;

		try {
			userBean = userDAO.checkCredentials(username, password);
		} catch (SQLException e) {
			response.sendError(HttpServletResponse.SC_BAD_GATEWAY, "Errore nel controllo credenziali!");
		}

		String path = getServletContext().getContextPath(); // mi salvo il path di "default"

		if (userBean == null) {
			path = getServletContext().getContextPath() + "/index.html"; // se la creazione del bean fallisce,
																			// reindirizzo alla homepage
		} else {
			request.getSession().setAttribute("utente", userBean); // salvo nella sessione, nel campo user, il bean appena
																	// creato
			String target = "/GoToHomePage";
			path = path + target; // costruisco il path completo
		}

		response.sendRedirect(path); // redirigo l'utente alla corretta homepage
	}
	
	}

}
