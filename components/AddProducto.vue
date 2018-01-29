<template>
  <div>
    
    <b-navbar toggleable="md" type="light" variant="primary" class="backcolorUI-dark">
            <i aria-hidden="true" @click="volver" class="fa fa-arrow-circle-left text-white pull-right fa-lg"></i>
            <a class="navbar-brand text-white" href="#">Nuevo Producto</a>
     </b-navbar>
    
    <div class="card">
      <div class="card-body backcolorUI-dark">
      <input class="form-control form-control-sm" type="search" placeholder="Nombre del Producto" aria-label="Search" v-model="nombreNuevoProd">          

   <div class="container top5">
      <div class="row">
      <div class="col-1"></div>
      <div class="col-4">
        <small id="emailHelp" class="form-text text-light">Actual</small>
        <input type="number" min="0" max="99" class="form-control InputCant" id="InputCant1" v-model="cantActual">
      </div>
      <div class="col-1"></div>
      <div class="col-4">
        <small id="emailHelp" class="form-text text-light">Mensual</small>
        <input type="number" min="0" max="99" class="form-control InputCant" id="InputCant1" v-model="cantMensual">
      </div>
      <div class="col-1"></div>
      </div>
   </div>


<div class="row top5">
  <div class="col-1"></div>
  <div class="col-5 align-right"><div class="small  text-white">Establecimiento:</div></div>
  <div class="col-5"><cp-cbSuper :supermercados='supermercados' :productoActual='productoActual' ></cp-cbSuper></div>
  <div class="col-1"></div>
</div>



    <div id="botonera" class="btn-group top5" role="group" aria-label="Basic example">
      <button type="button" class="btn backcolorUI text-white btn-sm" @click="guardar" :disabled="!nombreNuevoProd" >Guardar</button>
      <button type="button" class="btn btn-default btn-sm" @click="cancelar">Cancelar</button>
    </div>



    </div>
  </div>

    
 </div>  
  
</template>

<script>
import bus from './bus'
import comboSuper from './comboSuper'
import { mapGetters } from 'vuex'

export default {
  name: 'AddProducto',
  data () {
    return {
      nombreNuevoProd: '',
      cantActual: 1,
      cantMensual: 1,
      productoActual: {'super':0}
    }
  },
  computed: {
    cate () {
      return this.$route.params.cate
    },
    ...mapGetters({
    supermercados: 'supermercados'
  })
  },
  methods: {
    volver () {
      this.$router.push({
        name: 'VistaPrincipal',
        params: {cate: this.$route.params.cate}
      })
    },
    cancelar () {
      this.volver()
    },
    guardar () {
      var nuevo = {
        cate: parseInt(this.cate),
        desc: this.nombreNuevoProd,
        cant: parseInt(this.cantActual),
        mensual: parseInt(this.cantMensual),
        precio: '0',
        order: 0,
        super: this.productoActual.super
      }
      bus.$emit('nuevoProducto', nuevo)
      this.volver()
    }
  },
  created () {
    this.productoActual.super =  this.$route.params.super
  },
  components: {
    'cp-cbSuper': comboSuper
  }
}
</script>

<style scoped>
.top5 {
  margin-top: 0.5em;
}

.InputCant {
  width: 100%;
}
</style>
