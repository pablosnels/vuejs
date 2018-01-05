<template lang="html">
    <a  class="list-group-item list-group-item-action sinPadding" >
      <div v-if="modo == 'C'">
          <cp-registroCompra v-bind:productoActual=producto v-bind:modoVista=modo></cp-registroCompra>
      </div>
      <div v-else>     
          <cp-registroMes v-bind:productoActual=producto v-bind:modoVista=modo v-on:clickProductoMasCant="MasCant(producto)" v-on:clickProductoMenosCant="MenosCant(producto)" v-on:clickProductoMasMensual="MasMensual(producto)" v-on:clickProductoMenosMensual="MenosMensual(producto)" v-on:clickProductoMasOrden="MasOrden(producto)" v-on:clickProductoMenosOrden="MenosOrden(producto)" ></cp-registroMes>
      </div>
    </a>
</template>
 


   
<script lang="js">
import RegistroCompra from './RegistroCompra'
import RegistroMes from './RegistromeS'

export default {
  name: 'cp-productoCompra',
  props: ['producto', 'modo'],
  components: {
    'cp-registroCompra': RegistroCompra,
    'cp-registroMes': RegistroMes
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
      padding: 2px 2px 2px 2px;
      border: 0px solid rgba(0,0,0,.125);
}
</style>