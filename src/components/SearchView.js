/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, ScrollView, Image, ActivityIndicator, AsyncStorage} from 'react-native';
import {CheckBox, ListItem, SearchBar, Button, Icon} from 'react-native-elements';

import { connect } from 'react-redux';

import * as actions from '../store/actions/actions';

class SearchView extends Component{
  constructor(props) {
    super(props);
    
    this.onChange = this.onChange.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onGo = this.onGo.bind(this);

    AsyncStorage.getItem('repo_name').then((repo_name) => {
        this.props.handleSetRepoName(repo_name);
        this.onChange(repo_name);
    });
  }

  onChange(e) {
      clearTimeout(this.props.fetchTimer);

      this.props.handleSetRepoName(e);

      let regex = RegExp("^[a-z0-9_\-]+$");
      if (regex.exec(e) == null) {
        this.props.handleSetRepoNameInvalid(true);
        return;
      } 
      else {
        this.props.handleSetRepoNameInvalid(false);
      }

      this.props.handleSetFetchTimer(
        setTimeout(() =>  {
          AsyncStorage.setItem('repo_name', e);
          this.props.handleSetCntChecked(0);
          this.props.handleSetCntCheckedStars(0);
          this.props.handleFetchRepo(e);
        }, 1000)
      );
   }

  onDelete(e) {
    let _repoData = this.props.repoData;
    this.props.repoData.forEach((repo, index) => {
      if (repo.checked) {
        delete _repoData[index];
      }
    });

    this.props.handleSetRepoData(_repoData);
    this.props.handleSetCntChecked(0);
    this.props.handleSetCntCheckedStars(0);
  }

  onGo(e) {
    this.props.navigation.navigate('DetailScreen')
  }

  render() {
    let resultText = (this.props.repoData != null && !this.props.repoNameInvalid  ? this.props.repoData.length + ' repositories': '');
    let repoTable = (this.props.repoData != null && !this.props.repoNameInvalid
      ? 
        this.props.repoData.map((repo, index) => (
          <ListItem key={repo.id}
            friction={90}
            tension={100}
            activeScale={0.95}

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
            rightIcon={<CheckBox
              center
              checked={repo.checked}
              onPress={() => {
                repo.checked = !repo.checked;
                if (repo.checked) {
                  this.props.handleIncrementCntChecked();
                  this.props.handleIncrementCntCheckedStars(repo.stargazers_count);
                }
                else {
                  this.props.handleDecreaseCntChecked();
                  this.props.handleDecreaseCntCheckedStars(repo.stargazers_count);
                }
                this.props.handleUpdateRepo(repo, index);
              }}
              containerStyle={styles.checkboxStyle}
            />}
            avatar={{ rounded: true, uri: repo.owner.avatar_url }}
            avatarStyle={{width: 50, height: 50, borderRadius: 25}}
          />
        ))
      :
        (this.props.finding 
          ?
            <ActivityIndicator size="large" color="#0000ff" />
          :
            <View></View>
        )
      );
    
    return (
        <View style={styles.container}>
            <Text style={styles.description}>Please input the keyword!</Text>
            <SearchBar
                showLoading
                platform="ios"
                cancelButtonTitle="Cancel"
                onChangeText={this.onChange}
                lightTheme={true}
                round={true}
                placeholder='Search' 
                value={this.props.repoName}
            />
            {
                this.props.repoNameInvalid ? <Text style={styles.invalid_message}>{'Uppercase character was typed OR empty!'}</Text> : <View />
            }
            <Text style={styles.searchResult}>{resultText}</Text>
            <ScrollView style={styles.scrollview}>
                { repoTable }
            </ScrollView>
            {
                (this.props.cntChecked > 0 
                ?
                    <View>
                        <Text style={styles.totalstars}>{'Total Stars: '+this.props.cntCheckedStars}</Text>
                        <Button
                            title={this.props.cntChecked+" Items Delete"}
                            titleStyle={{ fontWeight: "700" }}
                            buttonStyle={styles.delete_buttonStyle}
                            containerStyle={{ marginTop: 30, marginBottom: 30 }}
                            onPress={this.onDelete}
                        />
                        <Button
                            title="Go"
                            titleStyle={{ fontWeight: "700" }}
                            buttonStyle={styles.go_buttonStyle}
                            containerStyle={{ marginTop: 30, marginBottom: 30 }}
                            onPress={this.onGo}
                        />
                    </View>
                : 
                    <View></View>)
            }
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  description: {
    paddingTop: 5, 
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  searchResult: {
    paddingTop: 20,
    textAlign: 'center'
  },
  invalid_message: {
    color: 'red',
    fontSize: 15,
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
    marginBottom: 20
  },
  delete_buttonStyle: {
    backgroundColor: "rgba(225, 25, 100, 1)",
    height: 45,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 10,
    marginBottom: 10,
  },
  checkboxStyle: {borderWidth: 0, marginRight: 0, marginLeft: 0, paddingRight: 0, paddingLeft: 0, backgroundColor: "transparent"}
});

const mapStateToProps = (state) => {
  return {
    finding: state.finding,
    repoName: state.repoName,
    repoNameInvalid: state.repoNameInvalid,
    repoData: state.repoData,
    fetchTimer: state.fetchTimer,
    cntChecked: state.cntChecked,
    cntCheckedStars: state.cntCheckedStars,
  };
};

const mapDispatchProps = (dispatch) => {
  return {
    handleSetRepoName: (repo_name) => { dispatch(actions.setRepoName(repo_name)) },
    handleSetRepoNameInvalid: (repo_name_invalid) => { dispatch(actions.setRepoNameInvalid(repo_name_invalid)) },
    handleSetRepoData: (repo_data) => { dispatch(actions.setRepoData(repo_data)) },
    handleSetCntChecked: (cnt_checked) => { dispatch(actions.setCntChecked(cnt_checked)) },
    handleSetCntCheckedStars: (cnt_checked_stars) => { dispatch(actions.setCntCheckedStars(cnt_checked_stars)) },
    handleSetFinding: (finding) => { dispatch(actions.setFinding(finding)) },
    handleSetFetchTimer: (fetch_timer) => { dispatch(actions.setFetchTimer(fetch_timer)) },
    handleIncrementCntChecked: () => { dispatch(actions.incrementCntChecked()) },
    handleDecreaseCntChecked: () => { dispatch(actions.decreaseCntChecked()) },
    handleIncrementCntCheckedStars: (stars) => { dispatch(actions.incrementCntCheckedStars(stars)) },
    handleDecreaseCntCheckedStars: (stars) => { dispatch(actions.decreaseCntCheckedStars(stars)) },
    handleUpdateRepo: (repo, index) => { dispatch(actions.updateRepo(repo, index)) }, 
    handleFetchRepo: (repo_name) => { dispatch(actions.fetchRepo(repo_name)) },
  }
};

export default connect(mapStateToProps, mapDispatchProps)(SearchView);
