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
  ScrollView,
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
    identificacion: '',
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
                height: 70,  
                paddingTop: 10,
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
      heightTop: 0,
      isName: false,
      isCell: false,
      isPassport: false,
      isCedula: false,
      onSubmit: false,    
      isActive: false,
      name: '',
      cell: '',
      cedula: '',
      passport: ''
    }
  }

  onPress = () =>  {
    let cedula;
    let passport;
    let sku

    if(this.state.cedula.length > 0)  cedula = this.state.cedula
    if(this.state.passport.length > 0) passport =  this.state.passport
    if(item.cantidad_numero){
      sku = 'PLAN'
    }else{
      sku = 'EVENTO'
    }

      informacion = {
        amount: item.precio,
        suscription: item.nombre_plan,
        cedula : cedula,
        identificacion: passport,
        sku,
        client: this.state.name,     
        movil: this.state.cell, 
      }
      console.log(informacion)
       this.clearFormated(informacion);   

  }  


  clearFormated = (informacion) => {
    //Formated Price
    let clear = informacion.amount.replace("RD$", ''); 
    clear = clear.replace(',', '')
    let price = parseInt(clear, 10)
    informacion.amount = price;
    informacion.detalles = item;

    //Formated Cell
    let cell = informacion.movil.replace("-", "")
    cell =  cell.replace("-","")
    informacion.movil = cell   

    this.props.dispatch(
      NavigationActions.navigate({
          routeName: 'Verificacion',
          params: {
            informacion      
          }         
      })
    )

    console.log(informacion); 
  }

  onFocusInput = (target) => {
    if(target == 'nombre')this.setState({heightTop: height/-3})
    if(target == 'cedula') this.setState({heightTop: height/-8})   
    if(target == 'celular')this.setState({heightTop: 0})          
    
  }

  getInformation = (status) => {
    console.log(status);

    //Verificar Nombre
    if(status.type == 'nombre'){
      if(this.state.isCell && (this.state.isPassport || this.state.isCedula)){
        this.setState({       
          isName: status.correct,
          name: status.text,
          onSubmit: true
        })
      }else{
        this.setState({       
          isName: status.correct,
          name: status.text,
        })      
      }    
    } 

    //Verificar Celular  
    if(status.type == 'cell'){
      if(status.correct){
        if(this.state.isName && (this.state.isPassport || this.state.isCedula)){
          this.setState({       
            isCell: status.correct,
            cell: status.text,
            onSubmit: true
          })
        }else{
          this.setState({       
            isCell: status.correct,
            cell: status.text,
          })   
        }   
      }else{
        this.setState({        
          onSubmit: false
        })
      }          
    }
    
    //Verificar Cédula
    if(status.type == 'cedula'){
      if(status.correct){
        if(this.state.isName && this.state.isCell) {
          this.setState({       
            isCedula: status.correct,
            cedula: status.text,
            onSubmit: true
          }) 
        }else{
          this.setState({       
            isCedula: status.correct,
            cedula: status.text,
          }) 
        } 
      }else{
        this.setState({        
          onSubmit: false
        })
      }        
    } 

     //Verificar Passorte
    if(status.type == 'passporte'){ 
      if(status.correct){
        if(this.state.isName && this.state.isCell) {
          this.setState({       
            isPassport: status.correct,
            passport: status.text,
            onSubmit: true
          })
        }else{
          this.setState({       
            isPassport: status.correct,
            passport: status.text,
          }) 
        }    
      }else{
        this.setState({        
          onSubmit: false
        })
      }  
    } 
     
    
  }

  // onCheckSubmit = () => {
  //   if(this.state.isCell){
  //     this.setState({
  //       isActive: 'red',
  //       onSubmit: true
  //     })
  //   }
  // }
 

  render() {
    const { navigation } = this.props;
     item = navigation.getParam('item', 'NO-ID');   
     isActive =  this.state.isActive;
    // console.log(item); 

    return ( 
      <ScrollView>
      <KeyboardAvoidingView  
        keyboardVerticalOffset={this.state.heightTop}          
        style = {styles.container}
        behavior = "position" > 
          <Nombre onFocusInput={() => {this.onFocusInput('nombre')}} 
             isCorrect={(status) => this.getInformation(status)}   
          />
          <View style={styles.containerPicker}>
          <Text style={styles.titlePicker}>Selecciona el tipo de documento de identidad</Text>
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
               <Cedula onFocusInput={() => {this.onFocusInput('cedula')}}
                  isCorrect={(status) => this.getInformation(status)}   
                  valueStart={this.state.cedula}
               /> 
               :
               <Passporte onFocusInput={() => {this.onFocusInput('cedula')}}
                   isCorrect={(status) => this.getInformation(status)}   
                   valueStart={this.state.passport}
               />   

          }
          <Celular onFocusInput={() => {this.onFocusInput('celular')}}  
             isCorrect={(status) => this.getInformation(status)}   
         />
          <TouchableOpacity style={styles.button} onPress={this.onPress}
             style={[styles.button, {backgroundColor: this.state.onSubmit ? '#1565c0': 'rgba(21, 101, 192, 0.3)'}]}   
              disabled={
                !this.state.onSubmit
                }> 
             <Text style={styles.buttonText}>Enviar</Text>
          </TouchableOpacity>      
 
      </KeyboardAvoidingView> 
      </ScrollView> 
    )
  }  
}

var styles = StyleSheet.create({ 
    container: {
      flex:1,     
      paddingTop: height - (height - 55),
      paddingHorizontal: 20, 
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
      // textDecorationLine: 'underline',
      color: '#1565c0',
      // fontWeight: 'bold'
    },
    titlePicker:{
      fontSize: 14,
      color: '#1565c0'
    },
    button: {
      height: 36,
      borderColor: '#eeee', 
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