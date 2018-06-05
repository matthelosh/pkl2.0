<template lang="pug">
  div
    br
    v-layout(row)
      v-flex(xs3 offset-xs1)
        v-card(hover @hover="showEdit")
          
          v-card-media(:src="foto" height="200px")
            v-btn(color="pink" fab right absolute dark flat v-show="offerEdit")
              v-icon mdi-account-edit
          v-card-title(primary-title)
            div
              h3.headline.mb-0 {{user.nama}}
              div {{user.alamat}} <br> {{user.hp}}
      v-flex(xs5 offset-xs1)
        v-card.teal.darken-1.white--text(hover)
          //- v-card-media(:src="foto" height="200px")
          v-card-title(primary-title)
            div
              h3.headline.mb-0 <i class="fa fa-building"></i> Daftar Du/Di
          v-list(two-line subheader v-for="(dudi, index) in dudis" :key="index")
            v-list-tile
              v-list-tile-content
                v-list-tile-title {{dudi.namaDudi}}
                v-list-tile-sub-title {{dudi.alamat}}
                v-list-tile-sub-title {{dudi.kota}}
            v-divider
                
</template>

<script>
import axios from 'axios'
import Api from './../../lib/conf'
export default {
  data() {
    return {
      token: sessionStorage.getItem('token'),
      uname: sessionStorage.getItem('user'),
      role: sessionStorage.getItem('role'),
      user: {},
      foto : '',
      dudis:[],
      offerEdit: false,
      // items: [
      //     { icon: 'fa-building fa-2x', iconClass: 'grey lighten-1 white--text', title: 'Photos', subtitle: 'Jan 9, 2014' },
      //     { icon: 'folder', iconClass: 'grey lighten-1 white--text', title: 'Recipes', subtitle: 'Jan 17, 2014' },
      //     { icon: 'folder', iconClass: 'grey lighten-1 white--text', title: 'Work', subtitle: 'Jan 28, 2014' }
      //   ]
    }
  },
  created(){
    this.getme();
    this.getMyDudi();
  },
  methods: {
    getme(){
      var self = this;
      axios.get(Api.server+'/api/profile?id='+self.uname+'&role='+self.role, {headers: {'X-Access-Token': self.token}})
           .then((res) => {
             self.user = res.data[0];
             self.foto = '/public/user-profiles/'+res.data[0]._id+'.jpg';

           });
    },
    getMyDudi() {
        var self = this;
        var periode = sessionStorage.getItem('periode')
        var id = sessionStorage.getItem("_id");
        axios.get(Api.server+'/api/getmydudis?id='+id+'&periode='+periode, {headers: {'X-Access-Token': self.token}})
            .then(function(res){
                var results = res.data;
                for (var i = 0 ; i < results.length; i++) {
                  self.dudis.push(results[i]._dudi)
                }
            });
    },
    showEdit(){
      this.offerEdit = true;
    }
  },
  computed: {
    // dudist() {
    //   var self = this;
    //   var data = self.dudis;
    //   var dudis = [];
    //   var dudist = [];
    //   // console.log(dudis);
    //   for ( var i = 0 ;i < data.length; i++ ) {
    //     dudis.push(data[i]._dudi);
    //   }
    //   // return dudis;

    //   // var unique = dudis.reduce(function(accum, current) {
    //   //   if (accum.indexOf(current._id) < 0) {
    //   //       accum.push(current);
    //   //   }
    //   //   return accum;
    //   //   }, []);
    //   //   // if (dudist) {
    //   //   //     dudist.length = 0;
    //   //   //     for (let i = 0; i < unique.length; ++i) {
    //   //   //         dudist.push(unique[i]);
    //   //   //     }
    //   //   //     return dudist;
    //   //   // }
    //   //   return unique;
    //   return dudis.filter(function(item, index){
    //     return item._id !== item._id;
    //     // return index;
    //   })
    //   // return dudis;
    // }
  }
}
// var toString = Object.prototype.toString;  
// var isFunction = function(o) { return toString.call(o) == '[object Function]'; };

// function group(list, prop) {  
//   return list.reduce(function(grouped, item) {
//       var key = isFunction(prop) ? prop.apply(this, [item]) : item[prop];
//       grouped[key] = grouped[key] || [];
//       grouped[key].push(item);
//       return grouped;
//   }, {});
// }
// // our right curried version of `group()`
// var groupBy = rightCurry(group); 
</script>

<style lang="sass" scoped>

</style>
