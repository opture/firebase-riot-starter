<register>
	<form onsubmit="{checkForm}" if="{currentStep==1}" class="form default">
		<div class="error {hidden: !errorText}">Error</div>
		<yoshiko-input type="text" inputname="email" label="E-post"></yoshiko-input>
		<yoshiko-input type="password" inputname="password" label="Lösenord"></yoshiko-input>
		<yoshiko-input type="password" inputname="repeatpassword" label="Repetera lösenord"></yoshiko-input>
		<input type="submit" value="Registrera"	/>
	</form>
	<form onsubmit="{addUserInfo}" if="{currentStep==2}">
		<yoshiko-input type="text" inputname="username" label="Användarnamn"></yoshiko-input>
		<yoshiko-input type="text" inputname="firstname" label="Förnamn"></yoshiko-input>
		<yoshiko-input type="text" inputname="lastname" label="Efternamn"></yoshiko-input>
		<yoshiko-input type="text" inputname="telephone" label="Telefon"></yoshiko-input>
		<input type="submit" value="Spara"	/>	
	</form>
	<script>
		me = this;
		this.errorText = '';
		me.currentStep = 1;
		
		/* Validate registration form */
		checkForm(e){
			e.preventDefault();
			if (!e.target.email.value){
				alert('No User name');
				return;
			}
			if (!e.target.password.value){
				alert('No password');
				return;
			}
			this.registerUser(e.target.email.value,e.target.password.value);
		}

		/* Register new user */
		registerUser(email,password){

			//Remove when we are ready for real.
			me.currentStep = 2;
			me.update();
			return;
			//Remove above to stop dry running!
			firebase.auth().createUserWithEmailAndPassword(email, password)
			.then(function(user){
				console.log('user created');
				me.currentStep = 2;
				me.update();
				return;				
			}).catch(function(error) {
	  			// Handle Errors here.
	  			var errorCode = error.code;
	  			var errorMessage = error.message;
	  			if (errorCode==='auth/email-already-in-use') {
	  				errorText = 'E-post adressen finns redan.';
	  				me.update();
	  				return;
	  			}


	  			/*

	  			auth/invalid-email
	  			auth/operation-not-allowed
	  			auth/weak-password
	  			*/
	  			console.log(errorCode);
	  			console.log(errorMessage);
	  			// ...
			});
		}
		addUserInfo(e){
			e.preventDefault();
		}
	</script>
</register>