<register>
	<form onsubmit="{checkForm}" if="{currentStep==1}" class="form default">
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
		</div>
		<input type="submit" value="Registrera"	/>
	</form>
	<form onsubmit="{addUserInfo}" if="{currentStep==2}">
		<h2>Uppgifter</h2>
		<span id="closeMe" onclick="{closeMe}">&#x2716;</span>		
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
		<input type="submit" value="Spara"	/>	

	</form>
	<div if="{currentStep == 3}" class="registerFinished">
		<h2>Tack för din registrering!</h2>
		<span id="closeMe" onclick="{closeMe}">&#x2716;</span>		
		<span>Klicka här för att komma till chatten!</span>
	</div>
	<script>
		me = this;
		RiotControl.addStore(this);
		this.errorText = '';
		this.revealPassword = false;
		me.currentStep = 1;

		closeMe(){
			this.parent.unmount();
		}

		showPassword(e){
			this.revealPassword = !this.revealPassword;
		}
		/* Validate registration form */
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
			this.registerUser(e.target.registerEmail.value,e.target.registerPassword.value);
		}

		/* Register new user */
		registerUser(email,password){

			//Remove when we are ready for real.
			//me.currentStep = 2;
			//me.update();
			//return;
			//Remove above to stop dry running!
			firebase.auth().createUserWithEmailAndPassword(email, password)
			.then(function(user){
				console.log('user created');
				me.currentStep = 2;
				me.update();
				return;				
			}).catch(function(error) {
	  			// Handle Errors here.
	  			console.log('error');
	  			console.log(error);
	  			var errorCode = error.code;
	  			var errorMessage = error.message;
	  			if (errorCode==='auth/email-already-in-use') {
	  				me.errorText = 'E-post adressen finns redan.';
	  				me.update();
	  				return;
	  			}
	  			if(errorCode==='auth/invalid-email'){
	  				me.errorText = 'Ogiltig e-post adress.';
	  				me.update();
	  				return;
	  			}
			});
		}
		addUserInfo(e){
			e.preventDefault();
			console.log('update user in register tag');
			var user = {
				alias: e.target.registerAlias.value,
				firstname: e.target.registerFirstname.value,
				lastname: e.target.registerLastname.value,
				phone: e.target.registerPhone.value
			};


			RiotControl.trigger('UPDATE_USER', user);
			me.currentStep = 3;
			me.update();



			window.setTimeout(function(){
				RiotControl.trigger('REMOVE_LOGIN')
			}, 3500);
			return;		
		}
	</script>
</register>