import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,  
  TouchableOpacity,
  Dimensions,
  WebView,
  Animated,
  Button
} from 'react-native';

//Plugin
import {connect} from 'react-redux';
import { NavigationActions } from 'react-navigation';
import CardView from 'react-native-cardview';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import IconF from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';

const url = 'http://159.65.111.29/api/register-payment';
// const urlPay = 'https://www.google.com/';
const urlPay = 'http://159.65.111.29/api/payment-paypal';
const injectJS = "document.querySelector('h1').style.backgroundColor = 'red';";
let webViewStatus = true;


const {width, height} = Dimensions.get('window');

class WebPaypal extends Component {
 
    
    static navigationOptions = {
        header: null
    };
  
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      webview: true,
      status: false,
      fadeAnim: new Animated.Value(0),  // Initial value for opacity: 0
    }
  } 

  componentDidMount(){
    Animated.timing(                  // Animate over time
      this.state.fadeAnim,            // The animated value to drive
      {
        toValue: 1,                   // Animate to opacity: 1 (opaque)
        duration: 100,              // Make it take a while
      }
    ).start();      

    const object = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
        body: JSON.stringify({
          amount: item.amount,
          suscription: item.suscription,
          client: item.client,
          identificacion: item.identificacion,    
          cedula: item.cedula,
          movil: item.movil,
          sku: item.sku
        }),
    }

    console.log("Haciendo la petición");
    fetch(url, object)
    .then((response) => {
      console.log(response)
      this.setState({
        loading: false
      })
    })
    .then((responseData) => {
       console.log(responseData) 
       this.setState({
        loading: false
      })
    })
    .catch(function(err) {console.log(err)});
   
  }

 handleNavigationChange(navState) {
  console.log("WebView:" +  webViewStatus)
    if (navState.title == 'success') { 
      webViewStatus = false;    
      this.setState({ webview: webViewStatus, status: true }); 
    } 
    if (navState.title == 'cancel') { 
      webViewStatus = false;   
      this.setState({ webview: webViewStatus, status: false });   
    }
    
 }

 changeStatusWebView(status){
   console.log("Cambiando el estadooo");  
    this.setState({
      webview: status   
    })  
   this.bounce();
  }

 renderLoadingView() {
  return ( 
    <View style={{flex:1, backgroundColor: '#1565c0'}}>  
        <ActivityIndicator 
        style={styles.loadingActivity}
        size="large" 
        color="#fff" 
      />
    </View>
    
    )
 }


  


  componentDidUpdate(prevProps, prevState) {    
    // One possible fix...   
    if (this.state.webview !== webViewStatus ) {
      this.setState({ webview: webViewStatus });
    }
    console.log('Update' + this.state.webview)
  }

  renderSuccess = () => {
    let { fadeAnim } = this.state;
    return(
      <View style={styles.containerToast}>
        {/* <Animated.View                 // Special animatable View
            style={{         
              opacity: fadeAnim,         // Bind opacity to animated value
            }}
          >
                 <Text style={styles.placesureCard}>Gracias por formar parte de la familia</Text>
          </Animated.View> */}  

       

      <Image 
          style={styles.logoIcon}
          source={require('../../../assets/diamante-icon.png')}
        />
      <View style={styles.placesure}>
        <Text style={styles.placesureCard}>Gracias por formar parte de la familia</Text>
        <Text style={[styles.placesureCard, styles.control]}>Control Diamante </Text>             
      </View>
    
        <CardView
          cardElevation={5}
          cardMaxElevation={7}
          cornerRadius={5}
          style={styles.cardView}>
        
        <Text style={styles.titleCard}>Su Transacción ha sido Completada.</Text>
        <Icon style={styles.iconCard} name="check" color="#43a047" size={40}/>  
        <Text style={styles.infoCard}>Estará recibiendo su línea a través de mensaje de texto en el transcurso del día</Text>

        <TouchableOpacity style={styles.buttonCard2} onPress={this.goToHome}>  
            <Icon style={styles.iconDate} name="home" color="white" size={20}/>      
            <Text style={styles.titleBtn}>Ir al Inicio</Text>  
        </TouchableOpacity>   

      </CardView>
    </View>
    )
  }

  renderError = () => {
    let { fadeAnim } = this.state;
    return(
      <View style={styles.containerToast}>


        {/* <Animated.View                 // Special animatable View
            style={{            
              opacity: fadeAnim,         // Bind opacity to animated value
            }}
          >
                 <Text style={styles.placesureCard}>Gracias por formar parte de la familia</Text>
          </Animated.View> */}

       

      <Image 
          style={styles.logoIcon}
          source={require('../../../assets/diamante-icon.png')}
        />
      <View style={styles.placesure}>   
        {/* <Text style={styles.placesureCard}>Gracias por formar parte de la familia</Text> */}
        <Text style={[styles.placesureCard, styles.control]}>Control Diamante </Text>             
      </View>
    
        <CardView
          cardElevation={5}
          cardMaxElevation={7}
          cornerRadius={5}
          style={styles.cardView}>
        
        <Text style={styles.titleCard}>Ha ocurrido un error en la transacción.</Text>
        <Icon style={styles.iconCard} name="cancel" color="#d32f2f" size={40}/>     
        <Text style={styles.infoCard}>Deberá realizar la transacción en otro momento</Text>
    
          <TouchableOpacity style={styles.buttonCard} onPress={this.goToHome}>  
            <Icon style={styles.iconDate} name="home" color="white" size={20}/>      
            <Text style={styles.titleBtn}>Ir al Inicio</Text>  
          </TouchableOpacity>    
 

              
      </CardView>
    </View>
    )
  }

  goToHome = () => {
    console.log("Ir a home")
    this.props.dispatch(
      NavigationActions.navigate({
          routeName: 'Home',
          params: {
              item      
          }         
      })
    ) 
  }



  render() {
    const { navigation } = this.props;
     item = navigation.getParam('item', 'NO-ID');     
     let { fadeAnim } = this.state;

      //<h1>Transaction successfull!</h1>

    return ( 
        <View style={styles.container}>    
        {
          this.state.loading ?
          <ActivityIndicator style={styles.loadingActivity} size="large" color="white" />

          :
            this.state.webview  ?  
            <WebView
              // ref={webview => {this.state.webview = webview;}} 
              onLoadEnd={this.onLoad}     
              source={{uri: urlPay}}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              startInLoadingState={true}       
              domStorageEnabled={false}
              onMessage={(event)=> console.log(event.nativeEvent.data)} 
              onNavigationStateChange={this.handleNavigationChange.bind(this)}
              // injectedJavaScript={injectJS}
              renderLoading={this.renderLoadingView}
            />
            :
               this.state.status ? 
                 this.renderSuccess()   
                :
                this.renderError()   
            
        }
        
        </View>

     
    )
  }
}


