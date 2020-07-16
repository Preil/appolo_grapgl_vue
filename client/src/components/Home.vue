<template>
    <v-container>
        <h1>Home</h1>
        <ul v-for="post in getPosts" :key="post._id">
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
                `
            }
        }
    }
</script>

