import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';



function CardViewLayout(props){
    return(
        <View style={styles.container}>
            <Text style={styles.title}>{props.title}</Text>
            {props.children}
                  {/* <CachedImage
                        source={{uri: this.props.imagen_url}}
                        style={styles.stretch} 
                        resizeMode={'contain'}
                    />   */}
        </View>
    )   
}

const styles = StyleSheet.create({
    container:{
        flex:1,     
    },
    title:{
        color:'blue'
    }
});

export default CardViewLayout;