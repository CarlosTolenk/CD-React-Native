import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar, 
  BackHandler,
  Platform,
  Dimensions
} from 'react-native';

//Plugin
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import Orientation from 'react-native-orientation';

//Component
import PlayerVideo from '../../player-canal/container/canal-tv';

const {width, height} = Dimensions.get('window');

class VideoContainer extends Component {

  onBackPress = () => {
    Orientation.lockToPortrait();
    this.props.dispatch(
      NavigationActions.back({
          key: null
      })
    )
    return true
  }

  componentWillMount() {
    // The getOrientation method is async. It happens sometimes that
    // you need the orientation at the moment the JS runtime starts running on device.
    // `getInitialOrientation` returns directly because its a constant set at the
    // beginning of the JS runtime.

    const initial = Orientation.getInitialOrientation();
    if (initial === 'PORTRAIT') {
      // do something
      Orientation.lockToLandscape();
    } else {
      // do something else
      Orientation.lockToLandscape();
    }
  }



  componentDidMount() {   
      this.focus = this.props.navigation.addListener('didFocus', ()=>{
        StatusBar.setHidden(true);    
    });
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);  
    
     // this locks the view to Portrait Mode
    //  Orientation.lockToPortrait();

     // this locks the view to Landscape Mode
     Orientation.lockToLandscape();
 
     // this unlocks any previous locks to all Orientations
     // Orientation.unlockAllOrientations(); 
   
  }

  

  componentWillUnmount(){   
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);   
    this.focus.remove();    
  }

  render() {
    return (    
      <PlayerVideo navigationBackCanal={this.onBackPress} style={styles.fullScreen}/>   
    )
  }
}

const styles = StyleSheet.create({
  fullScreen: {
    flex:1,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,      
  },
})

export default connect(null) (VideoContainer)