<login-email>

	<form onsubmit="{doLogin}" if="{!doRegister}">
		<h2>Logga in</h2>
		<span id="closeMe" onclick="{closeMe}">&#x2716;</span>

		<div class="input-container">
		<div class="error {hidden: !errorText}">{errorText}</div>
			<div class="input-icon">
				<span class="input-group-addon"><i class="fa fa-envelope-o fa-fw" aria-hidden="true"></i></span>
				<input type="text" name="email" class="{error: emailMissing}" placeholder="E-post" />
			</div>
			<div class="input-icon">
				<span class="input-group-addon"><i class="fa fa-key fa-fw" aria-hidden="true"></i></span>
				<input type="password" name="password" class="{error: pwdMissing}" placeholder="Lösenord" />
			</div>
		</div>		
		<input type="submit" value="Logga in" />
		<input type="button" onclick="{switchToRegister}" value="Registrera" />
	</form>
	<register if="{doRegister}"></register>
	<script>
		var me  =this;
		this.doRegister = false;
		RiotControl.addStore(this);



		switchToRegister(){
			this.doRegister = !this.doRegister;
		}
		closeMe(){
			me.unmount();
		}

		setError(errorCode){
  			if (errorCode=='auth/invalid-email'){
  				me.errorText = 'Felaktig e-post adress';
  			}
  			if(errorCode=='auth/user-disabled'){
				me.errorText = 'Användaren avaktiverad';
  			}
  			if (errorCode=='auth/user-not-found'){
  				me.errorText = 'Användaren finns inte';
  			}
  			if (errorCode=='auth/wrong-password'){
  				me.errorText = 'Fel lösenord';
  			}
  			me.update();
		};


		doLogin(e){
			var email = e.target.email.value,
				password = e.target.password.value;

			e.preventDefault();

			if (!email){
				alert('Ange e-post');
				return;
			}
			if (!password){
				alert('Ange lösenord');
				return;
			}		
			firebase.auth().signInWithEmailAndPassword(email, password)
			.then(function(){
				console.log('tag says user is logged in');
				me.closeMe();
				RiotControl.trigger('LOGIN_SUCCESS');

			}).catch(function(error) {
	  			// Handle Errors here.
	  			var errorCode = error.code;
	  			me.setError(errorCode)
			});
		}
		onLoginSuccess(){
			//me.unmount();
		}
		this.on('LOGGED_IN', this.onLoginSuccess);
	</script>
</login-email>
