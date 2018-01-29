<template>
  <div class="container menosPadding">
    <draggable :v-model="productosFiltrados" :options="{handle:'.handle'}" class="dragArea" @end="endDrag"  @update="onUpdate"> 
      <cp-productoCompra v-for="prod in productosFiltrados" :key='prod.id' :producto='prod'></cp-productoCompra>
    </draggable>
    <cp-productoCompra v-for="prod in productosYaComprados" :key='prod.id' v-bind:producto=prod ></cp-productoCompra>
  </div>
    
</template>

<script>
import bus from '../bus'
import ProductoCompra from './ProductoCompra'
import draggable from 'vuedraggable'
import { mapActions } from 'vuex'

export default {
  name: 'Listado',
  props: ['categoriaActual', 'filtro', 'productosFiltrados', 'productosYaComprados'],
  data () {
    return {
    }
  },
  components: {
    'cp-productoCompra': ProductoCompra,
    draggable
  },
  methods: {
   ...mapActions({
      guardarProducto: 'guardarProductoModi'
      }),
   checkMove (newIndex,oldIndex,element) {
    console.log(newIndex);
   },
   endDrag (element)
   {
     var obj = { 'first': this.productosFiltrados[element.oldIndex], 'second': this.productosFiltrados[element.newIndex]}
     this.guardarProducto(obj);
   },
   onUpdate () {
    
   }

  }
}
</script>

<style scoped="true">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
.grey {
  background-color: gainsboro;
}
.card-body {
    padding: .5rem;
}

.handle {
	  cursor: move;
	  cursor: -webkit-grabbing;
}

.menosPadding {
  padding-right : 5px;
  padding-left: 5px;
}

</style>