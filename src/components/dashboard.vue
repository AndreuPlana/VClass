<template>
<div id="dashboard">
    <h3>Main Page</h3>
    <ul class="collection with-header">
        <li class="collection-header">
            <h4>PostsList</h4>
        </li>
        <li v-for="posts in posts" v-bind:key="posts.id" class="collection-item">
            <router-link :to="`/post/${posts.link}`">{{posts.titol}}</router-link>
            <router-link class="secondary-content" v-bind:to="{ name: 'Post', params: { postid: posts.link }}"><i class="fa fa-eye"></i></router-link>
        </li>
        <div id="preloaderPost" class="center">
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
            <h4>categories</h4>
        </li>
        <li v-for="categories in categories" v-bind:key="categories.idcat" class="collection-item">
             <router-link :to="`/categories/${categories.id}`">{{categories.nom}}</router-link>
        </li>
        <div id="preloaderComment" class="center">
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
                    'comments' : doc.data().commentaris

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
