import React, {Component} from 'react';
import {   
    View,
    Text,
    StyleSheet,
    Animated,    
    TouchableWithoutFeedback,
    TouchableOpacity
} from 'react-native';
//Library o Plugin
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

function LikeLayout (props){

  
    return(
        <View style={styles.container}>
            <TouchableWithoutFeedback
                onPress={props.onPress}                
                hitSlop={{top:20, right:20, left:20, bottom:20}}
            >
                {
                    props.liked ?                                     
                    <AnimatedIcon name="heart" style={[{fontSize: props.size, color: "red"}, styles.icon]} />                                                   
                    :      
                    <AnimatedIcon name="heart-outline" style={[{fontSize: props.size, color: "#003c8f"}, styles.icon]} />           
                    
                }            
            </TouchableWithoutFeedback>
        
            <Text style={styles.cantidad}>{props.cantidad}</Text>           
        </View>
    )  
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection: 'row',
        height:40,
    },
    icon:{
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        marginTop: -2,
    },
    cantidad:{
        fontSize: 20,
        marginLeft: 5,
    },
})

export default LikeLayout;