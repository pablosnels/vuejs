<template lang="html">
  <div>
   <a  class="list-group-item list-group-item-action fino" >

  <span v-bind:class="{'text-muted': productoActual.cant===0,'text-info': true}" >{{productoActual.desc}}</span> 
   <i aria-hidden="true" @click="eliminar(productoActual)" class="fa fa-trash text-info pull-right"></i>
  
  <div class="container sinPadding bot3em">
    <div class="row sinPadding">
      <div class="col-4 sinPadding">
          <div class="small text-info">Actual: {{productoActual.cant}}</div>
          <cp-botonesMasMenos  v-on:onPlus="clickMasCant(productoActual)" v-on:onMinus="clickMenosCant(productoActual)"></cp-botonesMasMenos>
      </div>
      <div class="col-4 sinPadding">
          <div class="small  text-info">Mes: {{productoActual.mensual}}</div>
          <cp-botonesMasMenos v-on:onPlus="clickMasMensual(productoActual)" v-on:onMinus="clickMenosMensual(productoActual)"></cp-botonesMasMenos>
      </div>
      <div class="col-4 sinPadding">
          <div class="small  text-info">Orden: {{productoActual.orden}}</div>
          <cp-botonesMasMenos :flechas=true v-on:onPlus="clickMasOrden(productoActual)" v-on:onMinus="clickMenosOrden(productoActual)"></cp-botonesMasMenos>
      </div>

    </div>
  </div>

</a>
</div>
</template>
 
<script lang="js">

import BotonesMasMenos from '../MasMenos'
import bus from '../bus'

export default {
  name: 'cp-registroMes',
  props: ['productoActual', 'modoVista'],
  mounted () {
  },
  data () {
    return {
    }
  },
  methods: {
    CambioModelo (aProd) {
      bus.$emit('CambioModelo', aProd)
    },
    clickMasCant (aProd) {
      this.$emit('clickProductoMasCant', aProd)
      aProd.cant += 1
      this.CambioModelo(aProd)
    },
    clickMenosCant (aProd) {
      if (aProd.cant > 0) {
        aProd.cant -= 1
        this.$emit('clickProductoMenosCant', aProd)
        this.CambioModelo(aProd)
      }
    },
    clickMasMensual (aProd) {
      aProd.mensual += 1
      this.$emit('clickProductoMasMensual', aProd)
      this.CambioModelo(aProd)
    },
    clickMenosMensual (aProd) {
      if (aProd.mensual > 0) {
        aProd.mensual -= 1
        this.$emit('clickProductoMenosMensual', aProd)
        this.CambioModelo(aProd)
      }
    },
    clickMasOrden (aProd) {
      if (aProd.orden > 1) {
        aProd.orden -= 1
        this.$emit('clickProductoMasOrden', aProd)
        this.CambioModelo(aProd)
      }
    },
    clickMenosOrden (aProd) {
      aProd.orden += 1
      this.$emit('clickProductoMenosOrden', aProd)
      this.CambioModelo(aProd)
    },
    eliminar (productoActual) {
       bus.$emit('ProductoEliminar', productoActual);
    }
  },
  components: {
    'cp-botonesMasMenos': BotonesMasMenos
  }
}
</script>
<style >

.sinPadding{
      padding: 0px 0px 0px 0px;
}

.casiSinPadding{
      padding: 6px 6px 6px 6px;
}

.bot3em{
      margin-bottom: .3em;
}

.fino {
    padding-right: 4px;
    padding-left: 4px;
    padding-top: 4px;
    padding-bottom: 4px;
}


</style>