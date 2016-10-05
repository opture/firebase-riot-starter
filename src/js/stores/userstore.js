var userStore = (function(){
	var _store = {},
		dispatcher = RiotControl;
	riot.observable(_store);
	dispatcher.addStore(_store);

	this.onUpdateUser = function (userData){
		var user = firebase.auth().currentUser,
			displayName = '';
			displayName = userData.alias || userData.firstname + ' ' + userData.lastname;
			userData.email = user.email;
			
	  	firebase.database().ref('users/' + user.uid).update(userData);

		user.updateProfile({
		  displayName: displayName
		}).then(function() {
		  // Update successful.
		  console.log('user updated');
		  dispatcher.trigger('USER_UPDATED', user);
		}, function(error) {
		  // An error happened.
		  console.log('user update error');
		  console.log(error);
		});
	}



	_store.on('UPDATE_USER', this.onUpdateUser);

	return _store;
})();