<template>
	<v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex d-flex xs12 sm6 md4 v-for="info in filteredinfos" :key="info._id" >
        <v-card color="purple" light :img="info.img" hover :to="info.link" @click="info_dialog = true">
        	<v-card-title class="yellow--text"><h1>{{info.title}}</h1></v-card-title>
          	<v-card-text>
          		<p style="color: #fefefe; background: rgba(100,145,200,0.6); padding: 10px;">{{info.content.slice(0, 70)}}</p>
          	</v-card-text>
        </v-card>
      </v-flex>
      <!-- <v-flex d-flex xs12 sm6 md3>
        <v-layout row wrap>
          <v-flex d-flex>
            <v-card color="indigo" dark>
              <v-card-text
                v-text="lorem.slice(0, 70)">
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex d-flex>
            <v-layout row wrap>
              <v-flex d-flex
                v-for="n in 2"
                :key="n"
                xs12
              >
                <v-card
                  color="red lighten-2"
                  dark
                >
                  <v-card-text
                    v-text="lorem.slice(0, 40)">
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex d-flex xs12 sm6 md2 child-flex>
        <v-card color="green lighten-2" dark>
          <v-card-text
            v-text="lorem.slice(0, 90)">
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex d-flex xs12 sm6 md3>
        <v-card color="blue lighten-2" dark>
          <v-card-text
            v-text="lorem.slice(0, 100)">
          </v-card-text>
        </v-card>
      </v-flex> -->
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'
export default {

  name: 'Lobby',

  data () {
    return {
    	lorem: `Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.`,
      carditems: [
        {title: 'Info 1', kategori: 'info', to: '/info/001', text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus dignissimos magni, voluptas, aperiam vero, alias harum totam, asperiores quas reprehenderit molestiae quidem ex eum consectetur! Officia libero suscipit nobis accusamus.', img: '/public/img/partner-reporting.jpg'},
        {title: 'Artikel 1', kategori: 'artikel', to: '/artikel/art001', text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus dignissimos magni, voluptas, aperiam vero, alias harum totam, asperiores quas reprehenderit molestiae quidem ex eum consectetur! Officia libero suscipit nobis accusamus.'}
      ],
      infos: [],
      server: this.$store.state.server
    }
  },
  created(){
    this.getInfos();
  },
  methods:{
    getInfos(){
      // var id = this.routeParams.id;
      var self = this;
      axios.get(self.server+'/umum/getinfos')
      .then(res=>{
        // console.log(res.data);
        this.infos = res.data;
      });
    }
  },
  computed : {
    filteredinfos(){
      return this.infos.slice(-3);
    }
  }
}
</script>

<style lang="css" scoped>
</style>