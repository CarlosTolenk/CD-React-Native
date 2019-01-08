import React, {Component} from "react";
import {
	Image,
	Text,
	View, 
	Dimensions,
	RefreshControl,
	TouchableOpacity,
	BackHandler,
	Modal 
} from "react-native";
//Library o Plugin
import { connect } from 'react-redux';
import Masonry from "react-native-masonry-layout";
import { NavigationActions } from 'react-navigation';
import ImageView from 'react-native-image-view';
import ImageViewer from 'react-native-image-zoom-viewer';
import Orientation from 'react-native-orientation';

//Component
import CloseModalX from '../../section/components/closeModal';
import Alerta from './alertas'; 

// const { width, height } = Dimensions.get( "window" );
// const width = 0;
let columnWidth = 0;
let loadAnuncion = false;




function mapStateToProps(state) {
    return{
		list: state.planes.allAnuncios,
		alerta: state.planes.alertaSingle
    }
}

class Anuncios extends Component {
	constructor(props) {
		super(props);
		this.state = {
			withHeight: false,
			loading: false,
			imageIndex: 0,
			isImageViewVisible: false,   
			modalVisible: false,
			loadAnuncion: false        
		};
	 
	}
	
	componentWillMount() {	
		const initial = Orientation.getInitialOrientation();
		if (initial === 'PORTRAIT') {
			const { width } = Dimensions.get( "window" ).width;
			 columnWidth = ( width - 10 ) / 2 - 10;
		} else {
			const { width } = Dimensions.get( "window" ).height;
			 columnWidth = ( width - 10 ) / 2 - 10;
		}
	 }	
	
	onBackPress = () => {
		this.setState({		
			isImageViewVisible: false,
	
		});
		return true;
	}

	componentDidMount() {
		console.log(this.props.alerta);
		console.log(this.props.list)
	
	
		BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
	}

	componentDidUpdate(){
		if(!loadAnuncion && this.props.list){
			this.load();	
			loadAnuncion = true;
			console.log("CAmbiando ele staod");
		}
	
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (this.props.list !== nextProps.list) return true;
		if (this.props.alerta !== nextProps.alerta) return true;
		if (this.state.modalVisible !== nextState.modalVisible) return true;			
		return false;
	}
		
	
	

	componentWillUnmount(){
		BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
	}

	closeModal = () => {
		this.setState({
		  modalVisible: false,
		  isImageViewVisible: false,  
		  loading: false
		}) 
	  }

	load = () => {
	  this.setState( { loading: true } );
		if ( this.state.withHeight ) {
			this.refs.list.addItemsWithHeight( this.props.list );
		} else {
			this.refs.list.addItems( this.props.list );
		}		
	}

	onScrollEnd = ( event ) => {
		const scrollHeight = Math.floor( event.nativeEvent.contentOffset.y + event.nativeEvent.layoutMeasurement.height );
		const height = Math.floor( event.nativeEvent.contentSize.height );
		if ( scrollHeight >= height ) {
			this.load();
		}
	}
	

	render() {
		const {isImageViewVisible, imageIndex} = this.state;

		return <View style={{ flex: 1, backgroundColor: "white" }}>
		{
			this.props.alerta ?
			<Alerta alerta={this.props.alerta}/>  
			:
			null
		}

		<Masonry onMomentumScrollEnd={this.onScrollEnd.bind( this )}
		style={{ flex: 1}}
		columns={2} ref="list"
		containerStyle={{ padding: 5 }}				
		renderItem={item =>
			<View>
				<TouchableOpacity
					onPress={() => {
					setTimeout(()=>{
						this.setState({
						loading: true
						})
					},300)
						this.setState({
							imageIndex: item.index,
							modalVisible: true,
						
						});
					}}
				>
				<View
					style={{
						margin: 5,
						backgroundColor: "#fff",
						borderRadius: 5,
						overflow: "hidden",
						borderWidth: 1,
						borderColor: "#dedede",                                
					}}>
					<Image source={{ uri: item.url}}
						style={{
						height: item.height_image,
						width: columnWidth,
						resizeMode: 'stretch' }}/>	
					
				</View>
				
				</TouchableOpacity>					
			</View>		
				
			
			}
		/>

	  	<Modal
				visible={this.state.modalVisible}
				transparent={true}
				onRequestClose={() => this.setState({ modalVisible: false })}      
				>
			
				{/* <Text>Cerrar</Text> */}
					<ImageViewer
					imageUrls={this.props.list}
					index={this.state.imageIndex}
					enableSwipeDown={true}
					renderIndicator={() => null}
					onSwipeDown={() => {
						this.setState({ modalVisible: false })
					}}  
					// renderHeader={(index) => <Text style={styles.headerImage}>{images[index].props.title}</Text>}           
					
					
					/>
					{
					this.state.loading &&
					<CloseModalX close={this.closeModal} />
					}
			</Modal>
		
		

	
              
     
		</View>
	}
}



export default connect(mapStateToProps) (Anuncios)