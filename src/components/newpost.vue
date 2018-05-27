<template>
<div class="row">
    <div class="col s12">
        <div class="card">
            <div class="card-body center pd-custom-lr">
                <h1>Crear Post</h1>
                <form>
                    <div class="input-field">
                        <label for="Titol">Titol</label>
                        <input type="text" name="Titol" id="Titol" v-model="titol" required class="form-control">
                    </div>
                     <div class="input-field">
                        <label for="Contingut">Contingut</label>
                        <input type="text" name="Contingut" id="Contingut" v-model="contingut" required class="form-control">
                    </div>
                    <div class="input-field">
                        <label for="tags">Tags</label>
                        <input type="text" name="tags" id="tags" v-model="tags" required class="form-control">
                    </div>
                    <div class="file-field input-field">
                    <div class="btn">
                        <span>File</span>
                        <input type="file" @change="file">
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

</style>
<script>
import db from './firebaseInit';
import firebase,{ storage } from 'firebase';

export default {
    name:'newPost',
    data(){
        return{
            titol : '',
            contingut : '',
            tags:'',
            usuari:'',
            file : null,
            uploadTask : '',
            downloadURL : '',
            time :null
        }
    },methods:{
         createpost(event){
            //  this.file = event.target.file[0];
             
            //  this.uploadTask = storage.ref('images').put(this.file);

            //  this.uploadTask.then(Snapshot =>{
            //      this.downloadURL = this.uploadTask.Snapshot.downloadURL;
                 
            //  })
            
             db.collection('posts').add({
                 titol : this.titol,
                 contingut : this.contingut,
                 tags : this.tags,
                 usuari : firebase.auth().currentUser.uid,
                 arxiu : this.downloadURL,
                 time : firebase.firestore.FieldValue.serverTimestamp()
             })
             alert("Post Created");

         }

    }
    
}
</script>
