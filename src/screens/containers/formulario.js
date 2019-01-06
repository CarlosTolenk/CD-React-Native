import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TextInput,
  StatusBar,
  Button,
  BackHandler,
} from 'react-native';

//Component
import Cedula from '../../section/containers/input-cedula';
import Celular from '../../section/containers/input-celular';

//Plugin
import {connect} from 'react-redux';
import { NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';


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

let Gender = t.enums({
  M: 'Cédula',
  F: 'Pasaporte',
  O: 'Otro'
});

// here we are: define your domain model
let Person = t.struct({
    Tipo: Gender,
    Nombre_Completo: t.String,              // a required string
    Identificación: t.Number,                 // an required string
    Celular: t.Number,               // a required number     
   
});

let options = {
    fields: {
        Nombre_Completo: {
            help: 'Debes ingresar tu nombre completo', 
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
          alignSelf: 'center'
          
        },
    };   

  
  constructor(props) {
    super(props);
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
    // console.log(item); 

    return ( 
        <View style={styles.container}>

          <Cedula/>
          <Celular/>

          <View>
            {/* <Text style={styles.title}>Ingrese su cédula:</Text>
             <View style={styles.containerTextInput}>
                <Icon style={styles.Icon} name="account" size={30} color="#1565c0"/> 
                <TextInput        
    
              
       
                maxLength = {13}
            
         
                placeholder='031-1234567-6'
                placeholderTextColor = '#888'
                keyboardType="number-pad"      
       
                />  
             </View> */}
            </View>
          
            {/* <Form
                ref="form"
                type={Person}
                options={options}
            /> */}
            {/* <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#48BBEC'>
            <Text style={styles.buttonText}>Enviar</Text>
            </TouchableHighlight> */}
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
    }, 
  });

export default connect(null) (Formulario);