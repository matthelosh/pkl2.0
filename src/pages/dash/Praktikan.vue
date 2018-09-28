<template lang="pug">
  div
    v-card
      //- v-layout
      v-toolbar(color="orange darken-2" dark dense flat scroll-off-screen)
        v-toolbar-title Praktikan
        v-spacer
      
      v-layout(row)
        v-flex(xs12)
          v-btn(color="teal darken-1" @click.native="[dialog=true, add=true]" depressed dark) 
            v-icon mdi-asterisk
            | &nbsp; Baru
          v-btn.hidden-xs-only(color="teal lighten-1" @click.native="cetak_data" depressed dark)
            v-icon mdi-printer
            | &nbsp; Cetak
          v-btn(color="teal lighten-2" @click.native="export_xls" depressed dark)
            v-icon mdi-file-excel-box
            | &nbsp; Export
        v-flex(xs12)
          input(type="file" ref="fileUpload" @change="onFilePicked" style="display:none")
    
          v-text-field(@click.native="pickFile" color="green" depressed append-icon="mdi-attachment" label="Pilih file Excel" v-model="filename")
            v-icon mdi-file-excel-box
            | &nbsp; Import XLS
        v-flex(xs12)
          v-btn(color="teal lighten-1" depressed @click.native="import_xls" dark)
            v-icon mdi-file-import
            | &nbsp; Import
        //- <vue-xlsx-table @on-select-file="handleSelectedFile"></vue-xlsx-table>
      v-layout(row)
        #tes
      v-layout(row)
        v-flex(xs12)
          v-card
            v-card-title
              h4 Data Praktikan
              v-spacer
              v-text-field.no-print(append-icon="fa fa-search" label="Pencarian" single-line hide-details v-model="search")
              <v-dialog v-model="dialog" max-width="500px">
                //- <!-- <v-btn color="primary" dark slot="activator" class="mb-2">New Item</v-btn> -->
                <v-card>
                  <v-card-title>
                    v-progress-linear(
                      height="3" slot="progress" 
                      :color="barColor" 
                      :value="progress" determinate)
                      span(class="headline") {{ formTitle }}
                  </v-card-title>
                  <v-card-text>
                    <v-container grid-list-md fluid>
                      <v-layout wrap>
                        <v-flex xs12 sm6 md4>
                          <v-text-field label="NIS" v-model="editedSiswa.nis"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                          <v-text-field label="Username" v-model="editedSiswa.uname"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                          <v-text-field label="Password" v-model="editedSiswa.password"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm8 md8>
                          <v-text-field label="Nama" v-model="editedSiswa.nama"></v-text-field>
                        </v-flex>
                        
                        <v-flex xs12 sm6 md4>
                          <v-text-field label="Kelas" v-model="editedSiswa.kelas"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                          <v-text-field label="No. HP" v-model="editedSiswa.hp"></v-text-field>
                        </v-flex>
                        //- <v-flex xs12 sm8 md8>
                        //-   <v-select append-icon="fa fa-angle-down" v-bind:items="gurus" v-model="editedSiswa._guru" label="Pilih Guru" item-text="nama" item-value="_id" return-object :hint="`${selGuru.nama}, ${selGuru._id}`" input="selGuru._id" persistent-hint autocomplete v-bind:value="editedSiswa._guru"></v-select>
                        //- </v-flex>
                        //- <v-flex xs12 sm12 md12>
                        //-   <v-select append-icon="fa fa-angle-down" v-bind:items="dudis" v-model="editedSiswa._dudi" label="Pilih Dudi" item-text="namaDudi" item-value="_id" return-object :hint="`${selDudi.namaDudi}, ${selDudi._id}`" input="selDudi._id" persistent-hint autocomplete v-bind:value="editedSiswa._dudi"></v-select>
                        //- </v-flex>
                        

                      </v-layout>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click.native="close">Batal</v-btn>
                    <v-btn color="blue darken-1" flat @click.native="save" v-if="add">Simpan</v-btn>
                    <v-btn color="blue darken-1" flat @click.native="update" v-if="!add">Perbarui</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
          #printableTable
            v-data-table#tbl_praktikan(:headers="headers" 
              :items="siswas" 
              :search="search" 
              sort-icon="fa fa-sort" 
              next-icon="fa fa-angle-double-right" 
              prev-icon="fa fa-angle-double-left" 
              loading="true" class="")
                  template(slot="items" slot-scope="props")
                    td.hidden-xs-only {{ props.index+1 }}
                    td.text-xs-left {{ props.item.nis}}
                    td.text-xs-left {{ props.item.nama }}
                    td.text-xs-left {{ props.item.kelas }}
                    td.text-xs-left {{ props.item.kelas.substr(2, 4) }}
                    td.text-xs-left {{ props.item.periode }}
                    td {{ props.item.hp }}
                    //- td 
                    //-   span(v-if="props.item._dudi == null || props.item._dudi == '' || props.item._dudi == '0'|| props.item._dudi === false") {{ props.item._dudi == 'Kosong'}}
                    //-   span(v-else) {{ props.item._dudi.namaDudi }}
                    //- td 
                    //-   span(v-if="props.item._guru == null || props.item._guru == '' || props.item._guru == '0'|| props.item._guru === false") Kosong
                    //-   span(v-else) {{ props.item._guru.nama}}
                    td.justify-center.layout.px-0

                      v-btn(icon class="mx-0" @click.native="editItem(props.item)")
                        v-icon(color="teal" ) fa-pencil
                          
                      v-btn(icon class="mx-0" @click.native="deleteItem(props.item)")
                        v-icon(color="pink") fa-trash
                          
                  v-alert(slot="no-results" 
                    :value="true" color="error" icon="warning")
                    | Pencarian Anda akan "{{ search }}" tidak ditemukan.
  
    v-dialog(v-model="importDlg" persistent)
      v-card
        v-card-text
          h2#info-text Mohon Bersabar, Import Data Praktikan Sedang Dalam Proses ..
    <iframe name="print_frame" width="0" height="0" frameborder="0" src="about:blank"></iframe>

