import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  StatusBar,
  WebView,
  Platform, Dimensions
} from 'react-native';

//Plugin
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import Orientation from 'react-native-orientation';

const {width, height} = Dimensions.get('window');
// const width = 0;
// const height = 0;

class CanalTv extends Component { 

  // componentWillMount() {	
  //   const initial = Orientation.getInitialOrientation();    
	// 	if (initial === 'PORTRAIT') {
  //     width = Dimensions.get("window" ).width;
  //     height = Dimensions.get( "window").height;
	// 	} else {
  //     width = Dimensions.get( "window" ).height;
  //     height = Dimensions.get( "window").width;	
	// 	}
	// }


  componentDidMount() {
       this.focus =  this.props.navigation.addListener('didFocus', ()=>{
        StatusBar.setBackgroundColor('#022c43');
        StatusBar.setHidden(false);
        StatusBar.setBarStyle('light-content');          
    });
    Orientation.lockToPortrait();
    console.log(width);
    console.log(height);
    
  }

  componentWillUnmount(){
    this.focus.remove()
  }

  onNavigation = () => {
    this.props.dispatch(
        NavigationActions.navigate({
            routeName: 'Player'
        })
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerImage}>
          <Image
              source={require('../../../assets/logo-tv-fullwhite.png')}
              style={styles.logo}
            />
        </View> 
         
        <View style={styles.sectionAside}>
          <View style={styles.sectionLeft}>
             <Text numberOfLines={1} style={styles.title}>De lunes a viernes</Text>           
             <Text numberOfLines={1} style={styles.content}>De 2:30 a 3:30 PM</Text>
          </View>
          <View style={styles.sectionRight}>
             <Text style={styles.title}>Sintoniza:</Text> 
             <Text numberOfLines={1} style={styles.contentFinal}>Control Diamante TV</Text>
          </View>      
        </View>

        <View style={styles.actionButton}>
          <Button  
            onPress={this.onNavigation}                             
            title="Visualizar Canal"
            color="#1565c0"
            accessibilityLabel="Canal"
            // style={styles.actionButton}
          />  
        </View>     

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 15,
    justifyContent: 'space-around',
    alignContent: 'space-around',
    backgroundColor: '#022c43',
  },
  containerImage:{
    flex: 2,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',  
    // backgroundColor: 'yellow',
    marginTop: "4%",
  },
  sectionAside:{
    flex:1,
    // marginTop: "15%",
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignContent: 'flex-start',
    // alignItems: 'center',
  },
  sectionLeft:{
    marginBottom: 10
  },
  sectionRight:{
    marginBottom: 10
  },
  title: {
    textAlign: 'center',   
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    // marginBottom: 15,
  },
  content:{
    textAlign: 'center',  
    color: 'white',
    fontSize: 16,
    marginBottom: 10
  
  },
  contentFinal:{
    marginBottom: 20,
    textAlign: 'center',  
    color: 'white',
    fontSize: 16,  
  },
  actionButton:{
    flex: 1,
    paddingHorizontal: 20,  
    paddingVertical: 20,  
  },
  logo: {   
    alignItems: 'center',
    justifyContent: 'center',
    width: width*0.85,
    height: height*0.55,
    resizeMode: 'contain'
  }
})

export default connect(null) (CanalTv)