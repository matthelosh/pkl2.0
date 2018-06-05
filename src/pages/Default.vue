<template lang="pug">
    div.landing-page
        .page#default
            <v-parallax :src="parabg.satu" width="100%" height="500" top>
                <v-layout row>
                    <v-container>
                        <v-flex xs12>
                        <v-card flat color="transparent">
                            <v-card-title>
                                <div class="text-xs-center">
                                    <img src="/public/favicon-32x32.svg" type="image/svg" alt="" width="96px" height="96px" style="float:left;z-index:2;">
                                    <h3 class="headline white--text">Sistem Informasi Prakerlap <br> SMKN 10 Malang</h3>
                                </div>
                            </v-card-title>
                            <v-card-text>
                                <blockquote cite="Narrated Hz Abu Hurairah (RA) that Prophet Muhammad (PBUH) said: [1]">{{quote.title}}</blockquote>
                                <p> {{quote.text}}
                                </p>
                            </v-card-text>
                        </v-card>
                        </v-flex>
                    </v-container>
                </v-layout>
                <v-layout row>
                    v-btn.top-front(fab small flat title="Masuk" color="teal accent-2" top right fixed @click.native.stop="openLoginForm" v-if="loggedIn == false")
                        v-icon(dark color="white" ripple) mdi-login-variant
                    v-btn(fab small  flat title="Dashboard" color="blue accent-2" top right fixed @click.native.stop="$router.push('/dashboard')" v-show="isAuth" class="dashBtn")
                        v-icon(color="white") mdi-view-dashboard
                </v-layout>
                
                
            </v-parallax>
          
        .page#so
            //- <v-parallax :src="parabg.dua">
            <v-layout row>
                <v-container>
                    <v-flex xs12 md10 offset-md1 class="text-align-center">
                        <h1 style="text-align:center">Info Prakerlap {{sekolah}}</h1>
                        <v-btn @click="infopkl = true" class="rl" flat><v-icon color="white">mdi-subdirectory-arrow-right</v-icon> Lihat Semua</v-btn>
                    </v-flex>
                    <v-flex xs12 md10 offset-md1>
                        <lobby></lobby>
                    </v-flex>
                </v-container>
            </v-layout>
            //- </v-parallax>
            <v-layout>
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
        
        <v-dialog v-model="infopkl" fullscreen origin="center right" lazy transition="dialog-bottom-transition">
            <v-card flat>
                <v-card-title>
                    <h3>Informasi Prakerlap {{periode}}</h3>
                    <v-spacer></v-spacer>
                    <v-btn flat @click="infopkl = false" fab color="red" small title="tutup">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text>
                    <lobby></lobby>
                    <img src="/public/landing-bg/smk.jpg" />
                </v-card-text>
            </v-card>
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
export default {
    components: {Lobby, Info},
    data () {
        return {
            quote: {
                title: '\"Selamat Menyambut Bulan Suci Ramadhan 1439H!',
                text: 'Semoga kita diberikan kekuatan, kesabaran dan keihklasan dalam melakukan ibadah dalam bulan yang penuh berkah (Panitia Prakerlap).'
            },
            parabg: {
                satu: '/public/landing-bg/sawah.jpg',
                dua: '/public/landing-bg/1ramadan.svg'
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
            periode: sessionStorage.getItem('periode')
        }
    },
    created () {
        this.getPeriode()
        this.cekAuth()
        // this.setPeriod();
    },
    methods: {
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
                if ( mulai < now && now < selesai) {
                    self.selPeriode = items[i]._id;
                    // console.log(items[0]._id);
                    // console.log('true');
                } else {
                    // console.log('salah');
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
      }
    }
}
</script>
<style lang="sass" scoped>
    .landing-page
        color: #fefefe
        margin: 0!important
        position: relative
        height: auto
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
    #so
        background:
            color: #99adda
        .rl
            color: white
            text-decoration: none
        #so-content
            //padding: 20px
            width: 100%
            height: 150vh
                
</style>
