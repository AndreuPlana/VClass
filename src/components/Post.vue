<template>
  <div>
      <h1>Post</h1>
      <ul class="colletction with-header">
        <li v-for="posts in posts" v-bind:key="posts.id" class="collection-item">
            <h2>{{posts.titol}}</h2>
            <p>{{posts.content}}</p>
            <p>{{posts.tags}}</p>
        </li>
    </ul>
    
    <router-link to="/"> <a class="waves-effect waves-light btn">Tornar</a></router-link>

  </div>
</template>

<script>
  import db from './firebaseInit'
  import firebase from 'firebase'
  export default {
    name: 'Post',
    data () {
      return {
        posts:[]
      }
    },
    watch :{
        '$route'(to,from){
            alert(to.params.postid);
        }
    },
    created(){
        var yeah =this.$route.params.postid;
        db.collection("posts").doc(yeah).onSnapshot(doc =>{    
        const pdata = {
                    'link' : doc.id,
                    'titol' : doc.data().titol,
                    'content' : doc.data().contingut,
                    'tags' : doc.data().tags,
                    'comments' : doc.data().commentaris
                }
        this.posts.push(pdata)     
    })
    }
    }
    
</script>