import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, StatusBar, SafeAreaView, Share,
  TouchableOpacity, BackHandler } from 'react-native';

//Plugin
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import { Header, HeaderBackButton } from 'react-navigation';
import { NavigationActions } from 'react-navigation';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import tvShowContent from '../../../assets/tvShowContent';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import IconF from 'react-native-vector-icons/dist/FontAwesome';
import { ScrollView } from 'react-native-gesture-handler';


const MIN_HEIGHT = 66;
const MAX_HEIGHT = 250;

function mapStateToProps(state) {
  return{
      // item: state.navigation.routes[0].routes[0].routes[1].params.item
  }
}

let item = { }



class DetalleEvento extends Component {


  /*
  Item de los Eventos
  ciudad String
  description: String
  fecha_evento: String
  hora: String
  Id String
  Image_url String
  lugar String
  nombre_evento
  precio String
  total_shared  
  
  */


  static navigationOptions = ({navigation}) => {
    return {     
      header: null 

    }
}

  constructor() {
    super();
    // this.ref = firebase.firestore().collection('eventos_news'); 
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
        title: item.nombre_evento, 
        message: `Conoce el nuevo evento que Control Diamante tiene para ti: ${item.nombre_evento}, Precio : ${item.precio}.
        
        Descarga nuestra app para ver todo lo que tenemos preparado para ti Link: https://play.google.com/store/apps/details?id=cdiamante.controldiamante.com`,
      },
      {
        //Android
        dialogTitle: 'Comparte el nuevo evento de Control Diamante con tus amigos',
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
          renderHeader={() => <View style={styles.backImagen}><Image source={{uri: item.image_url}} style={styles.image} /></View>}
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
                <Text style={styles.navTitle}  onPress={() => this.props.navigation.goBack()}>{item.nombre_evento} </Text>   
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
                <Text style={styles.imageTitle}>{item.nombre_evento}</Text>                        
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
              <Text style={styles.name}>Resumen del Evento</Text>
            </Text>
          </TriggeringView>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Descripción</Text>
            <Text style={styles.sectionContent}>{item.descripcion}</Text>
          </View>
          <View style={[styles.section, styles.sectionLarge]}>
            <Text style={styles.sectionTitle}>Detalles</Text>
            <View style={styles.contentDetalles}>
              <View style={styles.itemDetalles}>
                <View style={styles.itemTitle}>
                  <Icon name="event-available" size={20} color="#0E3F77" />
                  <Text style={styles.titleInfo}>Fecha:</Text>
                </View>
                <Text style={styles.itemInfo}>{item.fecha_evento}</Text>
              </View>
              <View style={styles.itemDetalles}>
                <View style={styles.itemTitle}>
                  <Icon name="access-time" size={20} color="#0E3F77" />
                  <Text style={styles.titleInfo}>Hora:</Text>
                </View>
                <Text style={styles.itemInfo}>{item.hora}</Text>
              </View>
              <View style={styles.itemDetalles}>
                <View style={styles.itemTitle}>
                  <IconF name="building" size={20} color="#0E3F77" />
                  <Text style={styles.titleInfo}>Lugar:</Text>
                </View>
                <Text style={styles.itemInfo}>{item.lugar}</Text>
              </View>
              <View style={styles.itemDetalles}>
                <View style={styles.itemTitle}>
                  <Icon name="place" size={20} color="#0E3F77" />
                  <Text style={styles.titleInfo}>Ciudad:</Text>
                </View>
                <Text style={styles.itemInfo}>{item.ciudad}</Text>
              </View>
            
            
           
              <View style={styles.itemDetalles}>
                <View style={styles.itemTitle}>
                  
                </View>
      
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
    opacity: 0.4,
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
  headerBack:{      
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center', 
    // marginTop: 20,
 
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
    justifyContent: 'center',
    alignContent: 'center',
    paddingTop: 10,
    color: '#C83232',
    fontSize: 20,
    paddingRight: 20,
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
  },
  sectionLarge: {
    height: 600,
  },
  payment:{
    flex: 1,
    flexDirection: 'column',
    marginTop: 10
  },
  precioItem:{  
    textAlign: 'right',
    marginBottom: 10,
    color: '#C83232',
    fontSize: 20,   
  },
  containerPayment:{   
    marginTop: 20,
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
  paymentImage:{
    resizeMode: 'stretch',
    alignSelf: 'center',  
  },
});


export default connect(mapStateToProps)(DetalleEvento);