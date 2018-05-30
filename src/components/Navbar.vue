<template>
  <div id="navbar">
    <div class="navbar-fixed">
      <nav class="navbar-wrapper custom-color">
        <div class="container">
          <router-link to="/"><a class="logo hide-on-small-and-down" href="#"><span class="text-danger">VClass</span></a></router-link>
          <div>
            <ul class="right">
              <li v-if="isLoggedIn">
                <router-link to="/">DashBoard</router-link>
              </li>
              <li v-if="!isLoggedIn">
                <router-link to="/login">Login</router-link>
              </li>
              <li v-if="!isLoggedIn">
                <router-link to="/register">Registrar</router-link>
              </li>
              <li v-if="isLoggedIn">
                <router-link to="/profile">Perfil</router-link>
              </li>
              <li v-if="isLoggedIn">
                <router-link to="/newpost">New Post</router-link>
              </li>
              <li v-if="isLoggedIn">
                <a class="btn red" id="hide-on-extrasmall" v-on:click="logout"><i class="material-icons left">exit_to_app</i>Logout</a>
                <a class="btn red" id="show-on-extrasmall" v-on:click="logout"><i class="material-icons left">exit_to_app</i></a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>


<script>
    import firebase from 'firebase';
    export default {
        name : 'navbar',
        data(){
            return {
                isLoggedIn:false,
                currentUser:false
            }
        },
        created(){
            if(firebase.auth().currentUser){
                this.isLoggedIn = true;
                this.currentUser = firebase.auth().currentUser.email;
            }
        },
        methods:{
            logout: function(){
                firebase.auth().signOut().then(() =>{
                    this.$router.push('/login');
                    window.location.reload();
                });
            }
        }
    }
</script>

<style>
  .logo{
    position: absolute;
    color: #fff;
    display: inline-block;
    font-size: 2.1rem;
    padding: 0;
  }
  .red:hover {
    background: #c7382d !important;
  }

  #hide-on-extrasmall{
    display: inline-block;
  }
  #show-on-extrasmall{
    display: none;
  }

  @media screen and (max-width: 464px) {
    #hide-on-extrasmall{
      display: none;
    }
    #show-on-extrasmall{
      display: inline-block;
      padding-right: 0px;
    }
  }
</style>
