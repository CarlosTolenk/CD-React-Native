import React, { Component } from 'react';
import { StyleSheet,
  Text, 
  View,
  Image,
  Dimensions,
  StatusBar,
  SafeAreaView,
  BackHandler,
  Share,
  TouchableOpacity,
  Picker,
  TouchableHighlight
  } from 'react-native';

//Plugin
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import * as Animatable from 'react-native-animatable';
import { Header, HeaderBackButton } from 'react-navigation';
import { NavigationActions } from 'react-navigation';

import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import IconF from 'react-native-vector-icons/dist/FontAwesome';
import PickerModal from 'react-native-picker-modal';

const MIN_HEIGHT = 66;
const MAX_HEIGHT = 250;


const {width, height} = Dimensions.get('window');

const TWITTER_ICON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAABvFBMVEUAAAAA//8AnuwAnOsAneoAm+oAm+oAm+oAm+oAm+kAnuwAmf8An+0AqtUAku0AnesAm+oAm+oAnesAqv8An+oAnuoAneoAnOkAmOoAm+oAm+oAn98AnOoAm+oAm+oAmuoAm+oAmekAnOsAm+sAmeYAnusAm+oAnOoAme0AnOoAnesAp+0Av/8Am+oAm+sAmuoAn+oAm+oAnOoAgP8Am+sAm+oAmuoAm+oAmusAmucAnOwAm+oAmusAm+oAm+oAm+kAmusAougAnOsAmukAn+wAm+sAnesAmeoAnekAmewAm+oAnOkAl+cAm+oAm+oAmukAn+sAmukAn+0Am+oAmOoAmesAm+oAm+oAm+kAme4AmesAm+oAjuMAmusAmuwAm+kAm+oAmuoAsesAm+0Am+oAneoAm+wAmusAm+oAm+oAm+gAnewAm+oAle0Am+oAm+oAmeYAmeoAmukAoOcAmuoAm+oAm+wAmuoAneoAnOkAgP8Am+oAm+oAn+8An+wAmusAnuwAs+YAmegAm+oAm+oAm+oAmuwAm+oAm+kAnesAmuoAmukAm+sAnukAnusAm+oAmuoAnOsAmukAqv9m+G5fAAAAlHRSTlMAAUSj3/v625IuNwVVBg6Z//J1Axhft5ol9ZEIrP7P8eIjZJcKdOU+RoO0HQTjtblK3VUCM/dg/a8rXesm9vSkTAtnaJ/gom5GKGNdINz4U1hRRdc+gPDm+R5L0wnQnUXzVg04uoVSW6HuIZGFHd7WFDxHK7P8eIbFsQRhrhBQtJAKN0prnKLvjBowjn8igenQfkQGdD8A7wAAAXRJREFUSMdjYBgFo2AUDCXAyMTMwsrGzsEJ5nBx41HKw4smwMfPKgAGgkLCIqJi4nj0SkhKoRotLSMAA7Jy8gIKing0KwkIKKsgC6gKIAM1dREN3Jo1gSq0tBF8HV1kvax6+moG+DULGBoZw/gmAqjA1Ay/s4HA3MISyrdC1WtthC9ebGwhquzsHRxBfCdUzc74Y9UFrtDVzd3D0wtVszd+zT6+KKr9UDX749UbEBgULIAbhODVHCoQFo5bb0QkXs1RAvhAtDFezTGx+DTHEchD8Ql4NCcSyoGJYTj1siQRzL/JKeY4NKcSzvxp6RmSWPVmZhHWnI3L1TlEFDu5edj15hcQU2gVqmHTa1pEXJFXXFKKqbmM2ALTuLC8Ak1vZRXRxa1xtS6q3ppaYrXG1NWjai1taCRCG6dJU3NLqy+ak10DGImx07LNFCOk2js6iXVyVzcLai7s6SWlbnIs6rOIbi8ViOifIDNx0uTRynoUjIIRAgALIFStaR5YjgAAAABJRU5ErkJggg==";

