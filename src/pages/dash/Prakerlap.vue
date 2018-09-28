<template lang="pug">
	v-layout(column)
		
		v-flex(xs12 md-12)
			v-toolbar(color="green" dark dense flat scroll-off-screen)
				v-toolbar-title Prakerlap
				v-spacer
				v-btn(
					fab 
					small 
					@click.native="newPrakerlap" 
					color="green darken-2" 
					depressed 
					title="Daftarkan Praktikan")
					v-icon(small) mdi-worker
				v-btn(
					fab 
					small 
					@click.native="mod='byDudi'" 
					color="green darken-2" 
					depressed 
					title="Penempatan berdasarkan Dudi")
					v-icon(small) mdi-table
				v-btn(
					fab 
					small 
					@click.native="mod='asli'" 
					color="green darken-2" 
					depressed 
					title="Daftar Penempatan")
					v-icon(small) mdi-view-list
				
			v-layout(row)
				v-flex(xs12)
					pembimbing(
						v-if="mod == 'pklByGuru'" 
						:items-guru="gurus" 
						:items-siswa="siswas")
					by-dudi(
						v-if="mod == 'byDudi'" 
						:items-guru="gurus" 
						:items-dudi="dudis"
						:items-pkl = "pkls")
					penempatan(
						v-if="mod == 'asli'" 
						:gurus="gurus" 
						:dudis="dudis"
						:reg-siswas="pkls")

		v-snackbar(
			:timeout="timeout" 
			color="red lighten-3"
			auto-height
			v-model="pklSnackbar")
			p {{pklsnacktext}}
			v-btn(dark flat @click.native="pklSnackbar = false") Close

		v-dialog(
			v-model="dialog" 
			fullscreen 
			transition="dialog-bottom-transition" 
			:overlay="false" 
			scrollable)
				v-card(tile)
					v-toolbar(card dark color="secondary")
						v-toolbar-title 
							v-icon mdi-worker
							| &nbsp;Daftarkan Calon Praktikan
						v-spacer
						v-toolbar-items
							v-btn(dark @click.native="dialog = false" color="red" small depressed title="Tutup") 
								v-icon mdi-close
					v-card-text
						v-container(fluid grid-list-md)
							v-layout(row wrap)
								v-flex(xs12 md6)
									v-card.blue--text(color="grey lighten-3")
										v-card-title
											h4 Calon Peserta Belum Terdaftar
											v-spacer
											v-text-field.no-print(append-icon="fa fa-search" label="Pencarian" single-line hide-details v-model="searchCalon")
											
										v-card-text
											v-layout(row)
												v-flex(xs12 md10 offset-md1)
													v-radio-group(v-model="progli" row)
														v-radio(label="TKJ" value="tkj" color="black")
														v-radio(label="MM" value="mm" color="teal")
														v-radio(label="TKR" value="tkr" color="red darken-2")
														v-radio(label="OTR" value="otr" color="yellow darken-2")
														v-radio(label="TBSM" value="tbsm" color="grey")
											v-data-table.elevation-1#tblcalon(
												:headers="headers" 
												:items="filteredCalons" 
												:search="searchCalon" 
												sort-icon="fa fa-sort" 
												next-icon="fa fa-angle-double-right" 
												prev-icon="fa fa-angle-double-left" 
												v-model="selected" 
												select-all item-key="id")
												template(slot="items" slot-scope="props")
													td
														v-checkbox(primary v-model="props.selected" hide-details)
													td {{ props.index+1 }}
													td {{ props.item.nis }}
													td {{ props.item.nama }}
													td {{ props.item.kelas }}
													//- td {{ props.item.progli }}
													//- td {{ props.item.hp }}
												v-alert(
													slot="no-results" 
													:value="true" 
													color="error" 
													icon="warning")
													| Data "{{ searchCalon }}" tidak ditemukan.
								v-flex(xs12 md6)
									v-card(color="grey lighten-3")
										v-card-title
											h4 Pendaftaran Calon
										v-card-text
											v-container
												v-layout(row wrap)
													v-flex(xs4)
														v-select(
															append-icon="fa fa-angle-down" 
															:items="gurus" 
															v-model="selGuru" 
															label="Pilih Guru" 
															item-text="name" 
															item-value="id" 
															return-object 
															:hint="`${selGuru._id}`" 
															input="selGuru._id" 
															persistent-hint autocomplete)
													v-flex(xs8)
														v-select(
															append-icon="fa fa-angle-down" 
															:items="dudis" 
															v-model="selDudi" 
															label="Pilih Du/Di" 
															item-text="nama_dudi" 
															item-value="id" 
															return-object 
															:hint="`${selDudi._id}`" 
															input="selDudi._id" 
															persistent-hint autocomplete)
												v-layout(row)
													v-flex(xs12)
														v-data-table#tblreg(
														:headers="selHeaders" 
														:items="selected" 
														item-key="id"
														sort-icon="fa fa-sort" 
														next-icon="fa fa-angle-double-right" 
														prev-icon="fa fa-angle-double-left" 
														v-model="selected")
															template(slot="items" slot-scope="props")
																td {{ props.index+1 }}
																td {{ props.item.nis }}
																td {{ props.item.nama }}
																td {{ props.item.kelas }}
												v-layout(row)
													v-btn(color="secondary" @click.native="saveNewPkl") Simpan
					div(style="flex: 1 1 auto;")
