<template>
    <div>
        <div>
            <h1>Post</h1>
            <ul v-for="posts in posts" v-bind:key="posts.id" class="collection with-header">
                <li class="collection-header"><h4>{{posts.titol}}</h4></li>
                <li class="collection-item"><div>{{posts.content}}</div></li>
            </ul>
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
                posts:[]
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
        }
    }

</script>