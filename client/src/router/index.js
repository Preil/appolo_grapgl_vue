import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'

import AddPost from '../components/Posts/AddPost'
import Posts from '../components/Posts/Posts'
import Signin from '../components/Auth/Signin'
import Signup from '../components/Auth/Signup'
import Profile from '../components/Auth/Profile'
import AuthGuard from '../AuthGuard'


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/post/add',
        name: 'AddPost',
        component: AddPost
    },
    {
        path: '/posts',
        name: 'Posts',
        component: Posts
    },
    {
        path: '/signin',
        name: 'Signin',
        component: Signin
    },
    {
        path: '/signup',
        name: 'Signup',
        component: Signup
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile,
        beforeEnter: AuthGuard
    },



]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
