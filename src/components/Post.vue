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
    watch :{
        '$route'(to,from){
            alert(to.params.postid);
        }
    },
    created(){
        alert("createdalert"+this.$route.params.postid);
    }
    }
    
</script>