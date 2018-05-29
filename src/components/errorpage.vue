<template>
<div class="errorpage">
    <div class="row">
      <div class="col s12">
        <div class="browser-window">
          <div class="top-bar">
            <div class="circles">
              <div id="close-circle" class="circle"></div>
              <div id="minimize-circle" class="circle"></div>
              <div id="maximize-circle" class="circle"></div>
            </div>
          </div>
          <div class="content">
            <div class="row">
              <div id="site-layout-example-top" class="col s12">
              </div>
              <div id="site-layout-example-right" class="col s12 m12 l12">
                <div class="row center">
                  <h1 class="text-long-shadow col s12">Pagina no trobada :(</h1>
                </div>
                <div class="row center">
                  <p class="center  col s12">La pagina que busques no existeix :(</p>
                  <p class="center s12"><router-link to="/"><button class="btn waves-effect waves-light">Pagina Principal</button></router-link>
                    <p>
                    </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</div>
</template>
<style>

</style>
<script>
export default {
    name:'ErrorPage',
    data(){
        return{
            
        }
    }
}
</script>

