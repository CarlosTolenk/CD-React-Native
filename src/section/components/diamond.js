import React from 'react';
import {View, Text, StyleSheet} from 'react-native';


function DiamondLotery(props){

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
        container:{
            paddingHorizontal: 5,        
            backgroundColor: 'transparent',
            shadowColor: '#000',
            shadowOffset: { width: 20, height: 20 },
            shadowOpacity: 0.7,  
            elevation: 10, 
        },
        cutDiamond: {
            marginTop: 7,
            width: 42,
            height: 42,
            position: 'relative',
            // zIndex: 10,     
            // shadowColor: '#000',
            // shadowOffset: { width: 10, height: 10 },
            // shadowOpacity: 1.0,  
            // elevation: 10,         
          },
          cutDiamondTop: {
            width: 40,
            height: 0,
            borderTopWidth: 0,
            borderTopColor: 'transparent',
            borderLeftColor: 'transparent',
            borderLeftWidth: 9,
            borderRightColor: 'transparent',
            borderRightWidth: 9,
            borderBottomColor: 'transparent',
            borderBottomWidth: 13.5, 
            borderBottomColor: '#1565c0',            
          },
          cutDiamondBottom: {
            width: 0,
            height: 0,
            borderTopWidth: 25,
            borderTopColor: '#1565c0',
            borderLeftColor: 'transparent',
            borderLeftWidth: 20,
            borderRightColor: 'transparent',
            borderRightWidth: 20,
            borderBottomColor: 'transparent',
            borderBottomWidth: 0,       
          },
          number:{
            position: 'absolute',
            left: '23%',
            top: '3%',
            color: 'white',
            fontSize: 16,
            zIndex: 100,
        },

    })
    
    return(    
        <View style={styles.container}>
            <View style={styles.cutDiamond}>
                <Text style={styles.number}>{fillNumber(props.number)}</Text>
                <View style={styles.cutDiamondTop} />        
                <View style={styles.cutDiamondBottom} />
            </View>   
        </View>
    )



}
export default DiamondLotery