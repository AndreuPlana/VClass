<template>
    <div class="card pd-custom-bt pd-custom-lr">
        <div>
            <h3>Post</h3>
            <ul v-for="posts in posts" v-bind:key="posts.id" class="collection with-header">
                <li class="collection-header"><h4>{{posts.titol}}</h4></li>
                <li class="collection-item"><div>{{posts.content}}</div></li>

            </ul>
            <div id="preloaderPosts" class="center">
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
        <div>
            <h3>Comentaris</h3>
            <ul  class="collection with-header" v-for="comentaris in comentaris" v-bind:key="comentaris.id">
                <li class="collection-header" v-for="users in users" v-bind:key="users.id"><h4>{{users.user}}</h4></li>
                <li class="collection-item"><div>{{comentaris.comentari}}</div></li>

            </ul>
        </div>
        <div>
            <h3>Comenta!</h3>
            <label for="comentari">Comentari</label>
            <textarea v-model="comentari" name="comentari" id="comentari" class="materialize-textarea"></textarea>
            <div class="center botons">
                <button type="button" class="waves-effect waves-light btn btn-custom" v-on:click="addcoment">Comentar</button>
                <router-link to="/"> <a class="waves-effect waves-light btn btn-custom">Tornar</a></router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import db from './firebaseInit'
    import firebase from 'firebase'
    export default {
        name: 'Post',
        data () {
            return {
                users: [],
                posts:[],
                comentaris:[],
                comentari : ''
            }
        },
        watch :{
            '$route'(to,from){
                alert(to.params.postid);
            }
        },
        created(){
            var yeah = this.$route.params.postid;
            var currentUser = comentaris.iduser;
            var that = this;
            db.collection("posts").doc(yeah).onSnapshot(doc =>{
                const pdata = {
                    'link' : doc.id,
                    'titol' : doc.data().titol,
                    'content' : doc.data().contingut,
                    'tags' : doc.data().tags,
                    'comments' : doc.data().commentaris
                }
                this.posts.push(pdata)
                document.getElementById('preloaderPosts').style.display = "none";
            })
            db.collection('comentaris').where('idpost','==',yeah).orderBy('time').get().then(querySnapshot=>{
                querySnapshot.forEach(doc => {
                    const cdata = {
                        'id' : doc.id,
                        'comentari' : doc.data().comentari,
                    }
                    this.comentaris.push(cdata);
                    console.log(cdata);
                })
            })
            db.collection("users").doc(comentaris.iduser).get().then(function(doc) {
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
                    console.log(data);
                    that.users.push(data)
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });
        }
        ,methods:{
            addcoment : function (){
                if(this.comentari){
                    db.collection('comentaris').add({
                        comentari : this.comentari,
                        idpost : this.$route.params.postid,
                        iduser : firebase.auth().currentUser.uid,
                        time : firebase.firestore.FieldValue.serverTimestamp()
                    })
                    M.toast({html: 'Comentari Afegir', classes: 'rounded green'});
                }else{
                    M.toast({html: 'Comentari buit!', classes: 'rounded red'});
                }
            }
        }
    }

</script>

<style>
    .pd-custom-lr {
        padding-left: 50px !important;
        padding-right: 50px !important;
    }

    .pd-custom-bt {
        padding-bottom: 25px !important;
        padding-top: 25px !important;
    }

    .btn-custom{
        width: 35%;
        display: inline-block;
        margin: 0px 10px;
    }
    @media screen and (max-width: 933px) {
        .btn-custom{
            width: 100%;
            margin: 10px 0px;
        }
    }
</style>