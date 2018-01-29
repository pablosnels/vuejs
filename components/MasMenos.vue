<template lang="html">
      <div>
          <button type="button" class="btn btn-sm backcolorUI" @click="onClick"><i v-bind:class= "getIconoMas" aria-hidden="true"></i></button>
          <button type="button" class="btn btn-sm backcolorUI" @click="onClickMinus"><i v-bind:class= "getIconoMenos" aria-hidden="true"></i></button>
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
      return !this.flechas ? 'fa fa-plus-circle text-white' : 'fa fa-arrow-circle-up text-white'
    },
    getIconoMenos () {
      return !this.flechas ? 'fa fa-minus-circle text-white' : 'fa fa-arrow-circle-down text-white'
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