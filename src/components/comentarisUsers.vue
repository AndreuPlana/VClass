<template>
    <div>
        <h3>Llista de comentaris</h3>
        <ul  class="collection with-header" v-for="comentaris in comentaris" v-bind:key="comentaris.id">
            <li class="collection-header"><img class="icon-size-comment left" v-bind:src="comentaris.image" alt="foto usuari"><h5><router-link :to="`/perfil/${comentaris.iduser}`">{{comentaris.username}}</router-link></h5></li>
            <li class="collection-item"><div><p>{{comentaris.comentari}}</p></div></li>
        </ul>
    </div>
</template>

<script>
    import firebase from 'firebase';
    import db from './firebaseInit'
    export default {
        name: "comentarisUsers",
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
            var yeah = this.$route.params.userid;
            db.collection('comentaris').where('iduser','==', yeah).get().then(querySnapshot=>{
                querySnapshot.forEach(doc => {
                    const cdata = {
                        'id' : doc.id,
                        'comentari' : doc.data().comentari,
                        'username': doc.data().username,
                        'iduser': doc.data().iduser,
                        'image': doc.data().image
                    }
                    this.comentaris.push(cdata);
                    console.log(cdata);
                })
            })
        }
    }
</script>

<style scoped>

</style>