<template lang="html">
      <div>
          <button type="button" class="btn btn-sm btn-info" @click="onClick"><i v-bind:class= "getIconoMas" aria-hidden="true"></i></button>
          <button type="button" class="btn btn-sm btn-info" @click="onClickMinus"><i v-bind:class= "getIconoMenos" aria-hidden="true"></i></button>
      </div>
</template>
 
<script lang="js">

export default {
  name: 'cp-botonesMasMenos',
  props: {
    flechas: {default: false}
  },
  methods: {
    onClick () {
      this.$emit('onPlus', {})
    },
    onClickMinus () {
      this.$emit('onMinus', {})
    }
  },
  computed: {
    getIconoMas () {
      return !this.flechas ? 'fa fa-plus-circle' : 'fa fa-arrow-circle-up'
    },
    getIconoMenos () {
      return !this.flechas ? 'fa fa-minus-circle' : 'fa fa-arrow-circle-down'
    }
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


</style>