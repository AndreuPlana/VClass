<template>
<div>
<div class="row">
    <div class="col s12">
        <div class="card">
            <div class="card-body center pd-custom-lr">
                <h1>LOGIN</h1>
                <form>
                    <div class="input-field">
                        <label for="email">Email</label>
                        <input type="email" name="email" id="email" class="form-control">
                    </div>
                    <div class="input-field">
                        <label for="password">Password</label>
                        <input type="password" name="password" id="password" class="form-control">
                    </div>
                    <input type="submit" value="ENVIAR" class="btn btn-custom">
                </form>
            </div>
        </div>
    </div>
</div>
<div class="row">
    <div class="col s12">
        <div class="card">
            <div class="card-body center pd-custom-bt">
                <button class="btn red btn-custom2"><i class="fab fa-google-plus-g"></i> Google</button>
                <button class="btn btn-custom2"><i class="fa fa-sync-alt"></i> Reiniciar Contrassenya</button>
            </div>
        </div>
    </div>
</div>
</div>

</template>

<script>
export default {
    name:'Login',
    data(){
        return{

        }
    }
}
</script>