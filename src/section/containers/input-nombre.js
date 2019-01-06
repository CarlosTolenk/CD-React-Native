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
           error: false     
          };    
    }

    formtedNombre = (text) => {  
        this.setState({
            nombre: text,
            length : text.length,
            color: '#1565c0',
            error: false
        })  
    }

    endNombreEditing = () => {
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
             <Text style={styles.title}>Ingrese su nombre:</Text>
             <View style={styles.containerTextInput}> 
                <Icon style={styles.Icon} name="account" size={30} color={this.state.color}/>  
                <TextInput       
                onFocus={this.props.onFocusInput} 
                onChangeText={(text) => this.formtedNombre(text)}
                value={this.state.nombre}   
                editable = {true}   
                clearTextOnFocus = {true}
                onEndEditing ={this.endNombreEditing}
                placeholder='Joseph Tavárez'
                placeholderTextColor = '#888'           
                underlineColorAndroid = {this.state.color}
                style={styles.input}   
                />  
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




   


  export default connect(null) (InputNombre);