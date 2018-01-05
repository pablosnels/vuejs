<template lang="html">
  
  

  <div class="input-group">
      <input class="form-control form-control-sm" type="search" placeholder="Buscar..." aria-label="Search" v-model="campoBusqueda">
      <span class="input-group-btn">
        <button class="btn btn-info btn-sm" type="button" v-on:click="borrar()" v-if="campoBusqueda"><i class="fa fa-eraser" aria-hidden="true"></i></button>
      </span>
    </div>

</div>

</template>
 
<script lang="js">
import bus from '../bus'

export default {
  name: 'cp-buscador',
  created () {
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