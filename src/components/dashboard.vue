<template>
<div id="dashboard">
    <h3>Dashboard</h3>
    <p>First Page</p>
    <ul class="colletction with-header">
        <li class="collection-header">
            <h4>PostsList</h4>
        </li>
        <li v-for="posts in posts" v-bind:key="posts.id" class="collection-item">
            <router-link :to="`/post/${posts.link}`">{{posts.titol}}</router-link>
             <router-link class="secondary-content" v-bind:to="{ name: 'Post', params: { postid: posts.link }}"><i class="fa fa-eye"></i></router-link>
        </li>
    </ul>

</div>
</template>

<script>
import db from './firebaseInit';
export default {
    name:'dashboard',
    data(){
        return{
            users:[],
            posts:[]
        }
    }
    ,created(){
        db.collection('users').get().then(querySnapshot=>{
            querySnapshot.forEach(doc =>{
                const data = {
                    'id' :doc.id,
                    'user':doc.data().usuari
                }
                this.users.push(data)
                //console.log(data)
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
