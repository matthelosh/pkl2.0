<template lang="pug">
  div
    v-toolbar(dark)
      v-toolbar-items
        v-btn(to="/" flat dark)
          v-icon mdi-arrow-left
      v-toolbar-title
        h2 Info <span class="hidden-xs-only">Prakerlap SMKN 10 Malang</span>
    v-layout(row)
        v-flex(xs12)
          v-progress-linear(height="3" slot="progress" :color="barColor" :value="progress" determinate style="margin:0") 
    v-slide-x-transition
      v-content(v-show = "all")
        v-layout
          //- v-progress-(height="3" slot="progress" :color="barColor" :value="progress" determinate style="margin:0" v-if="progress !== 100") 
        v-container(grid-list-md)
          v-layout(row wrap)
            v-flex.text-xs-center(xs12 md6 offset-md3 v-if="progress !== 100" style="padding-top: 15%")
              v-progress-circular(:width="10" :size="200" slot="progress" :color="barColor" :value="progress" determinate style="margin:0")
                | Memuat {{progress}} %
            v-flex(v-for="info in infos" xs12 md3 :key="info._id")
              v-card(tile :img="info_bg" @click.native="baca(info)" hover height="500px")
                v-card-media(:src="info.img" height="200px" style="background: #efefef;content: No Gambar")
                v-card-title 
                  h3 {{info.title}}
                v-card-text

                  h2.headline.mb-0 Ditulis oleh: {{info.created_by}} 
                  h4 Pada : <em>{{info.created_at}}</em>
                  hr

                  p(v-html="info.content.slice(0,175)") [...]
    v-slide-x-transition
      v-content(v-show="read" )
        v-layout(row fill-height style="background: url('/public/img/info/info_bg.png'); min-height: 100vh; background-attachment: fixed")
          v-flex(xs12 md8 offset-md2)
            v-card.elevation-3
              span(v-if="info.img")
                v-card-media(:src="info.img" height="300")
                  v-container
                    v-layout(fill-height)
                        v-flex(xs12 align-end flexbox)
                          // span(class="headline white--text") {{info.title}}
                    v-btn(color="red lighten-1" small dark fab absolute right top @click="close")
                      v-icon mdi-close
              v-card-text
                h1(style="font-face: roman") {{info.title}}
              v-card-text
                p(v-html="info.content")
    

</template>

<script>
import axios from 'axios'
export default {

  name: 'Info',
  mode: 'Default',
  // components: {Info},
  props: ['infodialog'],
  data () {
    return {
      routeParams: this.$route.params,
      all: true,
      read: false,
      infos: this.$store.state.info,
      info_bg: '/public/img/info/info_bg.png',
      server: this.$store.state.server,
      info: {},
      progress: 100,
      barColor: "red"
    }
  },
  created (){
    // this.getInfo();
  },
  methods: {
    getInfo(){
      // var id = this.routeParams.id;
      var self = this
      axios.get(self.server+'/umum/getinfos',{
        onDownloadProgress: function (progressEvent) {
                        let currentProgress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        self.progress = currentProgress;
                        self.barColor = (currentProgress > 25) ? "orange" : (currentProgress > 50) ? "blue" : (currentProgress > 75) ? "green" : "green"
                    }
      })
      .then(res=>{
        // console.log(res.data);
        this.infos = res.data;
        self.barColor = "green"
      });
    },
    baca (i) {
      // console.log(i)
      var self = this
      self.info = Object.assign({}, i)
      self.read = true
      self.all = false
    },
    close () {
      var self = this
      self.info = Object.assign({}, null)
      self.read = false
      self.all = true
    }
  }
}
</script>

<style lang="css" scoped>
  #app > div > div > main:nth-child(3) > div > div > div > div > span > div > div.card__media__content > div > button {
    margin-top: 50px;
    margin-right: 25px;
  }
</style>