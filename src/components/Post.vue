<template>
    <div class="card pd-custom-bt pd-custom-lr">
        <div>
            <h3>Post</h3>
            <ul v-for="posts in posts" v-bind:key="posts.id" class="collection with-header">
                <li class="collection-header"><img class="icon-size-post left" v-bind:src="posts.image" alt="foto usuari"><h4>{{posts.titol}}<small class="right sizeSmall">Creat per {{posts.username}}</small></h4></li>
                <li class="collection-item"><div>
                    <p>{{posts.content}}</p>
                    <a v-bind:href="posts.link">{{posts.arxiu}}</a>
                </div></li>

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
                <li class="collection-header"><img class="icon-size-comment left" v-bind:src="comentaris.image" alt="foto usuari"><h5><router-link :to="`/perfil/${comentaris.iduser}`">{{comentaris.username}}</router-link></h5></li>
                <li class="collection-item"><div><p>{{comentaris.comentari}}</p></div></li>

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
    import firebase,{ firestore } from 'firebase'
    export default {
        name: 'Post',
        data () {
            return {
                users: [],
                posts:[],
                comentaris:[],
                comentari : '',
                users:[]
            }
        },
        watch :{
            '$route'(to,from){
                alert(to.params.postid);
            }
        },
        created(){
            var yeah = this.$route.params.postid;
            var currentUser = firebase.auth().currentUser.uid;
            db.collection("posts").doc(yeah).onSnapshot(doc =>{
                const pdata = {
                    'link' : doc.data().link,
                    'titol' : doc.data().titol,
                    'content' : doc.data().contingut,
                    'tags' : doc.data().tags,
                    'comments' : doc.data().commentaris,
                    'arxiu': doc.data().arxiu,
                    'username': doc.data().username,
                    'image': doc.data().image
                }
                this.posts.push(pdata)
                document.getElementById('preloaderPosts').style.display = "none";
            })
            db.collection('comentaris').where('idpost','==',yeah).orderBy('time').get().then(querySnapshot=>{
                querySnapshot.forEach(doc => {
                    const cdata = {
                        'id' : doc.id,
                        'comentari' : doc.data().comentari,
                        'username': doc.data().username,
                        'iduser': doc.data().iduser,
                        'image': doc.data().image
                    }
                    currentUser = doc.data().iduser;
                    this.comentaris.push(cdata);
                    console.log(cdata);
                })
            })
        },
        methods:{
            addcoment : function (){
                if(this.comentari){
                        db.collection('comentaris').add({
                        comentari : this.comentari,
                        idpost : this.$route.params.postid,
                        iduser : firebase.auth().currentUser.uid,
                        username: firebase.auth().currentUser.displayName,
                        image: firebase.auth().currentUser.photoURL,
                        time : firebase.firestore.FieldValue.serverTimestamp()
                    })
                    M.toast({html: 'Comentari Afegit', classes: 'rounded green'});
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
    .sizeSmall{
        font-size: 40%;
    }

    .icon-size-post{
        width: 50px;
        height: 50px;
        margin: 1rem 1rem 0 0;
    }
    .icon-size-comment{
        width: 50px;
        height: 50px;
        margin-right: 1rem;
    }
</style>