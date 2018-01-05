<template lang="html">
   <div class="dropdown margin9">
    <button v-bind:value='selected' class="btn btn-info dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{{labelCategorias}}</button>
    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
      <a  v-for="cate in categorias" class="dropdown-item small"  v-bind:class="{'bg-light text-muted' : !prodByCatePendientes(cate.id)}" @click="CambioCategoria(cate.id,cate.nombre)">{{ cate.nombre }}<span class="badge badge-info badge-pill pull-right">{{prodByCatePendientes(cate.id)}}</span></a>
    </div>

  </div>
  

</div>

</template>
 
<script lang="js">

import bus from '../bus'
import { mapGetters } from 'vuex'

export default {
  name: 'cp-menu',
  props: [ 'categorias', 'selected' ],
  data () {
    return {
      labelCategorias: 'Categorías',
      categoriaActual: 0
    }
  },
  methods: {
    CambioCategoria (idCate, nombre) {
      this.$emit('input', idCate)
      bus.$emit('cambioCategoria', idCate)
      this.labelCategorias = nombre
    }
  },
  computed: {
    ...mapGetters ({
      productos : 'productos',
      prodByCatePendientes: 'prodByCatePendientes',
      prodByDesc: 'prodByDesc'
    })
  }
}
</script>

<style >

</style>