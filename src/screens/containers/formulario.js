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


//Form
// const t = require('tcomb-form-native');
import t from 'tcomb-form-native';
const Form = t.form.Form;

let informacion = {
    amount: '',
    suscription: '',
    client: '',
    cedula: '',
    movil: '',
    sku: ''
};
let item = {};

// here we are: define your domain model
let Person = t.struct({
    Nombre_Completo: t.String,              // a required string
    Identificación: t.Number,                 // an required string
    Celular: t.Number,               // a required number     
});

let options = {
    fields: {
        Nombre_Completo: {
            help: 'Debes ingresar tu nombre completo'
        },
        Identificación: {
            help: 'Debes ingresar tu cédula o tu pasaporte'
        },
        Celular: {
            help: 'Ejemplo +1809555555'
        }

    }
}; // optional rendering options (see documentation)



class Formulario extends Component {
    
    static navigationOptions = {
        title: 'Formulario de Registro',
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

   

  
  constructor() {
    super();
  }

  onPress = () =>  {
    // call getValue() to get the values of the form
    var value = this.refs.form.getValue();
    if (value) { // if validation fails, value will be null     

        informacion = {
            amount: item.precio,
            suscription: item.nombre_plan,
            client: value.Nombre_Completo,
            cedula: value.Identificación,
            movil: value.Celular,
            sku: 'PLAN'
        }
     this.clearFormated(informacion);
    }
  }


  clearFormated = (informacion) => {
    let clear = informacion.amount.replace("RD$", ''); 
    clear = clear.replace(',', '')
    let price = parseInt(clear, 10)
    informacion.amount = price;
    informacion.detalles = item
    console.log("Navegando");

    this.props.dispatch(
      NavigationActions.navigate({
          routeName: 'Verificacion',
          params: {
            informacion      
          }         
      })
    )  

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

export default connect(null) (Formulario);