<template>
    <v-app>
        <v-card>
            <v-navigation-drawer
                    temporary
                    fixed
                    v-model="sideNav"
            >
                <v-toolbar class="secondary" flat dark>
                    <v-app-bar-nav-icon @click="toggleSideNav"></v-app-bar-nav-icon>
                    <v-toolbar-title>
                        <h1 class="title">Vue share</h1>
                    </v-toolbar-title>
                </v-toolbar>
                <v-divider></v-divider>
                <v-list>
                    <v-list-item
                            v-for="item in sideNavItems"
                            :key="item.title"
                            :to="item.link"
                    >
                        <v-list-item-action>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-action>

                        <v-list-item-content>
                            {{ item.title }}
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item v-if="user">
                        <v-list-item-action>
                            <v-icon>exit_to_app</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            Signout
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>
        </v-card>
        <v-card>
            <!--Horizontal navbar-->
            <v-toolbar fixed color="primary" dark>
                <v-app-bar-nav-icon @click="toggleSideNav"></v-app-bar-nav-icon>
                <v-toolbar-title class="hidden-xs-only">
                    <router-link to="/" tag="span" style="cursor: pointer">
                        <h1 class="title">Vue share</h1>
                    </router-link>
                </v-toolbar-title>

                <v-spacer></v-spacer>

                <v-text-field
                        flex
                        label="Search"
                        prepend-icon="search"
                        single-line
                        hide-details
                ></v-text-field>
                <v-spacer></v-spacer>

                <v-btn
                        class="hidden-xs-only"
                        flat depressed color="primary"
                        v-for="item in horizontalNavItems"
                        :key="item.title"
                        :to="item.link"
                >
                    <v-icon class="hidden-sm-and-down" left>
                        {{item.icon}}
                    </v-icon>
                    {{item.title}}
                </v-btn>
                <v-btn flat to="/profile" v-if="user"
                       color="primary"
                       depressed>
                    <v-icon class="hidden-sm-only" left>account_box</v-icon>
                    <!--<v-badge right color="blue darken-2">-->
                        <!--&lt;!&ndash;<span slot="badge">1</span>&ndash;&gt;-->
                    <!--</v-badge>-->
                    Profile
                </v-btn>
                <v-btn flat to="/profile" v-if="user"
                       color="primary"
                       depressed>
                    <v-icon class="hidden-sm-only" left>exit_to_app</v-icon>
                    <!--<v-badge right color="blue darken-2">-->
                    <!--&lt;!&ndash;<span slot="badge">1</span>&ndash;&gt;-->
                    <!--</v-badge>-->
                    Signout
                </v-btn>
            </v-toolbar>


        </v-card>

        <!--App content-->
        <main>
            <v-container class="mt-4">
                <transition name="fade">
                    <router-view/>
                </transition>
            </v-container>
        </main>
    </v-app>
</template>

<script>

    import { mapGetters } from 'vuex';

    export default {
        name: 'App',
        computed: {

            ...mapGetters(['user']),

            horizontalNavItems() {
                let items = [
                    {icon: 'chat', title: 'Posts', link: '/posts'},
                    {icon: 'lock_open', title: 'Sign In', link: '/signin'},
                    {icon: 'create', title: 'Sign Up', link: '/signup'}
                ]
                if (this.user){
                    items = [
                        {icon: 'chat', title: 'Posts', link: '/posts'}
                    ]
                }
                return items;

            },
            sideNavItems() {
                let items = [
                    {icon: 'chat', title: 'Posts', link: '/posts'},
                    {icon: 'lock_open', title: 'Sign In', link: '/signin'},
                    {icon: 'create', title: 'Sign Up', link: '/signup'}
                ];
                if(this.user){
                    items = [
                        {icon: 'chat', title: 'Posts', link: '/posts'},
                        {icon: 'stars', title: 'Create Post', link: '/post/add'},
                        {icon: 'account_box', title: 'Profile', link: '/profile'},

                    ]
                }
                return items;

            }
        },
        data() {
            return {
                sideNav: false
            }
        },
        methods: {
            toggleSideNav() {
                this.sideNav = !this.sideNav
            }
        }
    }
</script>

<style>
    .fade-enter-active,
    .fade-leave-active {
        transition-property: opacity;
        transition-duration: 0.25s;
    }

    .fade-enter-active {
        transition-delay: 0.25s;
    }

    .fade-enter,
    .fade-leave-active {
        opacity: 0;
    }
</style>