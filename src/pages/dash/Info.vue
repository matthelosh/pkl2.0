<template lang="pug">
	div
		v-layout(row)
			v-flex(xs12 md5)
				v-card(tile)
					v-card-title(primary-title dark)
						h3.headline Tulis Info Baru
					v-card-text
						v-text-field(name="_id" v-model="newInfo._id" label="ID Info")
						v-text-field(name="title" v-model="newInfo.title" label="Judul")
						vue-editor(v-model="newInfo.content")
						v-btn(color="secondary" @click="saveInfo")
							v-icon mdi-send
			v-flex(xs12 md7)
				v-card(tile)
					v-card-title(primary-title dark)
							h3.headline Info yang pernah ditulis
					v-card-text
						v-data-table(:headers="infoHeaders" :items="infos")
							template(slot="items" slot-scope="props")
								td {{ props.index+1 }}
								td {{ props.item._id}}
								td {{ props.item.title}}
								td {{ props.item.created_by}}
								td {{ props.item.isActive}}
								td Aksi
</template>

<script>
import axios from 'axios'
import { VueEditor } from 'vue2-editor'
export default {

  name: 'Info',
  components: { VueEditor },
  data () {
    return {
    	// newInfo: 'Tulis Info Baru',
    	role: sessionStorage.getItem('role'),
    	token: sessionStorage.getItem('token'),
    	periode: sessionStorage.getItem('periode'),
    	infos: [],
    	newInfo:{
    		_id: '',
    		title: '',
    		content: 'Tulis Info Baru',
    		created_by: sessionStorage.getItem(''),
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

    }
  },
  created(){
  	this.getInfos();
  },
  methods: {
  	getInfos(){
  		var self = this;
  		axios.get('http://localhost:4567/api/getinfos', {headers: {'X-Access-Token': self.token}})
  				.then(res=>{
  					console.log(res);
  					self.infos = res.data;
  				});
  	},
  	saveInfo() {
  		var self = this;
  		var data = self.newInfo;
  		console.log(data);
  	}
  	// newInfo(){
  	// 	var self = this;
  	// 	var textpad = document.getElementById("textpad");
  	// 	var editor = new Quill(textpad);
  	// 	return editor;
  	// }
  }
}
</script>

<style lang="css" scoped>
</style>