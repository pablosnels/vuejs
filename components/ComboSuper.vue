<template lang="html">
   <div class="dropdown">
    <button v-bind:value='superActual' class="btn btn-primary btn-sm dropdown-toggle backcolorUI" type="button"  data-toggle="dropdown" 
           aria-haspopup="true" aria-expanded="false"><i class="fa fa-filter" aria-hidden="true"></i> {{ superActual.nombre}}</button>
    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
      <a  v-for="superm in supermercados" :key="superm.id" class="dropdown-item small"  @click="Cambio(superm)">{{superm.nombre }}</a>
    </div>
    </div>
</div>

</template>
 
<script lang="js">
import bus from './bus'
import { mapGetters } from 'vuex'

export default {
  name: 'cb-Super',
  props: [ 'supermercados', 'productoActual'],
  data () {
    return {
      superActual: { 'id': 0, 'nombre': '' }
    }
  },
   methods: {
    Cambio (superm) {
     this.superActual = superm
     this.productoActual.super = superm.id
     this.$emit('change') 
    }
  },
  mounted () {
    this.superActual = this.supermercados.find(ele=>ele.id === this.productoActual.super) 
  }
}

</script>

<style >
</style>