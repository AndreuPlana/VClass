<template>
    <div>
        <ul class="collection with-header">
            <li class="collection-header">
                <h4>{{$route.params.categoria}}</h4>
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
<style>

</style>
<script>
    import firebase from 'firebase';
    import db from './firebaseInit'
    export default {
        name: 'Categories',
        data(){
            return{
                posts:[]
            }
        },
        watch :{
            '$route'(to,from){
                alert(to.params.categoria);
            }
        },
        created(){
            var yeah = this.$route.params.categoria;
            db.collection('posts').where('categoria','==', yeah).get().then(querySnapshot=>{
                querySnapshot.forEach(doc => {
                    const pdata = {
                        'link' : doc.id,
                        'titol' : doc.data().titol,
                        'content' : doc.data().contingut,
                        'tags' : doc.data().tags,
                        'arxiu': doc.data().arxiu,
                        'username': doc.data().username,
                        'image': doc.data().image,
                        'usuari': doc.data().usuari,
                        'categoria': doc.data().categoria
                    }
                    this.posts.push(pdata);
                    document.getElementById('preloaderPost').style.display = "none";
                    console.log(pdata);
                })
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
        margin: 0 1rem 0 0;
    }
    .lletra{
        color: rgba(0,0,0,0.87);
    }
</style>