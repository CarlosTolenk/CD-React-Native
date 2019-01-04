import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableHighlight,
  StatusBar,
  Button,
  BackHandler,
} from 'react-native';

//Plugin
import {connect} from 'react-redux';
import { NavigationActions } from 'react-navigation';


const {width, height} = Dimensions.get('window');

class Verificación extends Component {
    
    static navigationOptions = {
        title: 'Verificación de Información',
        headerStyle: {
          backgroundColor: '#1565c0',
          paddingTop: 45,  
          paddingBottom: 25,  
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',               
        },
    };
  
  constructor(props) {
    super(props);
  } 

  checkoutFormualario = () => {
    this.props.dispatch(
      NavigationActions.navigate({
          routeName: 'WebPaypal',
          params: {
              item      
          }         
      })
    )     
  }

  render() {
    const { navigation } = this.props;
     item = navigation.getParam('informacion', 'NO-ID');   
    console.log(item);

    return ( 
        <View style={styles.container}>
             <View>
                 <Image source={{uri: item.detalles.imagen_url}} style={styles.image} />
             </View>
          
         
        </View>
    )
  }
}


var styles = StyleSheet.create({
    container: {
      flex:1,
      marginTop: 50,
      padding: 20,
      backgroundColor: '#fefefe',
    },
    image: {
      width: width/3,
        
      alignSelf: 'center'
    },
    button: {
      height: 36,
      backgroundColor: '#1565c0',
      borderColor: '#48BBEC',
      borderWidth: 1,
      borderRadius: 8,
      marginBottom: 10,
      alignSelf: 'stretch',
      justifyContent: 'center'
    }
  });

export default connect(null) (Verificación);