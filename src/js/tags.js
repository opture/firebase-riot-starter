riot.tag2('appmenu', '<nav class="topmenu"><ul><li><a href="#">Om oss</a></li><li><a href="#">Frågor</a></li><li if="{!currentUser}" onclick="{showLogin}"><a href="#login">Login</a></li><li if="{currentUser && currentUser.displayName}">{currentUser.displayName}</li><li if="{currentUser}" onclick="{doLogout}"><a href="#login">Logga ut</a></li></ul></nav>', '', '', function(opts) {
		var me = this.
			currentUser = null;

		RiotControl.addStore(this);

  		this.showLogin = function(e){
	    	e.preventDefault();
	    	console.log('SHOW_LOGIN');
	    	RiotControl.trigger('SHOW_LOGIN');
	  	}.bind(this);

	  	this.doLogout = function(){
	  		RiotControl.trigger('LOGOUT');
	  	}.bind(this)

	  	this.onLoggedIn = function(){
	  		console.log('logged in says appmenu');
	  		this.currentUser = firebase.auth().currentUser;
	  		this.update();
	  	}.bind(this)

		this.onUserUpdated = function(user){
	  		console.log('logged in says appmenu');
	  		this.currentUser = user;
	  		this.update();
		}.bind(this)

	  	this.onLoggedOut = function(){
	  		console.log('logged out says appmenu');
	  		this.currentUser = null;
	  		this.update();
	  	}.bind(this)
	  	this.on('LOGGED_IN', this.onLoggedIn);
	  	this.on('LOGGED_OUT', this.onLoggedOut);
	  	this.on('USER_UPDATED', this.onUserUpdated);
});
riot.tag2('add-user', '<form onsubmit="{checkForm}" class="form default"><h2>Registrera användare</h2><span id="closeMe" onclick="{closeMe}">&#x2716;</span><div class="error {hidden: !errorText}">{errorText}</div><div class="input-container"><div class="input-icon"><span class="input-group-addon"><i class="fa fa-envelope-o fa-fw" aria-hidden="true"></i></span><input type="text" name="registerEmail" placeholder="E-post"></div><div class="input-icon"><span class="input-group-addon"><i class="fa fa-key fa-fw" aria-hidden="true"></i></span><input type="{password: !revealPassword, text: revealPassword}" name="registerPassword" placeholder="Lösenord"><span class="input-group-addon-right" onclick="{showPassword}"><i class="fa fa-eye" aria-hidden="true"></i></span></div><div class="input-icon"><input type="text" name="registerAlias" placeholder="Alias"></div><div class="input-icon"><input type="text" name="registerFirstname" placeholder="Förnamn"></div><div class="input-icon"><input type="text" name="registerLastname" placeholder="Efternamn"></div><div class="input-icon"><input type="text" name="registerPhone" placeholder="Telefon"></div></div><input type="submit" value="Spara"></form>', '', '', function(opts) {
		var me  =this;
		this.doRegister = false;
		RiotControl.addStore(this);

		this.checkForm = function(e){
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
		}.bind(this)

		this.registerUser = function(email,password,e){

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

				  console.log('user updated');
				}, function(error) {

				  console.log('user update error');
				  console.log(error);
				});

  			}).catch(function(ex) {
    			console.log('parsing failed', ex)
  			});

		}.bind(this)
});
riot.tag2('login-email', '<form onsubmit="{doLogin}" if="{!doRegister}"><h2>Logga in</h2><span id="closeMe" onclick="{closeMe}">&#x2716;</span><div class="input-container"><div class="error {hidden: !errorText}">{errorText}</div><div class="input-icon"><span class="input-group-addon"><i class="fa fa-envelope-o fa-fw" aria-hidden="true"></i></span><input type="text" name="email" class="{error: emailMissing}" placeholder="E-post"></div><div class="input-icon"><span class="input-group-addon"><i class="fa fa-key fa-fw" aria-hidden="true"></i></span><input type="password" name="password" class="{error: pwdMissing}" placeholder="Lösenord"></div></div><input type="submit" value="Logga in"><input type="button" onclick="{switchToRegister}" value="Registrera"></form><register if="{doRegister}"></register>', '', '', function(opts) {
		var me  =this;
		this.doRegister = false;
		RiotControl.addStore(this);

		this.switchToRegister = function(){
			this.doRegister = !this.doRegister;
		}.bind(this)
		this.closeMe = function(){
			me.unmount();
		}.bind(this)

		this.setError = function(errorCode){
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
		}.bind(this);

		this.doLogin = function(e){
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

	  			var errorCode = error.code;
	  			me.setError(errorCode)
			});
		}.bind(this)
		this.onLoginSuccess = function(){

		}.bind(this)
		this.on('LOGGED_IN', this.onLoginSuccess);
});

