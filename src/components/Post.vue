<template>
  <div>
      <h1>POST</h1>
    <ul class="collection with-header">
      <li class="collection-header"><h4>{{titol}}</h4></li>
      <li class="collection-item">Employee ID#: {{employee_id}}</li>
      <li class="collection-item">Department: {{dept}}</li>
      <li class="collection-item">Position: {{position}}</li>
    </ul>
    <p>{{$route.params.postid}}</p>
    <router-link to="/" class="btn grey">Back</router-link>
    <div class="fixed-action-btn">
      <router-link v-bind:to="{ name: 'edit-employee', params: { employee_id: employee_id }}" class="btn-floating btn-large red">
        <i class="fa fa-pencil"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
  import db from './firebaseInit'
  import firebase from 'firebase'
  export default {
    name: 'view-employee',
    data () {
      return {
        postid: $router.params.postid,
        titol: null,
        contingut: null,
        tags: null
      }
    },
    watch:{
        '$route' (to,from){
            alert(to.params.idpost);
        }
    }
    ,beforeCreated(){
        alert(this.$route.params.idpost);
        //const querySnap = collection.where(firebase.firestore.FieldPath.documentId(), '<', '100').get();
        alert($route.params.postid);
        db.collection('posts').where(firebase.firestore.FieldPath.documentId(),'==',this.$route.params.postid).get().then(querySnapshot=>{
            querySnapshot.forEach(doc =>{
                const pdata = {
                    'titol' : doc.data().titol,
                    'content' : doc.data().contingut,
                    'tags' : doc.data().tags,
                    'comments' : doc.data().commentaris
                }
            console.log(data);
            })
        })
    
    }
    }
    
</script>