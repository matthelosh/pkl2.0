<template lang="pug">
  v-app
    transition(name="page" mode="out-in")
      router-view
    footer
</template>

<script>
  import Footer from './Footer'
  export default {
    components: {Footer},
    props: {Footer},
    data () {
      return {
        
       fixed: false,
       clipped: false,
       versi: this.$store.state.versi
      }
    }
  }
</script>

<style scoped>
  .page-enter-active, .page-leave-active {
    transition: opacity 1s, transform 1s;
  }
  .page-enter, .page-leave-to {
    opacity: 0;
    transform: translateY(0%);
  }
  

</style>

