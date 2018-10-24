/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, ScrollView, Image, ActivityIndicator, Linking} from 'react-native';
import {CheckBox, ListItem, SearchBar, Button, Icon} from 'react-native-elements';

import { connect } from 'react-redux';

import * as actions from '../store/actions/actions';

class DetailView extends Component{
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <View style={styles.container}>
            <Text style={styles.description}>{this.props.repoName}</Text>
            <ScrollView style={styles.scrollview}>
                { 
                    this.props.repoData.filter(repo => {return repo.checked})
                    .map((repo, index) => (
                        <ListItem key={repo.id}
                          title={
                            <View style={{paddingLeft: 20}}>
                              <Text>{repo.name}</Text>
                            </View>
                          }
                          subtitle={
                            <View style={{paddingLeft: 20}}>
                              <Text>{repo.owner.login}</Text>
                            </View>
                          }
                          rightTitle={repo.stargazers_count+' stars'}
                          avatar={{ rounded: true, uri: repo.owner.avatar_url }}
                          avatarStyle={{width: 50, height: 50, borderRadius: 25}}
                          onPress={() => { Linking.openURL(repo.html_url); }}
                        />
                    ))
                 }
            </ScrollView>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    // backgroundColor: '#F5FCFF',
  },
  description: {
    paddingTop: 10, 
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  searchResult: {
    paddingTop: 20,
    textAlign: 'center'
  },
  totalstars: {
    textAlign: 'center',
    fontSize: 20,
  },
  scrollview: {
    marginTop: 5,
    marginBottom: 20,
  },
  go_buttonStyle: {
    backgroundColor: "rgba(92, 99,216, 1)",
    height: 45,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 10,
  },
  delete_buttonStyle: {
    backgroundColor: "rgba(225, 25, 100, 1)",
    height: 45,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 10,
    marginBottom: 10,
  },
  checkboxStyle: {borderWidth: 0, marginRight: 0, marginLeft: 0, paddingRight: 0, paddingLeft: 0}
});

const mapStateToProps = (state) => {
  return {
    repoName: state.repoName,
    repoData: state.repoData,
  };
};

const mapDispatchProps = (dispatch) => {
  return {
  }
};

export default connect(mapStateToProps, mapDispatchProps)(DetailView);
