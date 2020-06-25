(function(){
	var riunioniInvitato, riunioneIndette, wizard, pageOrchestrator = new PageOrchestrator();
	
	window.addEventListener("load", () =>{
		pageOrchestrator.start();
		pageOrchestrator.refresh();
	}, false);
	
	function ListaRiunioniInvitato (_alert, _listcontainer, _listcontainerbody){
	    this.alert = _alert
		this.listcontainer = _listcontainer;
	    this.listcontainerbody = _listcontainerbody;
		
	    this.reset = function(){
	    	this.listcontainer.style.visibility = "hidden";
	    }
	    
	    this.show = function(next){								//Recupera la lista delle riunioni a cui è stato invitato l'utente
	    	var self = this;
	    	asyncCall("GET",'GetRiunioniInvitato', null, 
	    		function (request){
	    			if(request.readyState == 4){
	    				var message = request.responseText;
	    				if(request.status == 200){
	    					self.update(JSON.parse(request.responseText));
	    					if(next){
	    						next();
	    					}
	    				}else{
    						self.alert.textContent = message;
    					}
	    			}
	    		}
	    	);
	    };
	    
	    this.update = function(arrayRiunioni){
	    	var l = arrayRiunioni.lenght,
	    		row, idCell, titoloCell, dataCell, oraCell, durataCell, numCell, hostCell;
	    	if(l == 0){
	    		alert.textContent = "Non ci sono Riunioni";
	    	}else{
	    		this.listcontainerbody.innerHTML = "";
	    		var self = this;
	    		arrayRiunioni.forEach(function(riunione){
	    			row = document.createElement("tr");
	    			idCell = document.createElement("td");
	    			idCell.textContent = riunione.id;
	    			row.appendChild(idCell);
	    			titoloCell = document.createElement("td");
	    			titoloCell.textContent = riunione.titolo;
	    			row.appendChild(titoloCell);
	    			dataCell = document.createElement("td");
	    			dataCell.textContent = riunione.data;
	    			row.appendChild(dataCell);
	    			oraCell = document.createElement("td");
	    			oraCell.textContent = riunione.ora;
	    			row.appendChild(oraCell);
	    			durataCell = document.createElement("td");
	    			durataCell.textContent = riunione.durata;
	    			row.appendChild(durataCell);
	    			numCell = document.createElement("td");
	    			numCell.textContent = riunione.num_max_partecipanti;
	    			row.appendChild(numCell);
	    			hostCell = document.createElement("td");
	    			hostCell.textContent = riunione.host;
	    			row.appendChild(hostCell);
	    			self.listcontainerbody.appendChild(row);
	    		});
	    		
	    	}  
	    	this.listcontainer.style.visibility = "visible";
	    }
	}
	
	function ListaRiunioniIndette(_alert, _listcontainer, _listcontainerbody){
		this.alert = _alert
		this.listcontainer = _listcontainer;
	    this.listcontainerbody = _listcontainerbody;
		
	    this.reset = function(){
	    	this.listcontainer.style.visibility = "hidden";
	    }
	    
	    this.show = function(next){								//Recupera la lista delle riunioni a cui è stato invitato l'utente
	    	var self = this;
	    	asyncCall("GET",'GetRiunioniIndette', null,
	    		function (request){
	    			if(request.readyState == 4){
	    				var message = request.responseText;
	    				if(request.status == 200){
	    					self.update(JSON.parse(request.responseText));
	    					if(next){
	    						next();
	    					}
	    				}else{
    						self.alert.textContent = message;
    					}
	    			}
	    		}
	    	);
	    };
	    
	    this.update = function(arrayRiunioni){
	    	var l = arrayRiunioni.lenght,
	    		row, idCell, titoloCell, dataCell, oraCell, durataCell, numCell;
	    	if(l == 0){
	    		alert.textContent = "Non ci sono Riunioni";
	    	}else{
	    		this.listcontainerbody.innerHTML = "";
	    		var self = this;
	    		arrayRiunioni.forEach(function(riunione){
	    			row = document.createElement("tr");
	    			idCell = document.createElement("td");
	    			idCell.textContent = riunione.id;
	    			row.appendChild(idCell);
	    			titoloCell = document.createElement("td");
	    			titoloCell.textContent = riunione.titolo;
	    			row.appendChild(titoloCell);
	    			dataCell = document.createElement("td");
	    			dataCell.textContent = riunione.data;
	    			row.appendChild(dataCell);
	    			oraCell = document.createElement("td");
	    			oraCell.textContent = riunione.ora;
	    			row.appendChild(oraCell);
	    			durataCell = document.createElement("td");
	    			durataCell.textContent = riunione.durata;
	    			row.appendChild(durataCell);
	    			numCell = document.createElement("td");
	    			numCell.textContent = riunione.num_max_partecipanti;
	    			row.appendChild(numCell);
	    			self.listcontainerbody.appendChild(row);
	    		});
	    		
	    	}  
	    	this.listcontainer.style.visibility = "visible";
	    }
	}
	
	function ListaInviti(_alert, _listcontainer, _listcontainerbody) {
		this.alert = _alert;
		this.listcontainer = _listcontainer;
	    this.listcontainerbody = _listcontainerbody;
	    var datiRiunione;
	    var listaID = new Array();
		
		document.getElementById("creariunione").addEventListener('click', (e) => {
			var form = document.forms["creation_form"];
			var modal = document.getElementById("modal");
			var modalBottom = document.getElementById("modal-bottom");
			
			if(form.checkValidity()) {
				modal.style.display = "block";
				
				(function() {
					document.getElementById("close").addEventListener('click', (e) => {
						modal.style.display = "none";
					});
				})();
				
				window.onclick = function(event) {
					if (event.target == modal) {
						modal.style.display = "none";
					}
				}
			}
		});
			
		this.reset = function(){
		    	this.listcontainer.style.visibility = "hidden";
		}
			
		this.show = function(next){								//Recupera la lista delle riunioni a cui è stato invitato l'utente
	    	var self = this;
	    	asyncCall("GET",'GetInvitati', null,
	    		function (request){
	    			if(request.readyState == 4){
	    				var message = request.responseText;
	    				if(request.status == 200){
	    					self.update(JSON.parse(request.responseText));
	    					if(next){
	    						next();
	    					}
	    				}else{
    						self.alert.textContent = message;
    					}
	    			}
	    		}
	    	);
	    };
			
		this.update = function(listaInvitati) {
			var l = listaInvitati.length,
				row, idCell, nomeCell, cognomeCell, checkBox;
			if (l == 0) {
				alert.textContent = "Non ci sono persone da invitare.";
			} else {
				var self = this;
		
				row = document.createElement("tr");
				
				idCell = document.createElement("td");
    			idCell.textContent = "ID";
    			row.appendChild(idCell);
    			
    			nomeCell = document.createElement("td");
    			nomeCell.textContent = "Nome";
    			row.appendChild(nomeCell);
    			
    			cognomeCell = document.createElement("td");
    			cognomeCell.textContent = "Cognome";
    			row.appendChild(cognomeCell);
    			
    			checkBox = document.createElement("td");
    			checkBox.textContent = "Da Invitare";
    			row.appendChild(checkBox);
    			
    			self.listcontainerbody.appendChild(row);
				
				listaInvitati.forEach(function(invitato) {
					
					row = document.createElement("tr");
					
					idCell = document.createElement("td");
	    			idCell.textContent = invitato.id;
	    			row.appendChild(idCell);
	    			
	    			nomeCell = document.createElement("td");
	    			nomeCell.textContent = invitato.nome;
	    			row.appendChild(nomeCell);
	    			
	    			cognomeCell = document.createElement("td");
	    			cognomeCell.textContent = invitato.cognome;
	    			row.appendChild(cognomeCell);
	    			
	    			checkBox = document.createElement("input");
	    			checkBox.type = 'checkbox';
	    		    checkBox.id = invitato.id;
	    		    checkBox.onclick = function() {
	    		    	cb = document.getElementById(invitato.id);
	    				if (cb.checked == true) {
	    					listaID.push(cb.id);
	    				} else {
	    					var index = listaID.indexOf(cb.id);
	    					listaID.splice(index, 1);
	    				}
	    			};
	    			row.appendChild(checkBox);
	    			
	    			self.listcontainerbody.appendChild(row);
	    			
				});
				
				var q = row, button;
				
				row = document.createElement("tr");
				
				button = document.createElement("input");
				button.type = 'button';
				button.id = -1;
				button.value = "Invita";
				button.onclick = function() {
//					if (listaID.length > document.forms["creation_form"]["numero_max_partecipanti"].value) {
//						alert.textContent = "Numero massimo di persone superato!";
					if (0 == 1) {
						console.log("fra gay");
					} else {
						var finalForm = new FormData();
						
						finalForm.append("titolo", document.forms["creation_form"]["titolo"].value);
						finalForm.append("data", document.forms["creation_form"]["data"].value);
						finalForm.append("ora", document.forms["creation_form"]["ora"].value);
						finalForm.append("durata", document.forms["creation_form"]["durata"].value);
						finalForm.append("num_max_partecipanti", document.forms["creation_form"]["numero_max_partecipanti"].value);
						finalForm.append("listaInvitati", listaID);
						
						asyncCall("POST",'CreaRiunione', finalForm,
					    		function (request){
					    			if(request.readyState == 4){
					    				var message = request.responseText;
					    				if(request.status == 200){
					    					self.update(JSON.parse(request.responseText));
					    					if(next){
					    						next();
					    					}
					    				}else{
					    					var errore = "Numero massimo di tentativi raggiunto!";
					    					if (message.localeCompare(errore) == 0) {
					    						console.log("sono qui");
					    						this.listcontainerbody.style.visibility = "hidden";
					    					}
				    						self.alert.textContent = message;
				    					}
					    			}
					    		}
					    );					
					}
				};
				
				row.appendChild(button);
				
				self.listcontainerbody.appendChild(row);
			}
	    	this.listcontainer.style.visibility = "visible";
		}
	};
	
	function PageOrchestrator(){
		var alertContainer = document.getElementById("id_alert");
		var alertModale = document.getElementById("alert_modale");
		
		this.start = function(){
			listaRiunioniInvitato = new ListaRiunioniInvitato(
					alertContainer,
					document.getElementById("id_riunioni_invitato"),
					document.getElementById("id_riunioni_invitato_body"));
			
			listaRiunioniIndette = new ListaRiunioniIndette(
					alertContainer,
					document.getElementById("id_riunioni_indette"),
					document.getElementById("id_riunioni_indette_body"));
			
			listaInviti = new ListaInviti(
					alertModale,
					document.getElementById("modal"),
					document.getElementById("modal-box"));
			
			
			
		};
		
		this.refresh = function() {
			listaRiunioniInvitato.reset();
			listaRiunioniInvitato.show();
			
			listaRiunioniIndette.reset();
			listaRiunioniIndette.show();
			
			listaInviti.reset();
			listaInviti.show();
		};
	}
})();