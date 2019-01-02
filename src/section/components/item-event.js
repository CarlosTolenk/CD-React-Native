import React, { Component } from 'React';
import { 
    View,
    Text,
    Image,
    StyleSheet,
    TouchableWithoutFeedback,
    Share,
    Dimensions
} from 'react-native';


//Library o Plugin
import firebase from 'react-native-firebase';
import CardView from 'react-native-cardview';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import IconM from 'react-native-vector-icons/dist/MaterialIcons';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';



//Components
import Likes from './likes'
import Shared from './shared';


const { height, width } = Dimensions.get('window');
const widthImage = width - 35;
const heightImage = height*0.55;


// function mapStateToProps(state) {
//     return{
//         // storageLike: state.planes.action,
//     }
// }


class ItemEvent extends Component{
    
    
    constructor() {
        super();
        this.ref = firebase.firestore().collection('eventos_news'); 
        this.unsubscribe = null;  
        this.state={
            shared:0
        }      
    } 
    componentWillMount(){
        this.setState({
            shared: this.props.total_shared
         })      
    }  
    
    tapImage = () => {
        this.props.dispatch(
            NavigationActions.navigate({
                routeName: 'Evento',
                params: {
                    item: this.props,                   
                }
               
            })
        )
        console.log(this.props);
    }

    

    actionShare = () => {
        Share.share({
            title: this.props.nombre_plan, 
            message: `Conoce el nuevo que Control Diamante tiene para ti: ${this.props.nombre_evento}, Precio : ${this.props.precio}.
            
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
                
                this.ref.doc(this.props.id).update({
                    total_shared: this.state.shared
                 });
             }            
            
         });
    }

    render(){
        return(
            <View style={styles.container}>
                <CardView
                    cardElevation={5}
                    cardMaxElevation={7}
                    cornerRadius={5}
                    style={styles.cardView}
                >

                 <View style={styles.headerItem}>
                    <View style={styles.titleHeader}>
                        <Image 
                         style={styles.logoIcon}
                         source={require('../../../assets/diamante-icon.png')}
                         />
                        <Text style={styles.titleItem}>{this.props.nombre_evento}</Text>                
                                       
                    </View>
                   
                    <View style={styles.dateItem}>
                      <Icon style={styles.iconDate} name="calendar" color="#003c8f" size={15}/>
                      <Text style={styles.date}>{this.props.fecha_evento}</Text>
                    </View>                    
                   
                 </View>
                    
                 <View style={styles.lineButtom}></View>

                    <TouchableWithoutFeedback
                        onPress={this.tapImage}
                        >
                        <View style={styles.imageItem}>  
                    
                            <Image
                                style={styles.stretch}
                                
                                source={{
                                    uri: this.props.image_url                           
                                }}
                            />
                    
                        </View>
                    </TouchableWithoutFeedback>
                     
                  <View style={styles.lineTop}></View>    

                     <View style={styles.footerItem}>    

                        <View style={styles.dateItemFooter}>
                            <IconM style={styles.iconDate} name="place" color="red" size={25}/>
                            <Text style={styles.place}>{this.props.ciudad}</Text>
                        </View>              
                    
                        <Shared
                            onPress={this.actionShare}
                        />
                  </View> 
            </CardView>            
        </View>        
        )
    }

}



const styles = StyleSheet.create({
    container:{
        flex:1,        
        alignContent: 'center',
        backgroundColor: 'white',
        width: '100%',
        padding: 5,
        paddingVertical: 10
       
    },
    cardView:{
        flex:1,       
        backgroundColor: '#F5FCFF',
    },
    headerItem:{
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-between',   
        padding: 10,  
    },
    titleHeader:{
        flex:4,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignContent: 'center',
        alignItems: 'center',
    },
    logoIcon:{
        paddingBottom:16,
        width:32,
        height:32,
        marginRight: 5,
        marginTop: 2,
      
    },
    titleItem:{
        fontSize: 20,     
        color: '#626364',
        fontWeight: '400'

    },
    lineButtom:{
        position: 'relative',
        left: 10,
        width:widthImage,
        borderTopColor: '#eaeaea',
        borderTopWidth: 2,
        marginBottom: 5,
    },
    lineTop:{
        position: 'relative',
        left: 10,
        width:widthImage,
        borderTopColor: '#eaeaea',
        borderTopWidth: 2,
        marginTop: 5,
    
    },
    dateItem:{
        flex:1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignContent: 'center',
        alignItems: 'center',
    },
    iconDate:{
        marginRight: 5,
    },
    date:{
        fontSize: 14,
        justifyContent: 'flex-start',
        fontWeight: '400',
        color: '#626364',
    },
    stretch:{
        width:widthImage,
        marginHorizontal: 10,
        height:heightImage,
        resizeMode: 'stretch'     ,
   
    },
    footerItem:{
        flex:1,  
        flexDirection: 'row',
        alignContent: 'space-between',
        justifyContent: 'space-between',   
        width:widthImage+16,
        padding: 10,   
        paddingBottom: 25,
    },
    dateItemFooter:{
        flexDirection: 'row',
        flex:1,
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
        alignItems: 'center',
        marginTop: -10,
    },
    place:{
        fontSize:16,    
        fontWeight: 'bold',
        marginLeft: -5,
        alignItems: 'flex-start',
     
    },
    

})

export default connect(null) (ItemEvent)
