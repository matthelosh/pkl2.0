<template lang="pug">
	v-container
		v-layout(row wrap)
			v-flex(xs12)
				v-card(flat)
					v-card-title
						h3 Selamat Datang {{user}}
					v-card-text
						p Kalau Anda ingin berganti periode. Silahkan ubah periode di  bawah ini.
							
</template>

<script>
export default {
    data () {
        return {
            periode: [
				{text: '10.1', value: '10-1'},
				{text: '10.2', value: '10-2'},
				{text: '11.1', value: '11-1'},
				{text: '11.2', value: '11-2'}
			]
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

<style scoped>

</style>