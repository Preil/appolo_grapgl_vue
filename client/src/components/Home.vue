<template>
    <v-container>
        <h1>Home</h1>

        <!--<div v-if="$apollo.loading">Loading...</div>-->
        <!--<ul v-else v-for="post in getPosts" :key="post._id">-->
            <!--<li>-->
                <!--{{post.title}} <br>-->
                <!--{{post.imageUrl}} <br>-->
                <!--{{post.description}}-->
            <!--</li>-->
        <!--</ul>-->

        <ApolloQuery :query="getPostsQuery">
            <template slot-scope="{ result: {loading, error, data }}">
                <div v-if="loading">Loading...</div>
                <div v-else-if="error">Error!{{error.message}}</div>
                <ul v-else v-for="post in data.getPosts" :key="post._id">
                    <li>
                        {{post.title}} {{post.description}} {{post.likes}}
                    </li>
                </ul>
            </template>

        </ApolloQuery>



    </v-container>
</template>

<script>
    import {gql} from 'apollo-boost';

    export default {
        name: 'Home',
        data(){
            return {
                getPostsQuery: gql `
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