var styles = StyleSheet.create({
    container: {
      height: height,
      backgroundColor: '#1565c0', 
    },
    containerToast:{
      flex:1,
      paddingHorizontal: 10, 
      paddingVertical: 30,  
      backgroundColor: '#1565c0',     
      marginTop: 20 
      // justifyContent: 'ce nter', 
      // alignItems:'center'  
    },
    loadingActivity: {
      flex: 1,
      justifyContent: 'center',
      alignItems:'center'  
    },
    cardView:{         
      paddingHorizontal: 20,      
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems:'center',
      paddingBottom: 15, 
      marginHorizontal: 10,
    },    
    placesure:{
      padding:10,  
    },
    logoIcon:{
      width:'40%',
      height:'25%',
      resizeMode: 'contain',
      alignSelf: 'center'     
    },
    placesureCard:{      
      color: '#fff',
      fontSize: 20,
      paddingVertical: 10,
      textAlign: 'center',
      fontWeight: 'bold',
      marginTop: -10,
    },
    control:{
      marginBottom: 10,
    },
    titleCard:{
      paddingTop: 10,
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10, 
      textAlign: 'center',
    },
    iconCard:{
      marginBottom: 10,
    },
    buttonCard:{  
     flexDirection: 'row',
     backgroundColor: '#d32f2f', 
     width: '100%',   
     padding: 10, 
     paddingHorizontal: 10, 
     alignItems: 'center' ,
     justifyContent: 'center'
    },
    buttonCard2:{
      flexDirection: 'row',
      backgroundColor: '#43a047',   
      width: '100%',   
      padding: 10, 
      paddingHorizontal: 10, 
      alignItems: 'center' ,
      justifyContent: 'center'
    },
    titleBtn:{
      color: 'white',
      fontSize: 16
    },
    infoCard:{
      fontSize: 16, 
      textAlign: 'center',
      marginBottom: 20, 
    },
    iconDate:{
      marginRight: 10,
    }
  });

export default connect(null) (WebPaypal);