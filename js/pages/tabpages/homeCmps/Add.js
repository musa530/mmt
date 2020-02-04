import React, {Component} from 'react';
import {Image, StyleSheet, Dimensions, View} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const imageWidth = windowWidth - 10;

export default class Add extends Component{
    render() {
        console.log(`add_imageWidth:${imageWidth}`)
        return <View style={styles.container}>
            <Image style={styles.add_image} source={require('../../../../assest/images/add.png')}/>
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center"
    },
    add_image: {
        marginTop: 5,
        resizeMode: 'contain',
        width: imageWidth,
        height: 150,
    }
});