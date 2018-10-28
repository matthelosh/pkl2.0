import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        isLoggedIn: !!sessionStorage.getItem('token'),
        user: {
            // _id: sessionStorage.getItem('_id'),
            // name: sessionStorage.getItem('nama'),
            // nip: sessionStorage.getItem('nip'),
            // hp: sessionStorage.getItem('hp')
        },
        versi: 'v0.0.1a',
        server: appConfig.apiServer,
        info: []
        // server: 'http://5.5.1.2:4567'
    },
    mutations: {
        setUser(state, user) {
            state.user = user
            // state.isLoggedIn = true
        },
    	setAuth(state) {
    	    state.isLoggedIn = !!sessionStorage.getItem('token');
    	},
        loadInfo(state, info) {
            state.info = info 
        }
    },
    getters: {

    },
    actions: {
        loadInfo (context, info) {
            context.commit('loadInfo', info)
        },
        setUser(context, user) {
            var token = sessionStorage.getItem('token')
            var role = sessionStorage.getItem('role')
            axios.get(this.state.server+'/api/profile/'+user+'/'+role, {headers: {'Authorization': 'bearer '+token}})
                .then( response => {
                    var userData = response.data.data
                    var nama = userData.name?userData.name : userData.nama// console.log(userData)
                    sessionStorage.setItem('nama', nama)
                    sessionStorage.setItem('_id', userData.kode_guru)
                    // sessionStorage.setItem('nip', userData[0].nip)
                    sessionStorage.setItem('hp', userData.hp)
                    return userData;
                })
                .then(function(userData) {
                    context.commit('setUser', userData);
        		    context.commit('setAuth');
                })
            
        },
        Unsetuser(context){
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('nama');
            sessionStorage.removeItem('nip');
            sessionStorage.removeItem('hp');
            sessionStorage.removeItem('_id');
            sessionStorage.removeItem('user');
            sessionStorage.removeItem('role');
            sessionStorage.removeItem('periode');
            context.commit('setAuth');
        }
    }
});

export default store