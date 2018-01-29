<template lang="html">
   <div class="dropdown">
    <button v-bind:value='selected' class="btn text-white btn-sm dropdown-toggle backcolorUI" type="button"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fa fa-filter" aria-hidden="true"></i> {{ categoriaActual.nombre}}</button>
    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
      <a v-for="cate in categorias" :key="cate.id" class=" dropdown-item small colorUI"  v-bind:class="{'bg-light text-muted' : !prodByCatePendientes(cate.id)}" @click="CambioCategoria(cate.id,cate.nombre)">{{ cate.nombre }}<span class="badge backcolorUI  text-white badge-pill pull-right">{{prodByCatePendientes(cate.id)}}</span></a>
      <div class="dropdown-divider"></div>
    </div>
  </div>
</div>

</template>
 
<script lang="js">

import bus from '../bus'
import { mapGetters } from 'vuex'


export default {
  name: 'cp-menu',
  props: [ 'categorias', 'selected', 'cateActual' ],
  data () {
    return {}
  },
  methods: {
    CambioCategoria (idCate, nombre) {
      var obj = { 'id': idCate, 'nombre': nombre }
      this.$emit('input', obj)
      bus.$emit('cambioCategoria', obj)
    }
  },
  computed: {
    categoriaActual () { return this.getCategoriaActual },
    ...mapGetters({
      productos: 'productos',
      prodByCatePendientes: 'prodByCatePendientes',
      prodByDesc: 'prodByDesc',
      getCategoriaActual: 'categoriaActual'
    })
  },
  created () {
  },
  components: {
   
  }
}
</script>

<style >
</style>