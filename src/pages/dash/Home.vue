<template lang="pug">
	v-container
		v-layout(row wrap)
			v-flex(xs12)
				v-card(flat)
					v-card-title
						h3 Selamat Datang {{user}}
					v-card-text
						p lorem	
</template>

<script>
export default {
    data () {
        return {
            
        }
    },
    computed: {
			user() {
				var self = this;
				return self.$store.state.user.nama;
			}
    }
}
</script>

<style lang="stylus" scoped>

</style>