import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        isLoggedIn: !!sessionStorage.getItem('token'),
        user: {
            _id: sessionStorage.getItem('_id'),
            nama: sessionStorage.getItem('nama'),
            nip: sessionStorage.getItem('nip'),
            hp: sessionStorage.getItem('hp')
        },
        versi: 'v0.0.1a',
        server: appConfig.apiServer
        // server: 'http://5.5.1.2:4567'
    },
    mutations: {
        setUser(state, user) {
            state.user = user
            // state.isLoggedIn = true
        },
    	setAuth(state) {
    	    state.isLoggedIn = !!sessionStorage.getItem('token');
    	}
    },
    getters: {

    },
    actions: {
        setUser(context, user) {
            var token = sessionStorage.getItem('token')
            var role = sessionStorage.getItem('role')
            axios.get(this.state.server+'/api/profile?id='+user+'&role='+role, {headers: {'X-Access-Token': token}})
                .then( response => {
                    var userData = response.data
                    sessionStorage.setItem('nama', userData[0].nama)
                    sessionStorage.setItem('_id', userData[0]._id)
                    sessionStorage.setItem('nip', userData[0].nip)
                    sessionStorage.setItem('hp', userData[0].hp)
                    return userData[0];
                })
                .then(function(userData) {
                    context.commit('setUser', userData);
        		    context.commit('setAuth');
                })
            
        },
        Unsetuser(context){
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('_id');
            sessionStorage.removeItem('user');
            sessionStorage.removeItem('role');
            sessionStorage.removeItem('periode');
            context.commit('setAuth');
        }
    }
});

export default store