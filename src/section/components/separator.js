import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

function Separator(props){
    return(
        <View style={styles.container}>

        </View>

    )
}

const styles = StyleSheet.create({
    container:{
       borderTopWidth: 1,
       borderTopColor: '#eaeaea',
    },
    title:{

    }
})

export default Separator;