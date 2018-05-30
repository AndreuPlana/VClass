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

import firebase from 'firebase';
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
            file: File,
            uploadTask: '',
            downloadURL: ''
            
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
    },methods:{
        detectFiles (fileList) {
        Array.from(Array(fileList.length).keys()).map( x => {
            this.upload(fileList[x])
        })
        },
        upload (file) {
            
            this.file = file;
        }
        ,
         createpost(event) {
            console.log(this.file);

            var storageRef = firebase.storage().ref(new Date().getTime()+this.file.name);
            var val = storageRef.put(this.file);
            
            val.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                console.log('File available at', downloadURL);
            });


            console.log(this.downloadURL);
            if (this.titol || this.contingut || this.categoria) {
            db.collection('posts').add({
                titol: this.titol,
                contingut: this.contingut,
                categoria: this.categoria,
                tags: this.tags,
                usuari: firebase.auth().currentUser.uid,
                arxiu: this.downloadURL,
                time: firebase.firestore.FieldValue.serverTimestamp()
             })
             M.toast({html: 'Post Creat', classes: 'rounded green'});
             this.$router.push('/');
            } else {
                 M.toast({html: 'Error al Crear Post', classes: 'rounded red'});
            }
            
        }

    }
    
}
</script>
