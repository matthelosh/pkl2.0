<template lang="pug">
  div
    v-card
      v-toolbar(color="green lighten-2" dark dense flat scroll-off-screen)
        v-toolbar-title
          h3 Du/Di Rekanan
        v-spacer
        v-toolbar-items
          v-btn(color="primary" depressed dark @click.native="[dialog=true, add=true]" class="mb-2") <i class="fa fa-building"></i> &nbsp;Tambah Dudi
          v-btn(color="success" depressed @click.native="cetak_data")
            i.fa.fa-print
            | &nbsp; Cetak
          v-btn(color="red" depressed dark @click.native="export_xls")
            i.fa.fa-table
            | &nbsp; Export
          input(type="file" ref="dudiFile" style="display:none" @change="onFilePicked")
          v-text-field(append-icon="mdi-attachment" label="Ambil File" @click.native="pickFile" v-model="filename" box color="pink")
          v-btn(color="white" dark flat @click.native="import_dudi" )
            v-icon mdi-file-import
            | &nbsp; Import
      v-layout(row)
        v-flex(xs12)
          v-card.cetak_tabel
            v-card-title 
              h3 Data DU/DI
              v-spacer
              v-text-field.no-print(append-icon="fa fa-search" label="Pencarian" single-line hide-details v-model="search" clearable)
            v-layout(row)
              v-flex(xs4 offset-xs8)
                v-switch(:label="`Dudi Aktif: ${dudiaktif.toString()}`" v-model="dudiaktif" label="Yang memiliki Pembimbing")  
            div#printableTable
              <v-dialog v-model="dialog" max-width="500px" persistent>
                //- <v-btn color="primary" dark slot="activator" class="mb-2">New Item</v-btn>
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>
                  <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                      <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12 sm6 md4>
                              <v-text-field id="kode_dudi" label="Kode Dudi" v-model="editedDudi.kode_dudi" validate required :rules="[rules.required]" @blur="lastDudi" append-icon="fa fa-qrcode" required></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm8 md8>
                              <v-text-field label="Nama Dudi" v-model="editedDudi.nama_dudi" required validate-on-blur :rules="[rules.required]" append-icon="fa fa-building"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm8 md8>
                              <v-text-field label="Alamat" v-model="editedDudi.alamat" required validate-on-blur :rules="[rules.required]" append-icon="fa fa-map-signs"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm4 md4>
                              <v-text-field label="Kota" v-model="editedDudi.kota" required validate-on-blur :rules="[rules.required]" append-icon="fa fa-map-marker" ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md6>
                              <v-text-field label="No. Telp" v-model="editedDudi.telp" required validate-on-blur :rules="[rules.required]" append-icon="mdi-phone" ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md6>
                              <v-text-field label="Pemilik" v-model="editedDudi.pemilik" required validate-on-blur :rules="[rules.required]" append-icon="mdi-account-circle" ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm8 md8>
                              <v-text-field label="Email" v-model="editedDudi.email" required validate-on-blur :rules="[rules.required]" append-icon="mdi-email" ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm4 md4>
                              <v-text-field label="Kuota" v-model="editedDudi.kuota" required validate-on-blur :rules="[rules.required]" append-icon="mdi-table" ></v-text-field>
                            </v-flex>
                        </v-layout>
                      </v-container>
                    </v-form>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
                    <v-btn color="blue darken-1" flat @click.native="save" v-if="add">Simpan</v-btn>
                    <v-btn color="blue darken-1" flat @click.native="update" v-if="!add">Perbarui</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              v-data-table#tbl_dudi(
                :headers="headers" 
                :items="dudist" 
                :search="search" 
                sort-icon="fa fa-sort" 
                next-icon="fa fa-angle-double-right" 
                prev-icon="fa fa-angle-double-left")

                template(slot="items" slot-scope="props")
                  td {{ props.index+1 }}
                  td {{ props.item.kode_dudi }}
                  td.text-xs-right {{ props.item.nama_dudi }}
                  <td class="text-xs-left">{{ props.item.alamat }}</td>
                  <td class="text-xs-center">{{ props.item.kota }}</td>
                  <td class="text-xs-center">{{ props.item.telp }}</td>
                  <td class="text-xs-center">{{ props.item.pemilik }}</td>
                  <td class="text-xs-center" >{{ props.item.kuota }}</td>
                  <td class="justify-center layout px-0">
                    <v-btn icon class="mx-0" @click.native="editItem(props.item)">
                      <v-icon color="teal">fa-pencil</v-icon>
                    </v-btn>
                    <v-btn icon class="mx-0" @click.native="deleteItem(props.item)">
                      <v-icon color="pink">fa-trash</v-icon>
                    </v-btn>
                  </td>
                v-alert(
                  slot="no-results" 
                  :value="true" 
                  color="error" 
                  icon="warning")
                  | Pencarian Anda akan "{{ search }}" tidak ditemukan.
    <iframe name="print_frame" width="0" height="0" frameborder="0" src="about:blank"></iframe>
    <v-snackbar :timeout="snackbar.timeout" :color="snackbar.color" v-model="snackbar.model" top>
      <h4>{{snackbar.text}}</h4>
      <v-btn dark flat @click.native="gantikode">Tidak</v-btn>
      <v-btn dark flat @click.native="snackbar.model = false">&times;</v-btn>
    </v-snackbar> 
    v-snackbar(:color="importBarColor" v-model="importBar")
      h4 {{importText}}
