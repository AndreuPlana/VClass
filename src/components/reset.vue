<template>
    <div class="row">
  <div class="col m12 center">
      <div class="collection">
          <div class="collection-item pd-custom-lr">
              <h1>Recuperar Contrasenya</h1>
              <form>
                  <div class="input-field">
                      <label for="email">Email</label>
                      <input type="email" name="email" v-model="email" id="email" class="form-control">
                  </div>
                  <input type="button" v-on:click="reset" value="Recuperar Contrasenya" class="btn btn-custom">
              </form>
          </div>
      </div>
  </div>
</div>
</template>
<style>
.pd-custom-lr {
    padding-left: 50px !important;
    padding-right: 50px !important;
}

.btn-custom {
    width: 45%;
    margin-bottom: 25px;
    margin-top: 10px;
}
</style>

<script>
import firebase from 'firebase';
export default {
    name :'Reset',
    data (){
        return{
            email : ''
        }
    }
    ,methods:{
        reset : function(){
            firebase.auth().sendPasswordResetEmail(this.email).then(function() {
            alert("Email Sent");
            location.href = '/';
            }).catch(function(error) {
            alert(error)
            })
        }
    }
}
</script>


