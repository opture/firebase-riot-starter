<add-user>
	<form onsubmit="{checkForm}" class="form default">
		<h2>Registrera användare</h2>
		<span id="closeMe" onclick="{closeMe}">&#x2716;</span>	
		<div class="error {hidden: !errorText}">{errorText}</div>
		<div class="input-container">
			<div class="input-icon">
				<span class="input-group-addon"><i class="fa fa-envelope-o fa-fw" aria-hidden="true"></i></span>
				<input type="text" name="registerEmail" placeholder="E-post" />
			</div>
			<div class="input-icon">
				<span class="input-group-addon"><i class="fa fa-key fa-fw" aria-hidden="true"></i></span>
				<input type="{password: !revealPassword, text: revealPassword}" name="registerPassword" placeholder="Lösenord" />
				<span class="input-group-addon-right" onclick="{showPassword}"><i class="fa fa-eye" aria-hidden="true"></i></span>
			</div>
			<div class="input-icon">
				<input type="text" name="registerAlias" placeholder="Alias" />
			</div>		
			<div class="input-icon">
				<input type="text" name="registerFirstname" placeholder="Förnamn" />
			</div>
			<div class="input-icon">			
				<input type="text" name="registerLastname" placeholder="Efternamn" />
			</div>
			<div class="input-icon">		
				<input type="text" name="registerPhone" placeholder="Telefon" />
			</div>
		</div>
		<input type="submit" value="Spara"	/>	

	</form>	
	<script>
		var me  =this;
		this.doRegister = false;
		RiotControl.addStore(this);

		checkForm(e){
			e.preventDefault();
			if (!e.target.registerEmail.value){
				alert('No User name');
				return;
			}
			if (!e.target.registerPassword.value){
				alert('No password');
				return;
			}
			this.registerUser(e.target.registerEmail.value,e.target.registerPassword.value,e);
		}		
		/* Register new user */
		registerUser(email,password,e){
			//Thsi posts to the identity toolkit api directly to prevent from login as the new user.
			fetch('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDfdZH8ubnnu9Kuy1sj4HWe1oQcNomII4Y', {
			  method: 'POST',
			  headers: {
			    'Accept': 'application/json',
			    'Content-Type': 'application/json'
			  },
			  body: JSON.stringify({
			    email: email,
			    password: password,
			    returnSecureToken:true
			  })
			}).then(function(response) {
    			return response.json()
  			}).then(function(json) {
    			//Set the user information.

				var userId = json.localId;
				
				var userData = {
					alias: e.target.registerAlias.value,
					firstname: e.target.registerFirstname.value,
					lastname: e.target.registerLastname.value,
					phone: e.target.registerPhone.value,

				};
				
			  	firebase.database().ref('users/' + userId).update(userData);

				user.updateProfile({
				  displayName: displayName
				}).then(function() {
				  // Update successful.
				  console.log('user updated');
				}, function(error) {
				  // An error happened.
				  console.log('user update error');
				  console.log(error);
				});  			

  			}).catch(function(ex) {
    			console.log('parsing failed', ex)
  			});

		}
	</script>
</add-user>