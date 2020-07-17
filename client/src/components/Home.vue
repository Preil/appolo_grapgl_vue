<template>
    <v-container>
        <h1>Home</h1>
        <div v-if="$apollo.loading">Loading...</div>
        <ul v-else v-for="post in getPosts" :key="post._id">
            <li>
                {{post.title}} <br>
                {{post.imageUrl}} <br>
                {{post.description}}
            </li>
        </ul>
    </v-container>
</template>

<script>
    import {gql} from 'apollo-boost';

    export default {
        name: 'Home',
        data(){
            return {
                posts: []
            }
        },
        apollo: {
            getPosts: {
                query: gql `
                    query {
                        getPosts {
                            _id
                            title
                            imageUrl
                            description
                        }
                     }
                `,
                result(args){
                        console.dir(args);
                    },
                error(err) {
                    console.error('[Errors:]', err);
                    console.dir(err);
                }
            }
        }
    }
</script>

