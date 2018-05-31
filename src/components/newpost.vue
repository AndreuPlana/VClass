<template>
<div class="row">
    <div class="col s12">
        <div class="card">
            <div class="card-body center pd-custom-lr pd-custom-bt">
                <h1>Crear Post</h1>
                <form>
                    <div class="input-field">
                        <label for="Titol">Titol</label>
                        <input type="text" name="Titol" id="Titol" v-model="titol" required class="form-control">
                    </div>
                     <div class="input-field">
                        <label for="contingut">Contingut</label>
                        <textarea id="contingut" class="materialize-textarea" v-model="contingut"></textarea>
                    </div>
                    <div class="input-field">
                        <label for="tags">Tags</label>
                        <input type="text" name="tags" id="tags" v-model="tags" required class="form-control">
                    </div>
                    <label for="categoria" class="left">Categoria</label>
                    <div class="input-field">
                        <select name="categoria" id="categoria" v-model="categoria" required class="form-control">
                            <option value="" disabled>Categoria</option>
                            <option v-for="categories in categories" v-bind:key="categories.idcat" v-bind:value="categories.nom">{{categories.nom}}</option>
                        </select>
                    </div>
                    <div class="file-field input-field">
                    <div class="btn">
                        <span>File</span>
                        <input type="file" @change="detectFiles($event.target.files)">
                    </div>
                    <div class="file-path-wrapper">
                        <input class="file-path validate" type="text">
                    </div>
                    </div>
                    <input type="button" v-on:click="createpost" value="Crear Post" class="btn btn-custom">
                </form>
            </div>
        </div>
    </div>
</div>
</template>
<style>
select{
    display: block;
}
.pd-custom-lr {
    padding-left: 50px !important;
    padding-right: 50px !important;
}

.pd-custom-bt {
    padding-bottom: 25px !important;
    padding-top: 25px !important;
}
</style>
<script>
import db from './firebaseInit';

import firebase ,{storage} from 'firebase';
export default {
    name:'newPost',
    data(){
        return{
            titol : '',
            contingut : '',
            categoria:'',
            tags:'',
            usuari:'',
            uploadTask : '',
            downloadURL : '',
            time :null,
            users:[],
            posts:[],
            categories:[],
            progressUpload: 0,
            file: null,
            uploadTask: '',
            downloadURL: '',

        }
    },created(){
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
        db.collection('categories').get().then(querySnapshot=>{
            querySnapshot.forEach(doc =>{
                const cdata = {
                    'id' :doc.id,
                    'nom':doc.data().nom
                }
                this.categories.push(cdata)
            })
        })
        db.collection('posts').get().then(querySnapshot=>{
            querySnapshot.forEach(doc =>{
                const pdata = {
                    'link' : doc.data().link,
                    'titol' : doc.data().titol,
                    'content' : doc.data().contingut,
                    'tags' : doc.data().tags,
                    'comments' : doc.data().commentaris,
                    'image': doc.data().image,
                    'username': doc.data().username
                }
                this.posts.push(pdata)
                console.log(pdata);
            })
        })
    },methods:{
        detectFiles (fileList) {
        Array.from(Array(fileList.length).keys()).map( x => {
            this.upload(fileList[x])
        })
        },
        upload (file) {
            if(file){
            this.file = file;
            }
        }
        ,
         createpost(event) {
        if (this.titol && this.contingut && this.categoria) {
             
            if(this.file){
                var storageRef = firebase.storage().ref(new Date().getTime()+this.file.name);
                var uploadTask = storageRef.put(this.file);
                const data ={
                    titol: this.titol,
                    contingut: this.contingut,
                    categoria: this.categoria,
                    tags: this.tags,
                    usuari: firebase.auth().currentUser.uid,
                    arxiu: this.file.name,
                    time: firebase.firestore.FieldValue.serverTimestamp()
                }
                uploadTask.on('state_changed', function(snapshot,data){
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
                }
                }, function(error) {
                // Handle unsuccessful uploads
                }, function() {
                    
                    uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                    db.collection('posts').add({
                        titol: data.titol,
                        contingut: data.contingut,
                        categoria: data.categoria,
                        tags: data.tags,
                        usuari: firebase.auth().currentUser.uid,
                        arxiu : data.arxiu,
                        link: downloadURL,
                        time: firebase.firestore.FieldValue.serverTimestamp(),
                        username: firebase.auth().currentUser.displayName,
                        image: firebase.auth().currentUser.photoURL
                    })
                });
                });
            }else{
                db.collection('posts').add({
                        titol: this.titol,
                        contingut: this.contingut,
                        categoria: this.categoria,
                        tags: this.tags,
                        usuari: firebase.auth().currentUser.uid,
                        arxiu : '',
                        link: '',
                        time: firebase.firestore.FieldValue.serverTimestamp(),
                        username: firebase.auth().currentUser.displayName,
                        image: firebase.auth().currentUser.photoURL
                    })
            }
             M.toast({html: 'Post Creat', classes: 'rounded green'});
             this.$router.push('/');
            } else {
                 M.toast({html: 'Error al Crear Post', classes: 'rounded red'});
            }
        }
    }
    
}
</script>
