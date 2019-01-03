import React, {Component} from "react";
import {
	Image,
	Text,
    View, 
    StyleSheet
} from "react-native";
import { connect } from 'react-redux';

//Component
import CardView from 'react-native-cardview';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import moment from 'moment';

let dateOn = '';
let dateInFuture = '';
let countDown;
let timer


function mapStateToProps(state) {
    return{
        alerta: state.planes.allAlertas
    }
}

class Alerta extends Component {
    constructor(props) {
        super(props)      
        this.state = {
            hours: 0,
            minutes: 0,
            milliseconds: -1
        }
      
    }

    startInterval(){

    }

       
    componentWillMount(){
        // Obteniendo el Timer de BD
        dateOn = this.props.alerta[0].updateTimestamp
        let countDown = moment(dateOn).format('YYYY-MM-DD hh:mm:ss');
        console.log(countDown);  

        // Sumando 12 h al Timmer
        console.log('Sumandoooo....!!')
        dateInFuture = moment(dateOn).add(35, 'minutes');
        // console.log(dateInFuture);        


        timer = setInterval( ()=> {
            let onTime = new moment()  
            //Obtener el CountDown          
            countDown = moment.duration(dateInFuture.diff(onTime));           
            this.setState({
                hours: countDown._data.hours,
                minutes: countDown._data.minutes,
                milliseconds: countDown._data.milliseconds
            })        
            
            console.log(this.state.hours);
        },1000)
    }

    componentWillUnmount() {
        console.log('COMPONENTWILLUNMOUNT')
      clearInterval(timer); 
    }

    render() {
        const alerta = this.props.alerta[0];

        return(

            <View style={styles.container}>      
                {
                    this.state.milliseconds >= 0 ?
                        <CardView
                        cardElevation={4}
                        cardMaxElevation={7}
                        cornerRadius={1}    
                        style={styles.cardView}>   
                        
                            <Text style={styles.title}>{alerta.title}</Text>
                            <View style={styles.lineButtom}></View>
                            <Text style={styles.body}>{alerta.body}</Text>
                            
                            <View style={styles.countDownContainer}>
                                <Icon name="access-time" size={20} color="#0E3F77" />
                                <Text style={styles.countDown}>{`${this.state.hours}h:${this.state.minutes}m`}</Text>
                            </View>

                        </CardView>   
                    :null
                }              
             </View>

           
          
        )
    }
    
}


const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    cardView:{
        margin: 5,
        padding: 20,       
    },
    title:{
        fontSize: 20,
        color: '#0E3F77'
    },
    body:{
        fontSize: 16,
    },
    lineButtom:{    
        width: '100%',
        borderTopColor: '#eaeaea',
        borderTopWidth: 2,
        marginTop: 3,
        marginBottom: 7,
    },
    countDownContainer:{
        flex:1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    countDown:{
        marginLeft: 1,
        padding: 1,
        fontSize: 16,
    }
  })


export default connect(mapStateToProps) (Alerta)
