<template lang="html">
  <div>
    <nav class="navbar navbar-light backcolorUI-dark bajarPad">
        <div class="row">
          <div class="col-1"></div>
          <div class="col-10 ">
              <div class="btn-group btn-group-sm pull-left" role="group" aria-label="Basic example">
               <cp-cbCategorias class="mr8" v-model='cateSelected' :categorias='categorias'  cate:cateSeleccionada='cateActual' ></cp-cbCategorias>  
               <cp-cbSuper class="mr8" v-model='superSelected' :supermercados='supermercados' :superActual='superActual' ></cp-cbSuper >    
               <span class="border border-secondary text-secondary rounded vc">&nbsp;€{{pendienteCompraEstablecimiento}}&nbsp;</span>
             </div> 
          </div>
          <div class="col-1"></div>
        </div>
        
        <div class="row">
          <div class="col-6 myMenu">
          <cp-buscador :filtro='filtro'></cp-buscador>
          </div>
          <div class="col-6  myMenu">
            <div class="btn-group btn-group-sm pull-left" role="group" aria-label="Basic example">
              <button type="button"  class="btn backcolorUI text-white" @click="irAddCategoria(cateSelected)"><i class="fa fa-plus-square-o" aria-hidden="true"></i></button>
              <button type="button"  class="btn backcolorUI text-white" @click="refresh()"><i class="fa fa fa-refresh" aria-hidden="true"></i></button>
              <button type="button"  class="btn backcolorUI text-white" @click="textoLibre()"><i class="fa fa fa-pencil-square-o" aria-hidden="true"></i></button>
              <button type="button"  class="btn backcolorUI text-white" @click="config()"><i class="fa fa fa-cog" aria-hidden="true"></i></button>
              <button type="button"  class="btn backcolorUI text-white" @click="gastado()"><i class="fa fa-credit-card" aria-hidden="true"></i></button>
            </div>
          </div>
        </div>
    </nav>

    <cp-progresoCompra :total='compraTotal' :spinner='loading' :actual='porcCompraActual'></cp-progresoCompra>
  </div>

</template>
 
<script lang="js">
import bus from '../bus'
import comboCategorias from './comboCategorias'
import comboSuper from './comboSuper'
import Buscador from './Buscador'
import Switches from 'vue-switches'
import ProgresoCompra from './ProgresoCompra'
import { mapGetters } from 'vuex'

export default {
  name: 'cp-menu',
  props: [ 'categorias', 'loading', 'cateActual', 'cateSeleccionada','supermercados','filtro' ],
  data () {
    return {
      data: this.$store.state,
      cateSelected: 0,
      superSelected: 0
    }
  },
  components: {
    'cp-cbCategorias': comboCategorias,
    'cp-buscador': Buscador,
    Switches,
    'cp-progresoCompra': ProgresoCompra,
    'cp-cbSuper': comboSuper
  },
  methods: {
    irAddCategoria (cateSelected) {
      if (cateSelected.id > 0) {
        this.$router.push({name: 'AddProducto', params: { cate: cateSelected.id , super: this.superSelected.id }})
      }
    },
    refresh (){
      this.$emit('refresh');
    },
    textoLibre () {
      this.$router.push({name: 'TextoLibre'})
    },
    config () {
      this.$router.push({name: 'Config'})
    },
    gastado () {
      this.$router.push({name: 'Gastado'})
    }
  },
  computed: {
    ...mapGetters({
      categoriaActual: 'categoriaActual',
      porcCompraActual: 'porcCompraActual',
      compraTotal: 'totalCompra',
      superActual: 'superActual',
      pendienteCompraEstablecimiento: 'pendienteCompraEstablecimiento'
    })
  },
  created () {
    this.cateSelected = this.categoriaActual,
    this.superSelected = this.superActual
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
.col{
  padding-right: 0px;
  padding-left: 0px;
  padding-top: 0px;
  padding-bottom: 0px;
}

.myMenu {
  margin-top: 4px;
}

.mr8 {
  margin-right: 2px
}

.bajarPad {
  padding-right: 4px;
  padding-left: 4px;
  padding-top: 4px;
  padding-bottom: 4px;
}

.vc {  
  display: inline-flex;
  align-items: center;}


</style>