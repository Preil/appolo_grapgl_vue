import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {store} from './store'
import vuetify from './plugins/vuetify';
import '@babel/polyfill'

import ApolloClient from 'apollo-boost';
import VueApollo from 'vue-apollo';
import FormAlert from './components/Shared/FormAlert'

// Register component globally
Vue.component('form-alert', FormAlert);

Vue.use(VueApollo);

export const defaultClient = new ApolloClient({
    uri: 'http://localhost:4500/graphql',
    // include auth token with requests made to backend
    fetchOptions: {
        credentials: 'include'
    },
    request: operation => {
        // if no token in localStorage, add it
        if (!localStorage.token) {
            localStorage.setItem('token', '');
        }
        // operation adds the token to an authorization header, which is sent to backend
        operation.setContext({
            headers: {
                authorization: localStorage.getItem('token')
            }
        })
    },
    onError: ({graphQLErrors, networkError}) => {
        if (networkError) {
            console.log('[networkError]', networkError);
        }
        if (graphQLErrors) {
            for (let err of graphQLErrors) {
                console.dir(err);
            }
        }
    }
});

const apolloProvider = new VueApollo({defaultClient});

Vue.config.productionTip = false

new Vue({
    provide: apolloProvider.provide(),
    router,
    store,
    vuetify,
    render: h => h(App),
    created() {
        // execute getCurrentUser query
        console.log('')
        this.$store.dispatch('getCurrentUser')
    }
}).$mount('#app')
