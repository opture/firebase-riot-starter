<juro-input>
	<input class="input__field input__field--juro" type="{type}" name="{name}" value="{value}" id="juro-1"/>
	<label class="input__label input__label--juro" for="juro-1">
		<span class="input__label-content input__label-content--juro" data-content={label}>{label}</span>
	</label>
	<script>
		var self = this;
		this.label = opts.label || 'Label';
		this.name = opts.inputname || '';
		this.type = opts.type || 'text';
		this.value = opts.value || '';

    /**
     * right before the tag is updated. allows recalculation of context data before the UI expressions are updated.
     */
    onUpdate(){

	}


    /**
     * right after the tag is updated. allows do some work with updated DOM
     */
    onUpdated(){
    	setTimeout(function(){
    		var inputEl = self.root.querySelector('input');
    		// in case the input is already filled..
    		if( inputEl.value.trim() !== '' ) {
    			classie.add( inputEl.parentNode, 'input--filled' );
    		}    	
    	},1);
		
	}


    /**
     * right before tag is mounted on the page
     */
     onBeforeMount(){

     }


    /**
     * right after tag is mounted on the page
     */
     onMount(){
     	var inputEl = this.root.querySelector('input');
		
		// in case the input is already filled..
		if( inputEl.value.trim() !== '' ) {
			classie.add( inputEl.parentNode, 'input--filled' );
		}

		// events:
		inputEl.addEventListener( 'focus', self.onInputFocus );
		inputEl.addEventListener( 'blur', self.onInputBlur );

	}

     onInputFocus( ev ) {
     	classie.add( ev.target.parentNode, 'input--filled' );
     }

     onInputBlur( ev ) {
     	if( ev.target.value.trim() === '' ) {
     		classie.remove( ev.target.parentNode, 'input--filled' );
     	}
     }
    /**
     * before the tag is removed from the page
     */
    onBeforeUnmount(){

    }


    /**
     * after the tag is removed from the page
     */
    onUnmount(){

    }


    this.on('update', this.onUpdate);
    this.on('updated', this.onUpdated);
	this.on('before-mount',this.onBeforeMount);
   	this.on('mount', this.onMount);
   	this.on('before-unmount', this.onBeforeUnmount);
   	this.on('unmount', this.onUnmount);	
	</script>
</juro-input>
