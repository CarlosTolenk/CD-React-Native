import React, {Component} from 'react'
import { View, TextInput, StyleSheet, Text, Dimensions, Image, Animated } from 'react-native';

//Plugin
import {connect} from 'react-redux'
import CardView from 'react-native-cardview';
//Component
import Diamond from '../../section/components/diamando-large';

//Const
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    jaladera:{
        height: height/3.5,
        flex: 1,           
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
    },
    cardView:{
        width: width,
        flex:1,
        justifyContent: 'space-around',
        alignContent: 'space-around',
        margin: 10
       
    },
    containerTitle:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },title:{
        fontSize: 20,
        textAlign: 'center',
         flexWrap: 'wrap',
         fontWeight: 'bold',
         color: '#EF1010',        
    },
    diamond:{
        flex:2,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignContent: 'center',
    },
    controls:{
        flex:1
    },
    corteciaJaladera:{
        flex:1,
        justifyContent: 'center',
        alignContent: 'center',        
        width: width,
        borderLeftWidth: 7,
        borderLeftColor: '#1565c0',
        borderRightWidth: 7,
        borderRightColor: '#1565c0',    
        paddingHorizontal: 20,  
        // marginTop: -30,
    },
    diamanteIcon:{       
        width:52,
        height:52,  
        alignContent: 'center',
        marginLeft: '40%',            
    },
    infoJaladera:{        
        fontSize: 18,
        flexWrap: 'wrap',
        textAlign: 'center'       
    },
    resultContent:{
        flex:1,              
        width: width-15,
        borderLeftWidth: 7,
        borderLeftColor: '#1565c0',
        borderRightWidth: 7,
        borderRightColor: '#1565c0',  
    }
})

class Jaladera extends Component{

    constructor(){
        super()
        this.state = {
            myNumber:0,
            total:0,
            focus: true,
            isShowing: false,  
            first:0,
            second:0,
            third:0,   
        }

        this.diamante_primera = new Animated.Value(0);
        this.diamante_segundo = new Animated.Value(0);
        this.diamante_tercera = new Animated.Value(0);
    }

    animateDimante = () => {
        this.diamante_primera.setValue(0);
        this.diamante_segundo.setValue(0);
        this.diamante_tercera.setValue(0);
        Animated.sequence([
            Animated.timing(                 
                this.diamante_primera,           
                {
                toValue: 1,                  
                duration: 333,             
             }),
             Animated.timing(                 
                this.diamante_segundo,           
                {
                toValue: 1,                  
                duration: 333,             
             }),
             Animated.timing(                 
                this.diamante_tercera,           
                {
                toValue: 1,                  
                duration: 333,             
             }),
        ]).start()                    
    }
    

    onChanged(text){
        let newText = '';
        let numbers = '0123456789';
    
        for (var i=0; i < text.length; i++) {
            if(numbers.indexOf(text[i]) > -1 ) {
                newText = newText + text[i];
            }
            else {
                // your call back function
                alert("Por Favor solo se pueden digitar números");
            }
        }
        this.setState({ myNumber: newText });
    }

     submitJabladera(text) {
        if(text){   
            console.log("Estoy enviando datos");
            this.searchJaladera();
            this.animateDimante();       
            // this.setState({
            //     total: this.state.myNumber,
            //     myNumber:0,    
            //     isShowing: true            
            // })
        }       
    }  

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.jaladera}>
                    <CardView
                        cardElevation={7}
                        cardMaxElevation={7}
                        cornerRadius={1}
                        style={styles.cardView}>

                        {

                            this.state.isShowing ? 
                            <View style={styles.resultContent}>
                                <View style={styles.containerTitle}>
                                    <Text style={styles.title}>{`El Resultado de: ${this.state.total}`}</Text>
                                </View>
                                <View style={styles.diamond}>
                                    <Animated.View                
                                        style={{opacity: this.diamante_primera}}>
                                        <Diamond                  
                                            number={this.state.first}                    
                                        /> 
                                    </Animated.View>  
                                    <Animated.View                
                                        style={{opacity: this.diamante_segundo}}>
                                        <Diamond                  
                                            number={this.state.second}                    
                                        /> 
                                    </Animated.View>  
                                    <Animated.View                
                                        style={{opacity: this.diamante_tercera}}>
                                        <Diamond                  
                                            number={this.state.third}                    
                                        /> 
                                    </Animated.View>  
                                   
                                </View> 
                            </View>

                            :

                            <View style={styles.corteciaJaladera}>
                               <Image
                                source={require('../../../assets/diamante-icon.png')}
                                style={styles.diamanteIcon}
                               />
                               <Text style={styles.infoJaladera}>Ahora podrás consultar los números que se atraen mutuamente</Text>
                            </View>

                        }

                        
                    </CardView>
                </View>

                <View style={styles.controls}>
                  
                    <TextInput 
                        style={styles.textInput}
                        placeholder='Digite el número Jalador'
                        placeholderTextColor='#63A2E9'
                        allowFontScaling={false}
                        autoFocus={false} 
                        keyboardType='numeric'
                        onChangeText={(text)=> this.onChanged(text)}
                        value={
                           this.state.myNumber ? this.state.myNumber : ''
                        }
                        maxLength={10}  //setting limit of input                       
                        onSubmitEditing ={(text) => this.submitJabladera(text)}                      
                        underlineColorAndroid="#1565C0"
                        style={[ {fontSize: 20, zIndex:10} ]} 
                        enablesReturnKeyAutomatically={true}   
                        blurOnSubmit={false}               

                    />
                </View>
                
            </View>
        )
    }


    searchJaladera = () => {
        if(this.state.myNumber >= 1 && this.state.myNumber <= 25){
            const x = parseInt(this.state.myNumber)
             this.setState({
                 total: this.state.myNumber,
                 myNumber:0,    
                 isShowing: true,  
                 first: x+25,
                 second:x+50,
                 third: x+75,                     
            });
        }

        else if(this.state.myNumber >= 26 && this.state.myNumber <= 50){
            const x = parseInt(this.state.myNumber)
             this.setState({
                 total: this.state.myNumber,
                 myNumber:0,    
                 isShowing: true,  
                 first: x-25,
                 second:x+25,
                 third: x+50,                     
            });
        }

        else if(this.state.myNumber >= 51 && this.state.myNumber <= 75){
            const x = parseInt(this.state.myNumber)
             this.setState({
                 total: this.state.myNumber,
                 myNumber:0,    
                 isShowing: true,  
                 first: x-50,
                 second:x-25,
                 third: x+25,                     
            });
        }

        else if(this.state.myNumber >= 76 && this.state.myNumber <= 100){
            const x = parseInt(this.state.myNumber)
             this.setState({
                 total: this.state.myNumber,
                 myNumber:0,    
                 isShowing: true,  
                 first: x-75,
                 second:x-50,
                 third: x-25,                     
            });
        }
        



    } //Close SearchJaladera



}

export default connect(null) (Jaladera)