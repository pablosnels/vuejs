<template>
  <div> 
    <cp-menu :categorias=cates :supermercados=supers :categoriaActual=cateActual :filtro=filtroActual v-bind:loading=loading @refresh="refresh"></cp-menu>
    <cp-listado :categoriaActual=cateActual :filtro=filtroActual :productosFiltrados=productosFiltrados :productosYaComprados=productosYaComprados></cp-listado>
  </div>
</template>

<script>
import Menu from './Menu/Menu'
import Listado from './Listado/Listado'
import { mapGetters,mapActions } from 'vuex'

export default {
  name: 'app',
  data () {
    return {}
  },
  computed: {
    ...mapGetters({
      productos: 'productos',
      productosOrdenados: 'productosOrdenados',
      productosFiltrados: 'productosFiltrados',
      productosYaComprados: 'productosYaComprados',
      loading: 'loading',
      cates: 'categorias',
      supers: 'supermercados',
      cateActual: 'categoriaActual',
      filtroActual: 'filtroActual',
      getProdByDesc: 'prodByDesc',
      prodByCate: 'prodByCate'
    })
  },
  components: {
    'cp-menu': Menu,
    'cp-listado': Listado
  },
  methods: {
    ...mapActions({
      cargarDatos: 'cargarDatos'
    }),
    CantidadFaltantePorCate (idCate) {
      var cant = 0
      this.productos.forEach(prod => {
        if (prod.cate === parseInt(idCate) && prod.cant) {
          cant += 1
        }
      })
      return cant
    },
    refresh (){
      this.cargarDatos();
    }
  }
}
</script>

<style >
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
.checks {
  margin-top: 50px;
}
#margin9 {
  margin-top: -9px;
}

#dropdownMenuButton {
  margin-top: -8px;
}

#buttonAdd {
  margin-top: -8px;
}
</style>



