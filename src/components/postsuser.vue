<template>
    <div>
    <ul class="collection with-header">
        <li class="collection-header">
            <h4>Posts de l'Usuari</h4>
        </li>
        <li v-for="posts in posts" v-bind:key="posts.id" class="collection-item">
            <router-link :to="`/post/${posts.link}`">{{posts.titol}}</router-link>

            <router-link class="secondary-content" v-bind:to="{ name: 'Post', params: { postid: posts.link }}">
                <span></span>
                <i class="fa fa-eye"></i>
            </router-link>
        </li>
        <div id="preloaderPost" class="center">
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
    </ul>
    </div>
</template>
<style>

</style>
<script>
import firebase from 'firebase';
import db from './firebaseInit'
export default {
    name: 'postsusuari',
    data(){
        return{
            posts:[]
        }
    },
    watch :{
        '$route'(to,from){
            alert(to.params.iduser);
        }
    },
    created(){
        db.collection('posts').where('usuari','==',this.$route.params.iduser).get().then(querySnapshot=>{
            querySnapshot.forEach(doc => {
                const pdata = {
                'link' : doc.id,
                'titol' : doc.data().titol, 
                'content' : doc.data().contingut,
                'tags' : doc.data().tags
                }
                this.posts.push(pdata);
                document.getElementById('preloaderPost').style.display = "none";
                document.getElementById('preloaderComment').style.display = "none";
                console.log(pdata);
            })
        })
    } 
}
</script>
