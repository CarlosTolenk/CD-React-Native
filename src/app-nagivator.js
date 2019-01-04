import React from 'react';
import { 
    createStackNavigator,
    createBottomTabNavigator, 
} from 'react-navigation';

//View
import Home from './screens/containers/home';
// import Loteria from './screens/containers/loteria';
import TabViewLoteria from './section/containers/tab-view-loteria'
import Detalles from './screens/containers/detail-item-plan';
import Evento from './screens/containers/detail-item-evento';
import CanalTv from './screens/containers/canal';
import Player from './screens/containers/video-container';
import Radio from './screens/containers/radio';
import Contactos from './screens/containers/contactos';
import Website from './screens/containers/website';
import Formulario from './screens/containers/formulario';
import Verificacion  from './screens/containers/verificacion';
import WebPaypal from './screens/containers/web-paypal';

//Library
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';



const Main = createStackNavigator(
    {
        Home: Home,
        Detalles: Detalles,
        Formulario: Formulario,
        Verificacion: Verificacion,
        WebPaypal: WebPaypal,
        Loteria: TabViewLoteria,
        Evento: Evento,
        
    },
    {
        navigationOptions: {
            gesturesEnabled: true,                            
        }
   } 
)

const NavegationWebsite = createStackNavigator(
    {
        Contactos: Contactos,
        Website: Website
    },

    {
        navigationOptions: {
            gesturesEnabled: true,
            header: null
        }
    }
)

const TabNavigator = createBottomTabNavigator(
    {
        Home: {
            screen: Main,
            navigationOptions: {
                title: 'Inicio',
                tabBarIcon: ({tintColor}) => <Icon name="home" size={25} color={tintColor} />,            
               
            }
        },
        Canal:{
            screen:CanalTv,
            navigationOptions:{
                title: 'Canal',
                tabBarIcon: ({tintColor}) => <Icon name="youtube-tv" color={tintColor}  size={25}  />,
            }
        },
        Radio:{
            screen: Radio,
            navigationOptions:{
                title: 'Radio',             
                tabBarIcon: ({tintColor}) => <Icon name="radio" size={25} color={tintColor} />,
               
            }
        },
        Contactos:{
            screen: NavegationWebsite,
            navigationOptions:{
                title: 'Contactos',
                tabBarIcon: ({tintColor}) => <Icon name="phone-outgoing"  color={tintColor}  size={25} />,      

            }
        }
    },
    {
        initialLayout: {
            height: 46,
            width: 100
        },
      
        tabBarOptions : {
            activeTintColor: 'white',        
            activeBackgroundColor: '#1565c0',      
            showLabel: false,      
            inactiveBackgroundColor : '#1565c0',
            inactiveTintColor: 'rgba(255,255,255,0.35)',          
            
        }
    }
)

const WithModal = createStackNavigator(
    {
        Principal: {
          screen: TabNavigator,
        },
        Player: Player,
    },
    {
        mode: 'modal',
        headerMode: 'none'
    }
)



export default WithModal;