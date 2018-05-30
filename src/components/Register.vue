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
                        <label for="naixement">*</label>
                        <input placeholder="" type="date" name="naixement" id="naixement" v-model="dnaixement" class="form-control" required>
                    </div>
                    <div class="input-field">
                        <label for="pais">Pais</label>
                        <input type="text" name="pais" v-model="pais" id="pais" class="form-control">
                    </div>
                    <div class="input-field">
                        <label for="telefon">Telefon</label>
                        <input type="number" name="telefon" v-model="telefon" id="telefon" class="form-control">
                    </div>
                    <div class="input-field">
                        <label for="codiPostal">Codi Postal</label>
                        <input type="number" name="codiPostal" v-model="cpostal" id="codiPostal" class="form-control">
                    </div>
                    <p>
                        <label>
                            <input id="indeterminate-checkbox" type="checkbox" v-model="conditions" required />
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
    import db from './firebaseInit';
    export default {
        name:'Register',
        data(){
            return{
                email : '',
                password : '',
                nom : '',
                cognoms : '',
                username : '',
                dnaixement : '',
                conditions : false,
                pais :'',
                telefon : '',
                cpostal : ''
            }
        },
        methods:{
            register : function(e){
                if(!this.nom || !this.cognoms || !this.dnaixement || !this.username || !this.conditions){
                    M.toast({html: 'Falten camps obligatoris', classes: 'rounded red'});
                }else{
                    firebase.auth().createUserWithEmailAndPassword(this.email,this.password)
                        .then(user=>{
                                M.toast({html: 'Usuari Registrat!', classes: 'rounded green'});
                                // firebase.auth().currentUser.displayName=this.nom;
                                // firebase.auth().currentUser.photoURL='http://www.vibro.no/wp-content/uploads/2018/01/default-user-image.png';
                                // this.$router.push("/");
                                // window.location.reload();
                                db.collection('users').doc(firebase.auth().currentUser.uid).set({
                                    username : this.username,
                                    dnaixement : this.dnaixement,
                                    nom : this.nom,
                                    cognoms : this.cognoms,
                                    pais : this.pais,
                                    telefon : this.telefon,
                                    cpostal : this.cpostal
                                })
                            },
                            error=>{
                                M.toast({html: 'Usuari No Registrat!', classes: 'rounded green'});
                            })
                    e.preventDefault();
                }
            }
        }
    }
</script>
</script>