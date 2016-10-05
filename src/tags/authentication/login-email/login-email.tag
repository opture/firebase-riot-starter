<login-email>

	<form onsubmit="{doLogin}" if="{!doRegister}">
		<h2>Logga in</h2>
		<span id="closeMe" onclick="{closeMe}">&#x2716;</span>

		<div class="input-container">
			<div class="input-icon">
				<span class="input-group-addon"><i class="fa fa-envelope-o fa-fw" aria-hidden="true"></i></span>
				<input type="text" name="email" placeholder="E-post" />
			</div>
			<div class="input-icon">
				<span class="input-group-addon"><i class="fa fa-key fa-fw" aria-hidden="true"></i></span>
				<input type="password" name="password" placeholder="Lösenord" />
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
		this.errorList = [
			{name:'email', required:true, errMess:'Ange e-post'},
			{name:'password', required:true, errMess:'Ange lösenord'},
		];

		switchToRegister(){
			this.doRegister = !this.doRegister;
		}
		closeMe(){
			me.unmount();
		}

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
	  			var errorMessage = error.message;
	  			// ...
			});
		}
		onLoginSuccess(){
			//me.unmount();
		}
		this.on('LOGGED_IN', this.onLoginSuccess);
	</script>
</login-email>
