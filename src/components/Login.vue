<template>
<div>
<div class="row">
    <div class="col s12">
        <div class="card">
            <div class="card-body center pd-custom-lr">
                <h1>LOGIN</h1>
                <form v-on:submit="login">
                    <div class="input-field">
                        <label for="email">Email</label>
                        <input type="email" name="email" id="email" v-model="email" class="form-control">
                    </div>
                    <div class="input-field">
                        <label for="password">Password</label>
                        <input type="password" name="password" id="password" v-model="password" class="form-control">
                    </div>
                    <input type="submit" value="ENVIAR" class="btn btn-custom">
                </form>
            </div>
        </div>
    </div>
</div>
<div class="row">
    <div class="col s12">
        <div class="card">
            <div class="card-body center pd-custom-bt">
                <button class="btn red btn-custom2" v-on:click="loginGoogle"><i class="fab fa-google-plus-g"></i> Google</button>
                <router-link to="/reset"><button class="btn btn-custom2"><i class="fa fa-sync-alt"></i> Reiniciar Contrassenya</button></router-link>
            </div>
        </div>
    </div>
</div>
</div>

</template>
<style>
.btn-facebook, .btn-google, .btn-twitter{
    width: 32%;
}

.btn-google{
    background: #dd4b39;
    color: white;
}

.pd-custom-lr {
    padding-left: 50px !important;
    padding-right: 50px !important;
}

.pd-custom-bt {
    padding-bottom: 25px !important;
    padding-top: 25px !important;
}

.btn-custom {
    width: 45%;
    margin-bottom: 25px;
    margin-top: 10px;
}

.red:hover {
    background: #ff3628 !important;
}

.btn-custom2 {
    width: 40%;
    margin-right: 20px;
}
</style>

<script>
import firebase from 'firebase';
export default {
    name:'Login',
    data(){
        return{
            email : '',
            password : ''
        }
    },
    methods:{
         login : function(e){
             firebase.auth().signInWithEmailAndPassword(this.email,this.password)
             .then(user=>{
                  alert('Logged In');
                  this.$router.push('/')
             },
             error=>{
                 alert(error.message);
             })
        e.preventDefault();
         },
         loginGoogle:function(){
            var provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // ...
            }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
            });

         }
    }
}
</script>