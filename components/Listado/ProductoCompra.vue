<template lang="html">
    <a  class="list-group-item list-group-item-action sinPadding backcolorUI" >
          <cp-registroCompra v-bind:productoActual=producto></cp-registroCompra>
    </a>
</template>
 


   
<script lang="js">
import RegistroCompra from './RegistroCompra'

export default {
  name: 'cp-productoCompra',
  props: ['producto'],
  components: {
    'cp-registroCompra': RegistroCompra
  },
  methods: {
    MasCant (producto) {},
    MenosCant (producto) {},
    MasMensual (producto) {},
    MenosMensual (producto) {},
    MasOrden (producto) {},
    MenosOrden (producto) {}
  }
}
</script>

<style scoped>
.sinPadding{
      padding: 4px 0px 0px 0px;
      border: 0px solid rgba(0,0,0,.125);
}
</style>