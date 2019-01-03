const WEBVIEW_REF = "WEBVIEW_REF";
import React, {Component} from 'react';
import { View, Text, WebView, StyleSheet, TouchableOpacity, BackHandler, ActivityIndicator, Dimensions } from 'react-native';

//Plugin
// import { connect } from 'redux';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
//Component

const {width, height} = Dimensions.get('window');
let backPulse = true
let update = true;

class Website extends Component{

  static navigationOptions = {
    header: null
  }

    constructor(props) {
      super(props);
      this.state = { canGoBack: false, loading: true };      
    }   

    componentDidMount() {        
      BackHandler.addEventListener('hardwareBackPress', this.onBackPress );            
    }        


    componentWillUnmount(){
      BackHandler.removeEventListener('hardwareBackPress', this.onBackPress );   
    }

    componentDidUpdate(){      
        if(this.state.canGoBack){
          backPulse = false          
        }else{         
          backPulse = true;            
        }
      }
     
      // console.log(this.state.canGoBack);
  
    
    onBack = () => {  
      if(this.state.canGoBack){      
        this.refs[WEBVIEW_REF].goBack();        
      }      
      // else if (backPulse){     
      //   this.onBackPress();
      // }
    }

    hideSpinner() {
      this.setState({ loading: false });
    }

    onNavigationStateChange(navState) {
      this.setState({
        canGoBack: navState.canGoBack,        
      });      
    }

    onBackNavigation = () =>{
      this.props.dispatch(
        NavigationActions.navigate({
            routeName: 'Contactos'
        })
      )
    }

    onBackPress = () => {
      this.props.dispatch(
          NavigationActions.back({
              key: null
          })
      )
      return true
    }
   

    render(){
      return(
        <View style={styles.container}>
          <View style={styles.topbar}>  
            <View >
            {
              this.state.canGoBack ?
                  <TouchableOpacity
                  disabled={!this.state.canGoBack}
                  onPress={this.onBack.bind(this)}
                
                  >
                  <Icon style={styles.iconDate} name="arrow-back" color="white" size={35}/>
                </TouchableOpacity>
              :

              <Text style={{paddingHorizontal:17.5}}></Text>
              
            
            }       
           </View>    
            
            <Text style={styles.title}>Website</Text>
           
            <TouchableOpacity         
              onPress={this.onBackPress}             
              >
               <Icon style={styles.iconDate} name="close" color="white" size={35}/>
           </TouchableOpacity>      
           
          </View>   
          <View style={{flex:1}}>          
            <WebView
              ref={WEBVIEW_REF}            
              onLoad={() => this.hideSpinner()}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              decelerationRate="fast"
              onNavigationStateChange={this.onNavigationStateChange.bind(this)}
              source={{uri: 'http://controldiamante.com'}}
              
          /> 
            {this.state.loading && (
              <ActivityIndicator
                style={styles.activity}
                size="large"
                color="#1565c0"
              />
              )}
              
                   
       
              
         </View>
            
         </View>
            
    
      )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5FCFF',
    },
    topbar: {
      height: 56,
      flexDirection: 'row',
      backgroundColor: '#1565c0',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 10,
    },
    topbarTextDisabled: {
      color: 'gray'
    },
    title:{    
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold'
    },
    activity:{        
      backgroundColor: 'white',
      paddingVertical: 10,
      justifyContent: 'center',
      alignContent: 'center',
    
    }
  });

export default connect(null) (Website);