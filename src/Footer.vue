<template lang="pug">
	v-layout
		v-footer(app bottom class="grey darken-3" dark inset absolute height="auto")
			v-card(flat tile)
				v-card-title
					h4 Prakerlap: {{ periode }}
					v-spacer
					p halo
</template>

<script>
export default {

  name: 'Footer',
  // components: {Footer},
  data () {
    return {
		icons: ['mdi-facebook fab', 'mdi-twitter fab', 'mdi-google-plus fab', 'mdi-linkedin fab', 'mdi-instagram fab'],
		periode: sessionStorage.getItem('periode'),
    }
  }
}
</script>

<style lang="css" scoped>
</style>