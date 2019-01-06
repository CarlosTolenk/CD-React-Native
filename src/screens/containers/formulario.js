import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Picker,
  TextInput,
  StatusBar,
  Button,
  BackHandler,
  Dimensions,
  KeyboardAvoidingView
} from 'react-native';

//Component
import Cedula from '../../section/containers/input-cedula';
import Celular from '../../section/containers/input-celular';
import Nombre  from '../../section/containers/input-nombre';
import Passporte from '../../section/containers/input-passport';

//Plugin
import {connect} from 'react-redux';
import { NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';

const {width, height} = Dimensions.get('window');


let informacion = {
    amount: '',
    suscription: '',
    client: '',
    cedula: '',
    movil: '',
    sku: ''
};
let item = {};



class Formulario extends Component {
    
  static navigationOptions = ({navigation}) => {
    return {     
            title: `Formulario de Compra`,
            headerStyle: {
                backgroundColor: '#1565c0',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        };        
  }  
  
  constructor(props) {
    super(props);
    this.state = {
      identificacion: 'cedula',
      heightTop: 0
    }
  }

  onPress = () =>  {
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

  onFocusInput = (target) => {
    if(target == 'nombre')this.setState({heightTop: height/-3})
    if(target == 'cedula') this.setState({heightTop: height/-8})   
    if(target == 'celular')this.setState({heightTop: 0})     
       
    
  }
 

  render() {
    const { navigation } = this.props;
     item = navigation.getParam('item', 'NO-ID');   
    // console.log(item); 

    return ( 
      <KeyboardAvoidingView
      // contentContainerStyle = {styles.keyboard}
      keyboardVerticalOffset={this.state.heightTop}          
      style = {styles.container}
      behavior = "position" >      

    
          <Nombre onFocusInput={() => {this.onFocusInput('nombre')}}  />
          <View style={styles.containerPicker}>
          <Text>Selecciona el tipo de documento de identidad</Text>
            <Picker
              selectedValue={this.state.identificacion}
              style={styles.picker}  
              onValueChange={(itemValue, itemIndex) => this.setState({identificacion: itemValue})}>
              <Picker.Item label="Cédula" value="cedula" />
              <Picker.Item label="Pasporte u Otra" value="identificacion" />
            </Picker>
          </View> 


          {
            this.state.identificacion == 'cedula' ?
               <Cedula onFocusInput={() => {this.onFocusInput('cedula')}}  /> 
               :
               <Passporte onFocusInput={() => {this.onFocusInput('cedula')}} />   

          }

         
        



          <Celular onFocusInput={() => {this.onFocusInput('celular')}} />
         





    


              <TouchableOpacity style={styles.button} onPress={this.onPress} underlayColor='#48BBEC' disabled={true}>
              <Text style={styles.buttonText}>Enviar</Text>
              </TouchableOpacity>      
 
        </KeyboardAvoidingView>
    )
  }
}


var styles = StyleSheet.create({
    container: {
      flex:1,     
      marginTop: 20,
      padding: 20,
      backgroundColor: '#fefefe',
    },
    containerPicker:{
      marginVertical: 5,
    },
    buttonText: {
      fontSize: 18,
      color: 'white',
      alignSelf: 'center'
    },
    picker:{
      // height: 50,
      // width: 350,
      color: '#1565c0' 
    },
    button: {
      height: 36,
      backgroundColor: '#1565c0',
      borderColor: '#48BBEC',
      borderWidth: 1,
      borderRadius: 8,
      marginTop: 15, 
      justifyContent: 'center'
    },  
    keyboard:{ 
      marginTop: -50,   
    } 
  });

export default connect(null) (Formulario);