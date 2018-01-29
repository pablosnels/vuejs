<template lang="html">
   <div class="dropdown">
    <button v-bind:value='superSelected' class="btn btn-primary btn-sm dropdown-toggle backcolorUI" type="button"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fa fa-building" aria-hidden="true"></i>  {{ superActual.nombre}}</button>
    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a  v-for="superm in supermercados" :key="superm.id" class="dropdown-item small colorUI" v-bind:class="{'bg-light text-muted' : !prodBySuperPendientes(superm.id)}"  @click="CambioSuper(superm.id,superm.nombre)">{{ superm.nombre }}<span class="badge text-white backcolorUI badge-pill pull-right">{{prodBySuperPendientes(superm.id)}}</span></a>
    </div>
  </div>

</template>
 
<script lang="js">

import bus from '../bus'
import { mapGetters } from 'vuex'

export default {
  name: 'cp-cbSuper',
  props: [ 'superSelected', 'superActual' ],
  data () {
    return {}
  },
  methods: {
    CambioSuper (idCate, nombre) {
      var obj = { 'id': idCate, 'nombre': nombre }
      this.$emit('input', obj)
      bus.$emit('cambioSuper', obj)
    }
  },
  computed: {
    ...mapGetters({
      prodBySuperPendientes : 'prodBySuperPendientes',
      supermercados: 'supermercados'
    })
  },
  created () {
  }
}
</script>

<style >
</style>