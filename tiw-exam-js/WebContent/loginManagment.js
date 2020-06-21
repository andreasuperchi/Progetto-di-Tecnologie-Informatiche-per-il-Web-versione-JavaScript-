
(function(){
	document.getElementById("loginButton").addEventListener('click', (e) => {
		var form = e.target.closest("form");
		if (form.checkValididty()){
			asyncCall("POST", 'CheckLogin', e.target.closest("form"),
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