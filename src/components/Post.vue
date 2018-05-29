<template>
  <div>
      <div>
      <h3>Post</h3>
      <ul v-for="posts in posts" v-bind:key="posts.id" class="collection with-header">
          <li class="collection-header"><h4>{{posts.titol}}</h4></li>
          <li class="collection-item"><div>{{posts.content}}</div></li>
      </ul>
      </div>
      <div>
      <h3>Comentaris</h3>
      <ul v-for="comentaris in comentaris" v-bind:key="comentaris.id" class="collection with-header">
          <li class="collection-header"><h4>{{comentaris.usuari}}</h4></li>
          <li class="collection-item"><div>{{comentaris.comentari}}</div></li>
      </ul>
      </div>
      <div>
        <h3>Comenta!</h3>
        Comentari: <textarea v-model="comentari" name="" id="" cols="30" rows="10"></textarea>
        <button type="button" class="waves-effect waves-light btn" v-on:click="addcoment">Comentar</button>
          

      </div>
      <div id="preloader" class="center">
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
        posts:[],
        comentaris:[],
        comentari : ''
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
        document.getElementById('preloader').style.display = "none";
        })
        db.collection('comentaris').where('idpost','==',yeah).orderBy('time').get().then(querySnapshot=>{
            querySnapshot.forEach(doc => {
                const cdata = {
                'id' : doc.id,
                'comentari' : doc.data().comentari,
                'usuari': doc.data().usuari
                }
                this.comentaris.push(cdata);
                console.log(cdata);
            })
        })

    }
    ,methods:{
        addcoment : function (){
            if(this.comentari){
                db.collection('comentaris').add({
                    comentari : this.comentari,
                    idpost : this.$route.params.postid,
                    usuari : firebase.auth().currentUser.displayName,
                    time : firebase.firestore.FieldValue.serverTimestamp()
                })
                M.toast({html: 'Comentari Afegir', classes: 'rounded green'});
            }else{
                M.toast({html: 'Comentari buit!', classes: 'rounded red'});
            }
        }
    }
    }
    
</script>