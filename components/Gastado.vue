<template lang="html">
  <div>
      <b-navbar toggleable="md" type="light" class="backcolorUI-dark">
        <div class="col-2 col">
          <i aria-hidden="true" @click="back" class="fa fa-arrow-circle-left text-white pull-left fa-lg"></i>
        </div>
      <a class="navbar-brand text-white" href="#">Gastado</a>
    </b-navbar>
<br>
  <div class='container'>
     <b-table class='X' striped bordered dark small head-variant='light' :items="gastosTotalizados" :fields="fields">
    <template slot="detalle" slot-scope="row">
      <b-button size="sm"  @click.stop="modalShow = !modalShow;clickGrid(row.index)" class="mr-1  backcolorUI"><i class="fa fa-times" aria-hidden="true"></i></b-button>
    </template>
     </b-table>
  </div>

   <button type="button" class="btn backcolorUI-dark text-white btn-sm" @click="modalShowInsert = !modalShowInsert" ><i class="fa fa-plus-square" aria-hidden="true"></i>  Agregar Nuevo Gasto</button>


    <b-modal    size="sm" centered  ok-title='Eliminar' v-model="modalShow">
      <slot name="modal-title"></slot>
      <slot name="modal-header-close"></slot>
      <div slot="modal-header-close"></div>
      <div slot="modal-title  "></div>
      <div slot="modal-footer"></div>
      <b-alert variant="warning"show>{{descGasto}}</b-alert>
      <div>
          <b-button class="backcolorUI text-white" v-on:click="confirmaEliminar()" >Eliminar</b-button>
          <b-button variant="outline x" v-on:click="cancelaEliminar()">Cancelar</b-button>
      </div>
    </b-modal>


    <b-modal    size="sm" centered  ok-title='Eliminar' v-model="modalShowInsert">
      <div slot="modal-header-close">Nuevo Gasto</div>
      
      <div slot="modal-footer"></div>
      
       <b-form>
      <b-form-group id="exampleInputGroup1">
          <b-form-input size="sm" id="exampleInput1"
                        type="email"
                        v-model="nuevoGasto.super"
                        required
                        placeholder="Descripción" :state="validarNombre">
          </b-form-input>
          <b-form-input  size="sm" v-model='nuevoGasto.fecha' type="date"></b-form-input>
          <b-form-input  ref="monto" size="sm" v-model='nuevoGasto.monto' :state="validarMonto" type="number"></b-form-input>
       </b-form-group>
      </b-form>
      
      <div>
          <b-button size="sm" class="backcolorUI text-white" v-on:click="GuardarNuevo" >Guardar</b-button>
          <b-button size="sm" variant="outline x" v-on:click="CancelarNuevo">Cancelar</b-button>
      </div>
    </b-modal>


  </div>
</template>
 
<script lang="js">
import { mapGetters, mapActions } from 'vuex'
import bus from './bus'

export default {
  name: 'gastado',
  prop: [],
  data: function() {
      return {
        gastos:[],
        nuevoGasto: {'fecha': '', 'super':'', 'monto':0,},
        ixGrid:0,
        modalShow:false,
        modalShowInsert:false,
        fields: {
          super: {
            label: 'Descripción',
            sortable: true
          },
          fecha: {
            label: 'Fecha',
            sortable: true
          },
          monto: {
            label: 'Monto',
            sortable: true,
            variant: 'danger'
          },
          detalle:{
            label: ' '
          }
        }
      }
  },
  computed: {
    validarNombre(){return this.nuevoGasto.super.length > 0},
    validarMonto(){return this.nuevoGasto.monto > 0 },
    descGasto(){
      
      if (this.ixGrid < this.listaGastos.length) {
        var o = this.listaGastos[this.ixGrid] 
        if (o) {
          return  '¿ Confirma que desea eliminar el gasto: ' + this.listaGastos[this.ixGrid].super + '?'
        }
      }
      else
      {
        return  '¿ Confirma que desea eliminar todos los gastos?'
      }
    },
    ...mapGetters({
      listaGastos: 'getListaGastos'
    }),
    gastosTotalizados () {
      var arr= []
      var total = 0
      this.gastos.forEach(function(element) {
        arr.push(element)
        total += element.monto
      });
      total = Math.floor(total * 100) / 100
      arr.push({'id': 2, 'super': '', 'fecha': 'Total', 'monto': '€ ' + total })
      return arr
      } 
  },
  methods: {
    formattedDate(fecha){
      function pad(s) { return (s < 10) ? '0' + s : s; }
      return [pad(fecha.getDate()), pad(fecha.getMonth()+1), fecha.getFullYear()].join('/');
    },
    back () {
        //this.guardarGastos(this.gastos)
        this.$router.go(-1)
      },
  cambioTexto () {
  },
  ...mapActions({
      guardarGastos:'guardarGastos',
      eliminarGasto: 'eliminarGasto',
      addGasto: 'addGasto'
    }),
  guardar () 
  {
    this.gastos.push({"super": "nuevo","fecha": "02/01/2018","monto": 30})
    this.guardarGastos(this.gastos)
    this.gastos = this.listaGastos
  },
  clickGrid (index) {
    this.ixGrid = index;
    //this.eliminarGasto(index);
  },
  confirmaEliminar () {
    this.eliminarGasto(this.ixGrid)
    this.modalShow= false
  },
  cancelaEliminar(){
    this.modalShow= false
  },
  GuardarNuevo(){
   if (this.validarMonto && this.validarNombre) {
     
     this.nuevoGasto.fecha = this.formattedDate(new Date(this.nuevoGasto.fecha))
     this.nuevoGasto.monto = parseFloat(this.nuevoGasto.monto)
     this.addGasto(this.nuevoGasto)
     this.modalShowInsert = false
   }
  },
  CancelarNuevo(){
   this.modalShowInsert = false
  }
},
   created () {
    this.gastos = this.listaGastos
  }
  
}
</script>

<style scoped="true">
.borde {
  margin-left: 15px;
  margin-right: 100px;
}

.X {
  font-size: small;
}  

</style>