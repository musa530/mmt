import React, {Component} from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import Swiper from 'react-native-swiper';

const BANNER = [
    '',
    '',
    '',
    ''
]

export default class SwiperList extends Component{
    render() {
        return (
            <Swiper style={styles.wrapper}
                autoplay={'true'}
                autoplayTimeout={3}
                paginationStyle={styles.paginationStyle}
            >
                <Image source={require('../../../../assest/images/swiper1.jpg')}  style={styles.imageStyle}/>
                <Image source={require('../../../../assest/images/swiper2.jpg')}  style={styles.imageStyle}/>
                <Image source={require('../../../../assest/images/swiper3.png')}  style={styles.imageStyle}/>
                <Image source={require('../../../../assest/images/swiper4.jpg')}  style={styles.imageStyle}/>
            </Swiper>
        );
    }
}

const styles = StyleSheet.create({
    welcome: {
        color: '#333',
        fontSize: 18
    },
    wrapper: {
        bottom: 20,
    },
    imageStyle: {
        width: 400,
        height: 200,
        resizeMode: 'stretch'
    },
    paginationStyle: {
    }
});