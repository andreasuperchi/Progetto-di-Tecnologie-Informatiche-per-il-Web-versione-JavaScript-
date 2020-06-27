(function(){
	document.getElementById("loginButton").addEventListener('click', (e) => {
		var form = e.target.closest("form");
		if (form.checkValidity()){
			asyncCall("POST", 'CheckLogin', new FormData(e.target.closest("form")),
					function(request){
						if(request.readyState == XMLHttpRequest.DONE){
							var message = request.responseText;
							switch (request.status){
								case 200:
									sessionStorage.setItem('username', message);
									window.location.href = "HomePage.html";
									break;
								case 400:
								case 401:
								case 500:
									document.getElementById("error").textContent = message;
									break;
							}
						}
					}
			);
		}else{
			form.reportValidity();
		}
	});
})();

(function() {
	var data = document.getElementById("data_nascita");
	data.max = new Date().toISOString().split("T")[0];
	
	document.getElementById("registerButton").addEventListener('click', (e) => {
		var modalRegister = document.getElementById("register_modal");
		var modalRegisterContent = document.getElementById("register_modal_content");
		var form = document.forms["register_form"];
		
		document.getElementById("register_error").innerHTML = "";
		form.reset();		
		
		modalRegister.style.display = "block";
		modalRegister.style.visibility = "visible";
		modalRegisterContent.style.visibility = "visible";
		
		document.getElementById("close_register").addEventListener('click', (e) => {
			modalRegister.style.display = "none";
		});
		
		window.onclick = function(event) {
			if (event.target == modalRegister) {
				modalRegister.style.display = "none";
			}
		}
		
		document.getElementById("registerSubmit").addEventListener('click', (e) => {
			var password = form["password"].value;
			var confermaPassword = form["confermaPassword"].value;
			
			if (form.checkValidity()){
				if (password != confermaPassword) {
					document.getElementById("register_error").textContent = "Corrispondenza tra le password errata!";
				} else {
					asyncCall("POST", 'RegistraUtente', new FormData(form),
							function(request){
								if(request.readyState == XMLHttpRequest.DONE){
									var message = request.responseText;
									switch (request.status){
										case 200:
											modalRegister.style.display = "none";
											break;
										default:
											document.getElementById("register_error").textContent = message;
											break;
									}
								}
							}
					);
				}
			}else{
				form.reportValidity();
			}
		})
	})
})();