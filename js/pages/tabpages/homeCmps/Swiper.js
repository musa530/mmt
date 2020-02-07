import React, {Component} from 'react';
import {View, StyleSheet, Text, Image, Dimensions} from 'react-native';
import Swiper from 'react-native-swiper';

var {height, width} = Dimensions.get('window');


export default class SwiperList extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){}

    render() {
        var swiperHeight = this.props.height;
        console.log(swiperHeight)
        return (
            <Swiper style={styles.wrapper}
                autoplay={'true'}
                autoplayTimeout={3}
                paginationStyle={styles.paginationStyle}
            >
                <Image source={require('../../../../assest/images/swiper1.jpg')}  style={[styles.imageStyle,{height: swiperHeight}]}/>
                <Image source={require('../../../../assest/images/swiper2.jpg')}  style={[styles.imageStyle,{height: swiperHeight}]}/>
                <Image source={require('../../../../assest/images/swiper3.png')}  style={[styles.imageStyle,{height: swiperHeight}]}/>
                <Image source={require('../../../../assest/images/swiper4.jpg')}  style={[styles.imageStyle,{height: swiperHeight}]}/>
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
        width: width,
        resizeMode: 'stretch'
    },
    paginationStyle: {
    }
});