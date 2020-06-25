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

import org.apache.commons.lang.StringEscapeUtils;
import org.w3c.dom.html.HTMLCollection;
import org.w3c.dom.html.HTMLElement;
import org.w3c.dom.html.HTMLFormElement;

import com.google.gson.Gson;

import it.polimi.tiw_exam_js.DAO.UtenteDAO;
import it.polimi.tiw_exam_js.beans.Riunione;
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
		Riunione riunione = new Riunione();
		int idRiunione;
		
		UtenteDAO utenteDAO = new UtenteDAO(connection);
		
		String titolo = request.getParameter("titolo");
		String data = request.getParameter("data");
		String ora = request.getParameter("ora");
		String durata = request.getParameter("durata");
		int num_max_partecipanti = Integer.parseInt(request.getParameter("num_max_partecipanti"));
		
		riunione.setTitolo(titolo);
		riunione.setData(data);
		riunione.setOra(ora);
		riunione.setDurata(durata);
		riunione.setNum_max_partecipanti(num_max_partecipanti);
		riunione.setHost(utente.getId());
				
		String listaInvitatiString = request.getParameter("listaInvitati");
		String[] listaInvitati = listaInvitatiString.split(",");
		List<Integer> listaInvitatiFinal = new ArrayList<Integer>();
		
		for(int i = 0; i < listaInvitati.length; i++) {
			int temp = Integer.parseInt(listaInvitati[i]);
			listaInvitatiFinal.add(temp);
		}
		
		if(listaInvitatiFinal.size() > num_max_partecipanti) {
			utente.setNumeroTentativi(utente.getNumeroTentativi() + 1);
			
			response.setStatus(HttpServletResponse.SC_FORBIDDEN);
			
			if(utente.getNumeroTentativi() == 3) {
				response.getWriter().println("Numero massimo di tentativi raggiunto!");
			} else {
				response.getWriter().println("Troppi invitati selezionati! Riprova.");
			}
			
			return;
		}
//			} else {
//				path = "/WEB-INF/Anagrafica.html";
//				
//			}
//			
//		} else {			
//			try {
//				utenteDAO.creaRiunione(titolo, data, ora, durata, num_max_partecipanti, host);
//				idRiunione = utenteDAO.trovaIDRiunione();
//				RiunioneDAO riunioneDAO = new RiunioneDAO(idRiunione, connection);
//				for(int i : listaInvitati) {
//					riunioneDAO.addPartecipante(i);
//				}
//			}
//			catch(SQLException e) {
//				response.sendError(HttpServletResponse.SC_BAD_GATEWAY, "Errore nella creazione della riunione");
//			}
//			
//			String path = getServletContext().getContextPath();
//			String target = "/GoToHomePage";
//			
//			path = path + target;
//			
//			response.sendRedirect(path);
//		}
	//}
	}

	public void destroy() {
		try {
			ConnectionHandler.closeConnection(connection);
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
}
