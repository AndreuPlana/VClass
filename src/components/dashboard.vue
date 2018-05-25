<template>
<div id="dashboard">
    <h3>Dashboard</h3>
    <p>First Page</p>
    <ul class="colletction with-header">
        <li class="collection-header">
            <h4>Users</h4>
        </li>
        <li v-for="users in users" v-bind:key="users.id" class="collection-item">
            {{users.id}} {{users.user}}
        </li>
    </ul>

    <router-link to="/new" class="btn-floating btn-large red">
    <i class="fa ca-plus"></i>

    </router-link>
</div>
</template>

<script>
import db from './firebaseInit';
export default {
    name:'dashboard',
    data(){
        return{
            users:[]
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
                console.log(data)
            })
        }) 
    }
}
</script>
