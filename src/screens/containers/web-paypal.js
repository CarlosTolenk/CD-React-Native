import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  StatusBar,
  Button,
  BackHandler,
} from 'react-native';

//Plugin
import {connect} from 'react-redux';
import { NavigationActions } from 'react-navigation';

class WebPaypal extends Component {
    
    static navigationOptions = {
        title: 'Verificación de Información',
        headerStyle: {
          backgroundColor: '#1565c0',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',          
        },
    };
  
  constructor(props) {
    super(props);
  } 

  render() {
    const { navigation } = this.props;
     item = navigation.getParam('item', 'NO-ID');   
    console.log(item);

    return ( 
        <View style={styles.container}>
          
            <Form
                ref="form"
                type={Person}
                options={options}
            />
            <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#48BBEC'>
            <Text style={styles.buttonText}>Enviar</Text>
            </TouchableHighlight>
        </View>
    )
  }
}


var styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      marginTop: 50,
      padding: 20,
      backgroundColor: '#fefefe',
    },
    buttonText: {
      fontSize: 18,
      color: 'white',
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

export default connect(null) (WebPaypal);