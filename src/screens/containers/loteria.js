import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  BackHandler,
} from 'react-native';

//Plugin
import {connect} from 'react-redux';
import { NavigationActions } from 'react-navigation';

//Component
import LoteriaList from '../../section/containers/loteria-list';





class Loteria extends Component {
  
  constructor() {
    super();
  }

  // onBackPress = () => {
  //   this.props.dispatch(
  //     NavigationActions.back({
  //         key: null
  //     })
  // )
  // return true
  // }

  // componentDidMount() {  
  //   BackHandler.addEventListener('hardwareBackPress', this.onBackPress);     
  // }

  // componentWillUnmount(){
  //   BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);      
  // }

  render() {
    return (<LoteriaList/>)
  }
}

export default connect(null) (Loteria);