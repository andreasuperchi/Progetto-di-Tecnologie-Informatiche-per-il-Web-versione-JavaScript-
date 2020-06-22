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
	    	asyncCall("GET","GetRiunioniInvitato", null, 
	    		function (request){
	    			if(request.readyState == 4){
	    				var message = request.responseText;
	    				if(request.status == 200){
	    					self.update(JSON.parse(request.responseText));
	    					if(next){
	    						next();
	    					}else{
	    						self.alert.textContent = message;
	    					}
	    				}
	    			}
	    	} );
	    };
	    
	    this.update = function(arrayRiunioni){
	    	var l = arrayRiunioni.lenght,
	    		row, cell;
	    	if(l == 0){
	    		alert.textContent = "Non ci sono Riunioni";
	    	}else{
	    		this.listcontainerbody.innerHTML = "";
	    		var self = this;
	    		arrayRiunioni.forEach(function(riunione){
	    			row = document.createElement("tr");
	    			cell = document.createEleemnt("td");
	    			cell.textContent = riunione.id;
	    			row.appendChild(cell);
	    			self.appendChild(row);
	    		})
	    	}
	    }
	    
	    
	    
	}
})