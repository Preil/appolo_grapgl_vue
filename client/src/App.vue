<template>
    <v-app>
        <v-card>
            <!--Horizontal navbar-->
            <v-toolbar fixed color="primary" dark>
                <v-app-bar-nav-icon></v-app-bar-nav-icon>
                <v-toolbar-title class="hidden-xs-only">
                    <router-link to="/" tag="span" style="cursor: pointer">
                        Vue share
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
            </v-toolbar>


        </v-card>

        <!--App content-->
        <main>
            <v-container>
                <router-view/>
            </v-container>
        </main>
    </v-app>
</template>

<script>
    export default {
        name: 'App',
        computed: {
            horizontalNavItems() {
                return [
                    {icon: 'chat', title: 'Posts', link: '/posts'},
                    {icon: 'lock_open', title: 'Sign In', link: '/signin'},
                    {icon: 'create', title: 'Sign Up', link: '/signup'}
                ]

            }
        }
    }
</script>

