<template lang="html">
  <a  class="list-group-item list-group-item-action casiSinPadding " v-bind:class="{'bg-light' : !productoActual.cant, 'bg-light' : !productoActual.cant}" >
    <i class="handle fa fa-th text-primary pull-left colorUI" aria-hidden="true" v-if="productoActual.cant"></i>
    <span class="badge  pull-left backcolorUI text-white"  @click="onClick(productoActual)" v-if="productoActual.cant">{{productoActual.cant}}</span>
    <span v-if="productoActual.cant">
      <span @click="editarProducto(productoActual)" class="colorUI ">{{productoActual.desc}}</span>
    </span>
    <span v-else>
      <span @click="editarProducto(productoActual)" v-bind:class="{'font-italic' : !productoActual.cant, 'font-weight-light text-muted':true}">{{productoActual.desc}} </span>
    </span>
    <!--i class="handle fa fa-th text-primary pull-right" aria-hidden="true" v-if="productoActual.cant"></i-->
    <i class="fa fa-check-square-o text-primary fa-lg pull-right iconoTodo colorUI" aria-hidden="true" @click="onClickTodo(productoActual)" v-if="productoActual.cant"></i>
    <i class="fa fa-retweet text-primary fa-lg pull-right colorUI" aria-hidden="true" @click="onClickReload(productoActual)" v-if="!productoActual.cant"></i>
    
    <span v-bind:class="{'badge badge-light pull-right colorUI': productoActual.precio, 'badge badge-warning pull-right': !productoActual.precio}"><em><small>€{{productoActual.precio}}</small></em></span>
    
  </a>
</template>
 
<script lang="js">
import bus from '../bus'

export default {
  name: 'cp-registroCompra',
  props: ['productoActual'],
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
    },
    editarProducto (aProd) {
      this.$router.push({ name: 'EditProduct', params: { id: aProd.id } })
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
      padding: 4px 7px 0px 4px;
      padding-right: 0px;
}

.bot3em{
  margin-bottom: .3em;
}

.handle {
  margin-right: .8em;  
  margin-left: .2em;  
}

.iconoTodo {
  margin-right: .2em;
}





</style>