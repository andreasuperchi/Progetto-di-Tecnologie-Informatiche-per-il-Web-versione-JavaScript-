package it.polimi.tiw_exam_js.controllers;

import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import it.polimi.tiw_exam_js.DAO.UtenteDAO;
import it.polimi.tiw_exam_js.utils.ConnectionHandler;

@WebServlet("/RegistraUtente")
@MultipartConfig
public class RegistraUtente extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private Connection connection;

    public RegistraUtente() {
        super();
    }
    
    public void init() throws ServletException {
    	connection = ConnectionHandler.getConnection(getServletContext());
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String username = request.getParameter("username");
		String password = request.getParameter("password");
		String confermaPassword = request.getParameter("confermaPassword");
		String mail = request.getParameter("mail");
		String nome = request.getParameter("nome");
		String cognome = request.getParameter("cognome");
		String data_nascita = request.getParameter("data_nascita");
		
		UtenteDAO uDAO = new UtenteDAO(connection);
		
		if (!password.contentEquals(confermaPassword)) {
			response.setStatus(HttpServletResponse.SC_BAD_GATEWAY);
			response.getWriter().println("Corrispondenza errata tra le password!");
		} else {
			try {
				uDAO.addUtente(username, password, mail, nome, cognome, data_nascita);
				
				response.setStatus(HttpServletResponse.SC_OK);
			} catch(SQLException e) {
				response.setStatus(HttpServletResponse.SC_BAD_GATEWAY);
				response.getWriter().println("Errore durante la registrazione dell'utente nel database! Username o mail già registrati");
			}
		}
	}

}