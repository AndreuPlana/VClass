<template>
<div class="col m6 center">
    <div class="collection">
        <div class="collection-item">
            <h1>REGISTRE</h1>
            <form class="container">
                <div class="input-field">
                    <label for="email">Email *</label>
                    <input type="email" name="email" id="email" class="form-control" v-model="email" required>
                </div>
                <div class="input-field">
                    <label for="password">Password *</label>
                    <input type="password" name="password" id="password" class="form-control" v-model="password" required>
                </div>
                <div class="input-field">
                    <label for="nom">Nom *</label>
                    <input type="text" name="nom" id="nom" class="form-control" v-model="nom" required>
                </div>
                <div class="input-field">
                    <label for="cognoms">Cognoms *</label>
                    <input type="text" name="cognoms" id="cognoms" class="form-control" v-model="cognoms" required="required">
                </div>
                <div class="input-field">
                    <label for="usuari">Nom Usuari *</label>
                    <input type="text" name="usuari" id="usuari" class="form-control" v-model="username" required>
                </div>
                <div class="input-field">
                    <label for="naixement">Data de naixement *</label>
                    <input type="text" name="naixement" id="naixement" v-model="dnaixement" class="form-control" required>
                </div>
                <div class="input-field">
                    <label for="pais">Pais</label>
                    <input type="text" name="pais" id="pais" class="form-control">
                </div>
                <div class="input-field">
                    <label for="telefon">Telefon</label>
                    <input type="number" name="telefon" id="telefon" class="form-control">
                </div>
                <div class="input-field">
                    <label for="codiPostal">Codi Postal</label>
                    <input type="number" name="codiPostal" id="codiPostal" class="form-control">
                </div>
                    <p>
                        <label>
                            <input id="indeterminate-checkbox" type="checkbox" />
                            <span>Accepto els <router-link to="/terms"><a class="underline" href="/terms">termes i condicions</a></router-link></span>
                        </label>
                    </p>
                <br>
                <div class="input-field">
                    <input type="submit" v-on:click="register" value="REGISTRAR" class="btn">
                </div>
            </form>
        </div>
    </div>
</div>
</template>


<script>

    import firebase from 'firebase';

export default {
    name:'Register',
    data(){
        return{
            email : '',
            password : '',
            nom : '',
            cognoms : '',
            username : '',
            dnaixement : ''

        }
    },
    methods:{
         register : function(e){
             firebase.auth().createUserWithEmailAndPassword(this.email,this.password)
             .then(user=>{
                  alert('Account Created for ${{user.email}}');
                  this.$router.push("/");
             },
             error=>{
                 alert(error.message);
             })
        e.preventDefault();
         }
    }
}
</script>
