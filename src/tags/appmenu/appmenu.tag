<appmenu>
    <nav class="topmenu">
      <ul>
        <li><a href="#">Om oss</a></li>
        <li><a href="#">Frågor</a></li>
        <li onclick="{showLogin}"><a href="#login">Login</a></li>
      </ul>
    </nav>	
	<script>

	  showLogin(e){
	    e.preventDefault();
	    console.log('SHOW_LOGIN');
	    RiotControl.trigger('SHOW_LOGIN');
	  };	
	</script>
</appmenu>