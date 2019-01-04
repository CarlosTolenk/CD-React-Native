import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar, 
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Slider,
  Dimensions,
  NetInfo
} from 'react-native';



//Library
import Icon from 'react-native-vector-icons/MaterialIcons';

import Video from 'react-native-video';
import Orientation from 'react-native-orientation';




//Component
import Header from '../../section/components/header-general';

let {width, height} = Dimensions.get('window');
// let heightPlayer = height*0.118;
// let heightBackground = height - height*0.30;
// let topButton = heightBackground + 1;
// let widthButton = width*0.23;
// let fontIcon = widthButton*0.8

let heightPlayer = height*0.118;
let heightBackground = height - height*0.30;
let topButton = heightBackground + 1;
let widthButton = width*0.23;
let fontIcon = widthButton*0.8;


// const url = "http://radio7.domint.net:8194/;stream.mp3";
const url = "http://radio7a.domint.net:8194/;stream.mp3"

// http://radio7a.domint.net:8194     
// http://radio7a.domint.net:8194/listen.m3u
// http://radio7a.domint.net:8194/listen.pls

// http://radio7a.domint.net:8194/;stream.mp3




class Radio extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 50,
      nameIcon: 'play-arrow',
      isPlaying: true,
      changeColor: 'white',
      statusRadio: null,
      isLive: 'No Conexión',
      status: '',
    };    
  }

  componentWillUpdate(){
    width = Dimensions.get( "window" ).width; 
    height = Dimensions.get( "window" ).height;
    heightPlayer = height*0.118;
    heightBackground = height - height*0.30;
    topButton = heightBackground + 1;
    widthButton = width*0.23;
    fontIcon = widthButton*0.8;
    console.log("M para ti Portrait");
    console.log(width);
    console.log(height);
  }


  componentWillMount() {	
		const initial = Orientation.getInitialOrientation();
		if (initial === 'PORTRAIT') {
      width  = Dimensions.get( "window" ).width; 
      height = Dimensions.get( "window" ).height;
      heightPlayer = height*0.118;
      heightBackground = height - height*0.30;
      topButton = heightBackground + 1;
      widthButton = width*0.23;
      fontIcon = widthButton*0.8;    
		
		} else {
      width = Dimensions.get( "window" ).height;
      height = Dimensions.get( "window" ).width;
      heightPlayer = height*0.118;
      heightBackground = height - height*0.30;
      topButton = heightBackground + 1;
      widthButton = width*0.23;
      fontIcon = widthButton*0.8;
      console.log("M para ti Landscape");		
		}
	}

  componentDidMount() {
       this.focus = this.props.navigation.addListener('didFocus', ()=>{
        StatusBar.setBarStyle('light-content');
        StatusBar.setBackgroundColor('#11437D');    
    });

    Orientation.lockToPortrait();
    
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);

    NetInfo.isConnected.fetch().done(
      (isConnected) => { this.setState({ status: `Con: ${isConnected}` }); }
  
  );
    


  //   ReactNativeAudioStreaming.getStatus((error, status) => {
  //     (error) ? console.log(error) : this.setState({statusRadio: status.status})
  //     if(this.state.statusRadio == "STOPPED" || this.state.statusRadio == "PLAYING"){
  //       this.setState({isLive: "Live Broadcast"})
  //     }
  //  });

 


  }

 

  //componentWillUpdate(){
      //   ReactNativeAudioStreaming.getStatus((error, status) => {
  //     (error) ? console.log(error) : this.setState({statusRadio: status.status})
  //  });

  //  if(this.state.statusRadio == "STOPPED" || this.state.statusRadio == "PLAYING"){
  //   this.setState({isLive: "En vivo"})
  // }

  //  if(this.state.isPlaying && this.state.statusRadio == "PLAYING"){
  //   this.setState({
  //     isPlaying: true
  //   })   
  //  }
   //}

   handleConnectionChange = (isConnected) => {
    this.setState({ status: `Con: ${isConnected}` });    
}


   
  

  componentWillUnmount(){
    this.focus.remove();
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange)
  }

  change(value) {
    this.setState(() => {
      return {
        value: parseFloat(value),
      };
    });
  }
  
    onPressToggle = () => {
      this.setState({
    isPlaying: !this.state.isPlaying
    }) 
  }
    
    onLoad = (data) => {
      this.setState({     
        isLive: 'En VIVO'
      })   
    } 
  
    onBuffer = ({ isBuffering }) => {
      if(!isBuffering){
        this.setState({       
          isLive: 'Sin Conexión'
        }) 
      }   
   }

 

 

  //   if(this.state.isPlaying){
  //     ReactNativeAudioStreaming.play(url, {showIniOSMediaCenter: false, showInAndroidNotifications: false});
  //   }else{
  //     ReactNativeAudioStreaming.stop();
  //     if(this.state.statusRadio != "STOPPED"){
  //       // ReactNativeAudioStreaming.destroyNotification();  
  //     }        
  //   }   
  // }


  render() {
    const {value} = this.state;
    return (      
      <View style={styles.container}>
        <Header title="SABROSA 97 FM"  colorHeader='#11437D' border='black'/>
          <View>
           <Image
                source={require('../../../assets/cabina-radio.jpeg')}
                style={styles.backgroundImage}
              />
            <View style={styles.contentFront}>
              {/* <Text style={styles.text}>Emisora Radial</Text> */}
            </View>                    
          </View>

            <TouchableWithoutFeedback onPress={this.onPressToggle}>
              <View style={styles.buttonPlayer}>         
              {
                this.state.isPlaying ?
                <Icon style={styles.iconPlayPause} name="play-arrow" color="white" size={fontIcon}/>               
                :
                <Icon style={styles.iconPlayPause} name="pause" color="white" size={fontIcon}/>
              }         
              </View>
           </TouchableWithoutFeedback>
         
      

          <View style={styles.footerPlayer}>    
            <View style={styles.footerLeft}>
                <View style={[styles.live, styles.text]}>
                  {/* <Icon style={styles} name="access-time" color="white" size={20}/>
                  <Text style={styles.textColor}>16:35</Text> */}
                </View> 
                <View style={[styles.live, styles.text]}>
                  <Icon  name="settings-input-antenna" color="white" size={20}/>
                  <Text style={styles.textColor}>{this.state.isLive}</Text>
                  
                </View>              
              </View> 
              <View style={styles.footerRight}>
                {/* <Text style={styles.text}>16:35</Text>   */}
                {/* <Icon style={styles.signalIcon} name="volume-up" color="white" size={22}/> */}
                {/* <View style={styles.sliderVolumen}>
                  <Slider
                      step={1}
                      maximumValue={100}
                      onValueChange={this.change.bind(this)}
                      value={value}
                      minimumTrackTintColor='white'
                      maximumTrackTintColor='gray'
                      thumbTintColor='#1565c0'
                    /> 
                </View>                                */}



                 <Video 
                   ref={(ref) => {
                    this.player = ref
                   }} 
                   source={{uri: url}} 
                  //  ref="audioElement"
                   paused={this.state.isPlaying}      
                   onLoad={this.onLoad} 
                   onBuffer={this.onBuffer}   
                   playInBackground={true} 
                
                  
                  />
                 <Image
                    source={require('../../../assets/white-diamante.png')}
                    style={styles.iconLogo}
                 />
                  
              </View>       
          </View>     
      </View>
    )
  }

}



