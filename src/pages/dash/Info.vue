<template lang="pug">
	div

		v-dialog(v-model="infoDlg")
			//- v-slide-y-transition
			v-flex(xs12)
				v-card.elevation-2(tile height="auto")
					v-card-title(primary-title dark)
						h3.headline {{formTitle}}
						v-spacer
						v-btn(fab dark color="red" small @click.native="close")
							v-icon mdi-close
					v-card-text
						v-layout(row)
							v-flex(xs12 md8)
								v-container(grid-list-md)
									v-layout(row wrap)
										v-flex(xs12 md6)
											v-text-field(name="title" v-model="newInfo.title" label="Judul" clearable)
										v-flex(xs12 md6)
											v-text-field(name="img" v-model="newInfo.img" label="Url Gambar" clearable append-icon="mdi mdi-link")
										//- v-flex(xs12 md3)
										//- 	img(:src="imageUrl" height="100" v-if="imageUrl")
										//- v-flex(xs12 md3)
										//- 	v-text-field(label="Url Gambar" append-icon="mdi mdi-link" @click.native="pickFile" v-model="newInfo.img")
										//- 	input(type="file" style="display:none" ref="image" accept="image/*" @change="onFilePicked") 
									v-layout(row wrap)
										v-flex(xs12)
											vue-editor(v-model="newInfo.content" :editorOptions="editorSettings")
									v-card-actions
										v-spacer
										v-btn(color="blue darken-1" depressed dark @click.native="close") Cancel
										v-btn(color="blue darken-1" depressed dark @click.native="saveInfo" v-if="add") Simpan
										v-btn(color="blue darken-1" depressed dark @click.native="update" v-if="!add" ) Perbarui
							v-flex(xs12 md4)
								v-container
									article
										h1 Cara Menginput Info:
										p
											ul
												li Entri Judul
												li Masukkan gambaar ilustrasi header (opsional)
												li Ketikkan informasi ke dalam teks editor yang tersedia. Ilustrasi Gambar Juga dapat dimasukkan ke dalam informasi.
		br
		v-card
			v-toolbar(color="red" dark dense flat scroll-off-screen)
				v-toolbar-title
					h3 Info Prakerlap
			v-layout(row)
				v-flex(xs12)
					v-card(tile)
						//- v-card-title(primary-title dark)
								
						v-card-text
							v-layout(row)
								v-btn(fab dark color="green" @click.native="addInfo" small depressed)
									v-icon mdi-plus
							v-layout(row)
								v-flex(xs12)
									v-data-table(:headers="infoHeaders" :items="infos")
										template(slot="items" slot-scope="props")
											td {{ props.index+1 }}
											td {{ props.item._id}}
											td {{ props.item.title}}
											td {{ props.item.created_by}}
											td {{ props.item.isActive}}
											td.justify-center.layout.px-0
												v-btn(icon class="mx-0" @click.native="showDetail(props.item)" title="Detil")
													v-icon(color="teal" ) fa-eye
												v-btn(icon class="mx-0" @click.native="editItem(props.item)" title="Edit")
													v-icon(color="orange" ) fa-pencil
												v-btn(icon class="mx-0" @click.native="deleteItem(props.item)" title="Hapus")
													v-icon(color="pink") fa-trash
		
		v-dialog(v-model="detilDlg")
			v-layout(row)
				v-flex(xs12)
					v-card.elevation-2
						v-card-title
							v-flex(xs10)
								h3 {{detilItem.title}}
							v-btn(fab small color="red" dark @click.native="detilDlg = false" right top absolute style="margin-top: 35px" depressed)
								v-icon mdi-close
						v-card-text
							v-layout(row)
								v-flex(xs12 md10 offset-md1)
									h5 Ditulis: {{detilItem.created_by}} <br/>
										| pada: {{detilItem.created_at}}
									v-container
										div#contentInfo(v-html="detilItem.content")

		
</template>

