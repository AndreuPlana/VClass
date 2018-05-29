<template>
    <div id="profile">

    </div>
</template>

<script>
    import db from './firebaseInit';
    export default {
        name: "profile"
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

</style>