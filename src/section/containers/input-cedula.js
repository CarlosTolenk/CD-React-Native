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

//Plugin
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

class InputCedula extends Component {

    constructor(props) {
        super(props);
        this.state = {
           cedula: '',
           length: 0,         
           color: '#1565c0'
          };    
    }

    formtedCedula = (text) => {
        this.setState({
            color: '#1565c0'
         })  
        if(this.state.length <= text.length){
          if(text.length == 3 || text.length == 4 ||  text.length == 11  || text.length == 12 ){
    
            if(text.length == 3){   
              console.log(text.length);
              text = `${text}-`
              this.setState({
                cedula: text,
                length : text.length
              }) 
            }  
    
            if(text.length == 4){   
              console.log(text.length);
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
                  cedula: newText,
                  length : newText.length
                }) 
              }    
            }  
        
    
            if(text.length == 11){ 
              console.log(text.length);
              text = `${text}-`
              this.setState({    
                cedula: text,
                length : text.length
              }) 
            }  
     
            if(text.length == 12){          
              console.log(text.length);
              if(text.charAt(11) == '-'){
                console.log("No es necesario");   
              }else{  
                console.log("Si es necesario");
                let oldText = text.slice(0,11); 
                let lastChartText = text.slice(11);
                console.log('Este son los caracteres viejos' + oldText); 
                console.log('Este es el útimo caractet' + lastChartText); 
                let newText = `${oldText}-${lastChartText}`  
                console.log('Completo'+newText)
                this.setState({
                  cedula: newText,
                  length : newText.length  
                }) 
              }    
            }  
    
          }else{       
            console.log(text.length)   
            this.setState({
              cedula: text,
              length : text.length
            })    
          } 
    
         
    
    
        }else{
          console.log("Borando");
          if(text.length == 4 || text.length == 12){
         
            let newText = text.substring(0, text.length -1)      
            console.log(newText.length);
    
            this.setState({ 
              cedula: newText,
              length : newText.length
            })
    
          }else{
            console.log(text.length);
            this.setState({
              cedula: text,
              length : text.length
            })   
          }
          
          
          if(text.length < 1){
            this.setState({
                color: '#1565c0'
             })           
          }
        }
    }

    endCedulaEditing = () => {
       if(this.state.length == 13){
        this.setState({
            color: 'green'
         })
       }else{
        this.setState({
            color: 'red'
         })
       }
      
    }

    render() {
        return(




            <View>
            <Text style={styles.title}>Ingrese su cédula:</Text>
             <View style={styles.containerTextInput}>
                <Icon style={styles.Icon} name="account" size={30} color={this.state.color}/> 
                <TextInput        
                onChangeText={(text) => this.formtedCedula(text)}
                value={this.state.cedula}   
                editable = {true}
                maxLength = {13}
                clearTextOnFocus = {true}
                onEndEditing ={this.endCedulaEditing}
                placeholder='031-1234567-6'
                placeholderTextColor = '#888'
                keyboardType="number-pad"      
                underlineColorAndroid = {this.state.color}
                style={styles.input}   
                />  
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
    title:{
       fontSize: 20,
       fontWeight: 'bold',
       marginBottom: 10,
       
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
    }
  });


  export default connect(null) (InputCedula);