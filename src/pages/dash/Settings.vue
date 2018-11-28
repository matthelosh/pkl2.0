<template lang="pug">
	div
		h1 Pengaturan
		v-layout(column)
			v-container(fluid grid-list-md)
				v-layout(row wrap)
					v-flex(xs12)
						v-card(color="grey" dark)
							v-card-title
								v-icon mdi-timetable
								h3 Periode
								v-spacer
								v-btn(small  dark fab outline icon @click.stop="periode = !periode")
									v-icon mdi-unfold-more-horizontal
							v-card-text(v-show="periode")
								periode
					v-flex(xs12)
						v-card(color="grey lighten-1" dark)
							v-card-title
								v-icon mdi-chair-school
								h3 Kelas
								v-spacer
								v-btn(small  dark fab outline icon @click.stop="kelas = !kelas")
									v-icon mdi-unfold-more-horizontal
							v-card-text(v-show="kelas")
								kelas

					v-flex(xs12)
						v-card(color="grey lighten-2" light )
							v-card-title
								v-icon mdi-calendar-text
								h3 Jadwal
								v-spacer
								v-btn(small  light fab outline icon @click.stop="jadwal = !jadwal")
									v-icon mdi-unfold-more-horizontal
							v-card-text(v-show="jadwal")
								jadwal
					v-flex(xs12)
						v-card(color="grey lighten-3" light )
							v-card-title
								v-icon mdi-file
								h3 Persuratan
								v-spacer
								v-btn(small  light fab outline icon @click.stop="surat = !surat")
									v-icon mdi-unfold-more-horizontal
							v-card-text(v-show="surat")
								surat
		
</template>

<script>
import Jadwal from './../guru/Jadwal'
import Periode from '@pages/comps/Periode'
import Kelas from '@pages/comps/Kelas'
import Surat from '@pages/comps/Surat'
export default {
  // components: {Jadwal, Periode, Kelas},
  components: {Jadwal, Periode, Kelas, Surat},
  name: 'Settings',

  data () {
    return {
		jadwal : false,
		periode: false,
		kelas: false,
		surat: false
    }
  },
  created() {

  },
  methods: {
	  showJadwal() {
		  var self = this
		  self.jadwal = !self.jadwal
	  }
  }
}
</script>

<style lang="css" scoped>
</style>
