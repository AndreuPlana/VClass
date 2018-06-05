<template>
    <div>
        <h3>Els teus comentaris</h3>
        <ul v-if="comentaris" class="collection with-header" v-for="comentaris in comentaris" v-bind:key="comentaris.id">
            <li class="collection-header"><img class="icon-size-comment left" v-bind:src="comentaris.image" alt="foto usuari"><h5><router-link :to="`/perfil/${comentaris.iduser}`">{{comentaris.username}}</router-link></h5><a class="btn red" v-on:click="eliminar(comentaris.id)"><i class="material-icons">delete</i></a></li>
            <li class="collection-item"><div><p>{{comentaris.comentari}}</p></div></li>
        </ul>
        <div id="preloader" class="center margin">
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
</template>

<script>
    import firebase from 'firebase';
    import db from './firebaseInit'
    export default {
        name: "comentarisPropis",
        data(){
            return{
                comentaris:[]
            }
        },
        watch :{
            '$route'(to,from){
                alert(to.params.categoria);
            }
        },
        created(){
            var currentUser = firebase.auth().currentUser.uid;
            db.collection('comentaris').where('iduser','==', currentUser).get().then(querySnapshot=>{
                querySnapshot.forEach(doc => {
                    const cdata = {
                        'id' : doc.id,
                        'comentari' : doc.data().comentari,
                        'username': doc.data().username,
                        'iduser': doc.data().iduser,
                        'image': doc.data().image
                    }
                    this.comentaris.push(cdata);
                    document.getElementById('preloader').style.display = "none";
                    console.log(cdata);
                })
            })
        },
        methods:{
            eliminar: function(postId){
                db.collection("comentaris").doc(postId).delete().then(function() {
                    M.toast({html: 'Comentari Eliminat', classes: 'rounded green'});
                    window.location.reload();
                }).catch(function(error) {
                    M.toast({html: 'Error al Eliminar el Comentari', classes: 'rounded red'});
                });
            }
        }
    }
</script>

<style>
    .icon-size-comment{
        width: 50px;
        height: 50px;
        margin-right: 1rem;
    }
</style>