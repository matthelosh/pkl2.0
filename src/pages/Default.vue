<template lang="pug">
    div.landing-page
        
        .page#default
            <v-parallax :src="parabg.satu" width="100%" height="500" top >
                <v-carousel style="height: 100%; box-shadow: none!important" reverse-trasition="fade" transition="fade" hide-delimiters>
                    <v-carousel-item v-for="(slide, index) in carouselItems" :key="index" depressed>
                        <v-jumbotron dark >
                            <v-container fill-height>
                                <v-layout align-center fluid>
                                    <v-flex>
                                    <h3 class="display-3">{{slide.title}}</h3>
                                    <span class="subheading">{{slide.subtitle}}</span>
                                    <p>{{slide.desc}}</p>
                                    <v-btn v-if="slide.btnText1" color="primary" @click.native="lihat('dudi')">{{slide.btnText1}}</v-btn>
                                    <v-btn v-if="slide.btnText2" color="secondary"  @click.native="lihat('praktikan')">{{slide.btnText2}}</v-btn>
                                    </v-flex>
                                    <v-flex v-if="slide.img" hidden-xs-only>
                                        <img :src="slide.img" alt="Ilustrasi" width="300">
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-jumbotron>
                    </v-carousel-item>
                </v-carousel>
                
            </v-parallax>
            <v-layout row>
                v-btn.top-front(fab small flat title="Masuk" color="teal accent-2" top right absolute @click.native.stop="openLoginForm" v-if="loggedIn == false" style="z-index:0")
                    v-icon(dark color="white" ripple) mdi-login-variant
                v-btn(fab small  flat title="Dashboard" color="blue accent-2" top right absolute @click.native.stop="$router.push('/dashboard')" v-show="isAuth" class="dashBtn" style="z-index:0")
                    v-icon(color="white") mdi-view-dashboard
            </v-layout>
        .page#so(style="height: 500px!important")
            <v-parallax :src="parabg.dua" width="100" height="auto">
                <v-layout row>
                    <v-container grid-list-md>
                        <br />
                        <h3>Informasi Pakerlap SMKN 10 Malang</h3>
                        
                        <v-container grid-list-md>
                            <v-layout row wrap>
                                <v-flex v-for="info in rinfos" :key="info._id" md3>
                                    <v-card dark img="/public/img/card-bg.png" @click.native="showInfo(info._id)" style="cursor:pointer" height="350" hover>
                                        <v-card-media :src="info.img" height="180px">
                                            <v-container fill-height fluid>
                                                <v-layout fill-height>
                                                <v-flex xs12 align-end flexbox>
                                                    <span class="headline" style="text-shadow: 0 0 5px rgba(0,0,0,1)">{{info.title}}</span>
                                                </v-flex>
                                                </v-layout>
                                            </v-container>
                                        </v-card-media> 
                                        <v-card-text>
                                            <small><i>{{info.created_at}}</i></small>
                                            <p v-html="info.content.substr(0, 200)">[...]</p>
                                        </v-card-text>
                                    </v-card>
                                </v-flex>
                            </v-layout>
                        </v-container>
                        <v-layout row>
                            <v-flex xs12 center-align class="text-xs-center">
                                <v-btn light color="grey lighten-3" to="/info">Lihat Semua Info</v-btn>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-layout>
                // <v-layout row>
                //     <v-flex xs12 center-align class="text-xs-center">
                //         <v-btn light color="grey lighten-3" to="/info">Lihat Semua Info</v-btn>
                //     </v-flex>
                // </v-layout>
            </v-parallax>
            // #footer
            <v-layout color="blue lighten-3">
                <v-flex xs12>
                    <v-footer height="auto" class="grey darken-3">
                        <v-layout row wrap justify-center>
                            <v-btn v-for="link in footlinks" :key="link.text" color="white" flat>
                                | {{ link.text }}
                            </v-btn>
                            <v-flex xs12 py-3 text-xs-center white--text>
                                | &copy;2018 — <strong>Prakerlap SMKN 10 Malang</strong>
                                <br>
                                p Versi {{versi}}
                            </v-flex>
                        </v-layout>
                    </v-footer>
                </v-flex>
            </v-layout>
        
        <v-dialog v-model="infopkl" fullscreen origin="center right" lazy transition="dialog-bottom-transition" fixed>
            <v-layout>
                <v-flex xs12>
                    <v-toolbar dark color="teal darken-1">
                        <v-toolbar-items>
                            <v-btn depressed dark @click="infopkl = false" color="red" small title="tutup">
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                        </v-toolbar-items>
                        <v-toolbar-title>Info <span class="hidden-xs-only">Prakerlap SMK Negeri 10 Malang</span></v-toolbar-title>
                        <v-spacer></v-spacer>
                        // <v-toolbar-items class="hidden-sm-and-down">
                        //     <v-btn depressed dark @click="infopkl = false" color="red" small title="tutup">
                        //         <v-icon>mdi-close</v-icon>
                        //     </v-btn>
                        // </v-toolbar-items>
                    </v-toolbar>
                    <v-card flat height="100vh" img="/public/img/info/info_bg.png">
                        <v-card-media :src="info.img" height="300"></v-card-media>
                        <v-card-text>
                            <v-layout>
                                <v-flex xs12 md8 offset-md2>
                                    <h1>{{info.title}}</h1>
                                    <p>{{info.content}}</p>
                                </v-flex>
                            </v-layout>
                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-dialog>
        <v-dialog v-model="show.visible" fullscreen origin="center right" lazy transition="dialog-bottom-transition">
            <v-layout>
                <v-flex xs12>
                    <v-toolbar dark color="primary darken-1" fixed >
                        <v-toolbar-items>
                            <v-btn depressed dark @click="show.visible = false" color="red" small title="tutup">
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                        </v-toolbar-items>
                        <v-toolbar-title>DATA {{show.mode}}</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-toolbar-items class="hidden-sm-and-down">
                            // <v-btn depressed dark @click="show.visible = false" color="red" small title="tutup">
                            //     <v-icon>mdi-close</v-icon>
                            // </v-btn>
                        </v-toolbar-items>
                    </v-toolbar>
                    <v-card style="min-height:100vh">
                        <v-card-title>
                            <h3><v-icon>mdi mdi-info</v-icon></h3>
                        </v-card-title>
                        <v-card-text>
                            <v-layout>
                                <v-flex xs12 md10 offset-md1>
                                   <div v-if="show.mode == 'dudi'"><show-dudi :periode="selPeriode"></show-dudi></div> 
                                   <div v-if="show.mode == 'praktikan'"><show-siswa :periode="selPeriode"></show-siswa></div> 
                                </v-flex>
                            </v-layout>
                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-dialog>
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
                        <v-select label="Periode" v-model="selPeriode" :items="periodes" :rules="[v => !!v || 'Item is required']" required append-icon="mdi-arrow-down-drop-circle-outline" v-bind:value="login.periode" on:input="onSelectPeriod" item-value="_id" item-text="periode"></v-select>
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
                {text: 'Home'},
                {text: 'About'},
                {text: 'Contact'}
            ],
            versi: this.$store.state.versi,
            server: this.$store.state.server,
            periode: sessionStorage.getItem('periode'),
            info: {}
        }
    },
    created () {
        this.getPeriode()
        this.cekAuth()
        this.getInfo()
        // this.seldPeriode()
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
            axios.get(self.server+'/umum/getinfos')
            .then(res=>{
                // console.log(res.data);
                this.infos = res.data;
            })
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
                    self.periodes = res.data;
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
                            self.selPeriode = items[i]._id;
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
                    self.selPeriode = items[i]._id;
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
            // console.log(dataLogin)
            var self = this;
            axios.post(self.server+'/user/authenticate', dataLogin)
                .then(response => {
                    // console.log(response.data)
                    var res = response.data
                    if (res.success === false) {
                        this.alert = true
                        this.alertMsg = res.message
                    } else if(res.success === true ) {
                        this.alert = false
                        sessionStorage.setItem('token', res.token)
                        // sessionStorage.setItem('token', res.token)
                        sessionStorage.setItem('periode', this.selPeriode)
                        sessionStorage.setItem('role', res.role)
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
          var ar = self.infos
          var ln = ar.length
          var mx = 4
          var sel = ln - mx
          if (ln > mx) {
              return ar.slice(sel,mx+1).reverse()
          } else {
              return ar.reverse()
          }
      }
    }
}
</script>
<style lang="sass" scoped>
    .landing-page
        color: #fefefe
        margin: 0!important
        position: relative
        // height: auto
        width: 100vw
        min-height: 100vh
        overflow-y: scroll
        .page
            box-sizing: border-box
            position: relative
            .btn--top.btn--absolute.btn--small
                top: 10px!important
            .btn--right.btn--absolute.btn--small
                right: 20px
            .dashBtn.btn--right.btn--absolute.btn--small
                right: 60px
            .btn.top-front
                z-index: 9999999
            .parallax__content
                padding: 0!important
                -webkit-padding: none!important
        #default
            blockquote
                text-indent: 50px
                font-size: 1.5em
                color: #fff
                font-family: 'Sans-serif'
            p
                color: #efefef
                line-height: 1.5em
                text-shadow: 0 0 1px rgba(0,0,0,0.5)
            .carousel
                box-shadow: none!important
    #so
        padding-bottom: 50px!important
        background:
            color: #ff9033
        .rl
            color: white
            text-decoration: none
        #so-content
            //padding: 20px
            width: 100%
            height: auto
        
                
</style>
