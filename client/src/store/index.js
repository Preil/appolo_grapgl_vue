import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'

import {defaultClient as apolloClient} from '../main.js'

import {GET_CURRENT_USER, GET_POSTS, SIGNIN_USER} from './queries'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        posts: [],
        user: null,
        loading: false
    },
    mutations: {
        setUser: (state, payload) => {
            state.user = payload;
        },
        setPosts: (state, payload) => {
            state.posts = payload;
        },
        setLoading: (state, payload) => {
            state.loading = payload
        },
        clearUser: state => (state.user = null)
    },
    actions: {
        getCurrentUser: ({commit}) => {
            commit('setLoading', true);
            apolloClient.query({
                query: GET_CURRENT_USER
            })
                .then(({data}) => {
                    commit('setLoading', false);
                    console.log(data.getCurrentUser);
                    // add user to state
                    commit('setUser', data.getCurrentUser)
                })
                .catch(err => {
                    commit('setLoading', false)
                    console.error(err);
                })
        },
        getPosts: ({commit}) => {
            //use ApolloClient to fire getPosts query
            commit('setLoading', true);
            console.log(GET_POSTS);
            apolloClient
                .query({
                    query: GET_POSTS
                }).then(({data}) => {
                //Get data from actions to state via mutation function
                // commit passes data from actions along to mutation functions
                commit('setPosts', data.getPosts);
                commit('setLoading', false);
                console.log(data.getPosts);
            })
                .catch(err => {
                    commit('setLoading', false);
                    console.error(err);
                })
        },
        signinUser: ({commit}, payload) => {
            apolloClient
                .mutate({
                    mutation: SIGNIN_USER,
                    variables: payload
                })
                .then(({data}) => {
                    localStorage.setItem("token", data.signinUser.token);
                    router.go();
                })
                .catch(err => {
                    console.error(err);
                });
        },
        signoutUser: async ({commit}) => {
            // clear user in state
            commit('clearUser');
            // remove token in localStorage
            localStorage.setItem('token', '');
            // end session
            await apolloClient.resetStore();
            // redirect home
            router.push("/");

        }
    },
    getters: {
        posts: state => state.posts,
        user: state => state.user,
        loading: state => state.loading
    },
    modules: {}
});
