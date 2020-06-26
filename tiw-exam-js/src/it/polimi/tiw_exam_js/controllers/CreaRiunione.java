package it.polimi.tiw_exam_js.controllers;

import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import it.polimi.tiw_exam_js.DAO.RiunioneDAO;
import it.polimi.tiw_exam_js.DAO.UtenteDAO;
import it.polimi.tiw_exam_js.beans.Utente;
import it.polimi.tiw_exam_js.utils.ConnectionHandler;

@WebServlet("/CreaRiunione")
@MultipartConfig
public class CreaRiunione extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private Connection connection;
       
    public CreaRiunione() {
        super();
    }
    
    public void init() throws ServletException {
		connection = ConnectionHandler.getConnection(getServletContext());
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Utente utente = (Utente) request.getSession().getAttribute("utente");
		int idRiunione = -1;
		
		UtenteDAO utenteDAO = new UtenteDAO(connection);
		
		String titolo = request.getParameter("titolo");
		String data = request.getParameter("data");
		String ora = request.getParameter("ora");
		String durata = request.getParameter("durata");
		int num_max_partecipanti = Integer.parseInt(request.getParameter("num_max_partecipanti"));
				
		String listaInvitatiString = request.getParameter("listaInvitati");
		String[] listaInvitati = listaInvitatiString.split(",");
		List<Integer> listaInvitatiFinal = new ArrayList<Integer>();
		
		for(int i = 0; i < listaInvitati.length; i++) {
			int temp = Integer.parseInt(listaInvitati[i]);
			listaInvitatiFinal.add(temp);
		}
		
		if(listaInvitatiFinal.size() > num_max_partecipanti) {
			utente.setNumeroTentativi(utente.getNumeroTentativi() + 1);
			
			if(utente.getNumeroTentativi() == 3) {
				response.getWriter().println("Numero massimo di tentativi raggiunto! Prova a creare una nuova riunione.");
				response.setStatus(HttpServletResponse.SC_FORBIDDEN);
			} else {
				response.getWriter().println("Troppi invitati selezionati! Rimuovi " + (listaInvitatiFinal.size() - num_max_partecipanti) + " partecipanti.");
				response.setStatus(HttpServletResponse.SC_BAD_GATEWAY);
			}
			
			return;	
		} else {			
			try {
				utenteDAO.creaRiunione(titolo, data, ora, durata, num_max_partecipanti, utente.getId());
				idRiunione = utenteDAO.trovaIDRiunione(utente.getId());
				RiunioneDAO riunioneDAO = new RiunioneDAO(connection);
				for(int i : listaInvitatiFinal) {
					riunioneDAO.addPartecipante(idRiunione, i);
				}
			}
			catch(SQLException e) {
				response.getWriter().println("Errore nella creazione della riunione nel database.");
				response.setStatus(HttpServletResponse.SC_BAD_GATEWAY);
			}
			
			response.setStatus(HttpServletResponse.SC_OK);
			response.setContentType("application/json");
			response.setCharacterEncoding("UTF-8");
			response.getWriter().print(idRiunione);
		}
	}

	public void destroy() {
		try {
			ConnectionHandler.closeConnection(connection);
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
}
