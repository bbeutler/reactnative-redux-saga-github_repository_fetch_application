/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';

import SearchView from './src/components/SearchView';
import DetailView from './src/components/DetailView';

import { createStore, applyMiddleware} from 'redux';
import { Provider, connect } from 'react-redux';

import { StackNavigator } from 'react-navigation';

import * as actions from './src/store/actions/actions';
import { reducer } from './src/store/reducers/reducer';

import createSagaMiddleware from 'redux-saga';
import rootSaga from './src/store/saga/saga';

const sagaMw = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMw));

sagaMw.run(rootSaga);

const AppNavigator = StackNavigator({
  SearchScreen: { screen: SearchView },
  DetailScreen: { screen: DetailView }
});

export default class App extends Component{
  constructor(props) {
    super(props);
  }

  render() {    
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  }
});