import React, {Component}  from 'react';
import {
    FlatList,
    View, Text, StyleSheet, Dimensions, AsyncStorage
} from 'react-native';

//Libray o Plugin
import { connect } from 'react-redux';
import CardView from 'react-native-cardview';
import Moment from 'moment';

//Components
import Empty from '../components/empty';
import Separador from '../components/separator';
import ItemLoteria from './item-loteria';
import DiamondLotery from '../components/diamond';

const { height, width } = Dimensions.get('window');


function mapStateToProps(state) {
    return{
        list: state.planes.allLoteria,
        linea: state.planes.linea,
        update: state.planes.update, 
    }
}


class LoteriasList extends Component{

    constructor(props){
        super(props);
        this.state = {
            isVisiable: false,            
        }
    }

    // componentWillUnmount(){
    //     this.setState({
    //         isVisiable: false, 
    //     });
    // }

    // componentDidUpdate(){
    //      this.checkTimer();
    // }

    componentDidMount = async() => {
        if(this.props.update){
            this.setState({
                isVisiable: true, 
            });
            this.setTimer();
        }else{
            // this.setTimer();
        let existTimer = await this.checkTimer();
        console.log(existTimer);
            if(existTimer){
                this.setState({
                    isVisiable: true, 
                });
            }else{
                console.log("Nada por aqui tambien");
            }
        }     

        // this.checkTimer();
    }

    renderEmtpy = () => <Empty text="No existen líneas directas por el momento"/>

    renderEmtpyLinea = () => <Empty text="No hay orejitas por el momento"/>

    itemSeparator = () => <Separador/>

    renderItem = ({item}) =>{

        return(
            <ItemLoteria {...item}/> 
        )
    }
    
    renderDiamond = ({index}) => {
        return(
            <DiamondLotery                  
              number={this.props.linea[0].numeros[index]}                    
              /> 
        )
    }

    setTimer(){
        let x = Moment().format('HH:mm');    
        let startTime = Moment(x,'HH:mm'); 	
        console.log(startTime)
        // agregar 7 días a la fecha actual  
        let y = Moment().add(1, 'hours');
        let z = y.format('HH:mm');
  
        let endTime = Moment(z,'HH:mm');
        console.log(endTime)

        this._storeData('startTime', startTime._i);       
        this._storeData('endTime', endTime._i);
        // console.log("Guardando la hora" +startTime._i);
        // console.log("Guardando la hora" +endTime._i);
    }

    checkTimer = async () => {    
        // this.setTimer();
        console.log("Verificando cosas")
   
        let x = Moment().format('HH:mm');    
        let startTime = Moment(x,'HH:mm'); 	
        // let start = await this._retrieveData('startTime');
        let end = await this._retrieveData('endTime');
        console.log(x  +  end);
        // let  startTime = Moment(start,'HH:mm'); 
        let endTime = Moment(end,'HH:mm');
        console.log({
            startTime,
            endTime
        })

        let result = await this.calTimer(startTime, endTime);
        return result;   
    }
    

    calTimer(endTime, startTime){
    console.log("Function calTimer")
    let final =  Moment.duration(startTime - endTime).asMinutes();
    console.log("Resultado " + final)
        if(final > 0){          
            console.log(final);
            return true;
        
        }else{
            console.log(final);
            return false;
        }  
   }
    

    displayLineaDirecta() {
        // console.log(this.state.isVisiable);
        // console.log(this.props.update);   
        if(this.state.isVisiable){            
            return(
                <CardView
                    cardElevation={4}
                    cardMaxElevation={7}
                    cornerRadius={1}    
                    style={styles.cardView}          
                >
        
                <Text style={styles.title}>Orejitas de Cortesía</Text>
                <View style={styles.lineButtom}></View>     
                <View style={styles.diamantes}>
                    <FlatList           
                        data = {this.props.linea[0].numeros} //Se le pasa una lista o un array.
                        ListEmptyComponent = {this.renderEmtpyLinea}
                        ItemSeparatorComponent = {this.itemSeparator}
                        renderItem = {this.renderDiamond}
                        horizontal={true}
                        style={styles.listDimand}
                        key={Math.random().toString()}
                    />  
                </View>            
            </CardView>
            );            

        } else {
            return null;
        }
    }

   
    _storeData = async (key, value) => {       
        try {
            await AsyncStorage.setItem(key, value);
        } catch (error) {
            // Error saving data
            console.log(error);
        }
    }

    _retrieveData = async (key) => {
        try {
          const value = await AsyncStorage.getItem(key);
          if (value !== null) {
            // We have data!!
            console.log(value);
            return value;
          }
         } catch (error) {
           // Error retrieving data
           console.log(error);
         }
    }    
 
    render(){     
        return(   
         
            <View style={styles.container}>
            {this.displayLineaDirecta()}
      
                {/* <CardView
                    cardElevation={4}
                    cardMaxElevation={7}
                    cornerRadius={1}    
                    style={styles.cardView}          
                >
               
                    <Text style={styles.title}>Orejitas de Cortesía</Text>
                    <View style={styles.lineButtom}></View>     
                    <View style={styles.diamantes}>
                        <FlatList           
                            data = {this.props.linea[0].numeros} //Se le pasa una lista o un array.
                            ListEmptyComponent = {this.renderEmtpy}
                            ItemSeparatorComponent = {this.itemSeparator}
                            renderItem = {this.renderDiamond}
                            horizontal={true}
                            style={styles.listDimand}
                            key={Math.random().toString()}
                        />  
                    </View>
                
                 </CardView> */}
            <FlatList           
                data = {this.props.list} //Se le pasa una lista o un array.
                ListEmptyComponent = {this.renderEmtpy}
                ItemSeparatorComponent = {this.itemSeparator}
                renderItem = {this.renderItem}
                key={Math.random().toString()}
               
           />   
       </View>   
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    cardView:{
        padding: 10,
        paddingBottom: 25,
       
    },
    diamantes:{
        flexDirection: 'column',
        flex:1,
        paddingBottom:10,
        paddingHorizontal: 15, 
        paddingVertical: 10,
        paddingLeft: -10   
    },
    title:{
        fontSize: 18,
        marginLeft: 10
    },
    lineButtom:{     
        position: 'relative',
        top: 0,
        left:-10,
        width:width,
        borderTopColor: '#eaeaea',
        borderTopWidth: 2,
        // marginTop: -10,
    },
    listDimand:{
        position: 'relative',
        left: -10,
        paddingVertical:10,
        
    }
})

export default connect(mapStateToProps) (LoteriasList);