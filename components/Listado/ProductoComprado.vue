<template lang="html">
      <a href="#" class="list-group-item list-group-item-action disabled bg-light" @click="onClick(producto)" >{{producto.desc}}</a>
</template>
 
<script lang="js">
export default {
  name: 'cp-productoComprado',
  props: [ 'producto' ],
  mounted () {
  },
  data () {
    return {
    }
  },
  methods: {
    onClick (aProd) {
      this.$emit('clickProducto', aProd)
    }
  },
  computed: {
  }
}
</script>
<style scoped>

</style>