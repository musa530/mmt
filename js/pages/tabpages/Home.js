import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Alert} from 'react-native';
import SwiperList from './homeCmps/Swiper';
import Circle from './homeCmps/Circle';
import TopSreach from './homeCmps/TopSreach';
import DynamicPic from './homeCmps/DynamicPic';
import NavigationBar from './homeCmps/NavigationBar';
import NewsSwiper from './homeCmps/NewsSwiper';
import CommodityDisplay from './homeCmps/CommodityDisplay';
import HotProducts from './homeCmps/HotProducts';
import RecentProducts from './homeCmps/RecentProducts';
import Add from './homeCmps/Add';
import EmpityBox from '../EmpityBox';
import NavigationUtil from '../../AppNavigator/NavigationUtil';
import { AsyncStorage } from '@react-native-community/async-storage';
import Toast from '../../AppNavigator/ToastDemo'

var {height, width} = Dimensions.get('window');

export default class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            'pre': '当前显示是',
            'name': '读取的数据',
            banners: [],//轮播图
            floor_ads: [],//动图
            promotion_ads: [],//三张广告图
            good_products:[],//热门推荐
            hot_products:[],//销量排行
            recently_products:[],//全部商品
        }
    }

    UNSAFE_componentWillMount() {
        Toast.show('数据读取中...')
    }

    componentDidMount() {
        this._netWorkFetch()
        this._netWorkFetchSecond()
    }

    _netWorkFetch = () => {
        //轮播图、动态广告图、三张广告图
        fetch('https://satarmen.com/api/Index/getIndexAdList')
        .then(response => response.json())
        .then((responseJson)=>{
            let banners = responseJson.result.banners
            let floor_ads = responseJson.result.floor_ads
            let promotion_ads = responseJson.result.promotion_ads
            this.setState({banners, floor_ads, promotion_ads})
        }).catch((error) => {
            console.log(error)
        })

        
    }

    _netWorkFetchSecond = () => {
        fetch('https://satarmen.com/api/Index/getProductList')
        .then(response => response.json())
        .then((responseJson) => {
            let good_products = responseJson.result.good_products//热门推荐
            let hot_products = responseJson.result.hot_products//销量排行
            let recently_products = responseJson.result.recently_products//全部商品
            // console.log(good_products)
            this.setState({good_products, hot_products, recently_products})
        })
        .catch(error => console.log(error))
    }

    render() {
        return(
            <ScrollView>
                <View style={styles.container}>
                    <Circle/>
                    <TopSreach/>
                    <View style={styles.swiper_list}>
                        <SwiperList height={200} banners = {this.state.banners}/>
                    </View>
                    <NavigationBar/>
                    <DynamicPic floor_ads={this.state.floor_ads}/>
                    <Add promotion_ads={this.state.promotion_ads}/>
                    <NewsSwiper/>
                    <CommodityDisplay title={'热门推荐'} good_products={this.state.good_products} id={0}/>
                    <HotProducts title={'销量排行'} hot_products={this.state.hot_products} id={1}/>
                    <RecentProducts title={'新品上架'} recently_products={this.state.recently_products} id={2}/>
                    {/* modal模板的调试按钮
                        <Button
                            title={'go to ModalDemoPage'}
                            onPress={()=>{
                            NavigationUtil.goPage({
                                navigation: this.props.navigation
                            }, "ModalDemo")
                        }}
                    /> */}
                    <EmpityBox/>
                    {/* <View style={{flex:1,flexDirection:'row', justifyContent:'space-evenly', alignItems:'center',margin:15}}>
                        <TouchableOpacity style={{backgroundColor:'cyan', padding:5, width:'40%', alignItems:'center'}}
                            onPress={this.setItem.bind(this)}
                        ><Text style={{color:'#fff'}}>保存</Text></TouchableOpacity>
                        <TouchableOpacity style={{backgroundColor:'red', padding:5, width:'40%', alignItems:'center'}}><Text style={{color:'#fff'}}
                            onPress={this.getItem.bind(this)}
                        >读取</Text></TouchableOpacity>
                    </View>
                    <Text>1</Text>
                    <View  style={{backgroundColor:'red',padding:5,alignItems:'center',width:'100%'}}>
                        <Text style={{color:'white'}}>{this.state.pre}</Text>
                    </View> */}
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
        height: 200,
        marginTop: -130,
    },
});