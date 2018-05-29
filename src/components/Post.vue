<template>
  <div>
      <h1>POST</h1>
      <p>{{$route.params.postid}}</p>
  </div>
</template>

<script>
  import db from './firebaseInit'
  import firebase from 'firebase'
  export default {
    name: 'Post',
    data () {
      return {
        postid:'',
        titol: null,
        contingut: null,
        tags: null
      }
    },
    watch:{
        '$route' (to,from){
            alert(to.params.postid)
        }
    }
    ,beforecreate(){
        // db.collection('posts').get().then(querySnapshot=>{
        //     querySnapshot.forEach(doc =>{
        //         const pdata = {
        //             'titol' : doc.data().titol,
        //             'content' : doc.data().contingut,
        //             'tags' : doc.data().tags,
        //             'comments' : doc.data().commentaris
        //         }
        //     console.log(pdata);
        //     })
        // })
    }
    
    }
    
</script>