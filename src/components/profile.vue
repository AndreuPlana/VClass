<template>
    <div id="profile" class="row card pd-custom-bt">
        <div class="col s12">
            <div id="user" class="col m3 s6">
                <div class="foto center">
                    <img v-for="users in users" v-bind:src="users.image"/>
                    <div id="preloader" class="center">
                        <div class="preloader-wrapper big active">
                            <div class="spinner-layer spinner-blue">
                                <div class="circle-clipper left">
                                    <div class="circle"></div>
                                </div><div class="gap-patch">
                                <div class="circle"></div>
                            </div><div class="circle-clipper right">
                                <div class="circle"></div>
                            </div>
                            </div>

                            <div class="spinner-layer spinner-red">
                                <div class="circle-clipper left">
                                    <div class="circle"></div>
                                </div><div class="gap-patch">
                                <div class="circle"></div>
                            </div><div class="circle-clipper right">
                                <div class="circle"></div>
                            </div>
                            </div>

                            <div class="spinner-layer spinner-yellow">
                                <div class="circle-clipper left">
                                    <div class="circle"></div>
                                </div><div class="gap-patch">
                                <div class="circle"></div>
                            </div><div class="circle-clipper right">
                                <div class="circle"></div>
                            </div>
                            </div>

                            <div class="spinner-layer spinner-green">
                                <div class="circle-clipper left">
                                    <div class="circle"></div>
                                </div><div class="gap-patch">
                                <div class="circle"></div>
                            </div><div class="circle-clipper right">
                                <div class="circle"></div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button class="btn btn-custom">VEURE POSTS</button><br><br>
                <button class="btn btn-custom">VEURE COMENTARIS</button>
                <div class="input-field">
                    <form>
                        <label for="image">Imatge de Perfil</label>
                        <input type="text" name="image" v-model="image" id="image" class="form-control">
                        <div class="input-field">
                            <input type="submit" v-on:click="modificarImatge" value="MODIFICAR" class="btn">
                        </div>
                    </form>
                </div>
            </div>
            <div class="mayus col m3 s6" v-for="users in users" v-bind:key="users.id">
                <h6 v-if="users.user">USER: {{users.user}}</h6>
                <h6 v-if="users.nom">NOM: {{users.nom}} {{users.cognoms}}</h6>
                <h6 v-if="users.dnaixement">NAIX: {{users.dnaixement}}</h6>
                <h6 v-if="users.pais">PAIS: {{users.pais}}</h6>
                <h6 v-if="users.telefon">TELEFON: {{users.telefon}}</h6>
                <h6 v-if="users.cpostal">CP: {{users.cpostal}}</h6>
            </div>
            <div class="col m6 s12">
                <form v-for="users in users" v-bind:key="users.id">
                    <div class="input-field">
                        <label for="nom" v-if="users.nom">{{users.nom}}</label>
                        <label for="nom" v-else>Nom *</label>
                        <input type="text" name="nom" id="nom" class="form-control" v-model="nom" required>
                    </div>
                    <div class="input-field">
                        <label for="cognoms" v-if="users.cognoms">{{users.cognoms}}</label>
                        <label for="cognoms" v-else>Cognoms *</label>
                        <input type="text" name="cognoms" id="cognoms" class="form-control" v-model="cognoms" required>
                    </div>
                    <div class="input-field">
                        <label for="naixement" v-if="users.dnaixement">{{users.dnaixement}}</label>
                        <label for="naixement" v-else>Data de naixement*</label>
                        <input placeholder="" type="date" name="naixement" id="naixement" v-model="dnaixement" class="form-control" required>
                    </div>
                    <div class="input-field">
                        <label for="pais" v-if="users.pais">{{users.pais}}</label>
                        <label for="pais" v-else>Pais</label>
                        <input type="text" name="pais" v-model="pais" id="pais" class="form-control">
                    </div>
                    <div class="input-field">
                        <label for="telefon" v-if="users.telefon">{{users.telefon}}</label>
                        <label for="telefon" v-else>Telefon</label>
                        <input type="number" name="telefon" v-model="telefon" id="telefon" class="form-control">
                    </div>
                    <div class="input-field">
                        <label for="codiPostal" v-if="users.cpostal">{{users.cpostal}}</label>
                        <label for="codiPostal" v-else>Codi Postal</label>
                        <input type="number" name="codiPostal" v-model="cpostal" id="codiPostal" class="form-control">
                    </div>
                    <br>
                    <div class="input-field">
                        <input type="submit" v-on:click="modificar" value="MODIFICAR" class="btn">
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import db from './firebaseInit';
    import firebase,{ storage } from 'firebase';
    export default {
        name: "profile",
        data(){
            return{
                users:[],
                posts:[],
                categories:[],
                nom : '',
                cognoms : '',
                dnaixement : '',
                pais :'',
                telefon : '',
                cpostal : '',
                image : ''
            }
        }
        ,created(){
            var currentUser = firebase.auth().currentUser.uid;
            var that = this;
            db.collection("users").doc(currentUser).get().then(function(doc) {
                if (doc.exists) {
                    // console.log("Document data:", doc.id, doc.data().username, doc.data().nom, doc.data().cognoms, doc.data().image);
                    const data = {
                        'user': doc.data().username,
                        'nom': doc.data().nom,
                        'cognoms': doc.data().cognoms,
                        'cpostal': doc.data().cpostal,
                        'pais': doc.data().pais,
                        'telefon': doc.data().telefon,
                        'dnaixement': doc.data().dnaixement,
                        'image': doc.data().image
                    }
                    document.getElementById('preloader').style.display = "none";
                    that.users.push(data)
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });
            db.collection('categories').get().then(querySnapshot=>{
                querySnapshot.forEach(doc =>{
                    const cdata = {
                        'id' :doc.id,
                        'nom':doc.data().nom
                    }
                    this.categories.push(cdata)
                })
            })
            db.collection('posts').get().then(querySnapshot=>{
                querySnapshot.forEach(doc =>{
                    const pdata = {
                        'link' : doc.id,
                        'titol' : doc.data().titol,
                        'content' : doc.data().contingut,
                        'tags' : doc.data().tags,
                        'comments' : doc.data().commentaris

                    }
                    this.posts.push(pdata)
                    console.log(pdata);
                })
            })
        },
        methods: {
            modificar: function (e) {
                if (!this.nom || !this.cognoms || !this.dnaixement) {
                    M.toast({html: 'Error al Modificar Usuari', classes: 'rounded red'});
                } else {
                    db.collection('users').doc(firebase.auth().currentUser.uid).update({
                        dnaixement: this.dnaixement,
                        nom: this.nom,
                        cognoms: this.cognoms,
                        pais: this.pais,
                        telefon: this.telefon,
                        cpostal: this.cpostal
                    })
                    M.toast({html: 'Usuari Modificat', classes: 'rounded green'});
                    e.preventDefault();
                }
            },
            modificarImatge: function (e) {
                if (!this.image) {
                    M.toast({html: 'Error al Modificar Usuari', classes: 'rounded red'});
                } else {
                    db.collection('users').doc(firebase.auth().currentUser.uid).update({
                        image: this.image
                    })
                    M.toast({html: 'Usuari Modificat', classes: 'rounded green'});
                    e.preventDefault();
                }
            }
        }
    }
</script>

<style scoped>
    img{
        width: 100%;
        margin-bottom: 17px;
    }
    .mayus{
        text-transform: uppercase;
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
        width: 100%;
    }

    .size{
    }
</style>