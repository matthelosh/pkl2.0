<template>
  <div>
          <v-navigation-drawer
      fixed
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      app
    >
      <v-list>
        <v-list-tile 
          value="true"
          v-for="(item, i) in menus"
          :key="i"
          :to="item.linkTo"
          v-if="item.role == role"
          :title="item.title"
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed app :clipped-left="clipped">
      <v-btn @click.stop="drawer = !drawer" icon flat><v-icon>fa-bars</v-icon></v-btn>
      <v-btn icon @click.stop="miniVariant = !miniVariant" class="hidden-xs-only">
        <v-icon v-html="miniVariant ? 'fa-chevron-right' : 'fa-chevron-left'"></v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped" class="hidden-xs-only">
        <v-icon>fa-globe</v-icon>
      </v-btn>
      <!-- <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>remove</v-icon>
      </v-btn> -->
      <v-toolbar-title>
        <v-avatar tile>
          <img src="/public/favicon-32x32.svg" alt="" height="24px">
        </v-avatar>  
        <span class="hidden-xs-only">{{title}}</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <strong v-html="username"/>
      <v-btn icon>
        <v-avatar size="32px">
          <img :src="userFoto" alt="Profil" onerror="if (this.src != '/public/user-profiles/default-avatar.png') this.src = '/public/user-profiles/default-avatar.png';">
        </v-avatar>
      </v-btn> 
      <v-btn icon @click.stop="logout" color="red" flat title="Keluar">
        <v-icon>fa-sign-out</v-icon>
      </v-btn>
      <!-- <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>fa-bars</v-icon>
      </v-btn> -->
      <v-progress-linear height="3" slot="progress" :color="barColor" :value="progress" determinate style="position:absolute; bottom:0;"></v-progress-linear>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <v-layout column>
          <transition name="dashContent" mode="out-in">
            <router-view></router-view>
          </transition>
        </v-layout>
      </v-container>
    </v-content>
    
  </div>
</template>

<script>
  import tokenService from './../lib/authServices.js'
  import axios from 'axios'
  export default {
    data () {
      return {
        clipped: true,
        drawer: true,
        fixed: true,
        menus: [],
        miniVariant: true,
        
        right: false,
        rightDrawer: false,
        title: 'Prakerlap SMKN 10 Malang',
        role: sessionStorage.getItem('role'),
        server: this.$store.state.server,
        progress: 0,
        barColor: 'red',
        userFoto: ''
      }
    },
    beforeCreate() {
      // var token = sessionStorage.getItem('token')
      // var isAuth = this.$store.state.isLoggedIn;
      // if ( !isAuth ) {
      //   alert('Anda tidak berhak masuk. Silahkan login dulu!')
      //   this.$router.push('/')
      // }
    },
    mounted () {
      if(this.$router.path == '/'){
        return false;
      } else {
        var self = this;
        setInterval(function(){
            self.cekToken();
          }, 5000);
      }
    },
    created(){
      var self = this
      var isAuth = sessionStorage.getItem('token');
      if ( !isAuth ) {
        alert('Anda tidak berhak masuk. Silahkan login dulu!')
        this.$router.push('/')
      }
      this.menuitems();
      setTimeout(function () {
        self.getuserFoto ()
      }, 500)
    },
    methods: {
      logout() {
        var out = confirm('Anda yakin mau keluar?')
        if(!out) {
          return false
        } else {
          
          this.$store.dispatch('Unsetuser');
          this.$router.push('/');
        }
      },
      cekToken(){
        // console.log(this.$router.history.current.path);
        var self = this;
        var token = sessionStorage.getItem("token");
        if(token == null){
          if(this.$router.history.current.path == '/') {
            return false;
          } else {
            this.$router.push('/');
            sessionStorage.removeItem("isLoggedIn");
          }
        } else {
          self.parseJwt = function(token){
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace('-', '+').replace('_', '/');
            return JSON.parse(window.atob(base64));
          }
          var expTime = self.parseJwt(token);
          var timeStamp = Math.floor(Date.now()/1000);

          var timeCheck = expTime.exp - timeStamp;
          console.log(timeCheck);
          if(timeCheck <= 0) {
            alert('Maaf! Token Anda habis. Silahkan Login kembali');
            sessionStorage.removeItem("isLoggedIn");
            sessionStorage.removeItem("token");
            this.$router.push('/');
            this.$store.dispatch('Unsetuser')

          }
        }
      },
      menuitems() {
        var self = this;
        var role = sessionStorage.getItem('role');
        var token = sessionStorage.getItem("token");
        axios.get(self.server+'/api/menu/'+role, {headers: {'Authorization' : 'bearer '+token},
          onDownloadProgress: function (progressEvent) {
                        let currentProgress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        self.progress = currentProgress;
                        self.barColor = (currentProgress > 25) ? "orange" : (currentProgress > 50) ? "yellow" : (currentProgress > 75) ? "green" : "red"
                    }
        })
              .then(function(res){
                self.menus = res.data.data;
              });
      },
      getuserFoto() {
        var self = this
        var file = sessionStorage.getItem('user'),
        foto = '/public/user-profiles/'+file+'.jpg'
        self.userFoto = '/public/user-profiles/'+file+'.jpg'
        // console.log(foto)

      },
    },
    computed: {
      // userFoto() {
      //   var file = sessionStorage.getItem('_id'),
      //       foto = '/public/user-profiles/'+file+'.jpg'
      //   return foto

      // },
      username(){
        return this.$store.state.user.name;
      },
      
    }
  }
</script>

<style>
  /*.layout {
    display: inline-block;
    width: 100%;
  }*/
  .dashContent-enter-active, .dashContent-leave-active {
    transition: opacity .5s, transform .5s;
  }
  .dashContent-enter, .dashContent-leave-to {
    opacity: 0;
    transform: translateY(-50%);
  }
</style>
