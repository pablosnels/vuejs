<template lang="html">
  
<div>
    <b-navbar toggleable="md" type="light" class="backcolorUI-dark">

      <div class="col-2 col">
        <i aria-hidden="true" @click="back" class="fa fa-arrow-circle-left text-white pull-left fa-lg"></i>
      </div>
      <a class="navbar-brand text-white" href="#">Configuración</a>
    </b-navbar>

        <div class="row tope20 ">
          <div class="col-1">
          </div>
          <div class="col-11 myMenu ">
            <div class="btn-group btn-group-sm pull-left" role="group" aria-label="Basic example">
              <button type="button"  class="btn btn-light" @click="modalShow = !modalShow" ><i class="fa fa-eraser" aria-hidden="true"></i>  Resetear toda la compra al mensual</button>
            </div>
          </div>
        </div>

        <div class="row tope5 ">
          <div class="col-1">
          </div>
          <div class="col-11 myMenu ">
            <div class="btn-group btn-group-sm pull-left" role="group" aria-label="Basic example">
              <button type="button"  class="btn btn-light" @click="modalShow2 = !modalShow2" ><i class="fa fa-eraser" aria-hidden="true"></i> Resetear toda la compra a cero</button>
            </div>
          </div>
        </div>

        <div class="row tope5 ">
          <div class="col-1">
          </div>
          <div class="col-11 myMenu ">
            <div class="btn-group btn-group-sm pull-left" role="group" aria-label="Basic example">
                <button type="button"  class="btn btn-light disabled" @click=""><i class="fa fa fa-cog" aria-hidden="true"></i>  Establecimientos</button>
            </div>
          </div>
        </div>

        <div class="row tope5 ">
          <div class="col-1">
          </div>
          <div class="col-11 myMenu ">
            <div class="btn-group btn-group-sm pull-left" role="group" aria-label="Basic example">
                <button type="button"  class="btn btn-light disabled" @click=""><i class="fa fa fa-cog" aria-hidden="true"></i>  Categorías</button>
            </div>
          </div>
        </div>

    <b-modal  size="sm" centered  ok-title='Eliminar' v-model="modalShow">
              <slot name="modal-title"></slot>
      <slot name="modal-header-close"></slot>
      <div slot="modal-header-close"></div>
      <div slot="modal-title  "></div>
      <div slot="modal-footer"></div>
        <b-alert variant="warning" show>¿ Confirma que desea resetear todos los productos a la cantidad mensual?</b-alert>
          <div>
          <b-button class="backcolorUI" v-on:click="resetear()" >Resetear</b-button>
          <b-button variant="outline" v-on:click="cancelar()">Cancelar</b-button>
        </div>
    </b-modal>

    <b-modal  size="sm" centered  ok-title='Eliminar' v-model="modalShow2">
              <slot name="modal-title"></slot>
      <slot name="modal-header-close"></slot>
      <div slot="modal-header-close"></div>
      <div slot="modal-title  "></div>
      <div slot="modal-footer"></div>
        <b-alert variant="warning" show>¿ Confirma que desea resetear todos los productos a cero?</b-alert>
          <div>
          <b-button class="backcolorUI" v-on:click="resetearCero()" >Resetear</b-button>
          <b-button variant="outline" v-on:click="cancelar()">Cancelar</b-button>
        </div>
    </b-modal>


  <div class="alert alert-info bordes" role="alert" v-if='mostrarAvisoReset'>
    Se resetearon las compras 
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>

  </div>

</template>
 
<script lang="js">
import { mapGetters, mapActions } from 'vuex'
import bus from './bus'

export default {
  name: 'config',
  prop: [],
  data: function() {
      return {
        cambio: false,
        content: '',
        modalShow: false,
        modalShow2: false,
        mostrarAvisoReset: false
      }
  },
  computed: {
    ...mapGetters({
      textoLibre: 'getTextoLibre'
    })
  },
  methods: {
    avisoReset () {
      this.mostrarAvisoReset= true
      setTimeout(() => {
            this.mostrarAvisoReset= false
        }, 2000);
    },
    back () {
        if (this.content !== this.textoLibre) {
        this.guardarTextoLibre(this.content)
        }
        this.$router.go(-1)
        // this.$router.push({ name: 'VistaPrincipal', params: { cate: this.categoriaActual } })
      },
  cambioTexto () {
  },
  ...mapActions({
      reset: 'resetCompra',
      reset_0: 'resetCompraCero'
    }),
   cancelar()
   {
    this.modalShow= false 
    this.modalShow2= false
   },
   resetear ()
   {
    this.avisoReset();
    this.reset();
    this.modalShow= false 
   },
   resetearCero ()
   {
    this.avisoReset();
    this.reset_0();
    this.modalShow2= false 
   }
  },
    created () {
    this.content = this.textoLibre
  }
}
</script>

<style scoped="true">
.borde {
  margin-left: 5px;
  margin-right: 5px;
}
.tope5 {
  margin-top: 5px;
  
}

.tope20 {
  margin-top: 20px;
  
}

.bordes {
  margin: 10px 10px 10px 10px;
}



.nomostrar {
display: none;
}

</style>