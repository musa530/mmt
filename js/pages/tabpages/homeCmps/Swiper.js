import React, {Component} from 'react';
import {View, StyleSheet, Text, Image, Dimensions} from 'react-native';
import Swiper from 'react-native-swiper';

var {height, width} = Dimensions.get('window');


export default class SwiperList extends Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }

    componentDidMount(){}

    renderSwiperItem = (banners, swiperHeight) => {
        return  banners.map((item, index) => {
            return <Image source={{uri:item.adv_code}} resizeMode="stretch"  style={[styles.imageStyle,{height: swiperHeight}]} key={index}/>
        })
    }

    render() {
        var swiperHeight = this.props.height;
        var banners = this.props.banners;
        return (
            <Swiper style={styles.wrapper}
                    autoplay={true}
                    autoplayTimeout={3}
                    paginationStyle={styles.paginationStyle}
                    activeDotColor='cyan'
                >
                {this.renderSwiperItem(banners, swiperHeight)}
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
    },
    paginationStyle: {
    }
});