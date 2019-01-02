import React, {Component} from 'react';
var PropTypes = require('prop-types');
import { Button, Linking, Image, Text, StyleSheet, View, TouchableOpacity } from 'react-native';

class SocialOpen extends Component{

    static propTypes = {
        url : PropTypes.string,
    };

    handleOpenURL = () => {
    Linking.canOpenURL(this.props.url).then(supported => {
        if(supported){
        Linking.openURL(this.props.url);
        }
    })
    }

  render(){
        return (   
            <TouchableOpacity
                onPress={this.handleOpenURL}
            >            
                <Image 
                    style={styles.socialImage}
                    source={this.props.image}
                />  
                 <Text style={styles.socialName}>{this.props.socialName}</Text>   
            </TouchableOpacity>
        )
    }
}


const styles = StyleSheet.create({
    socialImage:{
        width:36,
        height:36,
        resizeMode: 'contain',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        marginLeft: 5,
      },
      socialName:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        textAlign: 'center',
        fontSize:12,
        color: '#1D387A',   
        marginBottom: 16,
        // marginLeft: -5,
      },

});

export default SocialOpen;