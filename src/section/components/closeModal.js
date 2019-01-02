import React from 'react';
import {connect} from 'react-redux';

import { TouchableWithoutFeedback, TouchableHighlight, TouchableOpacityBase, TouchableNativeFeedback, Button, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';

function CloseModal (props){  
    return(
        <TouchableWithoutFeedback
             hitSlop={{top:5, right:5, left:5, bottom:5}}           
             onPress={props.close}>
                <Icon style={styles.closeModal} name="close" color="white" size={30}/>
        </TouchableWithoutFeedback>
    

    )

}

const styles = StyleSheet.create({
    closeModal:{
        position: 'absolute',
        right:0,
        top: 0,
        padding: 25,    
      },
      backgroundColor:{
          backgroundColor: 'red'
      }
})

export default CloseModal