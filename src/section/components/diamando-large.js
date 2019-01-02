import React from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';


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
        },
        cutDiamond: {
            marginTop: 7,
            width: 60,
            height: 60,
            position: 'relative',                  
          },
          cutDiamondTop: {
            width: 60,
            height: 0,
            borderTopWidth: 0,
            borderTopColor: 'transparent',
            borderLeftColor: 'transparent',
            borderLeftWidth: 13.5,
            borderRightColor: 'transparent',
            borderRightWidth: 13.5,
            borderBottomColor: 'transparent',
            borderBottomWidth: 18.75, 
            borderBottomColor: '#1565c0',            
          },
          cutDiamondBottom: {
            width: 0,
            height: 0,
            borderTopWidth: 37.5,
            borderTopColor: '#1565c0',
            borderLeftColor: 'transparent',
            borderLeftWidth: 30,
            borderRightColor: 'transparent',
            borderRightWidth: 30,
            borderBottomColor: 'transparent',
            borderBottomWidth: 0,       
          },
          number:{
            position: 'absolute',
            left: '30%',
            top: '7.5%',
            color: 'white',
            fontSize: 20,
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