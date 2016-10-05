<appmenu>
    <nav class="topmenu">
      <ul>
        <li><a href="#">Om oss</a></li>
        <li><a href="#">Frågor</a></li>
        <li if="{!currentUser}" onclick="{showLogin}"><a href="#login">Login</a></li>
        <li if="{currentUser && currentUser.displayName}">{currentUser.displayName}</li>
        <li if="{currentUser}" onclick="{doLogout}"><a href="#login">Logga ut</a></li>
      </ul>
    </nav>	
	<script>
		var me = this.
			currentUser = null;

		RiotControl.addStore(this);
  		
  		showLogin(e){
	    	e.preventDefault();
	    	console.log('SHOW_LOGIN');
	    	RiotControl.trigger('SHOW_LOGIN');
	  	};	
	  	
	  	doLogout(){
	  		RiotControl.trigger('LOGOUT');
	  	}

	  	onLoggedIn(){
	  		console.log('logged in says appmenu');
	  		this.currentUser = firebase.auth().currentUser;
	  		this.update();
	  	}

		onUserUpdated(user){
	  		console.log('logged in says appmenu');
	  		this.currentUser = user;
	  		this.update();	
		}

	  	onLoggedOut(){
	  		console.log('logged out says appmenu');
	  		this.currentUser = null;
	  		this.update();
	  	}
	  	this.on('LOGGED_IN', this.onLoggedIn);
	  	this.on('LOGGED_OUT', this.onLoggedOut);
	  	this.on('USER_UPDATED', this.onUserUpdated);
	</script>
</appmenu>