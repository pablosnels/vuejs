<template lang="html">
      <a  class="list-group-item list-group-item-action casiSinPadding" v-bind:class="{'bg-light' : !productoActual.cant, 'bg-light' : !productoActual.cant}">
        <span class="badge badge-info pull-left"  @click="onClick(productoActual)" v-if="productoActual.cant">{{productoActual.cant}}</span>
        <span v-if="productoActual.cant">
          <strong class="text-info">{{productoActual.desc}}</strong>
        </span>
        <span v-else>
          <span v-bind:class="{'font-italic' : !productoActual.cant, 'text-secondary':true}" >{{productoActual.desc}}</span>
        </span>
        <i class="fa fa-check-square-o text-info fa-lg pull-right" aria-hidden="true" @click="onClickTodo(productoActual)" v-if="productoActual.cant"></i>
        <i class="fa fa-retweet text-info fa-lg pull-right" aria-hidden="true" @click="onClickReload(productoActual)" v-if="!productoActual.cant"></i>
 </a>
      
</template>
 
<script lang="js">
import bus from '../bus'

export default {
  name: 'cp-registroCompra',
  props: ['productoActual', 'modoVista'],
  mounted () {
  },
  data () {
    return {
    }
  },
  methods: {
    onClick (aProd) {
      aProd.cant -= 1
      this.$emit('clickProducto', aProd)
      bus.$emit('CambioModelo', aProd)
    },
    onClickTodo (aProd) {
      aProd.cant = 0
      this.$emit('clickProductoTodo', aProd)
      bus.$emit('CambioModelo', aProd)
    },
    onClickReload (aProd) {
      aProd.cant = aProd.mensual
      this.$emit('clickProductoReload', aProd)
      bus.$emit('CambioModelo', aProd)
    }
  },
  computed: {
    colorFondo: function (productoActual) {
      var st = ''
      return st + (productoActual.cant ? ' bg-secondary' : '')
    }
  }
}
</script>
<style scoped>

.sinPadding{
      padding: 0px 0px 0px 0px;
}

.casiSinPadding{
      padding: 8px 8px 0px 8px;
}

.bot3em{
      margin-bottom: .3em;
}

</style>