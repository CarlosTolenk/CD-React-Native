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
          cedula: this.props.valueStart,
          length: this.props.valueStart.length,          
          color: '#1565c0',
          error: false ,
          isComplete: false       
        };    
    }

    componentDidMount(){
      console.log("Montando el component");
      if(this.state.cedula.length == 13){
        this.setState({
            color: 'green',
            error: false,
            isComplete: true   
         })
         this.props.isCorrect({
          correct: true,
          type: 'cedula',
          text: this.state.cedula
        })
       }
    }

    formtedCedula = (text) => {
        this.setState({
            color: '#1565c0',
            error: false,
            isComplete: false   
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
              length : text.length,
              isComplete: false   
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
                color: '#1565c0',
                error: false
             })           
          }
        }
    }

    endCedulaEditing = () => {
       if(this.state.length == 13){
        this.setState({
            color: 'green',
            error: false,
            isComplete: true   
         })
         this.props.isCorrect({
          correct: true,
          type: 'cedula',
          text: this.state.cedula
        })
       }else{
        this.setState({
            color: 'red',
            error: true,
            isComplete: true   
         })
         this.props.isCorrect({
          correct: false,
          type: 'cedula',    
        })
       }      
    }

    render() {
        return(
            <View style={styles.container}>
             <Text style={styles.title}>Ingrese su cédula:</Text>
             <View style={styles.containerTextInput}> 
                <Icon style={styles.Icon} name="account-card-details" size={30} color={this.state.color}/>  
                <TextInput        
                onChangeText={(text) => this.formtedCedula(text)}
                value={this.state.cedula}   
                onFocus={this.props.onFocusInput}          
                editable = {true}
                maxLength = {13}
                clearTextOnFocus = {true}
                onEndEditing ={this.endCedulaEditing}
                placeholder='Ej: 031-1234567-6'
                placeholderTextColor = '#888'
                keyboardType="number-pad"      
                underlineColorAndroid = {this.state.color}
                style={styles.input}   
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
        alignSelf: 'center',
        marginRight: 10
    },
    error:{
      marginLeft:40, 
      fontSize:14,
      color: 'red'
    }
  });




   


  export default connect(null) (InputCedula);