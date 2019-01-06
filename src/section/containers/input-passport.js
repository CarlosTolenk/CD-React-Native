import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  KeyboardAvoidingView,
  TextInput,
  StatusBar,
  Button,
  BackHandler,
} from 'react-native';

//Plugin
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

class InputPassporte extends Component {

    constructor(props) {
        super(props);
        this.state = {
           identificación: '',
           length: 0,         
           color: '#1565c0',
           error: false     
          };    
    }

    formtedCedula = (text) => {
        this.setState({
            identificación: text,
            length : text.length,
            color: '#1565c0',
            error: false
        })  
    }

    endCedulaEditing = () => {
    if(this.state.length >= 8){
        this.setState({
            color: 'green',
            error: false
            })
        }else{
        this.setState({
            color: 'red',
            error: true
            })
        }      
    }

    render() {
        return(            
            <View style={styles.container}>
             <Text style={styles.title}>Ingrese su identificación:</Text>
             <View style={styles.containerTextInput}> 
                <Icon style={styles.Icon} name="account-card-details" size={30} color={this.state.color}/>    
                <TextInput  
                onFocus={this.props.onFocusInput}       
                onChangeText={(text) => this.formtedCedula(text)} 
                value={this.state.cedula}   
                editable = {true}           
                clearTextOnFocus = {true}
                onEndEditing ={this.endCedulaEditing}
                placeholder='G-568568-6'
                placeholderTextColor = '#888'                 
                underlineColorAndroid = {this.state.color}
                style={styles.input}   
                />  
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


  export default connect(null) (InputPassporte);