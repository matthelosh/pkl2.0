<template lang="pug">
    //- div.landing-page.body
        //- v-layout(row)
        //-     v-btn.top-front(fab small flat title="Masuk" color="teal accent-2" top right absolute @click.native.stop="openLoginForm" v-if="loggedIn == false" div#body
    div#body
        header#showcase.grid
            v-btn.top-front(fab small flat title="Masuk" color="white" right absolute @click.native.stop="openLoginForm" v-if="loggedIn == false" )
                v-icon mdi-login
            .bg-image
            .content-wrap
                h1 Selamat Datang
                p Prakerlap merupakan salah satu program kerja sama antara pihak SMKN 10 Malang dengan Dunia Industri guna memperkaya kompetensi peserta didik dengan pendidikan sistem ganda. Peserta didik yang lulus program Prakerlap, diharapkan mampu menjadi pribadi yang profesional di dunia kerja.
                v-btn(color="teal" dark) Show More
                v-btn(color="orange" dark @click.native.stop="openLoginForm" )
                    v-icon mdi-login
                    | Login
        main#main
            section#section-a.grid
                .content-wrap
            section#section-b.grid
            section#section-c.grid
            section#section-d.grid
        footer#main-footer.grid


        <!-- Dialogs -->
        <v-dialog v-model="dialog" max-width="500">
            <v-card>
                <v-card-title class="headline">
                    <v-icon>mdi-lock</v-icon>
                    | Masuk Sistem
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" small fab depressed dark @click.native="close" flat>
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text>
                    <v-alert color="error" icon="fa-warning" :value="alert">
                    | {{alertMsg}}
                    </v-alert>
                    <v-form v-model="valid" ref="form" lazy-validation>
                        <v-select label="Periode" v-model="selPeriode" :items="periodes" :rules="[v => !!v || 'Item is required']" required append-icon="mdi-arrow-down-drop-circle-outline" v-bind:value="login.periode" on:input="onSelectPeriod" item-value="kode" item-text="periode"></v-select>
                        <v-text-field label="Masukkan Username" v-model="login.uname" :rules="nameRules" append-icon="mdi-account-circle" :counter="10" required></v-text-field>
                        <v-text-field name="password" label="Masukkan Kata Kunci" hint="Klik tanda mata untuk melihat kata kunci" min="8" :append-icon="e2 ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"      :append-icon-cb="() => (e2 = !e2)"  :type="e2 ? 'password' : 'text'" v-model="login.password" required></v-text-field>
                        //- <v-select label="Peran User" v-model="login._role" :items="roleItems" :rules="[v => !!v || 'Item is required']" required append-icon="mdi-arrow-down-drop-circle-outline"></v-select>
                        <v-layout row>
                            <v-flex class="text-xs-center">
                                <v-btn @click="submit(login)" depressed dark color="teal"><v-icon>mdi-login-variant</v-icon> masuk</v-btn>
                                <v-btn @click="clear" depressed dark color="orange"><v-icon>mdi-lock-reset</v-icon> reset</v-btn>
                            </v-flex>
                        </v-layout>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                //- <v-spacer></v-spacer>
                //-     <v-btn color="red darken-1" small fab depressed dark @click.native="close" flat>
                //-         <v-icon>mdi-close</v-icon>
                //-     </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog danger dark v-model="errDlg" max-width="50%">
            //- <v-container>
            <v-card color="red" dark>
                <v-card-title class="xs-text-center">

                    <h1 > {{errTitle}}</h1>
                    <v-spacer></v-spacer>
                    <v-icon>mdi mdi-lan-disconnect</v-icon>
                </v-card-title>
                <v-card-text>
                    <p> {{errMsg }} </p>
                </v-card-text>
            </v-card>
            //- </v-container>
        </v-dialog>
            
