<template lang="html">
   <div class="progress" style="height: 4px;">
          <div v-bind:class=estilo role="progressbar" :style=progreso aria-valuenow="80" aria-valuemax="total"></div>
  </div>
</template>
 
<script lang="js">

export default {
  name: 'cp-progresoCompra',
  props: ['total', 'actual', 'spinner'],
  mounted () {
  },
  data () {
    return {
    }
  },
  computed: {
    progreso () {
      return 'width: ' + this.actual * 100 / (this.total? this.total : 1)  + '%;'
    },
    estilo () {
      return this.spinner ? 'progress-bar backcolorUI progress-bar-striped progress-bar-animated' : 'progress-bar backcolorUI'
    }
  }
}
</script>

<style >
</style>