//  facebook icon
const FACEBOOK_ICON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAYFBMVEUAAAAAQIAAWpwAX5kAX5gAX5gAX5gAXJwAXpgAWZ8AX5gAXaIAX5gAXpkAVaoAX5gAXJsAX5gAX5gAYJkAYJkAXpoAX5gAX5gAX5kAXpcAX5kAX5gAX5gAX5YAXpoAYJijtTrqAAAAIHRSTlMABFis4vv/JL0o4QvSegbnQPx8UHWwj4OUgo7Px061qCrcMv8AAAB0SURBVEjH7dK3DoAwDEVRqum9BwL//5dIscQEEjFiCPhubziTbVkc98dsx/V8UGnbIIQjXRvFQMZJCnScAR3nxQNcIqrqRqWHW8Qd6cY94oGER8STMVioZsQLLnEXw1mMr5OqFdGGS378wxgzZvwO5jiz2wFnjxABOufdfQAAAABJRU5ErkJggg==";

//  whatsapp icon

function mapStateToProps(state) {
  return{
      // item: state.navigation.routes[0].routes[0].routes[1].params.item     

  }
}

let item = { }




class Detalles extends Component {

  static navigationOptions = ({navigation}) => {
    return {     
      header: null 

    }
  }



  constructor() {
    super();
    // this.ref = firebase.firestore().collection('planes'); 
    // this.unsubscribe = null;  
    
    this.state = {
       showNavTitle: true,     
       shared:0,
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
  
  componentWillMount(){
    this.setState({
        shared: item.total_shared
     })      
  }  

  componentDidMount() {   
      BackHandler.addEventListener('hardwareBackPress', this.onBackPress);   
   
  }    

  componentWillUnmount(){
      BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);   
  }

  onShareItem = () => {
    Share.share({
      title: item.nombre_plan, 
      message: `Conoce nuestro nuevo plan que Control Diamante tiene para ti: ${item.nombre_plan}, por un valor de : ${item.precio}.

      Descarga nuestra app para ver todo lo que tenemos preparado para ti Link: https://play.google.com/store/apps/details?id=cdiamante.controldiamante.com`,
    },
    {
      //Android
      dialogTitle: 'Comparte el nuevo plan de Control Diamante con tus amigos',
      //IOS

    }          
   ).then(({action, activityType}) => {
       if(action === Share.sharedAction){
          this.setState({
              shared: this.state.shared + 1
          });
          
          this.ref.doc(item.id).update({
              total_shared: this.state.shared
           });
       }                  
    });

  }
  
  onCallOffice = () => {
    this.props.dispatch(
      NavigationActions.navigate({
          routeName: 'Contactos'
      })
   )
  }

  goBack = () => {
    this.props.dispatch(
      NavigationActions.navigate({
          routeName: 'home'
      })
   )
  }

  checkoutFormualario = () => {
    this.props.dispatch(
      NavigationActions.navigate({
          routeName: 'Formulario',
          params: {
              item      
          }         
      })
    )     
  }




  render() {

    const { navigation } = this.props;
    const itemPara = navigation.getParam('item', 'NO-ID');
    item = itemPara;
    console.log(item);

    return (
      <View style={{ flex: 1 }}>
    
        <HeaderImageScrollView
          maxHeight={MAX_HEIGHT}
          minHeight={MIN_HEIGHT}
          maxOverlayOpacity={0.6}
          minOverlayOpacity={0.3}
          fadeOutForeground
          renderHeader={() => <View style={styles.backImagen}><Image source={{uri: item.imagen_url}} style={styles.image} blurRadius={3} /></View>}
          renderFixedForeground={() => (
            <Animatable.View
              style={styles.navTitleView}
              ref={navTitleView => {
                this.navTitleView = navTitleView;
              }}
            >
              <View style={styles.sectionHeader}>
                <StatusBar barStyle="light-content" backgroundColor={'transparent'} translucent/>
                <HeaderBackButton style={styles.headerBack} tintColor={'white'}  onPress={() => this.props.navigation.goBack()}/> 
                <Text style={styles.navTitle}  onPress={() => this.props.navigation.goBack()}>{item.nombre_plan} </Text>   
                <View style={{width:20}}></View>
                        
              </View>
            </Animatable.View>
          )}
          renderForeground={() => (
          <View style={{flex:1}}>
            <SafeAreaView style={{position: 'absolute', marginTop: 15}}>
                <HeaderBackButton tintColor={'white'}  onPress={() => this.props.navigation.goBack()}/>                
            </SafeAreaView> 
            <View style={styles.titleContainer}>
                <Text style={styles.imageTitle}>{item.nombre_plan}</Text>                        
            </View>
            <View style={styles.headerIcon}>
              <TouchableOpacity  onPress={this.onCallOffice} >
                <Icon style={styles.iconsContent} name="call" size={30} color="white" />              
              </TouchableOpacity> 
         
              <TouchableOpacity  onPress={this.onShareItem} >
                <Icon style={styles.iconsContent} name="share" size={30} color="white" />      
              </TouchableOpacity>             
            </View>
          </View>
          )}
        >
          <TriggeringView
            style={styles.section}
            onHide={() => this.navTitleView.fadeInUp(200)}
            onDisplay={() => this.navTitleView.fadeOut(100)}
          >
            <Text style={styles.title}>
              <Text style={styles.name}>Resumen del Plan</Text>
            </Text>
          </TriggeringView>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Efectividad</Text>
            <Text style={styles.sectionContent}>{item.efectividad}</Text>         
          </View>
          <View style={[styles.section, styles.sectionLarge]}>
            <Text style={styles.sectionTitle}>Detalles </Text>
            <View style={styles.contentDetalles}>
              <View style={styles.itemDetalles}>
                <View style={styles.itemTitle}>
                  <Icon name="access-time" size={20} color="#0E3F77" />
                  <Text style={styles.titleInfo}>Fecha de Publicación:</Text>
                </View>
                <Text style={styles.itemInfo}>{item.fecha_publicacion}</Text>
              </View>
              <View style={styles.itemDetalles}>
                <View style={styles.itemTitle}>
                  <Icon name="mail" size={20} color="#0E3F77" />
                  <Text style={styles.titleInfo}>Total de Mensajes:</Text>
                </View>
                <Text style={styles.itemInfo}>{item.cantidad_mensaje}</Text>
              </View>
              <View style={styles.itemDetalles}>
                <View style={styles.itemTitle}>
                  <IconF name="hashtag" size={20} color="#0E3F77" />
                  <Text style={styles.titleInfo}>Números a Jugar:</Text>
                </View>
                <Text style={styles.itemInfo}>{item.cantidad_numero}</Text>
              </View>
              <View style={styles.itemDetalles}>
                <View style={styles.itemTitle}>
                  <IconF name="calendar" size={20} color="#0E3F77" />
                  <Text style={styles.titleInfo}>Duración:</Text>
                </View>
                <Text style={styles.itemInfo}>{item.duracion}</Text>
              </View>
              <View style={styles.itemDetalles}>
                <View style={styles.itemTitle}>
                  <IconF name="building" size={20} color="#0E3F77" />
                  <Text style={styles.titleInfo}>Loterias:</Text>
                </View>
                <Text style={styles.itemInfo}>{item.loterias}</Text>
              </View>
              <View style={styles.itemDetalles}>
                <View style={styles.itemTitle}>
                  <Icon name="event-available" size={20} color="#0E3F77" />
                  <Text style={styles.titleInfo}>Días de Entregas:</Text>
                </View>
                <Text style={styles.itemInfo}>{item.dias_entreg}</Text>
              </View>
              <View style={styles.itemDetalles}>
                <View style={styles.itemTitle}>
                  
                </View>            
                

                <View style={styles.payment}>                
                    <Text style={styles.precioItem}>{item.precio}</Text>


                    <View style={styles.containerPayment}>
                    <TouchableOpacity onPress={this.checkoutFormualario} style={styles.btnContainerPaypal}>
                      <Image
                        style={styles.buttonPaypal}
                        source={require('../../../assets/paypal-logo.png')}
                      />
                     </TouchableOpacity>  

                    <View style={styles.imgPayment}>

                        <Image 
                            style={styles.paymentImage}
                            source={require('../../../assets/payments.png')}
                    
                        />  

                     </View>      

                    </View>

                    
                </View>    
              
             
              </View>      
              
 
            </View>
          </View>
        </HeaderImageScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    height: MAX_HEIGHT,
    width: Dimensions.get('window').width,
    alignSelf: 'stretch',
    resizeMode: 'stretch',
    opacity: 0.5,
  },
  backImagen:{
    backgroundColor: 'rgba(0,0,0,0.8)'
  },
  title: {
    fontSize: 20,
  },
  name: {
    fontWeight: 'bold',
    color: '#0E3F77',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#65ADFF',
    backgroundColor: 'white',
  },
  sectionHeader:{      
    height: MIN_HEIGHT,
    flexDirection: 'row',   
    justifyContent: 'space-between',
    alignContent: 'space-between',
    alignItems: 'center',   
  }, 
  payment:{
    flex: 1,
    flexDirection: 'column',
    marginTop: 10
  },
  headerBack:{      
    // marginTop: 20,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',  
  },
  bntPaypalText:{
    color: '#fff',
    fontSize: 18,
    padding: 2,
    alignSelf: 'center', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainerPaypal:{
    backgroundColor: '#e1e1e1',
    borderRadius: 5,
  },
  buttonPaypal:{
    width: 250,
    height: 75,
    resizeMode: 'contain',
    alignSelf: 'center',  
  },
  sectionTitle: {
    fontSize: 20,
    color: "#0E3F77",
    fontWeight: 'bold',
  },
  sectionContent: {
    paddingTop: 15,
    fontSize: 16,
    textAlign: 'justify',
  },
  contentDetalles: {
    flex:1,
    paddingVertical: 10,
    flexDirection: 'column',  
    justifyContent: 'flex-start',
  },
  itemDetalles:{     
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'space-between',
    paddingVertical: 8,
  },
  titleInfo:{
    fontSize: 16,
    marginHorizontal: 5,
  },
  itemTitle:{
    flexDirection: 'row',

  },  
  itemInfo:{
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    paddingRight: 20,
    fontSize: 16,
  },
  titleContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageTitle: {
    color: 'white',
    backgroundColor: 'transparent',
    fontSize: 24,
  },
  precioItem:{  
    textAlign: 'right',
    marginBottom: 10,
    color: '#C83232',
    fontSize: 20,   
  },
  headerIcon:{   
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'center',
    paddingBottom: 10,
  },
  iconsContent:{
    paddingHorizontal: 8,
  },
  containerPayment:{   
    marginTop: 20,
  },
  navTitleView: {   
    height: MIN_HEIGHT,
    // alignSelf: 'stretch',
    justifyContent: 'center',
    alignContent: 'center',   
    paddingTop: 16,
    opacity: 0,
  },
  navTitle: {
    color: 'white',
    fontSize: 20,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -45,
    // paddingTop: 10,    
  },
  sectionLarge: {
    height: 600,
  },
  itemStyle: {
    fontSize: 15,
    height: 75,
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  paymentImage:{
    resizeMode: 'stretch',
    alignSelf: 'center',  
  },
picker: {
    width: 100,
    zIndex: 10000,
  },
});


export default connect(mapStateToProps)(Detalles);