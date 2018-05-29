<template>
    <div>
    <ul class="colletction with-header">
        <li class="collection-header">
            <h4>{{$route.params.categoria}}</h4>
        </li>
        <li v-for="posts in posts" v-bind:key="posts.id">
            <router-link :to="`/post/${posts.link}`">{{posts.titol}}</router-link>

            <router-link class="secondary-content" v-bind:to="{ name: 'Post', params: { postid: posts.link }}">
                <span></span>
                <i class="fa fa-eye"></i>
            </router-link>
        </li>
    </ul>
    </div>
</template>
<style>

</style>
<script>
import firebase from 'firebase';
import db from './firebaseInit'
export default {
    name: 'Categories',
    data(){
        return{
            posts:[]
        }
    },
    watch :{
        '$route'(to,from){
            alert(to.params.categoria);
        }
    },
    created(){
        db.collection('posts').where('categoria','==',this.$route.params.categoria).get().then(querySnapshot=>{
            querySnapshot.forEach(doc => {
                const pdata = {
                'link' : doc.id,
                'titol' : doc.data().titol, 
                'content' : doc.data().contingut,
                'tags' : doc.data().tags,
                'comments' : doc.data().commentaris
                }
                this.posts.push(pdata);
                console.log(pdata);
            })
        })
    } 
}
</script>


// 'link' : doc.id,
//                     'titol' : doc.data().titol,
//                     'content' : doc.data().contingut,
//                     'tags' : doc.data().tags,
//                     'comments' : doc.data().commentaris