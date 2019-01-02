import React from 'react';
import {View, Text, StyleSheet} from 'react-native';


function BallLotery(props){

    function fillNumber(x){
        if(x < 10){
            return `0${x}`
        }
        else if(x == 100){
            return '00'
        }        
        else{
           return x
        }
    }

    const styles = StyleSheet.create({
        ball:{   
           
            padding: 10,
            marginHorizontal: 2.5,         
            backgroundColor: props.backgroundColor,
            borderRadius: 100,        
            shadowColor: '#000',
            shadowOffset: { width: 12, height: 13 },
            shadowOpacity: 1.0,  
            elevation: 7,   
          
        },    
        textNumber:{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',   
          color: props.color,
          fontSize: 16,
        },

    })
    
    return(
        <View style={styles.ball}>
            <Text style={styles.textNumber}>{fillNumber(props.number)}</Text>
        </View>
    )
   



}
export default BallLotery