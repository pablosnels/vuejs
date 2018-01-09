<template lang="html">
  <div>
   <!--button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#exampleModalCenter"></button-->
   <i aria-hidden="true"  data-toggle="modal" data-target="#exampleModalCenter" class="fa fa-trash text-info pull-right"></i>
   <div class="modal fade bd-example-modal-sm" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog" role="document">
         <div class="modal-body">
            <div class="alert alert-info" role="alert">
               <!--i class="fa fa-question-circle text-light fa-lg pull-left " aria-hidden="true"></i-->
               <span class="text-info"> ¿Confirma que desea eliminar el producto: {{producto.desc}}? </span>
               <p></p>
               <div>
                <!--button type="button" @click="$emit('borrar')" class="btn btn-light btn-sm text-info"><i class="fa fa-check-circle text-info" aria-hidden="true"></i> Ok</button-->
                <!--button class="modal-default-button" @click="Borrar()" >aaa</button-->
                <!--button type="button" class="btn btn-light btn-sm text-info" data-dismiss="modal"><i class="fa fa-times-circle text-info" aria-hidden="true"></i> Cancelar</button-->

                 <button type="button" class="btn btn-outline-info" @click="closeModal()"> Close </button>
                 <button type="button" class="btn btn-primary" data-dismiss="modal" @click="submitAndClose()">Submit</button>
                
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
</template>
 
<script lang="js">

export default {
  name: 'cp-confirmModal',
  props: {
    producto: {}
    
  },
  methods: {
    Borrar () {
      debugger
      this.$emit('onClickEliminar', this.producto)
    }
  },
  computed: {
    getIconoMas () {
      return !this.flechas ? 'fa fa-plus-circle' : 'fa fa-arrow-circle-up'
    },
    getIconoMenos () {
      return !this.flechas ? 'fa fa-minus-circle' : 'fa fa-arrow-circle-down'
    },
   closeModal() {
     console.log('submiiiit')
  },
  submitAndClose() {
    console.log('submiiiit')
   }
  }
}
</script>

<style >
</style>