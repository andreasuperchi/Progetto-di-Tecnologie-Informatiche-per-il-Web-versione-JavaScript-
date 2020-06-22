(function(){
	var riunioniInvitato, riunioneIndette, wizard, pageOrchestrator = new PageOrchestrator();
	
	window.addEventListener("load", () =>{
		pageOrchestrator.start();
		pageOrchestrator.refresh();
	}, false);
	
	
	
	
	function ListaRiunioniInvitato (_alert, _listcontainer, _listcontainerbody){
	    this.alert = _alert
		this.listcontainer = _listcontainer;
	    this.listcontainerbody = _listcontainerbod
		
	    this.reset = function(){
	    	this.listcontainer.style.visibility = "hidden";
	    }
	    
	    this.show = function(next){								//Recupera la lista delle riunioni a cui è stato invitato l'utente
	    	this.self = this;
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
	    	} );
	    };
	    
	    this.update = function(arrayRiunioni){
	    	var l = arrayRiunioni.lenght,
	    		row, idCell, dataCell, oraCell, durataCell, numCell, hostCell;
	    	if(l == 0){
	    		alert.textContent = "Non ci sono Riunioni";
	    	}else{
	    		this.listcontainerbody.innerHTML = "";
	    		var self = this;
	    		arrayRiunioni.forEach(function(riunione){
	    			row = document.createElement("tr");
	    			idCell = document.createEleemnt("td");
	    			idCell.textContent = riunione.id;
	    			row.appendChild(idCell);
	    			dataCell = document.createElementById("td");
	    			dataCell.textContent = riunione.data;
	    			row.appendChild(dataCell);
	    			oraCell = document.createElementById("td");
	    			oraCell.textContent = riunione.ora;
	    			row.appendChild(oraCell);
	    			durataCell = document.createElementById("td");
	    			durataCell.textContent = riunione.durata;
	    			row.appendChild(durataCell);
	    			numCell = document.createElementById("td");
	    			numCell.textContent = riunione.num_max_partecipanti;
	    			row.appendChild(numCell);
	    			hostCell = document.createElementById("td");
	    			hostCell.textContent = riunione.host;
	    			row.appendChild(host);
	    			self.appendChild(row);
	    		})
	    	}
	    	this.listcontainer.style.visibility = "visible";
	    }
	    
	    
	    
	}
	
	
	
	function PageOrchestrator(){
		var alertcontainer = document.getElementById("id_alert");
		this.start = function(){
			listaRiunioniInvitato = new ListaRiunioniInvitato(alertContainer,
					document.getElementById("id_riunioni_invitato"),
					document.getElementById("id_riunioni_invitato_body"));
			}
		
	    }
})