</template>


<script>
import axios from 'axios'
export default {
  data() {
      return {
        valid:true,
        importBar: false,
        importBarColor: 'teal lighten-1',
        importText: 'Mohon Tunggu.. Data Dudi sedang diimport ..',
        add: true,
        snackbar: {
          model: false,
          timeout: 2000,
          color: '',
          text: ''
        },
        editedIndex: -1,
        dialog: false,
        // formTitle: 'Edit Dudi',
        editable: false,
        dudiaktif: false,
        text: 'Coba-coba',
        token: sessionStorage.getItem("token"),
        search: '',
        headers:[
          {
            text: 'No',
            align: 'left',
            sortable: false,
            value: 'index'
          },
          { text: 'Kode Dudi', value: 'kode_dudi' },
          { text: 'Nama Dudi', value: 'nama_dudi' },
          { text: 'Alamat', value: 'alamat' },
          { text: 'Kota', value: 'kota' },
          { text: 'No. Telp', value: 'telp' },
          { text: 'Pemilik', value: 'pemilik' },
          { text: 'Kuota', value: 'kuota' },
          { text: 'Action', value: 'id' },

        ],
        dudi: '',
        dudis: [],
        editedDudi: {
          'id':'',
          'kode_dudi': '',
          'nama_dudi': '',
          'alamat': '',
          'kota': '',
          'telp': '',
          'pemilik': '',
          'email' :'',
          'kuota': ''
        },
        defaultDudi: {
          'id': '',
          'kode_dudi': '',
          'nama_dudi': '',
          'alamat': '',
          'kota': '',
          'telp': '',
          'pemilik': '',
          'email' :'',
          'kuota': ''
        },
        rules:{
          required: (value) => !!value || 'Harus diisi'
        },
        gantikode: true,
        filename: '',
        fileUrl: '',
        newDudis: [],
        server: this.$store.state.server
      }
  },
  created(){
    this.getDudis();
    // this.getGurus();
  },
  watch: {
    dialog (val) {
      val || this.close()
    }
  },
  methods: {
    editItem (item) {
      this.editedIndex = this.dudis.indexOf(item)
      this.editedDudi = Object.assign({}, item)
      this.add = false;
      this.dialog = true
    },

    deleteItem (item) {
      var self = this;
      const index = this.dudis.indexOf(item)
      var hapus = confirm('Yakin Menghapus Du/Di : '+item.nama_dudi+'?') && this.dudis.splice(index, 1)
      if (hapus){
        axios.delete(self.server+'/api/dudi/'+item.id, {headers: {'Authorization': 'bearer '+self.token}})
              .then((res) => {
                if( res.data.success === true ) {
                  alert(res.data.msg);
                  // self.getDudis();
                } else {
                  alert(res.data.msg);
                }
              });
      }

    },
    getDudis() {
      var self = this;
      axios.get(self.server+'/api/dudis', {headers: {'Authorization': 'bearer '+self.token}})
        .then(function(res){
          self.dudis = res.data.data;
          // console.log(res.data);
        });
    },
    cetak_data(){
         window.frames["print_frame"].document.head.innerHTML = "<style>table{width: 100%;}table, th,td{border:1px solid #666;border-collapse:collapse;} td{padding: 2px 5px;word-wrap: wrap} .datatable__actions,th i{display:none} </style>";
         window.frames["print_frame"].document.body.innerHTML += "<h3 style='text-align:center'>DATA DU/DI</h3>";
         window.frames["print_frame"].document.body.innerHTML += document.getElementById("printableTable").innerHTML;
         window.frames["print_frame"].window.focus();
         window.frames["print_frame"].window.print();
    },
    export_xls() {
          var tab_text="<table border='2px'><tr bgcolor='#87AFC6'>";
          var textRange; var j=0;
          var tab = document.getElementById('tbl_dudi'); // id of table
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
        this.add = !this.add;
        setTimeout(() => {
          this.editedDudi = Object.assign({}, this.defaultDudi)
          this.editedIndex = -1
          this.selGuru = Object.assign({_id: 'Default', nama: 'Pilih Guru'})
          
          this.getDudis();
          this.getGurus();
        }, 300)
    },
    save () {
      var self = this;
      var data = self.editedDudi;
      var dudi = {
        kode_dudi : data.kode_dudi,
        nama_dudi: data.nama_dudi,
        alamat: data.alamat,
        kota: data.kota,
        telp: data.telp,
        pemilik: data.pemilik,
        email: data.email,
        kuota: data.kuota
      }
      if (self.$refs.form.validate()) {
        axios.post(self.server+'/api/dudi', dudi, {headers:{'Authorization': 'bearer '+self.token}})
             .then((res)=>{
              if(res.data.success == true) 
                self.close();
                self.getDudis();
             });
      }

    },
    update(){
      var self = this;
      var data = self.editedDudi;
      // var dudi = {
      //   _id : data._id,
      //   namaDudi: data.namaDudi,
      //   alamat: data.alamat,
      //   kota: data.kota,
      //   telp: data.telp,
      //   pemilik: data.pemilik,
      //   _guru: data._guru._id
      // }
      axios.put(self.server+'/api/dudi', data, {headers:{'Authorization': 'bearer '+self.token}})
           .then((res)=>{
              if(res.data.success == true) 
                self.close();
                self.getDudis();
            });
    },
    lastDudi(){
      var self = this;
      var id = self.editedDudi.kode_dudi;
      var kode = id.substring(0,2);
      const pattern = /D+(M|J|O|S)+[0-9]/g
            // return pattern.test(value) || 'Diawali DM | DT | DO'
      if (!pattern.test(id)){
        self.snackbar = {
              text: 'Kode DU/Di diawali dengan huruf DM | DJ |DS | DO',
              model: true,
              color: 'error'
            }
        return false;
      } else {
      
        axios.get(self.server+'/api/getlastdudi?kode='+kode, {headers: {'Authorization': 'bearer '+self.token}})
          .then((res) => {
            var lastdudi = res.data.data.kode_dudi;
            var nmr = lastdudi.substr(2,4);
            console.log(nmr)
            var Num = (Number(nmr)+1);
            var str = Num.toString();
            var newkode = str.length == 1 ? kode+'000'+str: str.length == 2 ? kode+'00'+str: str.length == 3 ? kode+'0'+str:kode+str;
            self.snackbar = {
              text: 'Kode Du/Di yang tersedia untuk progli tersebut saat ini: '+ newkode +'. Gunakan saran kami?' ,
              model: true,
              color: 'info',
              timeout: 5000
            }
            self.editedDudi.kode_dudi = newkode;
            
          });
      }
    },
    // getGurus(){
    //   var self = this;
    //   axios.get(self.server+'/api/getgurus', {headers: {'Authorization': 'bearer '+self.token}})
    //        .then((res) => {
    //           self.gurus = res.data;

    //        });
    // },
    pickFile(){
      this.$refs.dudiFile.click();
    },
    onFilePicked(e){
      var self = this;
      var files = e.target.files,
          fileUri = '',
          filename = files[0].name;
      self.filename = filename;
      const filereader = new FileReader();
      filereader.addEventListener('load', () => {
        self.fileUrl = filereader.result;
      });
      filereader.readAsDataURL(files[0]);
      self.file = files[0];
    }, 
    import_dudi(){
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
        var newDudis = XLSX.utils.sheet_to_json(ws);
        self.importBar = true;
        axios.post(self.server+'/api/importdudis', newDudis, {headers: {'Authorization': 'bearer '+self.token}}).then((res)=>{
          if ( res.data.success === true ) {
            self.importBar = false;
            self.getDudis();
            self.fileUrl = '';
          } else {
            self.importBarColor = 'red';
            self.importText = res.data.msg;
          }
          
        })
        // self
      };
      req.send();
    }

  },
  computed: {
    dudist() {
      var isActive = this.dudiaktif;
      return this.dudis.filter((i) => {
        if (isActive == false) {
          return i;
        } else {
          return i._guru !== undefined;
        }
      })
    },
    formTitle () {
        return this.editedIndex == -1 ? 'Tambah Dudi' : 'Edit Dudi'
      }
  }
}
</script>


<style id="dataStyle">
#printableTable h4{
  display: none;
}
/*.datatable{
  border: 1px solid #666;
}
.datatable th, td{
  border: 1px solid #666;
}*/
@media print{
  *{
    display: none;
  }
  /* .cetak_tabel{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10000;
  } */
  /* .s */
  .datatable{
    border: 1px solid #666;
  }
  .datatable th, td{
    border: 1px solid #666;
  }
  #printableTable > table{
    display: block;
  }
}
</style>