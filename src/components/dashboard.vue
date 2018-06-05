<template>
    <div id="dashboard">
        <h3>Inici</h3>
        <ul class="collection with-header">
            <li class="collection-header">
                <h4>Categories</h4>
            </li>
            <li v-for="categories in categories" v-bind:key="categories.idcat" class="collection-item">
                <router-link :to="`/categories/${categories.nom}`"><h5>{{categories.nom}}</h5></router-link>
            </li>
            <div id="preloaderComment" class="center margin">
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
        </ul>

        <ul class="collection with-header">
            <li class="collection-header">
                <h4>Posts</h4>
            </li>
            <li v-for="posts in posts" v-bind:key="posts.id" class="collection-item">
                <router-link :to="`/post/${posts.link}`" class=" lletra"><img class="icon-size-post left" v-bind:src="posts.image" alt="foto usuari"><h5>{{posts.titol}}<small class="right sizeSmall">Creat per <router-link :to="`/perfil/${posts.usuari}`">{{posts.username}}</router-link></small></h5></router-link>
                <router-link class="secondary-content" v-bind:to="{ name: 'Post', params: { postid: posts.link }}"></router-link>
            </li>
            <div id="preloaderPost" class="center margin">
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
                posts:[],
                categories:[]
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
                        'comments' : doc.data().commentaris,
                        'usuari' : doc.data().usuari,
                        'image': doc.data().image,
                        'username': doc.data().username

                    }
                    this.posts.push(pdata)
                    console.log(pdata);
                })
                document.getElementById('preloaderPost').style.display = "none";
                document.getElementById('preloaderComment').style.display = "none";
            })

        }
    }
</script>

<style>
    .sizeSmall{
        font-size: 40%;
    }

    .icon-size-post{
        width: 50px;
        height: 50px;
        margin: 0 1rem 0 0 !important;
    }
    .lletra{
        color: rgba(0,0,0,0.87);
    }

    .margin{
        margin: 10px;
    }
</style>