<script>
import axios from 'axios'
import { VueEditor } from 'vue2-editor'
import ImageResize from 'quill-image-resize-module'
// import { VueEditor } from 'vue2-editor-with-imageresize'
// import Editor from '@tinymce/tinymce-vue';
Quill.register('modules/imageResize', ImageResize)
// import fileInput from '@pages/comps/FileInput'
export default {

  name: 'Info',
  components: { VueEditor},
  data () {
	return {
		imgH: true,
		editorSettings: {
		  modules: {
			imageResize: {}
		  },
		  placeholder: 'Tulis Informasi'
		},	  
		infoDlg: false,
		role: sessionStorage.getItem('role'),
		token: sessionStorage.getItem('token'),
		periode: sessionStorage.getItem('periode'),
		infos: [],
		newInfo:{
			// _id: '',
			periode: sessionStorage.getItem('periode'),
			img: '',
			title: '',
			content: '',
			created_by: sessionStorage.getItem('_id'),
			created_at: new Date(),
			isActive: '1'
		},
		infoHeaders: [
			{
			text: 'No',
			align: 'left',
			sortable: false,
			value: 'index'
		  },
		  { text: 'ID', value: '_id' },
		  { text: 'Judul', value: 'title' },
		  // { text: 'Konten', value: 'content' },
		  { text: 'Penulis', value: 'created_by' },
		  // { text: 'Ditulis Pada', value: 'created_at' },
		  { text: 'Status', sortable: false, value: 'isActive' },
		  // { text: 'Dudi', sortable: false, value: '_dudi.namaDudi' },
		  // { text: 'Pembimbing', sortable: true, value: '_guru.nama' },
		  { text: 'Aksi', sortable: false, value: '_id' }
		],
		server: this.$store.state.server,
		detilItem: {},
		detilDlg: false,
		editedIndex: -1,
		add: true,
		imageUrl: '',
		imageFile: ''
	}
  },
  created(){
  	this.getInfos();
  },
  methods: {
  	pickFile () {
  			let self = this
            self.$refs.image.click ()
        },
    onFilePicked (e) {
    	let self = this
		const files = e.target.files
		if(files[0] !== undefined) {
			self.newInfo.img = files[0].name
			if(self.newInfo.img.lastIndexOf('.') <= 0) {
				return
			}
			const fr = new FileReader ()
			fr.readAsDataURL(files[0])
			fr.addEventListener('load', () => {
				this.imageUrl = fr.result
				this.imageFile = files[0] // this is an image file that can be sent to server...
			})
		} else {
			self.newInfo.img = ''
			this.imageFile = ''
			this.imageUrl = ''
		}
    },



  	formData (e) {
  		console.log(e)
  	},
  	showDetail (item) {
  		let self = this
  		self.detilDlg = true
  		self.detilItem = Object.assign({}, item)
  	},
  	editItem ( item ) {

  	},
  	deleteItem( item ) {
  		let self = this
  		let del = confirm('Yakin Hapus Info: '+ item.title + '?')
  		if (!del) return false
		axios.delete(self.server+'/api/info/'+item._id, {headers:{'X-Access-Token': self.token}})
			.then(res => {
				self.getInfos()
				console.log(res)
			})
			.catch(err => {
				console.log(err)
			})
  	},
	addInfo () {
		var self = this
		self.infoDlg = true
	},
	close () {
		var self = this
		self.infoDlg = false
	},
	onImg (file) {
		let fileInput = this.container.querySelector('input.ql-image[type=file]');
		if (fileInput == null) {
		fileInput = document.createElement('input');
		fileInput.setAttribute('type', 'file');
		fileInput.setAttribute('accept', 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon');
		fileInput.classList.add('ql-image');
		fileInput.addEventListener('change', () => {
			const files = fileInput.files;
			const range = this.quill.getSelection(true);

			if (!files || !files.length) {
				console.log('No files selected');
				return;
			}

			const formData = new FormData();
			formData.append('file', files[0]);

			this.quill.enable(false);
			
			axios
				.post('/api/image', formData)
				.then(response => {
					this.quill.enable(true);
					this.quill.editor.insertEmbed(range.index, 'image', response.data.url_path);
					this.quill.setSelection(range.index + 1, Quill.sources.SILENT);
					fileInput.value = '';
				})
				.catch(error => {
					console.log('quill image upload failed');
					console.log(error);
					this.quill.enable(true);
				});
			});
			let cont = document.getElementById('imgCont')
			cont.appendChild(fileInput);
		}
		fileInput.click();
	},
  	getInfos(){
  		var self = this;
  		axios.get(self.server+'/api/getinfos', {headers: {'X-Access-Token': self.token}})
  				.then(res=>{
  					// console.log(res);
  					self.infos = res.data;
  				});
  	},
  	saveInfo() {
  		var self = this;
  		var data = self.newInfo;
  		axios.post(self.server+'/api/info', data, {headers: {'X-Access-Token': self.token}})
			.then(res => {
				alert(res.data.msg)
			})
			.catch(err => {
				console.log(err)
			})
  	}
  	// newInfo(){
  	// 	var self = this;
  	// 	var textpad = document.getElementById("textpad");
  	// 	var editor = new Quill(textpad);
  	// 	return editor;
  	// }
  },
  computed : {
  	formTitle () {
		return this.editedIndex == -1 ? 'Tulis Info' : 'Edit Info'
	  }
  }
}
</script>

<style lang="css" scoped>
#contentInfo img{
	width: 100%;
}
#app > div > div > main > div > div > div > div > div > p > p > img {
	width: 100%;
}
#app div div main div div div div p p img {
	width: 100%;
}
</style>