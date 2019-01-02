import React, {Component}  from 'react';
import {
    FlatList,
} from 'react-native';

//Libray o Plugin
import { connect } from 'react-redux';

//Components
import Empty from '../components/empty';
import Separador from '../components/separator';
import ItemEvent from '../components/item-event';

function mapStateToProps(state) {
    return{
        list: state.planes.allEventos
    }
}

class EventosList extends Component{  

    static navigationOptions = {
        tabBarLabel: 'Planes'
    }

    renderEmtpy = () => <Empty text="No Existe Eventos Activos por el momento"/>

    itemSeparator = () => <Separador/>

    renderItem = ({item}) =>{
        return(
            <ItemEvent {...item}/> 
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

export default connect(mapStateToProps) (EventosList);