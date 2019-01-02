import React, {Component} from 'react';
var PropTypes = require('prop-types');
import { Button, Linking, TouchableOpacity, Text } from 'react-native';

class OpenCall extends Component{

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
            
            <Button                               
                title="Llamar Ahora"
                color="#1565c0"
                accessibilityLabel="Llamar Ahora"
                onPress={this.handleOpenURL}
            />       
        )
    }
}

export default OpenCall;