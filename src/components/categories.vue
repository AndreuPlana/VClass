<template>
    <div>
        <ul class="collection with-header">
            <li class="collection-header">
                <h4>{{$route.params.categoria}}</h4>
            </li>
            <li v-for="posts in posts" v-bind:key="posts.id" class="collection-item">
                <router-link :to="`/post/${posts.link}`">{{posts.titol}}</router-link>

                <router-link class="secondary-content" v-bind:to="{ name: 'Post', params: { postid: posts.link }}">
                    <span></span>
                    <i class="fa fa-eye"></i>
                </router-link>
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
            db.collection('posts').where('categoria','==',this.$route.params.categoria).get().then(querySnapshot=>{
                querySnapshot.forEach(doc => {
                    const pdata = {
                        'link' : doc.data().link,
                        'titol' : doc.data().titol,
                        'content' : doc.data().contingut,
                        'tags' : doc.data().tags,
                        'arxiu': doc.data().arxiu,
                        'username': doc.data().username,
                        'image': doc.data().image
                    }
                    this.posts.push(pdata);
                    document.getElementById('preloaderPost').style.display = "none";
                    document.getElementById('preloaderComment').style.display = "none";
                    console.log(pdata);
                })
            })
        }
    }
</script>
