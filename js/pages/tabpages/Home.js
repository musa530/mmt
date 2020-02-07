import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions, ScrollView} from 'react-native';
import SwiperList from './homeCmps/Swiper';
import Circle from './homeCmps/Circle';
import TopSreach from './homeCmps/TopSreach';
import DynamicPic from './homeCmps/DynamicPic';
import NavigationBar from './homeCmps/NavigationBar';
import NewsSwiper from './homeCmps/NewsSwiper';
import CommodityDisplay from './homeCmps/CommodityDisplay';
import Add from './homeCmps/Add';

var {height, width} = Dimensions.get('window');

export default class Home extends Component{
    constructor(props){
        super(props);
    }

    render() {
        return(
            <ScrollView style={{flex: 1}}>
                <View style={styles.container}>
                    <Circle/>
                    <TopSreach/>
                    <View style={styles.swiper_list}>
                        <SwiperList height={180}/>
                    </View>
                    <DynamicPic/>
                    <NavigationBar/>
                    <NewsSwiper/>
                    <Add/>
                    <CommodityDisplay title={'热门推荐'}/>
                    <CommodityDisplay title={'销量排行'}/>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f7f7f7',
    },
    welcome: {
      color: '#333',
      fontSize: 18
    },
    swiper_list: {
        width: width,
        height: 180,
        marginTop: -130,
    },
});