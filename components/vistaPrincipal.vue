<template>
  <div> 
    <cp-menu :categorias=cates :loading=loading ></cp-menu>
    <cp-listado v-bind:categoriaActual=cateActual v-bind:filtro=filtroActual v-bind:productosFiltrados=productosFiltrados v-bind:productosYaComprados=productosYaComprados></cp-listado>
   
{{getProdByDesc('Aceite')}}

    <!--cp-downBar></cp-downBar-->
  </div>
</template>

<script>
import Menu from './Menu/Menu'
import Listado from './Listado/Listado'
import Downbar from './Downbar'
import { mapGetters } from 'vuex'

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
      cateActual: 'categoriaActual',
      filtroActual: 'filtroActual',
      getProdByDesc: 'prodByDesc',
      prodByCate: 'prodByCate'
    })
  },
  components: {
    'cp-menu': Menu,
    'cp-listado': Listado,
    'cp-downBar': Downbar
  },
  methods: {
    CantidadFaltantePorCate (idCate) {
      var cant = 0
      this.productos.forEach(prod => {
        if (prod.cate === parseInt(idCate) && prod.cant) {
          cant += 1
        }
      })
      return cant
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



