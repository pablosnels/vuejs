<template>
  
  <div>
    <cp-productoCompra v-for="prod in productosFiltrados" :key='prod.desc' v-bind:producto=prod v-bind:modo=modoConsulta></cp-productoCompra>

    <cp-productoCompra v-for="prod in productosYaComprados" :key='prod.desc' v-bind:producto=prod v-bind:modo=modoConsulta ></cp-productoCompra>
  
  </div>


    
</template>

<script>
import bus from '../bus'
import ProductoCompra from './ProductoCompra'
import ProductoComprado from './ProductoComprado'

export default {
  name: 'Listado',
  props: ['categoriaActual', 'filtro', 'productosFiltrados', 'productosYaComprados'],
  data () {
    return {
      modoConsulta: 'C'
    }
  },
  components: {
    'cp-productoCompra': ProductoCompra,
    'cp-productoComprado': ProductoComprado
  },
  created () {
    bus.$on('cambioModo', mod => { this.modoConsulta = mod.modo })
  }
}
</script>

<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
.grey {
  background-color: gainsboro;
}
.card-body {
    padding: .5rem;
}



</style>