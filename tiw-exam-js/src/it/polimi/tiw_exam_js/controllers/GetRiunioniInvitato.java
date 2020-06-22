package it.polimi.tiw_exam_js.controllers;

import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.google.gson.Gson;

import it.polimi.tiw_exam_js.DAO.UtenteDAO;
import it.polimi.tiw_exam_js.beans.Riunione;
import it.polimi.tiw_exam_js.beans.Utente;
import it.polimi.tiw_exam_js.utils.ConnectionHandler;

@WebServlet("/GetRiunioniInvitato")
public class GetRiunioniInvitato extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private Connection connection;
       
    public GetRiunioniInvitato() {
        super();
    }
    
    public void init() throws ServletException {
		connection = ConnectionHandler.getConnection(getServletContext());
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		HttpSession ses = request.getSession();	//recupero la sessione
		Utente utente = (Utente) ses.getAttribute("utente");	//recupero l'utente dalla sessione
		UtenteDAO uDAO = new UtenteDAO(connection);
		List<Riunione> riunioniInvitato = new ArrayList<Riunione>();
		
		try {
			riunioniInvitato = uDAO.trovaRiunioniACuiSonoStatoInvitato(utente.getId());	//recupero le riunioni a l'utente è stato invitato
		} catch(SQLException e) {
			e.printStackTrace();
			response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			response.getWriter().println("Errore nel recuperare le riunioni a cui sei stato invitato");
			return;
		}
		
		Gson gson = new Gson();
		String json = gson.toJson(riunioniInvitato);	//uso gson per serializzare
		
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		response.getWriter().write(json);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}
	
	public void destroy() {
		try {
			ConnectionHandler.closeConnection(connection);
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
}
