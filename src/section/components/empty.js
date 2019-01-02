import React from 'react';
import {
    View, 
    Text,
    StyleSheet
} from 'react-native';

import Icon from 'react-native-vector-icons/dist/MaterialIcons';

function Empty (props) {
    return(
        <View style={styles.container}>
            <Icon style={styles.iconDate} name="date-range" color="#BDBDBD" size={65}/>
            <Text style={styles.title}>{props.text}</Text>
            <Text style={styles.title}>Estamos trabajando para dar el mejor servicio</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding: 20,
        marginVertical: 55,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title:{    
        fontSize: 19,
        color: '#BDBDBD',       
        fontWeight: 'bold',
        textAlign: 'center'
    },
    iconDate:{
        paddingVertical: 20,
    }
});

export default Empty;