</template>

<script>
import axios from 'axios'
import Pembimbing from '@pages/comps/Pembimbing'
import ByDudi from '@pages/comps/pklByDudi'
import Penempatan from '@pages/comps/Penempatan'
export default {
	components: {Pembimbing, ByDudi, Penempatan},
	name: 'Prakerlap',

	data () {
		return {
			jmlterdaftar: '',
			jmlditerima: '0',
			dialog: false,
			selected:[],
			gurus: [],
			token: sessionStorage.getItem('token'),
			selGuru: {_id: '', nama: 'Pilih Guru'},
			editedSiswa: {},
			allSiswas:[],
			siswas: [],
			selSiswa: {_id: '', nama: 'Pilih Siswa', nis: ''},
			dudis: [],
			selDudi: {_id: '', namaDudi: 'Pilih Dudi'},
			pklSnackbar: false,
			timeout: 10000,
			pklsnacktext: '',
			lastpkl: '',
			searchCalon: '',
			headers:[
	          {
	            text: 'No',
	            align: 'left',
	            sortable: false,
	            value: 'index'
	          },
	          { text: 'NIS', value: 'nis' },
	          { text: 'Nama', value: 'nama' },
	          { text: 'Kelas', value: 'kelas' },
	          // { text: 'Progli', value: 'progli' },
	          // { text: 'No. Telp', value: 'hp' }
	        ],
	        selHeaders:[
	          {
	            text: 'No',
	            align: 'left',
	            sortable: false,
	            value: 'index'
	          },
	          { text: 'NIS', value: 'nis' },
	          { text: 'Nama', value: 'nama' },
	          { text: 'Kelas', value: 'kelas' },
	          // { text: 'Progli', value: 'progli' },
	          // { text: 'No. Telp', value: 'hp' }
	        ],
			progli: '',
			server: this.$store.state.server,
			mod: 'asli',
			pkls:[],
			periode: sessionStorage.getItem('periode')
		}
	},
	created(){
		// this.getSiswas();
		this.getCalons();
		this.getGurus();
		this.getDudis();
		this.getPkls();
		// this.jmlTerdaftar();
	},
	methods: {
		toggleMode(m) {
			var self = this
			self.mod = m
		},
		newPrakerlap(){
			var self = this;
			this.dialog = true;
			self.getLastPkl();
		},
		getPkls() {
			var self = this
				axios.get(self.server+'/api/regSiswas?periode='+self.periode, {headers: {'Authorization': 'bearer '+self.token}})
					.then((res) => {
						self.pkls = res.data.data
					});
		},
		getSiswas(){
			var self = this;
			var periode = sessionStorage.getItem('periode');
			axios.get(self.server+'/api/siswas?periode='+periode, {headers: {'Authorization': 'bearer '+self.token}})
           .then((res) => {
            self.allSiswas = res.data.data;
           });
		},
		getCalons(){
			var self = this;
			var periode = sessionStorage.getItem('periode');
			axios.get(self.server+'/api/calon?periode='+periode, {headers: {'Authorization': 'bearer '+self.token}})
           .then((res) => {
            self.siswas = res.data.data;
           });
		},
		getGurus(){
			var self = this;
			axios.get(self.server+'/api/allGurus', {headers: {'Authorization': 'bearer '+self.token}})
					 .then((res) => {
					 	self.gurus = res.data.data;
					 });
		},
		getDudis(){
			var self = this;
			axios.get(self.server+'/api/dudis', {headers: {'Authorization': 'bearer '+self.token}})
					.then((res) => {
						self.dudis = res.data.data;
					});
		},
		saveNewPkl(){
			var self= this;
			if(self.selGuru._id == '' || self.selDudi._id == ''){
				alert('Pilih dulu Guru Atau Dudi');
				return false;
			} else {
			var date = new Date();
			var th = date.getFullYear();
			var dateNum = Date.parse(date);
			var periode = sessionStorage.getItem("periode");
			var kodeperiode = periode.replace('-', '');
			let calons = self.selected;
			var jmlCalon = calons.length;
			var nurut = '';
			var lastpkl = self.lastpkl;
			var newData = [];
			var _guru = self.selGuru.kode_guru,
				_dudi = self.selDudi.kode_dudi;
			for(var i = 0 ; i < jmlCalon; i++) {
				var kelas = calons[i].kelas.split(' ');
				var progli = kelas[1].toUpperCase();
				// progli = progli.toUpperCase();
				// var uname = calons[i].uname;
				var nis = calons[i].nis;

				var kodepkl = th+kodeperiode+nis+progli+dateNum; //th-angkatan-4dignis-progli-tglEntry
				var data = {
					kode_pkl: kodepkl,
					_siswa: nis,
					_guru: _guru,
					_dudi: _dudi,
					periode: periode,
					status: 'aktif',
					mutasi: 'nihil'
					// regOn: date.getFullYear()+'-'+date.getMonth()+'-'+date.getDay()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
				}
				newData.push(data);
				// Hapus data terdaftar dari array calon
				// var remSiswa = self.siswas.map(function(item){ return item.nis;}).indexOf(nis);
				// self.siswas.splice(remSiswa,1);
				// self.selected = [];
				// self.selGuru = {kode_guru: '', nama: 'Pilih Guru'},
				// self.selDudi = {kode_dudi: '', namaDudi: 'Pilih Dudi'}
				// alert(remSiswa);
				// console.log(newData);
			}

			// self.getLastPkl();
			
			// var data = self.selected;
			axios.post(self.server+'/api/newpkl', newData, {headers: {'Authorization': 'bearer '+self.token}})
				.then((res) => {
					// console.log(res);
					if (res.data.success === false) {
						self.pklSnackbar = true;
						self.pklsnacktext = res.data.msg;
						self.selected = [];

					} else {
						var remSiswa = self.siswas.map(function(item){ return item.nis;}).indexOf(nis);
						self.siswas.splice(remSiswa,1);
						self.selected = [];
						self.selGuru = {kode_guru: '', nama: 'Pilih Guru'};
						self.selDudi = {kode_dudi: '', namaDudi: 'Pilih Dudi'};
						self.getSiswas();
					}
					// self.getSiswas();
					
				})
				.catch((err) => {
					console.log(err.response);
					self.pklSnackbar = true;
					self.pklsnacktext = err.response;
				});
			// console.log(newData);
			}
		},
		zeroPad(num, places) {
		  var zero = places - num.toString().length + 1;
		  return Array(+(zero > 0 && zero)).join("0") + num;
		},
		getLastPkl(){
			var self = this;
			axios.get(self.server+'/api/lastpkl', {headers: {'Authorization': 'bearer '+self.token}})
				.then(function(res){
					self.lastpkl = res.data.data;
				})
				.catch(err => {
					if ( err.response.status == 404) {
						self.pklsnacktext = 'No Data';
						self.pklSnackbar = true;
					}
				})
		},
		checked(v){
			console.log(v);
		},
		// jmlTerdaftar(){
		// 	var self = this;
		// 	var periode = sessionStorage.getItem('periode');
		// 	axios.get(self.server+'/api/jmlterdaftar?periode='+periode, {headers: {'Authorization': 'bearer '+self.token}})
		// 		.then((res)=>{
		// 			var jml = res.data.data.length;
		// 			self.jmlterdaftar = res.data.data;
		// 		});
		// }
	},
	computed: {
		filteredCalons(){
			var self = this;
			return self.siswas.filter((i) => {
				if (!self.progli){
					return i;
				} else {
					var kelas = i.kelas.split(' ');
					var progli = kelas[1];

					return progli.toLowerCase() == self.progli;
				}
			})
		},
		jmlAllCalons(){
			var jml = this.allSiswas.length;
			return jml;
		}
		
	}
}
</script>

<style lang="css" scoped>
</style>