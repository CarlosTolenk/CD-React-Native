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
        identificación: this.props.valueStart,
        length: this.props.valueStart.length,         
        color: '#1565c0',
        error: false,
        isComplete: false            
        };    
    }

    componentDidMount(){
        console.log("Montando el component" + this.state.identificación);
        if(this.state.identificación.length >= 8){
            this.setState({
                color: 'green',
                error: false,
                isComplete: true   
            })
            this.props.isCorrect({
                correct: true,
                type: 'passporte',
                text: this.state.identificación 
            })
        }
    }

    formtedCedula = (text) => {
        this.setState({
            identificación: text,
            length : text.length,
            color: '#1565c0',
            error: false,
            isComplete: false       
        })  
    }

    endCedulaEditing = () => {
    if(this.state.length >= 8){
        this.setState({
            color: 'green',
            error: false,
            isComplete: true       
            })
        this.props.isCorrect({
            correct: true,
            type: 'passporte',
            text: this.state.identificación  
        })
        }else{
        this.setState({
            color: 'red',
            error: true,
            isComplete: true       
          })
          this.props.isCorrect({
            correct: false,
            type: 'passporte',
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
                value={this.state.identificación}   
                editable = {true}           
                clearTextOnFocus = {true}
                onEndEditing ={this.endCedulaEditing}
                placeholder='Ej: G-568568-6'
                placeholderTextColor = '#888'                 
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
                <Text style={styles.error}>**Debe contener al menos 8 caracteres**</Text>    
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