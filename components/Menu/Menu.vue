<template lang="html">
  <div>
  <nav class="navbar navbar-expand-lg navbar-light bg-secondary" v-if="modo != 'I'">

    <cp-cbCategorias v-model='cateSelected' :categorias=categorias ></cp-cbCategorias>
    
    <button type="button" id="buttonAdd" class="btn btn-info" @click="irAddCategoria(cateSelected)"><i class="fa fa-plus-square-o fa-lg" aria-hidden="true"></i></button>

    <div class="switch">
      <switches  v-model="modo" text-enabled="Mensual"  text-disabled="Compra" theme="bootstrap" color="info"  v-on:input="CambioModo()" type-bold="true"></switches>
    </div>

    <cp-buscador></cp-buscador>
    
  </nav>
    <cp-progresoCompra v-bind:compraTotal=compraTotal v-bind:spinner=loading v-bind:actual=compraActual></cp-progresoCompra>
  </div>

</div>

</template>
 
<script lang="js">
import bus from '../bus'
import comboCategorias from './comboCategorias'
import Buscador from './Buscador'
import Switches from 'vue-switches'
import ProgresoCompra from './ProgresoCompra'
import { mapGetters } from 'vuex'

export default {
  name: 'cp-menu',
  props: [ 'categorias', 'loading', 'cateActual' ],
  data () {
    return {
      campoBusqueda: '',
      modo: false,
      data: this.$store.state,
      cateSelected: 0
    }
  },
  components: {
    'cp-cbCategorias': comboCategorias,
    'cp-buscador': Buscador,
    Switches,
    'cp-progresoCompra': ProgresoCompra
  },
  methods: {
    getModo () {
      return this.modo ? 'M' : 'C'
    },
    CambioModo () {
      bus.$emit('cambioModo', { modo: this.getModo() })
    },
    irAddCategoria (cateSelected) {
      if (cateSelected > 0) {
        this.$router.push({name: 'AddProductosPorCate', params: { cate: cateSelected }})
      }
    }
  },
  computed: {
    ...mapGetters({
      categoriaActual: 'categoriaActual',
      porcCompraActual: 'porcCompraActual',
      totalCompra: 'totalCompra'
    }),
    compraActual () {
      return this.porcCompraActual
    },
    compraTotal () {
      return this.totalCompra
    }
  },
  created () {
    this.cateSelected = this.categoriaActual
  }
}
</script>

<style >
.switch{
     margin-top: 0px;
}
.vue-switcher__label span {
  color: #85d0e7
}

</style>