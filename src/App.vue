<template>
  <div id="app">
    <Navbar />
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<style>
.custom-color {
    background: #26a69a !important;
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
