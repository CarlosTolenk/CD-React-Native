import React, {Component} from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ActivityIndicator, ScrollView } from 'react-native';

//Library o Plugin
import CardView from 'react-native-cardview';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import {connect} from 'react-redux';
import Moment from 'moment';

//Component
import BallLotery from '../components/ball';
import DiamondLotery from '../components/diamond';

const { height, width } = Dimensions.get('window');

// let numberDiamante = [2,5,85,91]



function mapStateToProps(state) {
    return{
        numberDiamante: state.planes.AllNumeros[0].numeros,
        lineaDirecta: state.planes.linea[0].numeros
    }
}

let resultado = [];

class ItemLoteria extends Component{

    constructor(props){
        super(props);  
        this.state = {
            loading: true,         
        }
        // Moment.locale();
    }  

    componentWillMount(){
        setTimeout(()=>{
            this.setState({
                loading: false
            })
        }, 1000)     
        this.state.resultado =  this.props.numberDiamante.concat(this.props.lineaDirecta)
    }
 
    renderLoteryNormal = () => {
        return(
            <View style={styles.dateItemFooter}>
               { this.switchBallDiamand(this.props.primera)}
               { this.switchBallDiamand(this.props.segunda)}
               { this.switchBallDiamand(this.props.tercera)}
            </View>            
        )
       
    }

  

    componentDidUpdate(){
        resultado = [];
        resultado =  this.props.numberDiamante.concat(this.props.lineaDirecta);
   
        // console.log(this.state.resultado);
        this.renderLoteryNormal();
      
    }



    renderLoteryLoto = () => {
        return(          
            <ScrollView horizontal={true}>      
            <View style={styles.dateItemFooter}>
                      
                    {this.props.numeros.map((r, index) =>
                        <BallLotery
                            key={index}
                            color='white'
                            backgroundColor="#26AA44"
                            number={r}
                            key={Math.random().toString()}
                        />
                    )} 
              
            </View>               
            </ScrollView>  
        )
    } 

    switchRender = (type) => {
        if(type == 'normal'){
           return this.renderLoteryNormal();
        }else{
           return this.renderLoteryLoto();
        }
    }

   switchBallDiamand(number){        
        var diamante = false;      
        // resultado.map((item) => {
        //     let invertido =  this.numeroInvertido(item);
        //     if(item == number || invertido == number){
        //         //Seleccionar entre los diamantes
        //         // diamante=true;   
        //         //Voy a poner por defecto que sea bolita
        //         diamante=false  
        //     }
        // })

        if(diamante){
            return (
                <DiamondLotery                  
                        number={number}   
                        key={Math.random().toString()}       
                    />   
            )
        }else{
            return(
                <BallLotery
                    color='white'
                    backgroundColor="#26AA44"
                    number={number}
                    key={Math.random().toString()}
                
                />   
            )  
        }   
    }

     numeroInvertido(number){         
        if(number < 10){           
            return number*10;
        }
        else{
            var cantidad = number;
            var cantidadInvertida = 0;
            while (cantidad > 0) {
              var digito = cantidad % 10;
              cantidadInvertida = (cantidadInvertida * 10) + digito;
              cantidad = Math.floor(cantidad / 10);
            }
            return cantidadInvertida;
        }
    }



    render(){  
        // Moment.locale('es');
        return(
            <View style={styles.container}>
            <CardView
                cardElevation={4}
                cardMaxElevation={7}
                cornerRadius={1}
                style={styles.cardView}
            >
            <View style={styles.lineVertical}>
                <View style={styles.headerItem}>         
                    <View style={styles.titleHeader}>
                        <View style={styles.infoLotery}>
                            <Image 
                                style={styles.logoIcon}
                                source={{uri: this.props.image}}
                                />
                            <Text style={styles.titleItem}>{this.props.nombre}</Text>    
                        </View>
                        <View style={styles.infoDate}>
                            <Text style={styles.titleDate}>{Moment(this.props.publicacion).format('L')}</Text> 
                                            
                        </View>                        
                                               
                    </View>           
                </View>
                
                <View style={styles.lineButtom}></View>                

                     <View style={styles.footerItem}>  
                     {
                         this.state.loading ?                          
                            <ActivityIndicator size="large" color="#1565c0" />
                            :
                         this.switchRender(this.props.tipo)
                     }                      
                         
                    </View> 
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
        paddingVertical: 10,
    },
    cardView:{
        flex:1,         
    },
    headerItem:{
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-between',   
        padding: 10,  
    },
    lineVertical:{
        borderLeftColor: '#1565c0',
        borderLeftWidth: 10,             
    },
    titleHeader:{     
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'space-around',
        alignItems: 'center',
    },
    logoIcon:{     
        width:80,
        height:35,          
        resizeMode: 'contain'  ,
        marginRight: 5,
    },
    titleItem:{
        fontSize: 18,     
        color: '#626364',
        fontWeight: '400'
    },
    infoLotery:{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignContent: 'center',
        alignItems: 'center',
    },
    lineButtom:{     
        width:width,
        borderTopColor: '#eaeaea',
        borderTopWidth: 2,
        marginTop: -10,
    },
    infoDate:{
        padding: 3,
        marginRight: 10,
        // backgroundColor: '#2788F6',
        // borderRadius: 10,     
    },
    titleDate:{
       color: 'black',     
    },
    footerItem:{
        flex:1,  
        flexDirection: 'row',
        alignContent: 'space-between',
        justifyContent: 'space-between',        
        padding: 10,   
        marginVertical: 10,
    },
    dateItemFooter:{
        flexDirection: 'row',
        flex:1,
        justifyContent: 'flex-start',
        alignContent: 'flex-start', 
        alignSelf: 'center',
    },
    place:{
        fontSize:16,    
        fontWeight: 'bold',
        marginLeft: -5,
        alignItems: 'flex-start',     
    },
    cutDiamond: {
        marginTop: 7,
        width: 50,
        height: 55,
        position: 'relative',
        zIndex: 10,     
      },
      cutDiamondTop: {
        width: 50,
        height: 0,
        borderTopWidth: 0,
        borderTopColor: 'transparent',
        borderLeftColor: 'transparent',
        borderLeftWidth: 12.5,
        borderRightColor: 'transparent',
        borderRightWidth: 12.5,
        borderBottomColor: '#1565c0',
        borderBottomWidth: 12.5, 
      },
      cutDiamondBottom: {
        width: 0,
        height: 0,
        borderTopWidth: 35,
        borderTopColor: '#1565c0',
        borderLeftColor: 'transparent',
        borderLeftWidth: 25,
        borderRightColor: 'transparent',
        borderRightWidth: 25,
        borderBottomColor: 'transparent',
        borderBottomWidth: 0,       
      }
});

export default connect(mapStateToProps)(ItemLoteria);