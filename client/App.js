import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { ApolloProvider } from 'react-apollo';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ApolloClient, { createNetworkInterface } from 'apollo-client';

import AppWithNavigationState, { navigationReducer } from './src/navigation';

const networkInterface = createNetworkInterface({
  uri: 'http://192.168.1.4:8080/graphql',
});

const client = new ApolloClient({
  networkInterface,
});

const store = createStore(
  combineReducers({
    apollo: client.reducer(),
    nav: navigationReducer,
  }),
  {},
  composeWithDevTools(applyMiddleware(client.middleware())),
);

export default class App extends Component {
  render() {
    return (
      <ApolloProvider store={store} client={client}>
        <AppWithNavigationState />
      </ApolloProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
