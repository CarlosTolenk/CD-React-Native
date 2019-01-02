import React, { Component} from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native'

//Library
import Icon from 'react-native-vector-icons/MaterialIcons';
import {connect} from 'react-redux'
import { NavigationActions } from 'react-navigation';
import Orientation from 'react-native-orientation';

class BackIcon extends Component{

    onNavigation = () => {
        Orientation.lockToPortrait();
        this.props.dispatch(
            NavigationActions.navigate({
                routeName: 'Canal'
            })
        )
    }

    render()
    {
        return(
            <View>
                <TouchableWithoutFeedback
                    onPress={this.onNavigation}
                >
                    <Icon  name="arrow-back" color="white" size={30}/>     
                </TouchableWithoutFeedback>
            </View>
        )
    }
}

export default connect(null) (BackIcon);