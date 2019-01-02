import React, { Component } from 'react';
 import {    
    View,
    ActivityIndicator,
    Image,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    Dimensions
 } from 'react-native';

 //Plugin o Library
import Video from 'react-native-video';
import Orientation from 'react-native-orientation';

const timer = require('react-native-timer');

//Component
import Layout from '../component/video-layout';
import ControlLayout from '../component/control-layout';
import BackIcon from '../container/backIcon';
import PlayPause from '../component/play-pause';
import ProgressBar from '../component/progress-bar';

const  {width, height } =  Dimensions.get('window');

class CanalTv extends Component{ 

    constructor(props){
        super(props);
        this.state = {
            loading:true,
            paused:false, 
            showControl:true
        }     
    }
    
    componentDidMount(){
        requestAnimationFrame(() => this.timerControl())
        Orientation.lockToLandscape();
    }



    onBuffer = ({ isBuffering }) => {
        this.setState({
            loading: isBuffering
        })
    }

    timerControl = () => {
      this.setState({showMsg: true}, () => timer.setTimeout(
            this, 'hideControls', () => this.setState({showControl: false}), 3500
          ));   
    }

    timerControlUpdate = () => {
        this.setState({showMsg: true}, () => timer.setTimeout(
              this, 'hideControls2', () => this.setState({showControl: false}), 2500
            ));   
      }

     toggleControls = () => {       
        this.setState({
            showControl: !this.state.showControl
        }) 
        requestAnimationFrame(() => this.timerControlUpdate())
    }

  

    onLoad = () => {
        this.setState({
            loading: false
        })    
    }

    playPause = () => {
        this.setState({
            paused: !this.state.paused
        })
    }

    componentWillUnmount() {
        timer.clearTimeout(this);
      }

    render(){      
        return(  
          
                <Layout                
                    navigation={
                        <View style={styles.navigationBack}>
                            <BackIcon
                            navigationBackCanal={this.props.navigationBackCanal}
                            />                        
                      </View>
                    }
                    loading={this.state.loading}
                    video={
                        <TouchableWithoutFeedback onPress={this.toggleControls} >
                        <Video
                            ref={(ref) => {
                                this.player = ref
                            }} 
                            source={{uri: 'http://ss2.domint.net:2130/cdt_str/diamantetv/playlist.m3u8'}}
                            //  source={{uri: 'http://ss1.domint.net:2140/luna_str/lunatv/playlist.m3u8'}}                        
                            style={styles.video}
                            resizeMode='stretch'    
                            onBuffer={this.onBuffer}   
                            onLoad={this.onLoad}   
                            paused={this.state.paused}
                            // onProgress={this.setTime}
                    />
                       </TouchableWithoutFeedback>
                    }
                    loader={
                        <ActivityIndicator color='#1F47AC' size="large"/>
                    }
                    showControl={this.state.showControl}
                    controls={                    
                        <ControlLayout>
                            <PlayPause
                                onPress={this.playPause}
                                paused={this.state.paused}
                            />
                            <Text style={{color:'white', marginHorizontal: 5}}>EN DIRECTO | </Text>
                            <ProgressBar 
                                progress={100}
                                onChangeStarted={this.changeSliderStarted}
                                onChangeFinished={this.changeSliderFinished}
                            />
                            <Image
                            style={styles.iconDiamond}
                            source={require('../../../assets/diamante-icon.png')}
                            />       
                        </ControlLayout>
                    }
                />
         
        )       
     }
 }

 const styles = StyleSheet.create({   
     video:{
         position:'absolute',
         left: 0,
         right:0,
         top:0,
         bottom:0
     },
     iconDiamond:{
         height: 15,
         width: 32,
        //  paddingHorizontal: 10,
     },
     navigationBack:{
        position:'absolute',
        left: 0,    
        top:0,   
        zIndex: 100,
        padding: 5,
        width:height,
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
 });

 function timeReadable (time) {
    let duration = time / 60;
    let mins = Math.floor(duration);
    let seconds = duration % 1;
    seconds = (seconds * 60) / 1000;
    let currentTime = (mins + seconds * 10).toFixed(2);
    return currentTime;
  }

 export default CanalTv