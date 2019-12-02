import Vue from 'vue';
import {ApolloClient} from 'apollo-client';
import {ApolloLink} from 'apollo-link-http'
import {inmemory} from 'apollo-cache-inmemory'
import apollo from 'vue-apollo'

const httplink=new ApolloLink({
    uri:"http://localhost:3000/api"
})

const ApolloClient=new ApolloClient({
    link:httplink,
    cache:new inmemory(),
    connectToDevTools:true,
})

Vue.use(apollo)