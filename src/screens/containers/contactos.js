import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  StatusBar,
  Image,
  TouchableOpacity,  
  Clipboard,
  BackHandler,
  Modal, Alert
} from 'react-native';

//Plugin or Library
import {connect} from 'react-redux';
import { NavigationActions } from 'react-navigation';
import CardView from 'react-native-cardview';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import ImageViewer from 'react-native-image-zoom-viewer';

//Component
import Header from '../../section/components/header-general';
import CallButton from '../../section/components/open-call';
import SocialCall from '../../section/components/open-social';
import CloseModalX from '../../section/components/closeModal';


//Const
const {width, height} = Dimensions.get('window');
const imageWidth = (width - 100)/2;

// import ImageView from 'react-native-image-view';

const images = [
    {
        props:{
          source: require('../../../assets/santiago_office.png'),
          title: 'Oficina de Santiago',
          width: 1200,
          height: 700,
          index:0,
        }
      
    },
    {
      props:{
        source: require('../../../assets/santo_domingo_office.png'),
        title: 'Oficina de Santo Domingo',
        width: 1200,
        height: 800,
        index:1,
      }
  
    
   },

];




class Contactos extends Component {

  static navigationOptions = {
    header: null
  }

  constructor( props ) {
		super( props );
      this.state = {
        withHeight: false,
        loading: false,
        imageIndex: 0,
        isImageViewVisible: false,   
        modalVisible: false         
      };	 
  }

  closeModal = () => {
    this.setState({
      modalVisible: false,
      isImageViewVisible: false,  
      loading: false
    }) 
  }

  componentDidMount() {
    this.focus = this.props.navigation.addListener('didFocus', ()=>{
        StatusBar.setBarStyle('light-content');
        StatusBar.setBackgroundColor('#1565c0')
    })
    BackHandler.addEventListener('hardwareBackPress', this.closeModal);
    
    // Linking.addEventListener('url', this._handleOpenURL);
  }

  componentWillUnmount(){
    this.focus.remove();
    BackHandler.removeEventListener('hardwareBackPress', this.closeModal);
     
    // Linking.removeEventListener('url', this._handleOpenURL);
  }

  writeToClipboard = () => {
    alert('TODO: Write to Clipboard')
  };

  openBrowser = () => {   
    this.props.dispatch(
      NavigationActions.navigate({
          routeName: 'Website'         
      })
    )
  }

  setClipboardContent = (msg, title) => {
    Clipboard.setString(msg);
    console.log("Copiando" + msg);
    this.showAlert(msg, title);
  }

