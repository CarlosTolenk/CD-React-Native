import React, {Component} from 'react'
import {    
    Animated,
    View,
    Image,
    Dimensions
} from 'react-native'

import Swiper from 'react-native-swiper'

const {height, width} = Dimensions.get('window');
const heightSlider = height/4;

const Slider = props => ( <View style={styles.container}>
        <Image style={styles.image} source={props.uri}/>
    </View>
)

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',        
    },
    image: {
        flex: 1,
        resizeMode: 'stretch',
        width      
    }
}

export default class extends Component {
    constructor(props){
        super(props)
        
        this.state = {
            imagesSlider: [
                require('../../../assets/img1.jpg'),
                require('../../../assets/img2.jpg'),  
                require('../../../assets/img3.jpg')  
           
             
            ]
        }
    }
    render(){
        return (
            <View style={{backgroundColor: '#007aff', width, height:heightSlider}}>
                <Swiper
                    autoplay                   
                >
                {
                    this.state.imagesSlider.map((item, i) => <Slider 
                        uri={item}
                        key={i}
                    />)
                }

                </Swiper>
            </View>
        )
    }
}















































// const deviceWidth = Dimensions.get('window').width
// const FIXED_BAR_WIDTH = 280
// const BAR_SPACE = 5

// const images = [
//   'https://s-media-cache-ak0.pinimg.com/originals/ee/51/39/ee5139157407967591081ee04723259a.png',
//   'https://s-media-cache-ak0.pinimg.com/originals/40/4f/83/404f83e93175630e77bc29b3fe727cbe.jpg',
//   'https://s-media-cache-ak0.pinimg.com/originals/8d/1a/da/8d1adab145a2d606c85e339873b9bb0e.jpg',
// ]

// export default class App extends Component {

//   numItems = images.length
//   itemWidth = (FIXED_BAR_WIDTH / this.numItems) - ((this.numItems - 1) * BAR_SPACE)
//   animVal = new Animated.Value(0)

//   render() {
//     let imageArray = []
//     let barArray = []
//     images.forEach((image, i) => {
//       console.log(image, i)
//       const thisImage = (
//         <Image
//           key={`image${i}`}
//           source={{uri: image}}       
//           style={styles.imageContaint}
//         />
//       )
//       imageArray.push(thisImage)

//       const scrollBarVal = this.animVal.interpolate({
//         inputRange: [deviceWidth * (i - 1), deviceWidth * (i + 1)],
//         outputRange: [-this.itemWidth, this.itemWidth],
//         extrapolate: 'clamp',
//       });

//       const thisBar = (
//         <View
//           key={`bar${i}`}
//           style={[
//             styles.track,
//             {
//               width: this.itemWidth,
//               marginLeft: i === 0 ? 0 : BAR_SPACE,
//             },
//           ]}
//         >
//           <Animated.View
//             style={[
//               styles.bar,
//               {
//                 width: this.itemWidth,
//                 transform: [
//                   { translateX: scrollBarVal },
//                 ],
//               },
//             ]}
//           />
//         </View>
//       );
//       barArray.push(thisBar)
//     })

//     return (
//       <View style={styles.container} flex={1}>
//         <ScrollView
//           horizontal
//           showsHorizontalScrollIndicator={true}
//           scrollEventThrottle={50}
//           pagingEnabled
//           onScroll={
//             Animated.event(
//               [{ nativeEvent: { contentOffset: { x: this.animVal } } }]
//             )
//           }
//         >

//           {imageArray}

//         </ScrollView>
//         <View style={styles.barContainer}>
//           {barArray}
//         </View>
//       </View>
//     )
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   barContainer: {
//     position: 'absolute',
//     zIndex: 2,
//     top: 20,
//     flexDirection: 'row',
//   },
//   track: {
//     backgroundColor: '#ccc',
//     overflow: 'hidden',
//     height: 2,  
//   },
//   bar: {
//     backgroundColor: '#5294d6',
//     height: 2,
//     position: 'absolute',
//     left: 0,
//     top: 0,
//   },
//   imageContaint: {
//     width: deviceWidth,
//     resizeMode: 'stretch'
//   }
// })




