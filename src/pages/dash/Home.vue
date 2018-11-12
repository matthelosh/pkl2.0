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
								v-select(
									label="Periode" 
									v-model="selPeriode" 
									:items="periodes" 
									:menu-props="{periode}" 
									on:input="onSelectPeriod" 
									item-value="kode" 
									item-text="periode" 
									@change="ubah"
									solo) 
							h3 Anda telah merubah Periode menjadi : {{periodeNow}}
						span(v-else)
							home-praktikan
</template>

<script>
import axios from 'axios'
import HomePraktikan from '@pages/comps/HomePraktikan'
export default {
	components: {HomePraktikan},
    data () {
        return {
            periodes: [
			],
			selPeriode: '',
			periode: '',
			role: sessionStorage.getItem('role'),
			server: this.$store.state.server
        }
    },
    created(){
    	this.getPeriodes();
    },
    methods: {
    	ubah(p){
    		var self = this
    		sessionStorage.setItem('periode', p)
    	},
    	getPeriodes(){
  		var self = this
  		axios.get(self.server+'/umum/periode')
  			.then((res) => {
  				self.periodes = res.data.data
  			});
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