var authStore = (function(){
	var _store = {},
		dispatcher = RiotControl;

	dispatcher.addStore(_store);
	function onLogin (email,password){
		if (!email || !password){
			return;
		}
		firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  dispatcher.trigger('LOGIN_FAILED', errorCode);
		});		

	}

	_store.on('LOGIN', this.onLogin);
	_store.on('REGISTER', this.onRegister);
	_store.on('USER_REGISTERED', this.onRegistered);

	return _store;
})();