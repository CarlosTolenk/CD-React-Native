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
  PixelRatio
} from 'react-native';

//Plugin
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
// import CountryPicker, {getAllCountries} from 'react-native-country-picker-modal';
// import DeviceInfo from 'react-native-device-info';
// import CountryCodePicker from 'react-native-country-code-picker';

import PhoneInput from 'react-native-phone-input';
import CountryPicker from 'react-native-country-picker-modal';
// import ModalPicker from 'react-native-modal-picker'  


let codigoArea = 1;

class InputCell extends Component {

    constructor(props) {
      super(props);
      this.state = {
          plain: '',
          cell: '',
          length: 0,         
          color: '#1565c0',
          cca2: 'do',
          callingCode: '1',
          error: false,
          isComplete: false,
          correct: false            
     };          
          

    this.onPressFlag = this.onPressFlag.bind(this);
    this.selectCountry = this.selectCountry.bind(this);
  
       
    }

    componentDidMount() {
        this.setState({
          pickerData: this.phone.getPickerData(),
        });
      }
    
      onPressFlag() {
        this.countryPicker.openModal();
      }
    
      selectCountry(country) {
        this.phone.selectCountry(country.cca2.toLowerCase());
        if(country.cca2 == 'DO'){  
          codigoArea =  1;
          this.setState({
            cca2: country.cca2 ,
            callingCode: '1'   
           });
        }else{
          console.log("Cambiando el codigo" + country.callingCode) 
          codigoArea =  country.callingCode;
          this.setState({
            cca2: country.cca2 ,
            callingCode: country.callingCode
           });
        }

        this.endCellEditing()
     
      }

    formtedCell = (text) => {
        this.setState({
            color: '#1565c0',
            error: false,
            isComplete: false,
            plain: text   
         })  
        if(this.state.length <= text.length){
          if(text.length == 3 || text.length == 4 ||  text.length == 7  || text.length == 8 ){
    
            if(text.length == 3){   
              // console.log(text.length);
              text = `${text}-`
              this.setState({
                cell: text,
                length : text.length
              }) 
            }  
    
            if(text.length == 4){   
              // console.log(text.length);
              if(text.charAt(3) == '-'){
                console.log("No es necesario"); 
              }else{
                console.log("Si es necesario");
                let oldText = text.slice(0,3);
                let lastChartText = text.slice(3);
                console.log('Este son los caracteres viejos' + oldText); 
                console.log('Este es el útimo caractet' + lastChartText); 
                let newText = `${oldText}-${lastChartText}`  
                console.log(newText.length);
                console.log('Completo'+newText)
                this.setState({
                  cell: newText,
                  length : newText.length
                }) 
              }    
            }  
        
    
            if(text.length == 7){ 
              // console.log(text.length);
              text = `${text}-`
              this.setState({    
                cell: text,
                length : text.length
              }) 
            }  
     
            if(text.length == 8){          
              // console.log(text.length);
              if(text.charAt(7) == '-'){
                console.log("No es necesario");   
              }else{  
                console.log("Si es necesario");
                let oldText = text.slice(0,7); 
                let lastChartText = text.slice(7);
                console.log('Este son los caracteres viejos' + oldText); 
                console.log('Este es el útimo caractet' + lastChartText); 
                let newText = `${oldText}-${lastChartText}`  
                console.log('Completo'+newText)
                this.setState({
                  cell: newText,
                  length : newText.length  
                }) 
              }    
            }  
    
          }else{       
            // console.log(text.length)   
            this.setState({
              cell: text,
              length : text.length,   
            })    
          } 
    
         
    
    
        }else{
          // console.log("Borando");
          if(text.length == 4 || text.length == 8){
         
            let newText = text.substring(0, text.length -1)      
            // console.log(newText.length);
    
            this.setState({ 
              cell: newText,
              length : newText.length
            })
    
          }else{
            // console.log(text.length);
            this.setState({
              cell: text,
              length : text.length,    
            })   
          }
          
          
          if(text.length < 1){
            this.setState({
                color: '#1565c0',
                error: false,
                isComplete: false    
             })           
          }
        }      
    }  

    endCellEditing = () => {
       if(this.state.length == 12){       
        this.setState({
            color: 'green',
            error: false,
            isComplete: true,
            correct: true    
         })
        this.props.isCorrect({
          correct: true,
          type: 'cell',
          text: `+${codigoArea}${this.state.cell}` 
        })
       }else{
        this.setState({
            color: 'red',
            error: true,
            isComplete: true,
            correct: false    
         })
         this.props.isCorrect({
           correct: false,
           type: 'cell',
         }) 
       }

    
      //  console.log(this.state.cell); 
      //  console.log(this.state.cca2);
      
    }

    render() {
        return(
          <View style={styles.container}>
             <Text style={styles.title}>Ingrese su celular:</Text>
             <View style={styles.containerTextInput}>
              <PhoneInput
                  ref={(ref) => {this.phone = ref;}}
                  onPressFlag={this.onPressFlag}/>                
                  <TextInput        
                  onChangeText={(text) => this.formtedCell(text)}
                  value={this.state.cell}   
                  editable = {true}
                  maxLength = {12}
                  onFocus={this.props.onFocusInput} 
                  clearTextOnFocus = {true}
                  onEndEditing ={this.endCellEditing}
                  placeholder='Ej: 809-555-5555' 
                  placeholderTextColor = '#888'
                  keyboardType="number-pad"      
                  underlineColorAndroid = {this.state.color}
                  style={styles.input}   
                  // isCorrect={this.props.isCorrect(this.state.isCorrect)}
                  />     

                  {
                    this.state.isComplete ?                    
                      this.state.error ? 
                        <Icon style={styles.Icon} name="close" size={20} color={this.state.color}/>      
                        :
                        <Icon style={styles.Icon} name="check" size={20} color={this.state.color}/>  
                    :null    
                  }            
             </View>  

              <CountryPicker
                ref={(ref) => {
                  this.countryPicker = ref;
                }}
                  onChange={value => this.selectCountry(value)}
                  translation="eng"  
                  cca2={this.state.cca2}            
              >
                <View />
              </CountryPicker>

            {
              this.state.error ?
              <Text style={styles.error}>**Formato inválido**</Text>  
              :
              null
            }      
         </View>     

        )
    }
}



const styles = StyleSheet.create({
  container:{
    padding: 5,
    marginBottom: 5,  
  },
    title:{
       fontSize: 20,
       fontWeight: 'bold',    
    },
    input: {
      fontSize: 18, 
      borderWidth: 1, 
      borderColor: "transparent",
      flex:1
    },
    containerTextInput:{ 
      flexDirection: 'row',   
          
    },
    Icon:{
        alignSelf: 'center'
    },
    error:{
      marginLeft:40, 
      fontSize:14,
      color: 'red'
    }
  });


  export default connect(null) (InputCell);