<template lang="html">
  <div>
      <a  class="list-group-item list-group-item-action fino" >

      <span v-bind:class="{'text-muted': productoActual.cant===0,'text-info': true}" >{{productoActual.desc}}</span> 
      <i aria-hidden="true" v-b-modal.myModal1 @click="modalShow = !modalShow" class="fa fa-trash text-info pull-right"></i>
      
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
  
  <b-modal    size="sm" centered  ok-title='Eliminar' v-model="modalShow">
    <slot name="modal-title"></slot>
    <slot name="modal-header-close"></slot>

<div slot="modal-header-close"></div>
    <div slot="modal-title  "></div>
    <div slot="modal-footer"></div>


    <b-alert variant="warning" show>¿ Confirma que desea eliminar {{productoActual.desc}} ?</b-alert>
       <div>
      <b-button variant="info" v-on:click="confirmaEliminar(productoActual)" >Eliminar</b-button>
      <b-button variant="outline-info" v-on:click="cancelaEliminar(productoActual)">Cancelar</b-button>
      
</div>

    </b-modal>

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
      modalShow:false
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
      bus.$emit('ProductoEliminar', productoActual)
    },
    confirmaEliminar (productoActual) {
      console.log('consirma')
      this.modalShow = false 
    },
    cancelaEliminar (productoActual) {
      console.log('cancela')
      this.modalShow = false
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

.modal-header {
    padding: 0px;
    border-bottom : 0px
}
.modal-footer {
    padding: 0px;
}
.modal-content {
  border-radius: 10px
}
.hr {
  color: red
}
</style>