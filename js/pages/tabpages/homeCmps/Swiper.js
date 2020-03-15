import React, {Component} from 'react';
import {View, StyleSheet, Text, Image, Dimensions} from 'react-native';
import Swiper from 'react-native-swiper';

var {height, width} = Dimensions.get('window');


const SwiperImg = [
    {
        url: '../../../../assest/images/swiper1.jpg'
    },
    {
        url: '../../../../assest/images/swiper2.jpg'
    },
    {
        url: '../../../../assest/images/swiper3.png'
    },
    {
        url: '../../../../assest/images/swiper4.jpg'
    },
];

export default class SwiperList extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){}

    render() {
        var swiperHeight = this.props.height;
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

class SwiperItem extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const swiperImg = this.props.Swiperimg;
        const imgList = [];
        for(var i in swiperImg){
            var row = (
                <View key={i}>
                    <Image source={`require: {swiperImg[i].url}`}/>
                </View>
            );
            imgList.push(row);
            console.log(swiperImg[i].url);
            
        }
        return {imgList};
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