  showAlert(body, title) {
    Alert.alert(
      title + ' copiado Exitoso',
      body,
      [   
        {text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      { cancelable: false }
    )
  }
  
 

  render() {

    const {goBack} = this.props.navigation;
    return (
      <View style={styles.containerBackground}>
        <Header title="Contactos" colorHeader='#1565c0' border='#B1ADAD'/>
        <ScrollView >

            {/* Oficina de Santiagoo*/}
          <CardView
            cardElevation={4}
            cardMaxElevation={7}
            cornerRadius={1}      
            style={styles.cardView}      
          >          
            <View style={styles.container}>
              <View style={styles.photoMap}>          
              <TouchableOpacity                  
                    onPress={() => {
                      setTimeout(()=>{
                        this.setState({
                          loading: true
                        })
                      },300)
                        this.setState({
                            imageIndex: images[0].props.index,
                            modalVisible: true
                        });
                    }}
                >
                    <Image
                        style={styles.imageMap}
                        source={images[0].props.source}
                       
                    />
                </TouchableOpacity>  
                                                   
              </View>              
              <View style={styles.information}>            
                <Text style={styles.titleInformation}>Oficina Santiago</Text>
                <View style={styles.direction}>
                   <Icon style={styles.iconDate} name="location-on" color="#003c8f" size={15}/>
                   <Text style={styles.directionInformation}>
                      Av. Las Carreras, Edif. A-15 Apartamento 2E.
                    </Text>
                </View>
                <View style={styles.direction}>
                   <Icon style={styles.iconDate} name="access-time" color="#003c8f" size={15}/>
                   <Text style={styles.directionInformation}>
                     8:00am - 6:00pm
                    </Text>
                </View>
                <View style={styles.callButton}>
                  <CallButton
                    url={'tel:8097240272'}
                    />
                          
                </View>                
              </View>                    
            </View>
          </CardView>

            {/* Oficina de Santo Domingoo */}
          <CardView
            cardElevation={4}
            cardMaxElevation={7}
            cornerRadius={1}      
            style={styles.cardView}      
          >          
            <View style={styles.container}>
              <View style={styles.photoMap}>
              <TouchableOpacity                  
                    onPress={() => {
                      setTimeout(()=>{
                        this.setState({
                          loading: true
                        })
                      },300)
                        this.setState({
                            imageIndex: images[1].props.index,
                            modalVisible: true,
                         
                        });
                    }}
                >
                    <Image
                         style={styles.imageMapSD}
                        source={images[1].props.source}
                       
                    />
                </TouchableOpacity>                                      
              </View>              
              <View style={styles.information}>            
                <Text style={styles.titleInformation}>Oficina Sto. Domingo</Text>
                <View style={styles.direction}>
                   <Icon style={styles.iconDate} name="location-on" color="#003c8f" size={15}/>
                    <View>
                    <Text style={styles.directionInformation}>
                      Emilio a Morel #35 Edificio Profesional, 2do Nivel   
                    </Text>                    
                        <Text style={styles.directionInformation}>Ensanche La Fé</Text>            
                    </View>
                    
                </View>
                <View style={styles.direction}>
                   <Icon style={styles.iconDate} name="access-time" color="#003c8f" size={15}/>
                   <Text style={styles.directionInformation}>
                     8:00am - 6:00pm
                    </Text>
                </View>
                <View style={styles.callButton}>
                  <CallButton
                      url={'tel:8096267885'}


                    />                    
                </View>                
              </View>                    
            </View>
          </CardView>  


          {/* Cuentas de Bancos */}
          <CardView
            cardElevation={4}
            cardMaxElevation={7}
            cornerRadius={1}      
            style={styles.cardView}      
          >    
            <View style={styles.containerBanco}>
              <View style={styles.titleBancoContainer}>
                 <Text style={styles.titleInformation}>Bancos Disponibles</Text>
              </View>
              <View style={styles.containerInfoBanco}>
                <View style={styles.infoBanco}>
                    <Text style={styles.titleBanco}>Banco Popular</Text>
                    <Text selectable={true} onPress={()=>this.setClipboardContent('801 144 866', 'Banco Popular')}  style={styles.numberAcount}>801 144 866</Text>
                </View>
                <View style={styles.infoBanco}>
                    <Text style={styles.titleBanco}>Banreservas</Text>
                    <Text selectable={true} onPress={()=>this.setClipboardContent('252 0011 844', 'Banreservas')}  style={styles.numberAcount}>252 0011 844</Text>
                </View>
              </View>
              <View>
                <Text style={styles.titleSpan}>Ambas a nombre de Control Diamante S.R.L</Text>
              </View>
            </View>
          </CardView>

             {/* Redes Sociales */}

          <CardView
            cardElevation={4}
            cardMaxElevation={7}
            cornerRadius={1}      
            style={styles.cardViewSocial}      
          >    
            <View style={styles.containerSocial}>
              <View style={styles.titleBancoContainer}>
                 <Text style={styles.titleInformation}>Siguenos</Text>
              </View>
              <View style={styles.containerInfoBanco}>
                <View style={styles.social}>
                  <SocialCall
                    image={require('../../../assets/facebook.png')}
                    socialName={'Facebook'}
                    url={'https://www.facebook.com/joseph.tavarez.359'}                          
                  />
                </View>
                <View style={styles.social}>
                  <SocialCall
                    image={require('../../../assets/twitter.png')}
                    socialName={'Twitter'}
                    url={'https://twitter.com/JOSEPHTAVAREZ11?lang=es'}                   
                  />            
                </View>
                <View style={styles.social}>
                  <SocialCall
                    image={require('../../../assets/youtube.png')}
                    socialName={'YouTube'}
                    url={'https://www.youtube.com/channel/UCuZhMYqg3hnsT-2MXTQGbFw'}                      
                  /> 
                </View>
                <View style={styles.social}>
                  <SocialCall
                    image={require('../../../assets/instagram.png')}
                    socialName={'Instagram'}
                    url={'https://www.instagram.com/control_diamante/'}                 
                  /> 
                </View>
                <View style={styles.social}>

                <TouchableOpacity onPress={this.openBrowser}>
                  <Image 
                      style={styles.socialImage}
                      source={require('../../../assets/world.png')}
                  />  
                 <Text style={styles.socialName}>WebSite</Text>   
                </TouchableOpacity>
                    {/* <SocialCall
                      image={require('../../../assets/world.png')}
                      socialName={'Website'}
                      url={'http://controldiamante.com/'}                 
                    />  */}
                </View>            
              </View>         
            </View>
          </CardView>
        </ScrollView>

          {/* <ImageView
            glideAlways
            images={images}
            imageIndex={this.state.imageIndex}
            animationType="slide"
            isVisible={this.state.isImageViewVisible}
            renderFooter={this.renderFooter}
          /> */}



        <Modal
          visible={this.state.modalVisible}
          transparent={true}
          onRequestClose={() => this.setState({ modalVisible: false })}      
        >
       
          {/* <Text>Cerrar</Text> */}
            <ImageViewer
              imageUrls={images}
              index={this.state.imageIndex}
              enableSwipeDown={true}
              renderIndicator={() => null}
              onSwipeDown={() => {
                this.setState({ modalVisible: false })
              }}  
              renderHeader={(index) => <Text style={styles.headerImage}>{images[index].props.title}</Text>}           
             
             
            />
            {
              this.state.loading &&
              <CloseModalX close={this.closeModal} />
            }
              
     
        </Modal>
          
      </View>
    )
  }
}

const styles = StyleSheet.create({
  containerBackground:{
    backgroundColor: 'white',
  },
  cardView:{
    flex:1,
    margin: 5,
    marginBottom: 2
  
  },
  cardViewSocial:{
    flex:1,
    margin: 5,
    marginBottom: 2
  },
  container: {  
    flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignContent: 'space-between',
    padding: 5,
    backgroundColor: 'white',
  },
  photoMap:{
    width:imageWidth,
  },
  imageMap:{
    width:imageWidth,
    height:160,
    marginRight: 5,
    marginTop: 2,
    resizeMode: 'cover',
  },
  imageMapSD:{
    width:imageWidth,
    height:180,
    marginRight: 5,
    marginTop: 2,
    resizeMode: 'cover',
  },
  information:{
    flex:2,
    flexDirection: 'column',
    alignContent: 'center',
  },
  titleInformation:{
    textAlign: 'center',
    color: 'red',
    fontSize: 18,
    paddingVertical: 5,
  },
  direction:{
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: 5,
    padding: 5,
  },
  iconDate:{
    marginRight: 3,
    alignContent: 'center',
    justifyContent: 'center',
  },
  directionInformation:{
    fontSize: 15,    
  },
  callButton:{
    padding:10,
    paddingHorizontal: 20,
  },
  containerBanco:{
    flex:1,   
    alignContent: 'center',
    justifyContent: 'center',
  },
  titleBancoContainer:{ 
   
    alignContent: 'center',
    justifyContent: 'center',
  },
  containerInfoBanco:{    
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-around',   
    alignContent: 'space-around',
    marginVertical: 10
  },
  
  titleBanco:{
    fontSize: 16,
    color: '#2D51AA',
  },
  numberAcount:{
    textAlign: 'center',
    color: 'black',
    fontSize: 14
  },
  titleSpan:{
    textAlign: 'center',
    fontSize: 14,
    color: '#1D387A',
    paddingBottom: 10,
  },
  containerSocial:{
    flex:1,   
    alignContent: 'space-around',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    paddingBottom: 10,
    marginBottom:20
  },
  social:{
    marginBottom: 16,
  },
  // socialName:{
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   alignContent: 'center',
  //   textAlign: 'center',
  //   fontSize:12,
  //   color: '#1D387A',   
  //   marginBottom: 16,
  //   marginLeft: -5,
  // },
  socialImage:{
    width:36,
    height:36,
    resizeMode: 'contain',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    marginBottom: 5,
    color: 'black',
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  headerImage:{
    flex:1,
    alignItems: 'center',
    alignSelf: 'center',
    color: 'white',
    fontSize: 18,
    position: 'absolute',
    top: '10%',   
  },
  socialImage:{
    width:36,
    height:36,
    resizeMode: 'contain',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
  socialName:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center',
    fontSize:12,
    color: '#1D387A',   
    marginBottom: 16,
    // marginLeft: -5,
  },
})

export default connect(null) (Contactos)