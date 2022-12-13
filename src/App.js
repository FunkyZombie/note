// index.js
// This is the main entry point of our application
import React from 'react';
import GlobalStyle from './components/GlobalStyle';
import Pages from './pages';
import { ApolloClient, 
    ApolloProvider, 
    InMemoryCache,
    createHttpLink,
    gql
  } from '@apollo/client';
import { setContext } from 'apollo-link-context';

const uri = process.env.API_URI;
const cache = new InMemoryCache();
const httpLink = createHttpLink({ uri });

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: localStorage.getItem('token') || ''
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  resolvers: {},
  connectToDevTools: true
});

const data = {
  isLoggedIn: !!localStorage.getItem('token')
}

// write the cache data on initial load
cache.writeQuery({ 
  query: gql`
    query isAuth {
      isLoggedIn
  }`,
  data:  { 
    isLoggedIn: !!localStorage.getItem('token')
  }
});

client.onResetStore(() => cache.writeQuery({
  query: gql`
    query isAuth {
      isLoggedIn
  }`,
  data:  { 
    isLoggedIn: !!localStorage.getItem('token')
  }
}))

const App = () => {
  return (  
    <ApolloProvider client={ client }>
      <GlobalStyle />
      <Pages />
    </ApolloProvider>
  );
};

export default App;