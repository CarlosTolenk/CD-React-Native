//Core
import React, {Component } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    TouchableWithoutFeedback,
    Image,
    StyleSheet
} from 'react-native';
//Library o Plugin
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationActions } from 'react-navigation';

//Component

function HeaderGeneral(props)  { 

    const styles = StyleSheet.create({
        box:{  
        borderColor: props.border,
        borderBottomWidth: 2,
        shadowColor: '#000',
        shadowOffset: { width: 20, height: 40 },
        shadowOpacity: 1.0,  
        elevation: 5,    
        },
        safeArea:{
            backgroundColor: props.colorHeader,
        },
        container:{
            shadowColor: '#000',
            shadowOffset: { width: 10, height: 10 },
            shadowOpacity: 1,      
            elevation: 10,
            flexDirection: 'row',
            paddingTop:18,
           
            padding: 10,
            justifyContent: 'space-between',
            alignContent: 'center',    
            height: 56, 
        },   
        logo: {
            width: 40,
            height: 40,
         
        },
        center: {            
            padding: 10,            
            justifyContent: 'center',
            alignContent: 'center',      
        },
        headerTitle: {
            color: 'white',
            fontSize: 20,  
            fontWeight: 'bold'   
          },
        right:{       
            width: 50,
            height: 50,                         
            alignItems: 'center',
        }
    });

    return(
        <View style={styles.box}>         
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.container}>
                    <View                                     
                        style={styles.logo}
                    />
                    <View style={styles.center}>
                        <Text style={styles.headerTitle}>{props.title}</Text>
                    </View>   
                    <View style={styles.right}></View>
                </View>                      
            </SafeAreaView>         
        </View>
    )   
}

export default  HeaderGeneral;