const styles = StyleSheet.create({
  container: { 
    flex:1,
    backgroundColor: '#022c43',
    position: 'relative'
  },
  text: {   
    paddingHorizontal: 15,
    paddingTop: 15,    
  },
  textColor:{
    color: 'white',   
    fontSize: 16,
    paddingLeft: 5,
  },
  backgroundImage: {
    width: width,
    height: heightBackground,
    resizeMode: 'stretch',
    opacity: 0.35
  },
  contentFront:{
    position: 'absolute',
    top: '50%',
    left: '35%'
  },
  footerPlayer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    backgroundColor: '#11437D',
    height: heightPlayer,
    width: width,
    bottom:0,  
    shadowColor: '#000',
    shadowOffset: { width: 20, height: 40 },
    shadowOpacity: 1.0,  
    elevation: 10,     
    zIndex: 10,
  },
  footerLeft:{
    flexDirection: 'column',
  },
  footerRight:{ 
    paddingHorizontal: 35,    
    justifyContent: 'center',
    alignContent:'center',  
    marginTop: -10,
    paddingRight: 25,
  },
  live:{
    flexDirection: 'row',
  },
  iconLogo:{
    width:42,
    height:42,
    resizeMode: 'contain',
    alignSelf: 'center',   
  },
  signalIcon:{
    paddingHorizontal: 15,
    paddingTop: 15,   
  },
  sliderVolumen:{
    paddingTop: 20, 
    width: widthButton*1.7,
  },
  buttonPlayer:{
    position: 'absolute',
    top: topButton,
    left: '38.5%',
    backgroundColor: '#1565c0',
    height: widthButton,
    width:widthButton,
    elevation: 10,  
    zIndex: 100,
    borderRadius: widthButton,
    shadowColor: '#000',
    shadowOffset: { width: 20, height: 20 },
    shadowOpacity: 2.0,  
    elevation: 12,  
    flex:1
  },
  iconPlayPause:{
    zIndex: 1000,
    flex:1,  
    alignSelf: 'center',   
    top: '10%'
  }
})

export default Radio