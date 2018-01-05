<template lang="html">
  <div class="jumbotron jumbotron-fluid">
  <div class="container">
    <h1 class="display-4">Error</h1>
    <p class="lead">{{error}}</p>
  </div>
</div>

</template>
 
<script lang="js">

export default {
  name: 'Error',
  props: [ 'error'],
  mounted () {
    console.log(this.error);
    },
  data () {
      return {
      error: ''  
      }
    }
 
}
</script>

<style >
</style>