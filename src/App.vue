<template>
  <div id="app">
    <Navbar/>

    <div class="container">
      <div class="publicidad center"><h3>PUBLICITAT</h3></div>
      <router-view/>
      <div class="publicidad center"><h3>PUBLICITAT</h3></div>
    </div>
  </div>
</template>

<style>
.custom-color {
    background: #26a69a !important;
}

.publicidad{
  height: 85px;
  background: #26a69a;
  opacity: 0.8;
  margin: 10px 0px 30px 0px;
}

  .publicidad > h3{
    padding-top: 15px;
    opacity: 0.2;
  }

</style>


<script>
import Navbar from './components/Navbar';
export default {
  name: 'App',
  components:{
    Navbar
  }
}
</script>
