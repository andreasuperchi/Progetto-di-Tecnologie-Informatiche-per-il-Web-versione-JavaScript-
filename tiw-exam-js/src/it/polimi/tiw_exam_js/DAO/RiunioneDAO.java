package it.polimi.tiw_exam_js.DAO;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import it.polimi.tiw_exam_js.beans.Utente;

public class RiunioneDAO {
	private Connection connection;
	
	public RiunioneDAO(Connection connection) {
		this.connection = connection;
	}
	
	public List<Utente> trovaPartecipanti(int idRiunione) throws SQLException{
		List<Utente> partecipanti = new ArrayList<Utente>();
		String query = "SELECT * FROM partecipanti JOIN utente ON id = id_partecipante WHERE id_riunione = ? ORDER BY name ASC";
		
		try(PreparedStatement pstatement = connection.prepareStatement(query)){
			pstatement.setInt(1, idRiunione);
			
			try(ResultSet result = pstatement.executeQuery()){
				while (result.next()) {
					Utente utente = new Utente();
					
					utente.setId(result.getInt("id"));
					utente.setUsername(result.getString("username"));
				
					partecipanti.add(utente);
				}
			}
		}
		return partecipanti;
	}
	
	public void addPartecipante(int idRiunione, int idPartecipante) throws SQLException{
		String query = "INSERT INTO partecipanti (id_riunione, id_partecipante) VALUES (?,?)";
		
		try(PreparedStatement pstatement = connection.prepareStatement(query);){
			pstatement.setInt(1, idRiunione);
			pstatement.setInt(2, idPartecipante);
			
			pstatement.executeUpdate();
		}
		
	}
}
