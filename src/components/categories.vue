<template>
    
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

        }
    },
    watch :{
        '$route'(to,from){
            alert(to.params.categoria);
        }
    },
}
</script>
