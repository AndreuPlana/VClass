<template>
    <div id="profile" class="row card pd-custom-bt">
        <div class="col s12">
            <div id="user" class="col s3">
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
            </div>
            <div class="mayus col s6" v-for="users in users" v-bind:key="users.id">
                <h6 v-if="users.user">USER: {{users.user}}</h6>
                <h6 v-if="users.nom">NOM: {{users.nom}} {{users.cognoms}}</h6>
                <h6 v-if="users.dnaixement">NAIX: {{users.dnaixement}}</h6>
                <h6 v-if="users.pais">PAIS: {{users.pais}}</h6>
                <h6 v-if="users.telefon">TELEFON: {{users.telefon}}</h6>
                <h6 v-if="users.cpostal">CP: {{users.cpostal}}</h6>
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
                categories:[]
            }
        },
        watch :{
            '$route'(to,from){
                alert(to.params.iduser);
            }
        }
        ,created(){
            var currentUser = firebase.auth().currentUser.uid;
            var that = this;
            var yeah = $route.params.iduser;
            db.collection("users").doc(yeah).get().then(function(doc) {
                if (doc.exists) {
                    console.log("Document data:", doc.id, doc.data().username, doc.data().nom, doc.data().cognoms, doc.data().image);
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