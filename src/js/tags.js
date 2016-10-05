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
riot.tag2('register', '<form onsubmit="{checkForm}" if="{currentStep==1}" class="form default"><div class="error {hidden: !errorText}">Error</div><yoshiko-input type="text" inputname="email" label="E-post"></yoshiko-input><yoshiko-input type="password" inputname="password" label="Lösenord"></yoshiko-input><yoshiko-input type="password" inputname="repeatpassword" label="Repetera lösenord"></yoshiko-input><input type="submit" value="Registrera"></form><form onsubmit="{addUserInfo}" if="{currentStep==2}"><yoshiko-input type="text" inputname="username" label="Användarnamn"></yoshiko-input><yoshiko-input type="text" inputname="firstname" label="Förnamn"></yoshiko-input><yoshiko-input type="text" inputname="lastname" label="Efternamn"></yoshiko-input><yoshiko-input type="text" inputname="telephone" label="Telefon"></yoshiko-input><input type="submit" value="Spara"></form>', '', '', function(opts) {
		me = this;
		this.errorText = '';
		me.currentStep = 1;
		this.checkForm = function(e){
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
		}.bind(this)
		this.registerUser = function(email,password){

			me.currentStep = 2;
			me.update();
			return;

			firebase.auth().createUserWithEmailAndPassword(email, password)
			.then(function(user){
				console.log('user created');
				me.currentStep = 2;
				me.update();
				return;
			}).catch(function(error) {

	  			var errorCode = error.code;
	  			var errorMessage = error.message;
	  			if (errorCode==='auth/email-already-in-use') {
	  				errorText = 'E-post adressen finns redan.';
	  				me.update();
	  				return;
	  			}

	  			console.log(errorCode);
	  			console.log(errorMessage);

			});
		}.bind(this)
});
