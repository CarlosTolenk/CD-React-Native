import React from 'react';
import {   
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

//Library o Plugin
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

function SharedLayout(props){
    return(         
            <TouchableOpacity
            onPress={props.onPress}            
            hitSlop={{top:20, right:20, left:20, bottom:20}}
           
            >
                <View style={styles.container}>
                    <Icon style={styles.icon} name="share-outline" color="#003c8f" size={30}/>
                    <Text style={styles.sharedTitle}>Compartir</Text>
                </View>
                
            </TouchableOpacity>
            
       
    )
}

const styles = StyleSheet.create({
    container:{
        flex:0.8,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
        height:40,    
     
    },
    icon:{
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',

    },
    sharedTitle:{
        fontSize: 20,
        alignItems: 'center',
   
    },
   
})

export default SharedLayout;