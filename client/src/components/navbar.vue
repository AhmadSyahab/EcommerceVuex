<template>
<nav class="navbar navbar-expand-lg navbar-light bg-light navecom">
  <a class="navbar-brand" href="#">Navbar</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarColor03">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <router-link to="/"> <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a> </router-link>
      </li>
	  <li class="nav-item dropdown">
	    <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Products</a>
	    <div class="dropdown-menu" x-placement="bottom-start" style="position: absolute; transform: translate3d(0px, 37px, 0px); top: 0px; left: 0px; will-change: transform;">	
	      <router-link to="/product"> <span class="dropdown-item"> All Product </span> </router-link>	
	      <div class="dropdown-divider"></div>
	      <router-link to="/product/cloth"> <span class="dropdown-item"> Cloth </span> </router-link>
	      <router-link to="/product/shoes"> <span class="dropdown-item"> Shoes </span> </router-link>
	    </div> 
	  </li>
      <li class="nav-item">
        <router-link to="/showcart"> <span v-if="loginChecker" class="nav-link" href="#">Showcart</span>
        </router-link>  
      </li>
      <li class="nav-item">
        <router-link to="/admin"> <span v-if="admin" class="nav-link" href="#">Admin</span>
        </router-link>  
      </li>
    </ul>
    <button v-if="!loginChecker" type="button" data-toggle="modal" data-target="#register" class="btn btn-outline-secondary">Register</button>
    <button v-if="!loginChecker" type="button" data-toggle="modal" data-target="#login" class="btn btn-outline-secondary">Login</button>
    <button v-else="!loginChecker" type="button" @click="logout" class="btn btn-outline-secondary">Logout</button>




    <div class="modal" id="login">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Login</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
               <form class="form-horizontal" role="form">
                  <div class="form-group">
                    <label  class="col-sm-2 control-label"
                              for="username">Username</label>
                    <div class="col-sm-10">
                        <input v-model="username" type="text" class="form-control" 
                        id="inputEmail3" placeholder="username"/>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-sm-2 control-label"
                          for="password">Password</label>
                    <div class="col-sm-10">
                        <input type="password" v-model="password" id="area" class="form-control" placeholder="your password"/>
                    </div>
                  </div>
                </form>  
          </div>
          <div class="modal-footer">
            <button @click="isLogin" data-dismiss="modal" type="button" class="btn btn-primary">Login </button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal" id="register">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Register</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
               <form class="form-horizontal" role="form">
                  <div class="form-group">
                    <label  class="col-sm-2 control-label"
                              for="Name">Name</label>
                    <div class="col-sm-10">
                        <input v-model="name" type="text" class="form-control" 
                        placeholder="Name"/>
                    </div>
                  </div>
                  <div class="form-group">
                    <label  class="col-sm-2 control-label"
                              for="username">Username</label>
                    <div class="col-sm-10">
                        <input v-model="username" type="text" class="form-control" 
                        placeholder="Username"/>
                    </div>
                  </div>
                  <div class="form-group">
                    <label  class="col-sm-2 control-label"
                              for="email">Email</label>
                    <div class="col-sm-10">
                        <input v-model="email" type="text" class="form-control" 
                        placeholder="Email"/>
                    </div>
                  </div>   
                  <div class="form-group">
                    <label  class="col-sm-2 control-label"
                              for="password">Password</label>
                    <div class="col-sm-10">
                        <input v-model="password" type="password" class="form-control" 
                        placeholder="password"/>
                    </div>
                  </div>                                  
                </form>  
          </div>
          <div class="modal-footer">
            <button @click="isSignUp" data-dismiss="modal" type="button" class="btn btn-primary">Sign Up</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>    


  </div>
</nav>	
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
  	return {
  		category: '',
      name: '',
      email: '',
      password: '',
      username: ''
  	}
  },
  computed: {
    loginChecker () {
      return this.$store.state.checkLogin
    },
    admin () {
      return this.$store.state.admin
    }
  },
  methods: {
    ...mapActions([
        'login',
        'signup',
        'checkLogin',
        'signout',
        'checkAdmin'
      ]),
    isLogin: function () {
      this.login({
        username: this.username,
        password: this.password
      })
    },
    isSignUp: function () {
      this.signup({
        name: this.name,
        email: this.email,
        password: this.password,
        username: this.username
      })
    },
    logout: function () {
      this.signout()
    }
  },
  created () {
    this.checkLogin()
    this.checkAdmin()
  }
}	
</script>

<style>
.navecom {
	margin: 0px;
	font-size: 10px;
}
</style>