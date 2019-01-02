import React, {Component} from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Platform,
} from 'react-native';

import ImageView from 'react-native-image-view';

const {width} = Dimensions.get('window');

const images = [
    {
        source: {
            uri:
                'https://avatars.mds.yandex.net/get-pdb/49816/d9152cc6-bf48-4e44-b2d5-de73b2e94454/s800',
        },
        title: 'London',
    },
    {
        // eslint-disable-next-line
        source: require('../../../assets/img2.jpg'),
        title: 'St-Petersburg',
        width: 1200,
        height: 800,
    },
    {
        // eslint-disable-next-line
        source: require('../../../assets/img3.jpg'),
        title: 'St-Petersburg',
        width: 1200,
        height: 800,
    },
    {
        // eslint-disable-next-line
        source: require('../../../assets/img1.jpg'),
        title: 'St-Petersburg',
        width: 1200,
        height: 800,
    },
    {
        source: {
            uri:
                'https://firebasestorage.googleapis.com/v0/b/control-diamante-1519145676088.appspot.com/o/info.jpeg?alt=media&token=43cc69c8-a451-4773-8ce3-d500de422765',
        },
        title: 'Paris',
        width: 806,
        height: 720,
    },
];

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
        paddingTop: Platform.select({ios: 0, android: 10}),
    },
    footer: {
        width,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    footerButton: {
        flexDirection: 'row',
        marginLeft: 15,
    },
    footerText: {
        fontSize: 16,
        color: '#FFF',
        textAlign: 'center',
    },
});

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            imageIndex: 0,
            isImageViewVisible: false,
            likes: images.reduce((acc, image) => {
                acc[image.title] = 0;

                return acc;
            }, {}),
        };    
    }

   

    render() {
        const {isImageViewVisible, imageIndex} = this.state;

        return (
            <View style={styles.container}>
                <View>
                    {images.map((image, index) => (
                        <TouchableOpacity
                            key={image.title}
                            onPress={() => {
                                this.setState({
                                    imageIndex: index,
                                    isImageViewVisible: true,
                                });
                            }}
                        >
                            <Image
                                style={{width, height: 200}}
                                source={image.source}
                                resizeMode="cover"
                            />
                        </TouchableOpacity>
                    ))}
                </View>
                <ImageView
                    glideAlways
                    images={images}
                    imageIndex={imageIndex}
                    animationType="fade"
                    isVisible={isImageViewVisible}
                    renderFooter={this.renderFooter}
                />
            </View>
        );
    }
}