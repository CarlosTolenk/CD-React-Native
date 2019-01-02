import React from 'react';
import {  
    View,
    StyleSheet,
    Dimensions
} from 'react-native';

const width = Dimensions.get('window').height;

function ControlLayout(props){
    return(
        <View style={styles.container}>
            {props.children}
        </View>      
    )

}
const styles = StyleSheet.create({
    container:{
        backgroundColor: 'rgba(0,0,0,0.35)',
        position: 'absolute',            
        bottom:0,
        left:0,
        height:45,
        width: width,
        flexDirection: 'row',
        paddingHorizontal: 10,
        alignItems: 'center',
    },
    
});

export default ControlLayout;