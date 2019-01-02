import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

function ProgressBar (props) {
  return (
    <View style={styles.container}>
      <View style={styles.progress}></View>
      <View style={styles.ball}></View>   
    </View>
  )
}

const styles = StyleSheet.create({

  container:{
    position: 'relative',
    width: '70%',
    top: 2,
    left:0,
  },
  progress: {   
    borderTopColor: '#1565c0',
    borderTopWidth: 2,
  },
  ball:{
    position: 'absolute',
    top:-5,
    left:0,
    width:12,
    height:12,
    backgroundColor: '#1565c0',
    borderRadius: 10,
     
  }
})

export default ProgressBar;