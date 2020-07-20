import Vue from 'vue'
import Vuex from 'vuex'

import {defaultClient as apolloClient} from '../main.js'

import {GET_POSTS} from './queries'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        posts:[],
        loading: false
    },
    mutations: {
        setPosts: (state, payload) => {
            state.posts = payload;
        },
        setLoading: (state, payload)=>{
            state.loading = payload
        }
    },
    actions: {
        getPosts: () => {
            //use ApolloClient to fire getPosts query
            store.commit('setLoading', true);
            console.log(GET_POSTS);
            apolloClient
                .query({
                    query: GET_POSTS
                }).then(({data}) => {
                    //Get data from actions to state via mutation function
                    // commit passes data from actions along to mutation functions
                    store.commit('setPosts', data.getPosts);
                    store.commit('setLoading', false);
                    console.log(data.getPosts);
            })
        .catch(err => {
                store.commit('setLoading', false);
                console.error(err);
            })
        }
    },
    getters: {
        posts: state => state.posts,
        loading: state => state.loading
    },
    modules: {}
});
