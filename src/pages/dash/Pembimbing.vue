<template lang="pug">
  div
    v-card
      v-toolbar(color="#444" dark dense flat scroll-off-screen)
        v-toolbar-title Pembimbing
        //- v-spacer
      br
      v-layout(row)
        v-flex(xs12 md12)
          v-card(flat)
            v-btn(color="primary" @click.native="[dialog=true, add=1]" depressed outline) 
              i.fa.fa-user-plus
              | Tambah Guru
            v-btn.hidden-xs-only(color="success" @click.native="cetak_data" depressed outline)
              i.fa.fa-print
              | &nbsp; Cetak
            v-btn(color="warning" @click.native="export_xls" depressed outline)
              i.fa.fa-table
              | &nbsp; Export
            //- v-layout(row)
            //-   v-flex(xs12)
            //-     v-card(flat)
            //-       //- v-container(grid-list-md)
            //-       v-layout(no-wrap)
        //- v-flex(xs12 md3)
        input(type="file" id="fileGuru" ref="fileGuru" style="display:none" @change="onFilePicked")
        v-spacer
        v-text-field(label="Upload File" append-icon="mdi-file-excel-box" @click.native="pickFile" v-model="filename" solo clearable)
        v-btn(color="green" dark @click.native="importGuru" flat outline)
          v-icon mdi-file-import
          | Import
      br
      v-layout(row)
        v-flex(xs12)
          v-card
            v-card-title
              h4 Data Guru Pembimbing
              v-spacer
              v-flex(xs12 md4)
                v-text-field.no-print(append-icon="fa fa-search" label="Pencarian" single-line hide-details v-model="search" solo clearable)
            #printableTable
              <v-dialog v-model="dialog" max-width="700px">
                //- <v-btn color="primary" dark slot="activator" class="mb-2">New Item</v-btn>
                <v-card color="grey lighten-2">
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container grid-list-md>
                      <v-layout wrap>
                        <v-flex xs12 md6>
                          <span v-if="add == 1">
                            <v-text-field id="kode_guru" label="Kode Guru" v-model="editedGuru.kode_guru" required  append-icon="fa fa-qrcode" outline></v-text-field>
                          </span>
                          <span v-if="add == 0">
                            <v-text-field id="kode_guru" label="Kode Guru" v-model="editedGuru.kode_guru" required  append-icon="fa fa-qrcode" outline disabled></v-text-field>
                          </span>

                        </v-flex>
                        <v-flex xs12 md6>
                          <v-text-field id="uname" label="Username" v-model="editedGuru.uname" required  append-icon="fa fa-user-circle " outline></v-text-field>
                        </v-flex>
                        <v-flex xs12 md6>
                          <v-text-field id="password" label="Password" v-model="editedGuru.password" required  append-icon="fa fa-key" outline></v-text-field>
                        </v-flex>
                        <v-flex xs12 md6>
                          <v-text-field id="nama" label="Nama" v-model="editedGuru.name" required  append-icon="mdi mdi-label" outline></v-text-field>
                        </v-flex>
                        <v-flex xs12 md12>
                          <v-textarea id="alamat" label="Alamat" v-model="editedGuru.alamat" rows="2" required  append-icon="mdi mdi-map" multi-line outline></v-textarea>
                        </v-flex>
                        <v-flex xs12 md6>
                          <v-text-field id="hp" label="HP" v-model="editedGuru.hp" required  append-icon="mdi mdi-cellphone-android" outline></v-text-field>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1"  @click.native="close" outline>Cancel</v-btn>
                    <v-btn color="green"  @click.native="save" v-if="add" outline>Simpan</v-btn>
                    <v-btn color="blue darken-1" flat @click.native="update" v-if="!add" outline>Perbarui</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              v-layout(row)
                v-flex(xs12)
                  v-data-table#tbl_guru(
                    :headers="headers" 
                    :items="gurus" 
                    :search="search" 
                    sort-icon="fa fa-sort" 
                    next-icon="fa fa-angle-double-right" 
                    prev-icon="fa fa-angle-double-left" )
                        template(slot="items" 
                          slot-scope="props")
                          td {{ props.index+1 }}
                          td.text-xs-center 
                            v-avatar(
                              size="38px"
                              class="grey lighten-4"
                            )
                              img(:src="'/public/user-profiles/'+props.item.kode_guru+'.jpg'" alt="avatar")
                            
                          td.text-xs-center {{ props.item.kode_guru }}
                          td.text-xs-center {{ props.item.uname }}
                          td.text-xs-left {{ props.item.name }}
                          td.text-xs-left {{ props.item.hp }}
                          td {{ props.item.alamat }}
                          td.text-xs-center
                            v-btn(small fab outline color="red" title="Hapus" @click.native="hapus(props.item)")
                              v-icon fa-trash
                            v-btn(small fab outline color="green" title="Edit" @click.native="edit(props.item)")
                              v-icon fa-pencil

                        v-alert(slot="no-results" 
                          :value="true" 
                          color="error" 
                          icon="warning")
                          | Pencarian Anda akan "{{ search }}" tidak ditemukan.
  
    iframe(
      name="print_frame" 
      width="0" 
      height="0" 
      frameborder="0" 
      src="about:blank")
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return {
      filename: '',
      file: '',
      fileUrl: '',
      dialog: false,
      token: sessionStorage.getItem('token'),
      id: sessionStorage.getItem('_id'),
      search: '',
      headers:[
          {
            text: 'No',
            align: 'left',
            sortable: false,
            value: 'index'
          },
          { text: 'Foto', value: 'kode_guru' },
          { text: 'Kode Guru', value: 'kode_guru' },
          { text: 'Username', value: 'uname' },
          { text: 'Nama Guru', value: 'nama' },
          { text: 'No. HP', value: 'hp' },
          { text: 'Alamat', value: 'alamat' },
          { text: 'Opsi', value: 'aksi' },

        ],
      gurus: [],
      editedGuru: {
        kode_guru: '',
        uname: '',
        password: '',
        nama: '',
        alamat: '',
        hp: ''
      },
      defaultGuru: {
        kode_guru: '',
        uname: '',
        password: '',
        nama: '',
        alamat: '',
        hp: ''
      },
      foto: [],
      add: true,
      editedIndex: -1,
      rules:
        {
          required: (value) => !!value || 'Harus diisi'
        },
      server: this.$store.state.server
      }
      
  },
  created(){
    this.getGurus();
  },
  methods: {
    save() {
      var self = this
      axios.post(self.server+'/register', self.editedGuru)
        .then(res => {
          alert(res.data.msg)
          self.getGurus()
        })
        .catch(err => {
          console.log(err.response)
        })
    },

    update() {
      alert('Update')
    },
    edit(item) {
      var self = this
      
        self.dialog = true,
        self.add = '0'
        self.editedGuru = Object.assign({}, item)
        console.log(item);
     
    },
    hapus(item) {
      var self = this
      var hapus = confirm('Yakin menghapus data pembimbing :'+item.name+'?')
      if (hapus){
        // Eksekusi penghapusan data.
        alert('Hapus')
      }
      return false
    },

    pickFile(){
      this.$refs.fileGuru.click()
    },
    onFilePicked(e){
      var self = this;
      var files = e.target.files;
      var namafile = files[0].name;
      self.filename = namafile;
      const filereader = new FileReader();
      filereader.addEventListener('load', () => {
        self.fileUrl = filereader.result;
      });
      filereader.readAsDataURL(files[0]);
      self.file = files[0];
    },
    importGuru(){
      var self = this;
      var url = self.fileUrl;
      if (!url) {
        alert('Ambil File Excel Dulu!');
        return false;
      }
      var req = new XMLHttpRequest();
      req.open("GET", url, true);
      req.responseType = "arraybuffer";

      req.onload = function(e){
        var data = new Uint8Array(req.response);
        var workbook = XLSX.read(data, {type: "array"});

        var first_sheet_name = workbook.SheetNames[0];
        var ws = workbook.Sheets[first_sheet_name];
        var newGurus = XLSX.utils.sheet_to_json(ws);
        axios.post(self.server+'/api/importgurus', newGurus, {headers: {'Authorization': 'bearer '+self.token}}).then((res)=>{
          // self.getGurus();
          console.log(res);
          self.fileUrl = '';
          self.filename = '';
        })
        console.log(newGurus);
        // self
      };
      req.send();
    },
    close () {
        this.dialog = false
        setTimeout(() => {
          this.editedGuru = Object.assign({}, this.defaultGuru)
          this.editedIndex = -1
          this.selGuru = Object.assign({_id: 'Default', nama: 'Pilih Guru'})
          this.editedIndex = -1
          this.add = false;
          this.getGurus();
        }, 300)
    },
    getGurus(){
      var self = this;
      axios.get(self.server+'/api/allGurus', {headers: {'Authorization': 'bearer '+self.token}})
           .then((res) => {
             self.gurus = res.data.data;
             var i = 0;
             for (i; i < res.data.length; i++) {
              self.foto.push('/public/user-profiles/'+res.data[i]._id+'.jpg');
             }
           });
    },
    cetak_data(){
         window.frames["print_frame"].document.head.innerHTML = "<style>table{width: 100%;}table, th,td{border:1px solid #666;border-collapse:collapse;} td{padding: 2px 5px;word-wrap: wrap} .datatable__actions,th i{display:none} </style>";
         window.frames["print_frame"].document.body.innerHTML += "<h3 style='text-align:center'>DATA GURU PEMBIMBING</h3>";
         window.frames["print_frame"].document.body.innerHTML += document.getElementById("printableTable").innerHTML;
         window.frames["print_frame"].window.focus();
         window.frames["print_frame"].window.print();
    },
    export_xls() {
          var tab_text="<table border='2px'><tr bgcolor='#87AFC6'>";
          var textRange; var j=0;
          var tab = document.getElementById('tbl_guru'); // id of table
          var rows = tab.getElementsByTagName("tr");

          for(j = 0 ; j < rows.length ; j++) 
          {     
            // console.log(rows);
              tab_text=tab_text+rows[j].innerHTML+"</tr>";
              //tab_text=tab_text+"</tr>";
          }

          tab_text=tab_text+"</table>";
          tab_text= tab_text.replace(/<A[^>]*>|<\/A>/g, "");//remove if u want links in your table
          // tab_text= tab_text.replace(/<img[^>]*>/gi,""); // remove if u want images in your table
          tab_text= tab_text.replace(/<input[^>]*>|<\/input>/gi, ""); // reomves input params

          var ua = window.navigator.userAgent;
          var msie = ua.indexOf("MSIE "); 

          if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))      // If Internet Explorer
          {
              txtArea1.document.open("txt/html","replace");
              txtArea1.document.write(tab_text);
              txtArea1.document.close();
              txtArea1.focus(); 
              sa=txtArea1.document.execCommand("SaveAs",true,"Say Thanks to Sumit.xls");
          }  
          else                 //other browser not tested on IE 11
          var  sa = window.open("data:application/vnd.ms-excel;charset=UTF-8;," + encodeURIComponent(tab_text));  

          return (sa);
    }
  },
  computed: {
    formTitle () {
        return this.add == 1 ? 'Tambah Guru' : 'Edit Guru'
      }
  }
}
</script>
<style scoped>

</style>
