import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Alert} from 'react-native';
import SwiperList from './homeCmps/Swiper';
import Circle from './homeCmps/Circle';
import TopSreach from './homeCmps/TopSreach';
import DynamicPic from './homeCmps/DynamicPic';
import NavigationBar from './homeCmps/NavigationBar';
import NewsSwiper from './homeCmps/NewsSwiper';
import CommodityDisplay from './homeCmps/CommodityDisplay';
import Add from './homeCmps/Add';
import EmpityBox from '../EmpityBox';
import NavigationUtil from '../../AppNavigator/NavigationUtil';
import { AsyncStorage } from '@react-native-community/async-storage';

var {height, width} = Dimensions.get('window');

export default class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            'pre': '当前显示是',
            'name': '读取的数据'
        }
    }

    async getItem(){
        try {
            const value = await AsyncStorage.getItem('pre')
            if (value !== null) {
                this.setState({'pre': value})
            }
            Alert.alert('读取数据成功!')
        } catch(e){
            console.log(e)
            Alert.alert('读取数据失败')
        }
        
    }

    setItem = () => {
        const _this = this
        AsyncStorage.setItem('pre', _this.state.name);
        Alert.alert('保存成功')
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
                    <NavigationBar/>
                    <DynamicPic/>
                    <Add/>
                    <NewsSwiper/>
                    <CommodityDisplay title={'热门推荐'}/>
                    <CommodityDisplay title={'销量排行'}/>
                    <CommodityDisplay title={'新品上架'}/>
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
                    <View style={{flex:1,flexDirection:'row', justifyContent:'space-evenly', alignItems:'center',margin:15}}>
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
                    </View>
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