</template>
<script>
import axios from 'axios'
import Lobby from '@pages/comps/Lobby'
import Info from '@pages/comps/Info'
import ShowDudi from '@pages/comps/ShowDudi'
import ShowSiswa from '@pages/comps/ShowPraktikan'
export default {
    components: {Lobby, Info, ShowDudi, ShowSiswa},
    data () {
        return {
            show: {visible: false, mode: ''},
            infos:[],
            carouselItems: [
                {"title" : "Selamat Datang", "subtitle": "Di  Website Resmi Prakerlap SMKN 10 Malang", "desc" :"Sistem Informasi Prakerlap di https://prakerlap.smkn10-mlg.sch.id/#/", "btnText1": "Lihat Dudi", "btnText2": "Lihat Praktikan", "img": "/public/img/smkbisa.jpg"},
                {"title" : "SMKN 10 Malang", "subtitle": "Sekolah berbasis IT dan ramah lingkungan", "desc" :"Memadukan teknologi terkini dengan alam lingkungan.", "img": "/public/img/10.png"},
            ],
            parabg: {
                satu: '/public/landing-bg/triangle-bg.png',
                dua: '/public/landing-bg/so.png'
            },
            infopkl: false,
            errDlg: false,
            errTitle: '',
            errMsg: '',
            dialog: false,
            valid: true,
            name: '',
            nameRules: [
                (v) => !!v || 'Name is required',
                (v) => v && v.length <= 10 || 'Name must be less than 10 characters'],
            periodes: [],
            selPeriode: '',
            e2: true,
            password: 'Password',
            login: {},
            alert: false,
            alertMsg: '',
            loggedIn: this.$store.state.isLoggedIn,
            sekolah: 'SMKN 10 Malang',
            footlinks:[
                {text: 'Home', link: '/'},
                {text: 'About', link:'/tentang'},
                {text: 'Contact', link: '/kontak'}
            ],
            versi: this.$store.state.versi,
            server: this.$store.state.server,
            periode: sessionStorage.getItem('periode'),
            info: {},
            progress: 0,
            barColor: "red"
        }
    },
    created () {
        this.getPeriode()
        this.cekAuth()
        // this.getInfo()
        this.seldPeriode()
    },
    methods: {
        viewAllInfos () {
            alert('Lihat Semua Info')
        },
        lihat(mode) {
            var self= this
            self.show = {visible:true, mode: mode}
        },
        showInfo(id) {
            var self = this
            self.infoId = id
            self.infopkl = true
            self.infos.filter((item) => {
                if (item._id == id) {
                    self.info = item
                }
            })
        },
        getInfo(){
            var self = this;
            if (self.$store.state.info.length < 1 ) {
                axios.get(self.server+'/umum/getinfos',{
                    onDownloadProgress: function (progressEvent) {
                            let currentProgress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                            self.progress = currentProgress;
                            self.barColor = (currentProgress > 25) ? "orange" : (currentProgress > 50) ? "blue" : (currentProgress > 75) ? "green" : "green"
                        }
                })
                .then(res=>{
                    // console.log(res.data);
                    this.$store.dispatch('loadInfo', res.data)
                    this.infos = res.data;
                    self.barColor = "green"
                })
            }
            self.infos = self.$store.state.info
            self.progress = 100
        },
        openLoginForm(){
            this.dialog = true,
            this.seldPeriode();
        },
        getPeriode(){
            var self = this;
            // console.log(appConfig.apiServer)
            axios.get(self.server+'/umum/periode')
                 .then((res) => {
                    // console.log(res);
                    self.periodes = res.data.data;
                    var items = res.data
                    var now = new Date();
                    // console.log('halo bos');Date(Date.parse(dateString1));
                    for ( var i = 0; i < items.length; i++){
                        var mulai = new Date(Date.parse(items[i].mulai).valueOf());
                        var selesai = new Date(Date.parse(items[i].selesai).valueOf());
                        // console.log(selesai);
                        var r = mulai < now && now < selesai;
                        // console.log(r);
                        if ( mulai.setHours(0,0,0,0) < now && now < selesai.setHours(0,0,0,0)) {
                            self.selPeriode = items[i].kode;
                            // console.log(items[0]._id);
                            // console.log('true');
                        } else {
                            console.log(mulai +' - '+selesai);
                        }
                    }
                 })
                 .catch(err => {
                     if (err = 'Error: Network Error') {
                        self.errTitle = '!!! Tidak tersambung dengan server API.';
                        self.errMsg = 'Hubungi Admin segera!';
                        self.errDlg = true
                     }
                 })
        },
        seldPeriode(){
            var self = this;
            var items = this.periodes;
            var now = new Date();
            // console.log('halo bos');Date(Date.parse(dateString1));
            for ( var i = 0; i < items.length; i++){
                var mulai = new Date(Date.parse(items[i].mulai).valueOf());
                var selesai = new Date(Date.parse(items[i].selesai).valueOf());
                // console.log(selesai);
                var r = mulai < now && now < selesai;
                // console.log(r);
                if ( mulai.setHours(0,0,0,0) < now && now < selesai.setHours(0,0,0,0)) {
                    self.selPeriode = items[i].kode;
                    // console.log(items[0]._id);
                    // console.log('true');
                } else {
                    console.log(mulai +' - '+selesai);
                }
            }
            // console.log('seldPeriode');
        },
      submit (dataLogin) {
        if (this.$refs.form.validate()) {
            console.log(dataLogin)
            var self = this;
            // axios.post(self.server+'/user/authenticate', dataLogin) APke API Express
            axios.post(self.server+'/login', dataLogin) // API Lumen
                .then(response => {
                    console.log(response.data)
                    var res = response.data
                    if (res.success === false) {
                        this.alert = true
                        this.alertMsg = res.message
                    } else if(res.success === true ) {
                        this.alert = false
                        sessionStorage.setItem('token', res.data.api_token)
                        // sessionStorage.setItem('token', res.token)
                        sessionStorage.setItem('periode', this.selPeriode)
                        sessionStorage.setItem('role', res.data.user._role)
                        sessionStorage.setItem('user', dataLogin.uname)
                        // sessionStorage.setItem('_id', dataLogin._id)
                        this.$store.dispatch('setUser', dataLogin.uname)
                        this.$router.push('/dashboard')
                        // console.log(res);
                        
                    }
                })
                .catch(error=> {
                    if ( !error.response ) {
                        this.alert = true
                        this.alertMsg = 'Maaf. Sedang tidak terhubung ke Server.'
                        // console.log(error);
                    } else {

                    }
                })
            
        }
      },
      close(){
        this.dialog = false;
        this.clear();
      },
      clear () {
        this.$refs.form.reset()
      },
        cekAuth () {
            var auth = this.$store.state.isLoggedIn
        },
        // setPeriod(){
        //     var self = this;
        //     self.login.periode = self.periodItems[1];
        // },
        onSelectPeriod(){
            this.login.periode = 'klk';
        }   
    },
   
    computed: {

      nameErrors () {
        const errors = []
        if (!this.$v.name.$dirty) return errors
        !this.$v.name.maxLength && errors.push('Name must be at most 10 characters long')
        !this.$v.name.required && errors.push('Name is required.')
        return errors
      },
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Must be valid e-mail')
        !this.$v.email.required && errors.push('E-mail is required')
        return errors
      },
      isAuth () {
          return this.$store.state.isLoggedIn
      },
      rinfos () {
          var self = this
          var ar = this.$store.state.info
          var ln = ar.length
          var mx = 4
          var sel = ln - mx
          let newInfo = []
          if (ln > mx) {
              newInfo =  ar.slice(sel,mx+1).reverse()
          } else {
              newInfo =  ar.reverse()
          }

          newInfo.filter(function(item) {
            if (item.img == null) {
                item.img = '/public/img/kopi.jpg'
            }
          })
          return newInfo
      }
    }
}
</script>
<style lang="css" scoped>
    #body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  background: #2a6343;
  color: #fff;
  font-size: 1.1em;
  line-height: 1.5;
  text-align: center;
  z-index: 0 ;
}
img {
  display: block;
  width: 100%;
  height: auto;
}
h1, h2, h3 {
  margin: 0;
  padding: 1em 0;
}

