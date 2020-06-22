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
	    		this.listcontainer.style.visibility = "visible";
	    	}  
	    }
	}

	
	
	
	function PageOrchestrator(){
		var alertContainer = document.getElementById("id_alert");
		this.start = function(){
			listaRiunioniInvitato = new ListaRiunioniInvitato(alertContainer,
					document.getElementById("id_riunioni_invitato"),
					document.getElementById("id_riunioni_invitato_body"));
		};
		
		this.refresh = function() {
			listaRiunioniInvitato.reset();
			listaRiunioniInvitato.show();
		};
	}
})();