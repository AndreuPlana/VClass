<template>
<div id="dashboard">
    <h3>Dashboard</h3>
    <p>First Page</p>
    <ul class="colletction with-header">
        <li class="collection-header">
            <h4>Users</h4>
        </li>
        <li v-for="users in users" v-bind:key="users.id" class="collection-item">
            {{users.id}} {{users.user}}
        </li>

        <li class="collection-header">
            <h4>Posts</h4>
        </li>
        <li v-for="posts in posts" v-bind:key="posts.id" class="collection-item">
            <h5>{{posts.titol}}</h5><br> <p> {{posts.content}}</p><br> {{posts.tags}}
            <br> {{posts.comments}}
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
                    'link' : '/post/'+doc.id,
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
