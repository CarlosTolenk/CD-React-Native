import React from 'react';
import {  
    Text, 
    View,
    StyleSheet,
    Dimensions,
    Image, 
    ActivityIndicator
} from 'react-native';

const {height, width} = Dimensions.get('window');
const widthImage = width*0.80;
const heightImage = height*0.45;

function Loading(props) {  
  
    return(
    <View style={styles.container}>          
        <Image
            source={require('../../../assets/launch.png')}
            style={styles.launch}
        />
        <ActivityIndicator color='white' size="large"/>     
        <Text style={styles.copyR}>©Control Diamante S.R.L</Text>     
    </View>
  )
  
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#1565c0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    launch:{       
        width:widthImage,
        height:heightImage,
        resizeMode: 'contain',
        marginBottom: 10,
    },
    copyR:{
        color: 'white',
        fontSize: 15,
        marginTop: 15,
        justifyContent: 'flex-end'
    }
})    



export default Loading