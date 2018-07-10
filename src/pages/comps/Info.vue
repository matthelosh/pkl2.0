<template lang="pug">
  div
    v-toolbar(dark)
      v-toolbar-items
        v-btn(to="/" flat dark)
          v-icon mdi-arrow-left
      v-toolbar-title
        h2 Info <span class="hidden-xs-only">Prakerlap SMKN 10 Malang</span>
    v-slide-x-transition
      v-content(v-show = "all")
        v-layout
        v-container(grid-list-md)
          v-layout(row wrap)
            v-flex(v-for="info in infos" xs12 md3 :key="info._id")
              // v-card(tile :img="info_bg" :to="'baca/'+info._id")
              v-card(tile :img="info_bg" @click.native="baca(info)" hover height="450px")
                v-card-media(:src="info.img" height="200px")
                v-card-title 
                  h3 {{info.title}}
                v-card-text
                  h2.headline.mb-0 Ditulis oleh: {{info.created_by}} 
                  h4 Pada : <em>{{info.created_at}}</em>
                  hr

                  p(v-html="info.content.slice(0,175)") [...]
    v-slide-x-transition
      v-content(v-show="read" )
        v-layout(row fill-height style="background: url('/public/img/info/info_bg.png'); min-height: 100vh")
          v-flex(xs12 md8 offset-md2)
            v-card.elevation-3
              v-card-media(:src="info.img" height="300")
                v-container
                  //   v-layout(fill-height)
                  //     v-flex(xs12 align-end flexbox)
                  //       span(class="headline white--text") {{info.title}}
                  v-btn(color="red lighten-1" dark fab absolute right top @click="close")
                    v-icon mdi-close
              v-card-text
                h1(style="font-face: roman") {{info.title}}
              v-card-text(v-html="info.content")
                
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
      infos: [],
      info_bg: '/public/img/info/info_bg.png',
      server: this.$store.state.server,
      info: {}
    }
  },
  created (){
    this.getInfo();
  },
  methods: {
    getInfo(){
      // var id = this.routeParams.id;
      var self = this
      axios.get(self.server+'/umum/getinfos')
      .then(res=>{
        // console.log(res.data);
        this.infos = res.data;
      });
    },
    baca (i) {
      console.log(i)
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
  #app > div > div > main:nth-child(3) > div > div > div > div > div.card__media > div.card__media__content > div > button {
    margin-top: 50px;
  }
</style>