<template lang="html">
   <div class="dropdown">
    <button v-bind:value='categoriaActual' class="btn btn-primary btn-sm dropdown-toggle backcolorUI" type="button"  data-toggle="dropdown" 
           aria-haspopup="true" aria-expanded="false"><i class="fa fa-filter" aria-hidden="true"></i> {{ categoriaActual.nombre}}</button>
    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
      <a  v-for="cate in categorias" :key="cate.id" class="dropdown-item small"  @click="CambioCategoria(cate)">{{ cate.nombre }}</a>
      
    </div>
    </div>
</div>

</template>
 
<script lang="js">
import bus from './bus'

export default {
  name: 'cb-CateProd',
  props: [ 'categorias', 'productoActual'],
  data () {
    return {
      categoriaActual: { 'id': 0, 'nombre': '' }
    }
  },
   methods: {
    CambioCategoria (cate) {
     this.productoActual.cate = cate.id
     this.categoriaActual = this.categorias.find(ele=>ele.id === this.productoActual.cate) 
     this.$emit('change') 
    }
  },
  mounted () {
    this.categoriaActual = this.categorias.find(ele=>ele.id === this.productoActual.cate) 
  }
}

</script>

<style >
</style>