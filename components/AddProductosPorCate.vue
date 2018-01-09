<template>
  <div>
    <div class="card">
      <div class="card-body bg-secondary">
      <input class="form-control form-control-sm" type="search" placeholder="Nombre del Producto" aria-label="Search" v-model="nombreNuevoProd">          

   <div class="container top5">
      <div class="row">
      <div class="col-6">
        <input type="number" class="form-control InputCant" id="InputCant1" v-model="cantActual">
        <small id="emailHelp" class="form-text text-light">Actual</small>
      </div>
      <div class="col-6">
        <input type="number" class="form-control InputCant" id="InputCant1" v-model="cantMensual">
        <small id="emailHelp" class="form-text text-light">Mensual</small>
      </div>
      </div>
   </div>

    <div id="botonera" class="btn-group top5" role="group" aria-label="Basic example">
      <button type="button" class="btn btn-info btn-sm" @click="guardar" :disabled="!nombreNuevoProd" >Guardar</button>
      <button type="button" class="btn btn-light btn-sm" @click="cancelar">Cancelar</button>
    </div>

    </div>
  </div>

    
 </div>  
  
</template>

<script>
import bus from './bus'

export default {
  name: 'AddProductosPorCate',
  data () {
    return {
      nombreNuevoProd: '',
      cantActual: 1,
      cantMensual: 1
    }
  },
  computed: {
    cate () {
      return this.$route.params.cate
    }
  },
  methods: {
    volver () {
      this.$router.push({
        name: 'VistaPrincipal',
        params: {cate: this.cate}
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
        orden: 0
      }
      bus.$emit('nuevoProducto', nuevo)
      this.volver()
    }
  },
  created () {
    console.log('created ADD')
  },
  components: {
    // "cp-productoCompra": ProductoCompra
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
