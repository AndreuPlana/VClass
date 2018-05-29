<template>
    <div id="profile" class="row card pd-custom-bt">
        <div class="col offset-s1 s9">
            <div id="user" class="col s5">
                <div class="foto center">
                    <img v-for="img in images" v-bind:src="img"/>
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
                </div>
                <button class="btn btn-custom2">VEURE POSTS</button><br><br>
                <button class="btn btn-custom2">VEURE COMENTARIS</button>
            </div>
            <div class="mayus" v-for="users in users" v-bind:key="users.id">
                <div v-if="users.currentUser">
                    <h6>{{users.id}}</h6>
                    <h6>NAIX: 24/09/1998</h6>
                    <h6>PAIS: SPAGNA</h6>
                    <h6>TELEFON: 666555444</h6>
                    <h6>CP: 08192</h6>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import db from './firebaseInit';
    import firebase,{ storage } from 'firebase';
    export default {
        name: "profile",
        data(){
            return{
                users:[],
                posts:[],
                categories:[],
                images:['https://firebasestorage.googleapis.com/v0/b/virtualclassroom-d806b.appspot.com/o/add_image.PNG?alt=media&token=22c97627-6bda-4ee6-bcb0-76696c53c337']
            }
        }
        ,created(){
            db.collection('users').get().then(querySnapshot=>{
                querySnapshot.forEach(doc =>{
                    const data = {
                        'id' :doc.id,
                        'user':doc.data().usuari,
                        'nom':doc.data().nom,
                        'currentUser':firebase.auth().currentUser.uid
                    }
                    document.getElementById('preloader').style.display = "none";
                    this.users.push(data)

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
        }
    }
</script>

<style scoped>
    .gran{
        font-size: 16rem !important;
    }
    img{
        width: 100%;
        margin-bottom: 17px;
    }
    .mayus{
        text-transform: uppercase;
    }
    .pd-custom-lr {
        padding-left: 50px !important;
        padding-right: 50px !important;
    }

    .pd-custom-bt {
        padding-bottom: 25px !important;
        padding-top: 25px !important;
    }

    .btn-custom2 {
        width: 100%;
    }
</style>