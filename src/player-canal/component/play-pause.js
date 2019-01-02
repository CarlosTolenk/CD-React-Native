import React from 'react';
import {   
    TouchableHighlight,
    TouchableOpacity,
    StyleSheet,
    Text
} from 'react-native';

//Library o Plugin
import Icon from 'react-native-vector-icons/dist/FontAwesome';

function PlayPause(props){
    return(
        <TouchableOpacity
            onPress={props.onPress}
            style={styles.container}
            hitSlop={{top:5, right:5, left:5, bottom:5}}
        >
            {
                props.paused ?
                <Icon name="play-circle" color="white" size={30}/>              
              
                :
                <Icon name="pause-circle" color="white" size={30}/>
            }
           
            
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button:{
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold'
    },
    container:{
        justifyContent: 'center',
        paddingHorizontal: 10,
        height: 35,

    }
})

export default PlayPause;