</template>

<script>
import axios from 'axios'
// import XLSX from 'xlsx'
export default {
  // components:{fileInput},
  data() {
    return {
      barColor: 'grey',
      progress: 0,
      formData:'',
      file: '',
      fileUrl: '',
      filename: '',
      selSiswa: [],
      add: '',
      dialog: false,
      editedIndex: -1,
      editable: false,
      search: '',
      token: sessionStorage.getItem('token'),
      siswas: [],
      editedSiswa: {
        _id: '',
        uname: '',
        password: '',
        kelas: '',
        periode: '',
        nama: '',
        progli: '',
        hp: '',
        _role: '3'
      },
      defaultSiswa: {
        _id: '',
        uname: '',
        password: '',
        kelas: '',
        periode: '',
        nama: '',
        progli: '',
        hp: '',
        _role: '3'
      },
      importProgress: 0,
      importDlg: false,

      // _id":"u4474","uname":"u4474","password":"p4474","kelas":"XI MM 3","periode":"10-2","nama":"RATU ATHAYA HANA M A","progli":"mm","hp":"6288888888888","_dudi":"DM0026","_guru":"gm08","_role":"3"}
      headers: [
        {
            text: 'No',
            align: 'left',
            sortable: false,
            value: 'index'
          },
          { text: 'NIS', value: 'nis' },
          { text: 'Nama', value: 'nama' },
          { text: 'Kelas', value: 'kelas', class:"hidden-xs-only" },
          { text: 'Progli', value: 'progli', class:"hidden-xs-only" },
          { text: 'Periode', value: 'periode', class:"hidden-xs-only" },
          { text: 'No. HP', sortable: false, value: 'hp' },
          { text: 'Aksi', sortable: false, value: '_id' }
      ],
      newSiswas: [],
      server: this.$store.state.server
    }
    
  },
  created(){
    this.getSiswas();
  },
  methods: {
    

    editItem (item) {
        this.editedIndex = this.siswas.indexOf(item)
        this.editedSiswa = Object.assign({}, item)
        this.editedSiswa.periode = sessionStorage.getItem('periode');
        this.dialog = true
    },

    deleteItem (item) {
      const index = this.siswas.indexOf(item)
      confirm('Yakin Menghapus Siswa: '+ item.nama+' ini?') 
      var self = this;
      var data = {id: item.uname};
      console.log(self.token);
      axios.delete(self.server+'/api/siswa/'+item.uname, {headers: {'Authorization': 'bearer '+self.token}}). then((res) => {
        if(res.data.success === true){
          alert(res.data.msg)
          self.getSiswas()
        } else {
          alert(res.data.msg);
        }
      });
    },
    getSiswas(){
      var self = this;
      var periode = sessionStorage.getItem('periode');
      // console.log('halo');
      axios.get(self.server+'/api/allsiswas?periode='+periode, {headers: {'Authorization': 'bearer '+self.token}})
           .then((res) => {
            // console.log(res)
            self.siswas = res.data.data;
            // var data = res.data.data;

            // data.forEach(function(item) {
            //   var kelas = item.kelas.split(' ')
            //   var progli = kelas[1]
            //   self.siswas.progli += progli
            // });
           });
    },
    cetak_data(){
         window.frames["print_frame"].document.head.innerHTML = "<style>table{width: 100%;}table, th,td{border:1px solid #666;border-collapse:collapse;} td{padding: 2px 5px;word-wrap: wrap} .datatable__actions,th i{display:none} </style>";
         window.frames["print_frame"].document.body.innerHTML += "<h3 style='text-align:center'>DATA Praktikan</h3>";
         window.frames["print_frame"].document.body.innerHTML += document.getElementById("printableTable").innerHTML;
         window.frames["print_frame"].window.focus();
         window.frames["print_frame"].window.print();
    },
    export_xls() {
          var tab_text="<table border='2px'><tr bgcolor='#87AFC6'>";
          var textRange; var j=0;
          var tab = document.getElementById('tbl_praktikan'); // id of table
          var rows = tab.getElementsByTagName("tr");

          for(j = 0 ; j < rows.length ; j++) 
          {     
            // console.log(rows);
              tab_text=tab_text+rows[j].innerHTML+"</tr>";
              //tab_text=tab_text+"</tr>";
          }

          tab_text=tab_text+"</table>";
          tab_text= tab_text.replace(/<A[^>]*>|<\/A>/g, "");//remove if u want links in your table
          tab_text= tab_text.replace(/<img[^>]*>/gi,""); // remove if u want images in your table
          tab_text= tab_text.replace(/[arrow]*>/gi,""); // remove if u want images in your table
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
    },
    close () {
        this.dialog = false
        setTimeout(() => {
          this.editedSiswa = Object.assign({}, this.defaultSiswa)
          // this.selDudi = Object.assign({_id: 'Default', namaDudi: 'Pilih Dudi'})
          // this.selGuru = Object.assign({_id: 'Default', nama: 'Pilih Guru'})
          this.editedIndex = -1
          this.add = false;
          this.getSiswas();
          // this.getDudis();
          // this.getGurus();
        }, 300)
    },
    save () {
      var self = this;
      var data = self.editedSiswa;
      axios.post(self.server+'/api/newsiswa', data, {headers: {'Authorization': 'bearer '+self.token}})
          .then((res) => {
            if (res.data == 'ok_save'){
              self.close();
            }
          });
    },
    update () {
      var self = this;
      var data = self.editedSiswa;
      axios.put(self.server+'/api/siswa', data, {headers: {'Authorization': 'bearer '+self.token},
            onUploadProgress: function (progressEvent) {
                        let currentProgress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        self.progress = currentProgress;
                        self.barColor = (currentProgress > 25) ? "black" : (currentProgress > 50) ? "black" : (currentProgress > 75) ? "black" : "red"
                    }
          })
          .then((res) => {
            if ( res.data.success === true) {
              alert(res.data.msg)
              self.close();
              self.barColor='grey'
              self.progress=0
            }
          });
    },
    // update_all() {
    //   var self = this;
    //   var data = self.siswas;
    //   axios.put('http://localhost:4567/api/updallsiswas', data, {headers: {'X-Access-Token': self.token}})
    //       .then((res) => {
    //         console.log(res);
    //       });
    // },
    pickFile(){
      this.$refs.fileUpload.click();
    },
    onFilePicked(e){
      var self = this;
      var files = e.target.files,
          fileUri = '',
          filename = files[0].nama;
      self.filename = filename;
      const filereader = new FileReader();
      filereader.addEventListener('load', () => {
        self.fileUrl = filereader.result;
      });
      filereader.readAsDataURL(files[0]);
      self.file = files[0];
      
    },
    import_xls(){
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
        var newSiswas = XLSX.utils.sheet_to_json(ws);
        // console.log(newSiswas)
        axios.post(self.server+'/api/importsiswas', newSiswas, {headers: {'Authorization': 'bearer '+self.token},
                  onUploadProgress: function (progressEvent) {
                        // let currentProgress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        // self.importProgress = currentProgress;
                        self.importDlg = true;
                    }

        }).then((res)=>{
          if (res.data.success === true) {
            self.importDlg = false;
            self.getSiswas();
            self.fileUrl = '';
          } else {
            var info = document.getElementById('info-text');
            info.innerHTML = res.data.msg;
          }
          
        })
        // self
      };
      req.send();
// /* set up async GET request */
      
    }
  },
  computed: {
    
    formTitle () {
        return this.editedIndex == -1 ? 'Tambah Praktikan' : 'Edit Praktikan'
      },
    // siswas () {
    //   var self = this
    //   // var datas = self.
    // }
  }
}
</script>

<style scoped>
  dialog{
    height: auto!important;
  }
  #printableTable{
    display: inline-block;
    width: 100%;
  }
</style>

