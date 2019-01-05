import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  StatusBar,
  Button,
  BackHandler,
  Dimensions,
  WebView
} from 'react-native';

//Plugin
import {connect} from 'react-redux';
import { NavigationActions } from 'react-navigation';

const url = 'https://api-crm-control-diamante.herokuapp.com/api/register-payment';
// const urlPay = 'https://www.google.com/';
const urlPay = 'https://api-crm-control-diamante.herokuapp.com/api/payment-paypal';



const {width, height} = Dimensions.get('window');

class WebPaypal extends Component {
    
    static navigationOptions = {
        header: null
    };
  
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  } 

  componentDidMount(){

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

  // onLoad = () =>{
  //   console.log("Cargado la M")    

  // }

  render() {
    const { navigation } = this.props;
     item = navigation.getParam('item', 'NO-ID');   
    console.log(item);

    return ( 
        <View style={styles.container}>    
        {
          this.state.loading ? <Text>MMMM</Text>

          :
          <WebView
          onLoadEnd={this.onLoad}     
           source={{uri: urlPay}}
           javaScriptEnabled={true}
           domStorageEnabled={true}
           startInLoadingState={true}        
          />
        }
        
        </View>
    )
  }
}


var styles = StyleSheet.create({
    container: {
      height: height
    },
  
  });

export default connect(null) (WebPaypal);