<template lang="html">
  <div>
   <b-navbar toggleable="md" type="light" variant="primary" class="backcolorUI-dark">
      <div class="col-2 col">
         <i aria-hidden="true" @click="back" class="fa fa-arrow-circle-left text-white pull-left fa-lg"></i>
      </div>
      <div class="col-8 col">
         <input type="text" class="form-control" v-model="productoActual.desc" aria-label="Nombre">
      </div>
      <div class="col-2 col">
         <i aria-hidden="true" v-b-modal.myModal1 @click="modalShow = !modalShow" class="fa fa-trash text-white pull-right fa-lg"></i>      
      </div>
   </b-navbar>
   <div class="card">
      <div class="card-body backcolorUI-dark">
         <div class="container sinPadding bot3em">
            <div class="row sinPadding">
               <div class="col-4 sinPadding">
                  <div class="small text-white">Actual: {{productoActual.cant}}</div>
                  <cp-botonesMasMenos v-on:onPlus="clickMasCant(productoActual)" v-on:onMinus="clickMenosCant(productoActual)"></cp-botonesMasMenos>
               </div>
               <div class="col-4 sinPadding">
                  <div class="small  text-white">Mes: {{productoActual.mensual}}</div>
                  <cp-botonesMasMenos v-on:onPlus="clickMasMensual(productoActual)" v-on:onMinus="clickMenosMensual(productoActual)"></cp-botonesMasMenos>
               </div>
               <div class="col-4 sinPadding">
                  <div class="small  text-white">Orden: {{productoActual.orden}}</div>
                  <cp-botonesMasMenos :flechas=true v-on:onPlus="clickMasOrden(productoActual)" v-on:onMinus="clickMenosOrden(productoActual)"></cp-botonesMasMenos>
               </div>
            </div>
         </div>
         <div class="row">
            <div class="col-6">
               <div class="small text-white">Categoría:</div>
               <cb-categorias :categorias='categorias' :productoActual='productoActual' ></cb-categorias>
            </div>
            <div class="col-6">
               <div class="small text-white">Establecimiento:</div>
               <cp-cbSuper :supermercados='supermercados' :productoActual='productoActual' ></cp-cbSuper>
            </div>
         </div>
         <div class="row">
            <div class="col-4"></div>
            <div class="col-4">
               <div class="text-white text-centered">Precio: </div>
               <input type="number" onClick="this.select();" step=".1" min="0" max="99" class="form-control form-control-sm pull-left" v-model="productoActual.precio" aria-label="Precio">
            </div>
            <div class="col-4"></div>
         </div>
      </div>
   </div>
   <b-modal    size="sm" centered  ok-title='Eliminar' v-model="modalShow">
      <slot name="modal-title"></slot>
      <slot name="modal-header-close"></slot>
      <div slot="modal-header-close"></div>
      <div slot="modal-title  "></div>
      <div slot="modal-footer"></div>
      <b-alert variant="warning" show>¿ Confirma que desea eliminar {{productoActual.desc}} ?</b-alert>
      <div>
         <b-button class="backcolorUI text-white" v-on:click="confirmaEliminar(productoActual)" >Eliminar</b-button>
         <b-button variant="outline x" v-on:click="cancelaEliminar(productoActual)">Cancelar</b-button>
      </div>
   </b-modal>
</div>

</template>
 
<script lang="js">
import { mapGetters, mapActions } from 'vuex'
import BotonesMasMenos from './MasMenos'
import bus from './bus'
import comboCategoriaProducto from './ComboCateProd'
import comboSuper from './comboSuper'

export default {
  name: 'editProduct',
  prop: [],
  data: function() {
      return {
      idProd: this.$route.params.id,
      productoActual: {},
       modalShow: false,
       cateSelected:0
      }
  },
  computed: {
    ...mapGetters({
      producto: 'get_producto',
      categorias:'categorias',
      supermercados: 'supermercados'
    })
  },
  created () {
      this.productoActual = this.producto(this.idProd);
  },
  components: {
    'cp-botonesMasMenos': BotonesMasMenos,
    'cb-categorias': comboCategoriaProducto,
    'cp-cbSuper': comboSuper
  },
  methods: {
    back () {
        this.CambioModelo(this.productoActual)
        this.$router.go(-1)
        //this.$router.push({ name: 'VistaPrincipal', params: { cate: this.productoActual.cate } })
      },
    CambioModelo (aProd) {
      bus.$emit('CambioModelo', aProd)
    },
    clickMasCant (aProd) {
      this.$emit('clickProductoMasCant', aProd)
      aProd.cant += 1
    },
    clickMenosCant (aProd) {
      if (aProd.cant > 0) {
        aProd.cant -= 1
      }
    },
    clickMasMensual (aProd) {
      aProd.mensual += 1
    },
    clickMenosMensual (aProd) {
      if (aProd.mensual > 0) {
        aProd.mensual -= 1
      }
    },
    clickMasOrden (aProd) {
      if (aProd.orde > 1) {
        aProd.orden -= 1
      }
    },
    clickMenosOrden (aProd) {
      aProd.orden += 1
      
    },
    eliminar (productoActual) {
      bus.$emit('ProductoEliminar', productoActual)
    },
    confirmaEliminar (productoActual) {
      bus.$emit('ProductoEliminar', productoActual)
      this.modalShow = false
      this.back()
    },
    cancelaEliminar (productoActual) {
      this.modalShow = false
    }
  }
}
</script>

<style>
.col{
  padding-right: 0px;
  padding-left: 0px;
  padding-top: 2px;
  padding-bottom: 2px;
}
</style>