riot.tag2('register', '<form onsubmit="{checkForm}" if="{currentStep==1}" class="form default"><h2>Registrera användare</h2><span id="closeMe" onclick="{closeMe}">&#x2716;</span><div class="error {hidden: !errorText}">{errorText}</div><div class="input-container"><div class="input-icon"><span class="input-group-addon"><i class="fa fa-envelope-o fa-fw" aria-hidden="true"></i></span><input type="text" name="registerEmail" placeholder="E-post"></div><div class="input-icon"><span class="input-group-addon"><i class="fa fa-key fa-fw" aria-hidden="true"></i></span><input type="{password: !revealPassword, text: revealPassword}" name="registerPassword" placeholder="Lösenord"><span class="input-group-addon-right" onclick="{showPassword}"><i class="fa fa-eye" aria-hidden="true"></i></span></div></div><input type="submit" value="Registrera"></form><form onsubmit="{addUserInfo}" if="{currentStep==2}"><h2>Uppgifter</h2><span id="closeMe" onclick="{closeMe}">&#x2716;</span><div class="input-icon"><input type="text" name="registerAlias" placeholder="Alias"></div><div class="input-icon"><input type="text" name="registerFirstname" placeholder="Förnamn"></div><div class="input-icon"><input type="text" name="registerLastname" placeholder="Efternamn"></div><div class="input-icon"><input type="text" name="registerPhone" placeholder="Telefon"></div><input type="submit" value="Spara"></form><div if="{currentStep == 3}" class="registerFinished"><h2>Tack för din registrering!</h2><span id="closeMe" onclick="{closeMe}">&#x2716;</span><span>Klicka här för att komma till chatten!</span></div>', '', '', function(opts) {
		me = this;
		RiotControl.addStore(this);
		this.errorText = '';
		this.revealPassword = false;
		me.currentStep = 1;

		this.closeMe = function(){
			this.parent.unmount();
		}.bind(this)

		this.showPassword = function(e){
			this.revealPassword = !this.revealPassword;
		}.bind(this)

		this.checkForm = function(e){
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
		}.bind(this)

		this.registerUser = function(email,password){

			firebase.auth().createUserWithEmailAndPassword(email, password)
			.then(function(user){
				console.log('user created');
				me.currentStep = 2;
				me.update();
				return;
			}).catch(function(error) {

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
		}.bind(this)
		this.addUserInfo = function(e){
			e.preventDefault();
			console.log('update user in register tag');
			var user = {
				alias: e.target.registerAlias.value,
				firstname: e.target.registerFirstname.value,
				lastname: e.target.registerLastname.value,
				phone: e.target.registerPhone.value,
				role: 'user'
			};

			RiotControl.trigger('UPDATE_USER', user);
			me.currentStep = 3;
			me.update();

			window.setTimeout(function(){
				RiotControl.trigger('REMOVE_LOGIN')
			}, 3500);
			return;
		}.bind(this)
});
riot.tag2('firebase-chat', '<div id="messages"></div>', '', '', function(opts) {
});
riot.tag2('juro-input', '<input class="input__field input__field--juro" type="{type}" name="{name}" value="{value}" id="juro-1"><label class="input__label input__label--juro" for="juro-1"><span class="input__label-content input__label-content--juro" data-content="{label}">{label}</span></label>', '', '', function(opts) {
		var self = this;
		this.label = opts.label || 'Label';
		this.name = opts.inputname || '';
		this.type = opts.type || 'text';
		this.value = opts.value || '';

    this.onUpdate = function(){

	}.bind(this)

    this.onUpdated = function(){
    	setTimeout(function(){
    		var inputEl = self.root.querySelector('input');

    		if( inputEl.value.trim() !== '' ) {
    			classie.add( inputEl.parentNode, 'input--filled' );
    		}
    	},1);

	}.bind(this)

     this.onBeforeMount = function(){

     }.bind(this)

     this.onMount = function(){
     	var inputEl = this.root.querySelector('input');

		if( inputEl.value.trim() !== '' ) {
			classie.add( inputEl.parentNode, 'input--filled' );
		}

		inputEl.addEventListener( 'focus', self.onInputFocus );
		inputEl.addEventListener( 'blur', self.onInputBlur );

	}.bind(this)

     this.onInputFocus = function( ev ) {
     	classie.add( ev.target.parentNode, 'input--filled' );
     }.bind(this)

     this.onInputBlur = function( ev ) {
     	if( ev.target.value.trim() === '' ) {
     		classie.remove( ev.target.parentNode, 'input--filled' );
     	}
     }.bind(this)

    this.onBeforeUnmount = function(){

    }.bind(this)

    this.onUnmount = function(){

    }.bind(this)

    this.on('update', this.onUpdate);
    this.on('updated', this.onUpdated);
	this.on('before-mount',this.onBeforeMount);
   	this.on('mount', this.onMount);
   	this.on('before-unmount', this.onBeforeUnmount);
   	this.on('unmount', this.onUnmount);
});

riot.tag2('yoshiko-input', '<input class="input__field input__field--yoshiko" type="{type}" name="{name}" value="{value}" id="input-11"><label class="input__label input__label--yoshiko" for="input-11"><span class="input__label-content input__label-content--yoshiko" data-content="{label}">{label}</span></label>', '', '', function(opts) {
		var self = this;
		this.label = opts.label || 'Label';
		this.name = opts.inputname || '';
		this.type = opts.type || 'text';
		this.value = opts.value || '';

    this.onUpdate = function(){

	}.bind(this)

    this.onUpdated = function(){
    	setTimeout(function(){
    		var inputEl = self.root.querySelector('input');

    		if( inputEl.value.trim() !== '' ) {
    			classie.add( inputEl.parentNode, 'input--filled' );
    		}
    	},1);

	}.bind(this)

     this.onBeforeMount = function(){

     }.bind(this)

     this.onMount = function(){
     	var inputEl = this.root.querySelector('input');

		if( inputEl.value.trim() !== '' ) {
			classie.add( inputEl.parentNode, 'input--filled' );
		}

		inputEl.addEventListener( 'focus', self.onInputFocus );
		inputEl.addEventListener( 'blur', self.onInputBlur );

	}.bind(this)

     this.onInputFocus = function( ev ) {
     	classie.add( ev.target.parentNode, 'input--filled' );
     }.bind(this)

     this.onInputBlur = function( ev ) {
     	if( ev.target.value.trim() === '' ) {
     		classie.remove( ev.target.parentNode, 'input--filled' );
     	}
     }.bind(this)

    this.onBeforeUnmount = function(){

    }.bind(this)

    this.onUnmount = function(){

    }.bind(this)

    this.on('update', this.onUpdate);
    this.on('updated', this.onUpdated);
	this.on('before-mount',this.onBeforeMount);
   	this.on('mount', this.onMount);
   	this.on('before-unmount', this.onBeforeUnmount);
   	this.on('unmount', this.onUnmount);
});
