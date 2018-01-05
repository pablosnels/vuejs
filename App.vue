<template>
  <div id="app">
    <router-view> </router-view>
  </div>


</template>

<script>
import bus from './components/bus'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'app',
  data () {
    return {cateActual: 1}
  },
  computed: {
    ...mapGetters({
      lista: 'productos'
    })
  },
  methods: {
    NuevoProducto () {
      this.$router.push({
        name: 'AddProductosPorCate',
        params: { cate: this.$store.state.categoriaActual }
      })
    },
    CambioCategoria (idCate) {
      this.$store.state.categoriaActual = idCate
    },
    CambioFiltro (filtro) {
      this.$store.commit('SET_FILTER', filtro)
    },
    ...mapActions ({
      guardarNuevoProducto : 'guardarProd',
      cargarDatos: 'cargarDatos',
      cambiarFiltro : 'cambiarFiltro',
      eliminarProducto : 'eliminarProducto'
    }),
    GuardarSiValida (aProd) {
      this.guardarNuevoProducto(aProd)
    },
    Guardar (){
      this.guardarNuevoProducto()
    },
    Eliminar (aProd) {
      this.eliminarProducto(aProd);
    }
  },
  created () {
    this.cargarDatos()
    this.$router.push({ name: 'VistaPrincipal', params: { cate: 1 } })
    bus.$on('cambioCategoria', cate => { this.CambioCategoria(parseInt(cate)) })
    bus.$on('cambiaronCantidades', totalFalta => { console.log('Se emitió un cambio de :' + totalFalta) })
    bus.$on('filtrar', filtro => { this.cambiarFiltro(filtro) })
    bus.$on('nuevoProducto', nuevoProd => { this.GuardarSiValida(nuevoProd) })
    bus.$on('CambioModelo', aProd => { this.Guardar(); console.log('Cambio en modelo' + aProd) })
    bus.$on('ProductoEliminar', aProd => { this.Eliminar(aProd) })
    
  }
}
</script>


<style >

</style>
