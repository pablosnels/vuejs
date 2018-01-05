<template lang="html">
   <div class="progress" style="height: 4px;">
          <div v-bind:class=estilo role="progressbar" v-bind:style=progreso aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
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
      return 'width: ' + this.actual + '%;'
    },
    estilo () {
      return this.spinner ? 'progress-bar bg-info progress-bar-striped progress-bar-animated' : 'progress-bar bg-info'
    }
  }
}
</script>

<style >
</style>