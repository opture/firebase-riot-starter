var authStore = (function(){
	var _store = {},
		me = this,
		dispatcher = RiotControl,
		loginTag = null;

	riot.observable(_store);
	RiotControl.addStore(_store);

	this.onLogout = function(){
		firebase.auth().signOut().then(function() {
			dispatcher.trigger('LOGGED_OUT');
		}, function(error) {
		  // An error happened.
		  console.log('Log out failed');
		});
	}

	this.onShowLogin = function(){
		var loginWindow = document.createElement('login-email');
		document.body.appendChild(loginWindow);
		me.loginTag = riot.mount('login-email');
	};

	this.onRemoveLogin = function(){
		if (me.loginTag){
			me.loginTag[0].unmount();
		}else{
			var _loginTag = document.querySelector('login-email');
			_loginTag._tag.unmount();

		}
	};

	firebase.auth().onAuthStateChanged(function(user) {
  		if (user) {
    		// User is signed in.
    		RiotControl.trigger('LOGGED_IN');
  		} else {
    		// No user is signed in.
    		RiotControl.trigger('LOGGED_OUT');
  		}
	});


	
	_store.on('LOGOUT', this.onLogout);
	_store.on('SHOW_LOGIN', this.onShowLogin);
	_store.on('REMOVE_LOGIN', this.onRemoveLogin);
	return _store;
})();