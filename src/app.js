import React, { Component, Fragment } from 'react';
import {
    Text,
    StyleSheet,
    StatusBar,
    ScrollView,  
    Platform,
    View 
   } from 'react-native';

//Library or Plugin
import firebase from 'react-native-firebase';
import {connect} from 'react-redux';

// Components
// import Home from './screens/containers/home';
import Header from './section/components/header';
import Slider from './section/containers/promo';
import Planes from './section/containers/planes-list';
import Canal from './player-canal/container/canal-tv';


class AppLayout extends Component {

    constructor() {
        super();
        this.planes = firebase.firestore().collection('planes');      
        this.eventos = firebase.firestore().collection('eventos');     
        this.loteria = firebase.firestore().collection('loteria');              
        this.unsubscribe = null;  
      }
   
    
    componentDidMount() {
        const allPlanes = [];
        const allEventos = [];
        const allLoteria = [];

        this.unsubscribe = this.planes.onSnapshot((querySnapshot) =>{
          querySnapshot.forEach((doc) =>{
            allPlanes.push(doc.data());
            });      

            this.props.dispatch({
                type: 'SET_PLANES_LIST',
                payload: {
                    allPlanes
                }
            })
        }); 

        this.unsubscribe = this.eventos.onSnapshot((querySnapshot) =>{
          querySnapshot.forEach((doc) =>{
            allEventos.push(doc.data());
            });      

            this.props.dispatch({
                type: 'SET_EVENTOS_LIST',
                payload: {
                  allEventos
                }
            })
        }); 

        this.unsubscribe = this.loteria.onSnapshot((querySnapshot) =>{
          querySnapshot.forEach((doc) =>{
            allLoteria.push(doc.data());
            });      

            this.props.dispatch({
                type: 'SET_LOTERIA_LIST',
                payload: {
                  allLoteria
                }
            })
        });       
        
    }
    
    
    componentWillUnmount() {
        this.unsubscribe();
    }

    render(){
        return(
            <Fragment>
            <View style={styles.statusBar}>
              <StatusBar
                hidden={false} 
                backgroundColor="#173674"
                barStyle="light-content" 
              />
            </View>    
              <Header>
                <Text style={styles.headerTitle}>Servicios</Text>                  
              </Header>
              {/* <Canal/> */}
              <ScrollView>
                <Slider style={styles.sliderContainer}/>          
                <Planes/>
              </ScrollView>            
          </Fragment>  
        )
    }
}


const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;

    const styles = StyleSheet.create({
      container: {
       flex: 1,
       paddingTop: 22
      },   
      sliderContainer: {
        flex:1,     
      },
      statusBar: {
       height: STATUSBAR_HEIGHT,
       backgroundColor: '#003c8f'
      },      
      headerTitle: {
        color: 'white',
        fontSize: 20,     
      },
      
      
    })


export default  connect(null) (AppLayout);