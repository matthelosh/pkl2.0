<template lang="pug">
	v-container
		v-layout(row wrap)
			v-flex(xs12)
				v-card(flat)
					v-card-title
						h3 Selamat Datang {{user}}
					v-card-text
						span(v-if="role == '1' || role == '2'")
							p Kalau Anda ingin berganti periode. Silahkan ubah periode di  bawah ini.
							v-layout(row)
							v-flex(xs12 md4)
								<v-select label="Periode" v-model="selPeriode" :items="periodes" append-icon="mdi-arrow-down-drop-circle-outline" v-bind:value="periode" on:input="onSelectPeriod" item-value="value" item-text="text" @change="ubah"></v-select>
							h3 {{periodeNow}}
						span(v-else)
							p Klik menu disamping.	
</template>

<script>
export default {
    data () {
        return {
            periodes: [
				{text: '10.1', value: '10-1'},
				{text: '10.2', value: '10-2'},
				{text: '11.1', value: '11-1'},
				{text: '11.2', value: '11-2'}
			],
			selPeriode: '',
			periode: '',
			role: sessionStorage.getItem('role')
        }
    },
    methods: {
    	ubah(p){
    		var self = this
    		sessionStorage.setItem('periode', p)
    	}
    },
    computed: {
    		periodeNow(){
    			return this.selPeriode
    		},
			user() {
				var self = this;
				return self.$store.state.user.nama;
			}
    }
}
</script>

<style scoped>

</style>