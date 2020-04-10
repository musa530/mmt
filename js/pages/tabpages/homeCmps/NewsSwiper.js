import React, {Component} from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import Swiper from 'react-native-swiper';

export default class NewsSwiper extends Component{
    constructor(props){
        super(props);
        this.state = {
            title: '最新资讯',
            text1: '光年之外——GEM',
            text2: '光年之外——GEM&&Ari',
            text3: '光年之外——GEM&&NW',
            text4: '光年之外——GEM&&Focex',
        }
    }
    render() {
        return (
            <View style={styles.news_swiper}>
                <Text style={styles.title}>{this.state.title}</Text>
                <Swiper style={styles.wrapper}
                    horizontal={false}
                    autoplay={'true'}
                    autoplayTimeout={4}
                    paginationStyle={styles.paginationStyle}
                    showsPagination={false}
                >
                    <Text style={styles.newsText}>{this.state.text1}</Text>
                    <Text style={styles.newsText}>{this.state.text2}</Text>
                    <Text style={styles.newsText}>{this.state.text3}</Text>
                    <Text style={styles.newsText}>{this.state.text4}</Text>
                </Swiper>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
    },
    news_swiper: {
        flex: 1,
        height: 40,
        backgroundColor: 'white',
        flexDirection: 'row',
        marginTop: 10,
        marginLeft: 8,
        marginRight: 10,
        paddingTop: 10,
        paddingLeft: 5,
        borderRadius: 5
    },
    title: {
        color: 'red',
        fontWeight:'bold',
        marginRight: 15,
        fontSize:16
    },
    newsText:{}
});