p {
  margin: 0;
  padding: 1em 0;
}

.btn {
  display: inline-block;
  background: #2a6343;
  color: #fff;
  text-decoration: none;
  /*padding: 1em 2em;*/
  border: 1px solid #aaa;
}
.btn:hover {
  background: #eaeaea;
  color: #2a6343;
}


/* Header Showcase */
#showcase {
  min-height: 450px;
  color: #fff;
  text-align: center;
  /* border-bottom: 1px solid #efefef; */
  /*z-index: 1;*/
}

#showcase .bg-image {
   position: absolute;
   background: url('/public/img/vokasi.jpg');
   background-position: center;
   background-repeat: no-repeat;
   background-size: cover;
   width: 100%;
   height: 450px;
   z-index: -1;
   opacity: 0.5;
   top: 0;
   filter:blur(2px);
 }
 #showcase h1 {
   padding-top: 100px;
   padding-bottom: 0;
 }
 #showcase .content-wrap,
 #section-a .content-wrap {
   padding: 0 .5em;
   /*z-index: 10;*/
   /*color: #fff;*/
 }

@media (min-width: 700px) {
  .grid {
    display: grid;
    grid-template-columns: 1fr repeat(2, minmax(auto, 25em)) 1fr;
  }
  .content-wrap {
    grid-column: 2/4;
  }
} 
</style>
