import React, {Component}  from 'react';
import {
    FlatList,
} from 'react-native';

//Libray o Plugin
import { connect } from 'react-redux';


//Components
import Empty from '../components/empty';
import Separador from '../components/separator';
import ItemPlan from '../components/item-plan';

function mapStateToProps(state) {
    return{
        list: state.planes.allPlanes
    }
}

class PlanesList extends Component{  

    static navigationOptions = {
        tabBarLabel: 'Planes'
    }
    
    constructor(){
        super();
    }

    shouldComponentUpdate = () =>{
        // return a boolean value
        return true;
    }
    
    

    renderEmtpy = () => <Empty text="No Existe Planes Activos por el momento"/>

    itemSeparator = () => <Separador/>

    renderItem = ({item}) =>{
        return(
            <ItemPlan {...item}/> 
        )
    }     

    render(){
        return(       
   
            <FlatList           
                data = {this.props.list} //Se le pasa una lista o un array.
                ListEmptyComponent = {this.renderEmtpy}
                ItemSeparatorComponent = {this.itemSeparator}
                renderItem = {this.renderItem}
           />   
       
        )
    }

}

export default connect(mapStateToProps) (PlanesList);