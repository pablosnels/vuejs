<template lang="html">
  
  <div>
    <b-navbar toggleable="md" type="light" class="backcolorUI-dark">

      <div class="col-2 col">
        <i aria-hidden="true" @click="back" class="fa fa-arrow-circle-left text-white pull-left fa-lg"></i>
      </div>
      <a class="navbar-brand text-white" href="#">Texto Libre</a>
    </b-navbar>


  <form >
  <div class="form-group" >
      <textarea class="form-control borde colorUI" v-model="content" id="exampleFormControlTextarea1" @onchange ="cambioTexto" rows="100"></textarea>
    </div>
  </form>
  </div>

</template>
 
<script lang="js">
import { mapGetters, mapActions } from 'vuex'
import bus from './bus'

export default {
  name: 'textoLibre',
  prop: [],
  data: function() {
      return {
        cambio:false,
        content: ''
      }
  },
  computed: {
    ...mapGetters({
      textoLibre: 'getTextoLibre'
    })
  },
  methods: {
    back () {
        if (this.content !== this.textoLibre) {
        this.guardarTextoLibre(this.content)
        }
        this.$router.go(-1)
        //this.$router.push({ name: 'VistaPrincipal', params: { cate: this.categoriaActual } })
      },
  cambioTexto () {
  },
  ...mapActions({
      guardarTextoLibre: 'guardarTextoLibre',
    }),

  },
    created () {
    this.content = this.textoLibre
  }
}
</script>

<style scoped="true">
.borde {
  margin-left: 15px;
  margin-right: 100px;
}


</style>