<template lang="html">
  <div>
  <div class="container">    
		<div class="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">                    
			
			<!-- Div Panel -->
			<div class="panel panel-success" >
					
					<!-- Panel Heading -->
					<div class="panel-heading">
						<div class="panel-title">Sign In</div>
					</div><!-- End panel heading -->
					
					<!-- Panel body -->
					<div class="panel-body" >
							
						<form class="form-horizontal" role="form">
							
							<!-- Username -->
							<div class="input-group input-username">
								<span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span><input type="text" class="form-control" v-model="username" placeholder="username" autofocus>
							</div>
								
							<!-- Password -->
							<div class="input-group input-password">
								<span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span><input type="password" class="form-control" v-model="password" placeholder="password">
							</div>

							<div class="input-group checkbox-remember">
								<div class="checkbox">
									<label><input id="login-remember" type="checkbox" v-model="remember" value="1"> Remember me</label>
								</div>
							</div>

							<div class="form-group login-button">
								<div class="col-sm-12 controls">
									<a href="#" class="btn btn-success" @click="HacerLogin">Login  </a>
								</div>
							</div>

						</form><!-- ENd form -->     
					</div><!-- ENd panel body -->
			</div><!-- End panel group -->  

		</div><!-- End col div -->
	</div><!-- End container -->
  </div>
</template>
 
<script lang="js">
import {mapActions, mapGetters } from 'vuex'
import store from '../store/store.js'

export default {
  name: 'login',
  data: function() {
    return {
      username: '',
      password: '',
      remember: ''
    }
  },
  computed: {
    ...mapGetters({
       leerLoginLocalStorage: 'logueadoLocal'
    })
  },
  methods: {
    ...mapActions({loguear:'login'}),
    HacerLogin (){
      var obj = {'user': this.username ,'pass': this.password,'remember':this.remember}
      this.loguear(obj)
      this.$router.push(this.$route.query.redirect);
    }
  },
  mounted () {
    var a = this.leerLoginLocalStorage
    if (this.$store.state.logueado) {
    this.$router.push(this.$route.query.redirect);
    }
  }
  
}
</script>

<style scoped="true">
		body {
			padding-top: 60px;
		}

		.input-username, .input-password, .checkbox_remember, .login-button {
			margin-top:15px;
		}

</style>