<template>
    <div id="navbar">
        <div class="navbar-fixed">
  <nav class="navbar-wrapper custom-color">
    <div class="container">
      <a class="brand-logo" href="#"><span class="text-danger">VClass</span></a>
      <div>
        <ul class="right hide-on-small-and-down">
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
            <router-link to="/newpost">New Post</router-link>
          </li>
          <li v-if="isLoggedIn">
            <a class="waves-effect waves-light btn red" v-on:click="logout"><i class="material_icons exit_to_app left"></i>Logout</a>

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
