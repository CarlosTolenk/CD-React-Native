import React, { Component } from 'react';
import {
    Text,
    StyleSheet,
    StatusBar,
    ScrollView,  
    Platform,   
    BackHandler,
    RefreshControl,
    View, AsyncStorage, Alert
   } from 'react-native';

//Library or Plugin
import firebase from 'react-native-firebase';
import {connect} from 'react-redux';
import { NavigationActions } from 'react-navigation';
import Orientation from 'react-native-orientation';


// Components
import Header from '../../section/components/header';
import TabView from '../../section/containers/tab-view';

function mapStateToProps(state) {
    return{      
        lineaOld: state.planes.lineaOld
    }
}

class Home extends Component {

    static navigationOptions = () => {
        return {
            header: <Header title="Servicios"/>        
        }
    }

    onNavigation = () => {
        this.props.dispatch(
            NavigationActions.navigate({
                routeName: 'Loteria'
            })
        )
    }

    constructor() {
        super();
        this.planes = firebase.firestore().collection('planes');   
        this.eventos = firebase.firestore().collection('eventos_news');
        this.loteria = firebase.firestore().collection('loteria').orderBy('nombre', 'desc');     
        this.anuncios = firebase.firestore().collection('anuncios');         
        this.numeros = firebase.firestore().collection('numeros_seleccion');
        this.lineaDirecta = firebase.firestore().collection('lineas_directas');
        this.alerta = firebase.firestore().collection('alerta');
        this.unsubscribe = null;     
    }
    
    componentDidMount(){
        Orientation.lockToPortrait();
    }

    
    
      async componentWillMount() {
        this.props.navigation.addListener('didFocus', ()=>{
            StatusBar.setBarStyle('light-content');
            StatusBar.setBackgroundColor('#1565c0')
        })   

        this.unsubscribe = this.planes.onSnapshot((querySnapshot) =>{
         let allPlanes = [];
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
        let allEventos = [];
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
        let allLoteria = [];
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
        
        this.unsubscribe = this.anuncios.onSnapshot((querySnapshot) =>{
            let allAnuncios = [];
            querySnapshot.forEach((doc) =>{
              allAnuncios.push(doc.data());
              });      
  
              this.props.dispatch({
                  type: 'SET_ANUNCIOS_LIST',
                  payload: {
                    allAnuncios
                  }
              })
          });    


        this.unsubscribe = this.alerta.onSnapshot((querySnapshot) =>{
            let allAlertas = [];
            querySnapshot.forEach((doc) =>{
               allAlertas.push(doc.data());
              });      
  
              this.props.dispatch({
                  type: 'SET_ALERTA_LIST',
                  payload: {
                    allAlertas
                  }
              })
          });   
          
          this.unsubscribe = this.numeros.onSnapshot((querySnapshot) =>{
            let AllNumeros = [];
            querySnapshot.forEach((doc) =>{
                AllNumeros.push(doc.data());
              });      
  
              this.props.dispatch({
                  type: 'SET_NUMBER_DIAMANTE',
                  payload: {
                    AllNumeros
                  }
              })
          });   
          this.unsubscribe = this.lineaDirecta.onSnapshot((querySnapshot) =>{
            let linea = []
            querySnapshot.forEach((doc) =>{
                linea.push(doc.data());
              });      
  
              this.props.dispatch({
                  type: 'SET_LINEA_DIRECTA',
                  payload: {
                    linea
                  }
              })

              this.getStatusNotification(linea[0].numeros);
             
          });          

    }

    getStatusNotification = (linea) => {
        if(!this.props.lineaOld){
            let lineaOld = linea
            this.props.dispatch({
                type: 'SET_LINEA_DIRECTA_OLD',
                payload: {
                    lineaOld
                }
            })
            console.log(lineaOld)
        }else{            
            if(this.getEqualdLinea(this.props.lineaOld, linea)){
                console.log("No hubo cambios")
                this.props.dispatch({
                    type: 'SET_LINEA_DIRECTA_UPDATE',
                    payload: {
                        update: false,
                    }
                });
            }else{
                // console.log(this.props.lineaOld);
                // console.log(linea);
                console.log("Si hubo cambios en la linea")
                //Poner el nuevo valor de la linea
                let lineaOld = linea
                this.props.dispatch({
                    type: 'SET_LINEA_DIRECTA_OLD',
                    payload: {
                        lineaOld,
                    }
                });

                this.props.dispatch({
                    type: 'SET_LINEA_DIRECTA_UPDATE',
                    payload: {
                        update: true,
                    }
                });



                this.showAlert('Nueva Línea Directa', 'Tenemos una poderosa línea ganadora para ti, pulsa para ir a verla a nuesta sección de Loteria')
            }
        }   
    }

    getEqualdLinea = (lineaOld, linea) => {
       let resultado = lineaOld.length==linea.length && lineaOld.every(function(v,i) { return v === linea[i] } );
        return resultado
    }

    showAlert(title, body) {
        Alert.alert(
          title, body,
          [
              { text: 'Ver la línea', onPress: () => this.onNavigation() },
          ],
          { cancelable: false },
        );
      }


  





    // backPressed = () => {
    //     BackHandler.exitApp();
    // }  
    
    
    componentWillUnmount() {
        this.unsubscribe(); 
    }

    

    render(){
        return(  
            <TabView style={styles.container}/>        
     
        )
    }
}


const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;

    const styles = StyleSheet.create({
      container: {
       flex: 1,
       backgroundColor: 'white',
       height: 500,
      },   
      sliderContainer: {
        flex:1,     
      },
      statusBar: {
       height: STATUSBAR_HEIGHT,
       backgroundColor: '#003c8f'
      }   
    })


export default connect(mapStateToProps) (Home);