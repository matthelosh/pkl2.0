<template lang="pug">
  div
    v-toolbar(dark style="color:#ffd700")
      v-toolbar-items
        v-btn(to="/" flat dark color="orange accent-4")
          v-icon mdi-arrow-left

      v-toolbar-title {{ info.title }}
    v-content
      v-container
        v-layout(row wrap align-center)
          v-flex(xs12 md10 offset-md1)
            v-card(tile :img="info_bg")
              v-card-media(:src="info.img" height="200px" contain)
              v-card-text
                h2.headline.mb-0 Ditulis oleh: {{info.created_by}} 
                h4 Pada : <em>{{info.created_at}}</em>
                hr

                p {{info.content}}
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
      info: {},
      info_bg: '/public/img/info/info_bg.jpg',
      server: this.$store.state.server
    }
  },
  created (){
    this.getInfo();
  },
  methods: {
    getInfo(){
      var id = this.routeParams.id;
      var self = this
      axios.get(self.server+'/umum/getinfo/'+id)
      .then(res=>{
        // console.log(res.data);
        this.info = res.data;
      });
    }
  }
}
</script>

<style lang="css" scoped>
</style>