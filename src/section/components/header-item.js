import React, {Component} from 'react';
import { Text, FlatList, View, Animated, TouchableOpacity, Image, SafeAreaView, StyleSheet } from 'react-native';
import { HeaderBackButton } from 'react-navigation';

import { withCollapsible } from 'react-navigation-collapsible';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

// import { Constants } from 'expo';

const ImgSource = {uri:'https://firebasestorage.googleapis.com/v0/b/control-diamante-1519145676088.appspot.com/o/diamante_gold_five.jpeg?alt=media&token=da891e2e-bac2-409f-bfa0-345f6b85258e'};
// const ImgSource = require('./../asset/cat.jpg');

class ImageScreen extends Component{
  static navigationOptions = ({navigation}) => ({
    headerStyle: {height: 320,  backgroundColor: 'rgba(0,0,0,0.7)'},
    
    header: 
      <View style={{width: '100%', height:'100%'}}>
        <Image source={ImgSource} 
          resizeMode={'stretch'}
          style={{width: '100%', height: '100%', opacity: 0.4}}/>
        <SafeAreaView style={{position: 'absolute', marginTop: 5}}>
          <HeaderBackButton tintColor={'white'} onPress={() => navigation.goBack()}/>                
        </SafeAreaView> 
      </View>
  })

  constructor(props){
    super(props);

    const data = [];
    for(let i = 0 ; i < 60 ; i++){
      data.push(i);
    }

    this.state = {
      data: data
    }
  }

  renderItem = ({item}) => (
    <TouchableOpacity 
      onPress={() => {
        this.props.navigation.navigate('DetailScreen');
      }}
      style={{width: '100%', height: 50, borderBottomColor: '#0002', borderBottomWidth: 0.5, paddingHorizontal: 20, justifyContent: 'center'}}>
      <Text style={{fontSize: 22}}>{item}</Text>
    </TouchableOpacity>
  )

  render(){
    const { paddingHeight, scrollY, onScroll } = this.props.collapsible;

    return (
      <AnimatedFlatList 
        style={{flex: 1}}
        data={this.state.data}
        renderItem={this.renderItem}
        keyExtractor={(item, index) => String(index)}
        contentContainerStyle={{paddingTop: paddingHeight}}
        onScroll={onScroll} 
        _mustAddThis={scrollY}
        />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#022c43',
  },
  text: {
    textAlign: 'center',
    marginBottom: 5,
    color: 'white',
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 20,
  }
})

export default withCollapsible(ImageScreen, {iOSCollapsedColor: 'purple'});