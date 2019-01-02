import React, {Component} from 'react';
import { View, StyleSheet, Dimensions, ScrollView, BackHandler, Text } from 'react-native';

//Plugin
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { NavigationActions } from 'react-navigation';
import Orientation from 'react-native-orientation';
import { connect } from 'react-redux';


//Component
import Loteria from '../../screens/containers/loteria'
import Anuncio from '../containers/anuncios';
import Jaladera from '../../screens/containers/jaladera';



const FirstRoute = () => (
  <ScrollView style={styles.colorPage}>   
     <Loteria/>
  </ScrollView>

);
const SecondRoute = () => ( 

  <ScrollView style={styles.colorPage}> 
     <Jaladera/>
  </ScrollView>

);
  
class TabViewLoteria extends Component {
    constructor(props){
        super(props);      
        this.state = {
            index: 0,             
            routes: 
            [
                { key: 'first', title: 'Resultados' },
                { key: 'second', title: 'Tabla Jala Jala' },  
            ],
        }
    }    

    static navigationOptions = ({navigation}) => {
        return {     
                title: `Lotería y Probabilidades`,
                headerStyle: {
                    backgroundColor: '#1565c0',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            };        
    }

    onBackPress = () => {
        this.props.dispatch(
          NavigationActions.back({
              key: null
          })
      )
      return true
    }

   

  
    componentDidMount() {   
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
        Orientation.lockToPortrait();
  
    }

    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
   
    }
 

  render() {       
    return (
      <TabView
        navigationState={this.state}
        renderScene={SceneMap({
          first: FirstRoute,
          second: SecondRoute,         
        })}
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height}}
      />
    );
  }
}


const styles = StyleSheet.create({
    container:{
        flex:1,       
    },
    containerItem:{
        width: Dimensions.get('window').width,   
    },
    colorPage:{
      backgroundColor:"white"
    }
})

export default connect(null) (TabViewLoteria)






