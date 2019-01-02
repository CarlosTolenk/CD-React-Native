//Core
import React, {Component } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    TouchableWithoutFeedback,
    Image,
    StyleSheet
} from 'react-native';
//Library o Plugin
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import { NavigationActions } from 'react-navigation';


//Component

class Header extends Component{

    onNavigation = () => {
        this.props.dispatch(
            NavigationActions.navigate({
                routeName: 'Loteria'
            })
        )
    }

    render(){
        return(
            <View >         
                <SafeAreaView style={styles.safeArea}>
                    <View style={styles.container}>
                        <View                                     
                            style={styles.logo}
                        />
                        <View style={styles.center}>
                            <Text style={styles.headerTitle}>{this.props.title}</Text>
                        </View>   
                    <TouchableWithoutFeedback
                    onPress={this.onNavigation}
                    >
                        <Image
                            source={require('../../../assets/lottery-icon.png')}   
                            style={styles.right} 
                                    
                        />                 
                    </TouchableWithoutFeedback>
                    </View>                      
                </SafeAreaView>         
            </View>
        )
    }
}

const styles = StyleSheet.create({
    safeArea:{
        backgroundColor: '#1565c0',
    },
    container:{
        shadowColor: '#000',
        shadowOffset: { width: 10, height: 10 },
        shadowOpacity: 1,      
        elevation: 10,
        paddingTop:18,
        flexDirection: 'row',
       
        padding: 10,
        justifyContent: 'space-between',
        alignContent: 'center',    
        height: 58, 
    },   
    logo: {
        width: 40,
        height: 40,
     
    },
    center: {            
        padding: 10,      
        justifyContent: 'center',
        alignContent: 'center',      
    },
    headerTitle: {
        color: 'white',
        fontSize: 20,  
        fontWeight: 'bold'   
      },
    right:{       
        width: 50,
        height: 50,       
        resizeMode: 'contain',            
        alignItems: 'center',
    }
});

export default connect(null) (Header)