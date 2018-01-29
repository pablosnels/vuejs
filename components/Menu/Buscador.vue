<template lang="html">
  <input class="form-control form-control-sm text-primary pull-left" type="search" placeholder="Buscar..." aria-label="Search" v-model="campoBusqueda">
</template>
 
<script lang="js">
import bus from '../bus'

export default {
  name: 'cp-buscador',
  props: ['filtro'],
  created () {
    this.campoBusqueda = this.filtro
  },
  data () {
    return {
      campoBusqueda: ''
    }
  },
  watch: {
    campoBusqueda: function (val) {
      bus.$emit('filtrar', this.campoBusqueda.toUpperCase())
    }
  },
  methods: {
    borrar () {
      this.campoBusqueda = ''
    }
  }
}
</script>

<style >

</style>