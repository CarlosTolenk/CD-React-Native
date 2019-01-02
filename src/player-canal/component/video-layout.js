import React from 'react';
import {   
    View,
    Text,
    StyleSheet,
    Dimensions
} from 'react-native';

const  {width, height } =  Dimensions.get('window');

function VideoLayout(props){
    return(
        <View style={styles.container}>
            
            {
                props.showControl && props.navigation  
            }               

            <View style={styles.video}>
                 {props.video}
            </View>   
            <View style={styles.overlay}>
                {
                    props.loading &&
                    props.loader
                }    
            </View> 
           
            {props.showControl && props.controls}      
         
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        position: 'relative',
        paddingTop: '56.25%',       
        height: width,
        width: height,
    }, 
    overlay:{
        position:'absolute',
        left: 0,
        right:0,
        top:0,
        bottom:0,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    video:{
        position:'absolute',   
        right:0,
        top:0,
        bottom:0,
        left:0,    
        backgroundColor: 'black',     
    
    },
  
});

export default VideoLayout;