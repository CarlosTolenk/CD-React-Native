import React, { Component } from 'React';
import { 
    View,
    Text,
    Image,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Animated,
    Dimensions,
    Share,
} from 'react-native';


//Library o Plugin
import firebase from 'react-native-firebase';
import CardView from 'react-native-cardview';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';



//Components
import Likes from './likes'
import Shared from './shared';


const AnimatedIcon = Animated.createAnimatedComponent(Icon);
const { height, width } = Dimensions.get('window');
const widthImage = width - 35;
const heightImage = height*0.55;


function mapStateToProps(state) {
    return{
        storageLike: state.planes.collection     
    }
}


class ItemPlan extends Component{

    constructor() {
        super();
        this.ref = firebase.firestore().collection('planes'); 
        this.unsubscribe = null;  
        this.state = {
            shared:0,
            liked:false,
            total_likes:0,        
            animate: new Animated.Value(10),
        }   
        this.springValue = new Animated.Value(30)   
    } 
    componentWillMount(){    
        let collection =  this.props.storageLike;
        // console.log(collection);  
        this.setState({
            shared: this.props.total_shared,
            total_likes: this.props.likes_recibidos,
         })   
         
         if(collection != undefined){
            collection.map(item => {
                if(item.id == this.props.id){
                    this.setState({
                        liked: item.liked
                    })
                }    
            });              
       
         }        
    }  
    
    tapImage = () => {
        this.props.dispatch(
            NavigationActions.navigate({
                routeName: 'Detalles',
                params: {
                    item: this.props,
                    name: this.props.nombre_plan
                }
               
            })
        )      
    }  
    

    actionLike = () => {      
       
        this.setState({
            liked: !this.state.liked        
        }) 
        
        this.animateHeart();
        
        if(!this.state.liked){
            this.setState({
                total_likes: this.state.total_likes+1                
            })            
            
            this.ref.doc(this.props.id).update({
                likes_recibidos: this.state.total_likes+1
            });
           
        }else{
            this.setState({
                total_likes: this.state.total_likes-1
            })

            this.ref.doc(this.props.id).update({
                likes_recibidos: this.state.total_likes-1
            });
        }
       
        this.verificacionStorage();      
      
    }

    animateHeart() {
        this.springValue.setValue(0.3)
        Animated.spring(
          this.springValue,
          {
            toValue: 30,
            friction: 3.5,            
          }
        ).start()
    }

    actionShare = () => {      
        Share.share({
            title: this.props.nombre_plan, 
            message: `Conoce el nuevo plan que Control Diamante tiene para ti: ${this.props.nombre_plan}, Precio : ${this.props.precio}.
            
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

     verificacionStorage(){
        let flat = false;
        let collection = this.props.storageLike;

        if(collection != undefined){
            collection.map((item) => {
                if(item.id == this.props.id){
                    item.liked =!this.state.liked
                flat = true;
                }           
            })
        }else{
            collection = [];
        }

        if(!flat){
            let action = {
                id: this.props.id,
                liked: !this.state.liked
            }
            
            collection.push(action);
        }

        this.props.dispatch({
            type: 'SET_LIKED_PLAN',
            payload: {
                collection
            }
        })          
        
        // console.log(collection);
    }

    // componentWillUpdate = () => {
    //     console.log("Actualizandome");  
    //  const ref = firebase.firestore().collection('planes').doc('83FoJToCXDDh830sBbjR');
    //  firebase
    //  .firestore()
    //  .runTransaction(async transaction => {
    //    const doc = await transaction.get(ref);
   
    //    // if it does not exist set the population to one
    //    if (!doc.exists) {
    //     //  transaction.set(ref, { population: 1 });
    //      // return the new value so we know what the new population is
    //      return 1;
    //    }
   
    //    // exists already so lets increment it + 1
    //    const newPopulation = doc.data();
   
    //    transaction.update(ref, {
    //      population: newPopulation,        
    //    });
   
    //    // return the new value so we know what the new population is
    //    return newPopulation;
    //  })
    //  .then(newPopulation => {
    //    console.log(newPopulation
    //    );
    //  })
    //  .catch(error => {
    //    console.log('Transaction failed: ', error);
    //    });
    // };

    render(){

        const size = this.state.animate;
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
                        <Text style={styles.titleItem}>{this.props.nombre_plan}</Text>                                       
                    </View>
                   
                    <View style={styles.dateItem}>
                      <Icon style={styles.iconDate} name="calendar" color="#003c8f" size={15}/>
                      <Text style={styles.date}>{this.props.fecha_publicacion}</Text>
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
                                uri: this.props.imagen_url                           
                            }}
                        />
                
                    </View>
                </TouchableWithoutFeedback>

                     
                <View style={styles.lineTop}></View>
                  
                <View style={styles.footerItem}>       
                              
                    <Likes
                        cantidad={this.state.total_likes}
                        liked={this.state.liked}
                        onPress={this.actionLike}  
                        size={this.springValue}                     
                    />
                     
               
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
    MainContainer: { 
        flex: 1,
        backgroundColor: '#F5FCFF',
        justifyContent: 'center',
        alignItems: 'center',     
      },     
      cardViewStyle:{     
        width: 250, 
        height: 150,     
      },     
      cardView_InsideText:{     
        fontSize: 20, 
        color: '#000', 
        textAlign: 'center', 
        marginTop: 50         
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
        resizeMode: 'stretch'     
    },
    footerItem:{
        flex:1,
        width:widthImage+16,
        flexDirection: 'row',  
        justifyContent: 'space-between',  
        alignContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        paddingBottom: 10,
    }

})

export default connect(mapStateToProps) (ItemPlan)
