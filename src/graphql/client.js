import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'

const httpLink = createHttpLink({
  //uri: 'https://countries.trevorblades.com/',
  uri: import.meta.env.VITE_GRAPHQL_URL
})

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
})


export { apolloClient };