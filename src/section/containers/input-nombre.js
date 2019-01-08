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

class InputNombre extends Component {

    constructor(props) {
        super(props);
        this.state = {
           nombre: '',
           length: 0,         
           color: '#1565c0',
           error: false,
           isComplete: false   
          };    
    }

    formtedNombre = (text) => {  
        this.setState({
            nombre: text,
            length : text.length,
            color: '#1565c0',
            error: false,
            isComplete: false     
        })  
    } 

    endNombreEditing = () => {
       if(this.state.length >= 8){
        this.setState({
            color: 'green',
            error: false,
            isComplete: true   
         })
         this.props.isCorrect({
            correct: true,
            type: 'nombre',
            text: this.state.nombre  
          })
       }else{
        this.setState({
            color: 'red',
            error: true,
            isComplete: true    
         })
         this.props.isCorrect({
            correct: false,
            type: 'nombre',
          }) 
       }
      
    }

    render() {
        return(
            <View style={styles.container}>
             <Text style={styles.title}>Ingrese su nombre completo:</Text>
             <View style={styles.containerTextInput}> 
                <Icon style={styles.Icon} name="account" size={30} color={this.state.color}/>  
                <TextInput       
                onFocus={this.props.onFocusInput} 
                onChangeText={(text) => this.formtedNombre(text)}
                value={this.state.nombre}   
                editable = {true}   
                clearTextOnFocus = {true}
                onEndEditing ={this.endNombreEditing}
                placeholder='Ej: Joseph Tavárez'
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
       fontSize: 18,
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
        marginRight: 10,
        marginTop: 5,
    },
    error:{
      marginLeft:40, 
      fontSize:14,
      color: 'red'
    }
  });




   


  export default connect(null) (InputNombre);