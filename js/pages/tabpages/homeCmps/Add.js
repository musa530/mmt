import React, {Component} from 'react';
import {Image, StyleSheet, Dimensions, View, TouchableOpacity} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const imageWidth = windowWidth/2;

export default class Add extends Component{
    render() {
        console.log(`add_imageWidth:${imageWidth}`)
        return (
            <View style={styles.container}>
                <TouchableOpacity>
                    <Image style={styles.add_image} source={{uri:'https://satarmen.com/uploads/home/adv/5d283e86baa9a.jpg'}}/>
                </TouchableOpacity>
                <View>
                    <TouchableOpacity>
                        <Image style={[styles.add_image, {height: 75}]} source={{uri:'https://satarmen.com/uploads/home/adv/5d283f476b13f.jpg'}}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image style={[styles.add_image, {height: 75}]} source={{uri:'https://satarmen.com/uploads/home/adv/5d283e80c7dd7.jpg'}}/>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: windowWidth,
        marginTop: 5
    },
    add_image: {
        resizeMode: "stretch",
        width: imageWidth,
        height: 150,
    }
});