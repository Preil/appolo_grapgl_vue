<template>
    <v-container>
        <h1>Sign In</h1>

        <v-layout v-if="error" row wrap>
            <v-flex xs12 sm6 offset-sm3>
                <form-alert :message="error.message"></form-alert>
            </v-flex>
        </v-layout>


        <!--Signin form-->
        <v-layout row wrap>
            <v-flex xs-12 sm6 offset-sm3>
                <v-card class="mx-auto pa-xl-6 pa-sm-3 pa-xs-2" color="secondary" dark>
                    <v-container text-center>
                        <v-form @submit.prevent="handleSigninUser">
                            <v-layout row wrap>
                                <v-flex xs-12>
                                    <v-text-field v-model="username" prepend-icon="face" label="Username" type="text"
                                                  required></v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout row>
                                <v-flex xs-12>
                                    <v-text-field v-model="password" prepend-icon="extension" label="Password"
                                                  type="password" required></v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout row>
                                <v-flex xs-12>
                                    <v-btn :loading="loading" color="accent" type="submit">
                                        <span slot="loader" class="custom-loader">
                                            <v-icon light>cached</v-icon>
                                        </span>
                                        Signin</v-btn>
                                    <h3>Don't have an account?
                                        <router-link to="/signup">Signup</router-link>
                                    </h3>
                                </v-flex>
                            </v-layout>
                        </v-form>
                    </v-container>
                </v-card>
            </v-flex>
        </v-layout>

    </v-container>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        name: "Signin",
        data() {
            return {
                username: '',
                password: ''
            }
        },
        computed: {
            ...mapGetters(['loading', 'user', 'error'])
        },
        watch: {
            user(value) {
                if (value) {
                    this.$router.push("/");
                }
            }
        },

        methods: {
            handleSigninUser() {
                this.$store.dispatch('signinUser', {
                    username: this.username,
                    password: this.password
                });
            }
        }
    }
</script>

<style>
    .custom-loader {
        animation: loader 1s infinite;
        display: flex;
    }
    @-moz-keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
    @-webkit-keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
    @-o-keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
    @keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
</style>

