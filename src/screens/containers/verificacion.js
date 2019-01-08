import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableHighlight,
  ScrollView 
} from 'react-native';

//Plugin
import {connect} from 'react-redux';
import { NavigationActions } from 'react-navigation';
import CardView from 'react-native-cardview';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';


const {width, height} = Dimensions.get('window');

class Verificación extends Component {
    
  static navigationOptions = ({navigation}) => {
    return {     
            title: `Verificación de Información`,
            headerStyle: {
                backgroundColor: '#1565c0',
                height: 70,  
                paddingTop: 10,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        };        
  }  
  
  constructor(props) {
    super(props);
  } 

  onPress = () =>  {
    console.log("Navengando");
    this.props.dispatch(
      NavigationActions.navigate({
          routeName: 'WebPaypal',
          params: {
              item      
          }         
      })
    )     
  }

  render() {
    const { navigation } = this.props;
     item = navigation.getParam('informacion', 'NO-ID');   
    console.log(item);

    return ( 
      <ScrollView>
        <View style={styles.container}>
           <CardView
                    cardElevation={5}
                    cardMaxElevation={7}
                    cornerRadius={5}
                    style={styles.cardView}>

                  <View style={styles.headerItem}>
                    <View style={styles.titleHeader}>                
                    
                        <Icon style={styles.iconDate} name="cart" color="#003c8f" size={20}/>                         
                        <Text style={styles.titleItem}>Artículo: 
                        <Text style={styles.titleElement}>                      
                             {
                               item.detalles.nombre_plan ?
                                item.detalles.nombre_plan
                                : 
                                item.detalles.nombre_evento
                               
                               }
                        </Text>                        
                       </Text>                                       
                    </View> 
                 </View>
                    
                 <View style={styles.lineButtom}></View>

                 <View  style={styles.descriptionContainer}>
                    <View style={styles.descriptionImage}>
                    {
                      item.detalles.imagen_url ?
                      <Image source={{uri: item.detalles.imagen_url}} style={styles.image} />
                      :
                      <Image source={{uri: item.detalles.image_url}} style={styles.image} />
                    }
                      
                    </View>
                    <View style={styles.descriptionTextContainer}>
                    {
                       item.detalles.cantidad_mensaje ? 
                       <View>
                            <Text style={styles.titleInfo}>Cantidad de Mensajes:</Text>
                            <Text style={styles.titleCont}>{item.detalles.cantidad_mensaje}</Text>
                       </View>             
                        :
                        <View>
                          <Text style={styles.titleInfo}>Fecha de Evento:</Text>
                          <Text style={styles.titleCont}>{item.detalles.fecha_evento}</Text>
                        </View>    
                    }
                    {
                      item.detalles.duracion ?
                      <View>
                        <Text style={styles.titleInfo}>Duración:</Text>
                        <Text style={styles.titleCont}>{item.detalles.duracion}</Text>
                      </View> 
                      :
                      <View>
                        <Text style={styles.titleInfo}>Lugar del Evento:</Text>
                        <Text style={styles.titleCont}>{item.detalles.ciudad}</Text>  
                       </View> 
                    }                       
                        
                        <Text style={styles.titleInfo}>Precio:</Text>
                        <Text style={styles.titleCont}>{item.detalles.precio}</Text>

                    </View>
                 </View>                
            </CardView>

            <CardView
                    cardElevation={5}
                    cardMaxElevation={7}
                    cornerRadius={5}
                    style={styles.cardView}>

                  <View style={styles.headerItem}>
                    <View style={styles.titleHeader}>                
                    
                        <Icon style={styles.iconDate} name="account" color="#003c8f" size={20}/>                         
                        <Text style={styles.titleItem}> Cliente: 
                        <Text style={styles.titleElement}>
                             {item.client}
                        </Text>                        
                       </Text>                                       
                    </View> 
                 </View>
                    
                 <View style={styles.lineButtom}></View>

                 <View  style={styles.descriptionContainer}>
                  
                    <View style={styles.descriptionTextContainer}>
                    {
                      item.cedula ?
                      <View>
                        <Text style={styles.titleInfo}>Cédula:</Text>
                        <Text style={styles.titleCont}>{item.cedula}</Text>
                      </View>                      
                        :
                        null
                    }

                    {
                      item.identificacion ?  
                      <View>
                        <Text style={styles.titleInfo}>Identificación:</Text>
                        <Text style={styles.titleCont}>{item.identificacion}</Text>
                      </View>                      
                        :
                        null
                    }                       
                      
                        <Text style={styles.titleInfo}>Celular:</Text>
                        <Text style={styles.titleCont}>{item.movil}</Text>

                    </View>
                 </View>                
            </CardView>

            <TouchableHighlight style={styles.checkOut} onPress={this.onPress}>
              <Text style = {styles.text}>
                 <Icon style={styles.iconPaypal} name="paypal" color="#fff" size={20}/>     
               Comprar Ahora
              </Text>
           </TouchableHighlight>        
        </View>
      </ScrollView>
    )
  }
}


const styles = StyleSheet.create({
    container: {
      flex:1,
      padding: 10,
      backgroundColor: '#fefefe',     
    },
    cardView:{
      padding:5,  
      backgroundColor: '#F5FCFF',  
      paddingVertical: 5,
      marginBottom: 15,
   },
    image: {
      width: width/2.5,
      height: height/4,      
      resizeMode: 'stretch'    
    },
    headerItem:{
      flex:1,
      flexDirection: 'row',
      justifyContent: 'space-between',   
      padding: 5,  
    },
    titleHeader:{  
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignSelf: 'center',   
    },
    titleElement:{
      fontWeight: '700',  
      padding: 20,
      marginLeft: 10,
    },
    logoIcon:{
      width:32,
      height:32,
      marginRight: 5,
      marginTop: 2,      
    },
    titleItem:{
      fontSize: 20,     
      color: '#626364',
      fontWeight: '400',
      marginVertical: 10,
      flexWrap: 'wrap',
      flexGrow: 1,   
    },
    iconDate:{    
      justifyContent: 'center',
      marginTop: 10,  
      marginRight: 7,
      alignSelf: 'center',   
    },
    lineButtom:{
      width:width,
      borderTopColor: '#eaeaea',
      borderTopWidth: 3,
      marginVertical: 15,
    },
    descriptionContainer:{ 
      flexDirection: 'row',
    },
    descriptionTextContainer:{
      flexDirection: 'column',
      padding: 10,
      paddingLeft: 10,
    },
    titleInfo:{
      fontSize: 16,
      fontWeight: 'bold'
    },
    titleCont:{
      fontSize: 16,
      marginBottom: 5,
    },
    checkOut:{
      marginTop:20,
    },
    text: {
      fontSize: 20,
      borderWidth: 1,
      padding: 10,
      borderColor: '#1565c0',
      backgroundColor: '#003388',
      textAlign: 'center',
      color: '#fff'
   },
   iconPaypal:{
     padding:5,
     marginRight: 10,
     marginTop: 5,
   }
  });

export default connect(null) (Verificación);