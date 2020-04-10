import {createAppContainer} from 'react-navigation'
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import LikedShop from './likedpages/LikedShop'
import LikedMall from './likedpages/LikedMall'
import React, { Component } from 'react';
import { View } from 'react-native';



export default class Like extends Component{
    constructor(props){
        super(props);
        this.state = {
            routeName: 'LikedMall'
        }
    }

    UNSAFE_componentWillMount(){
        console.log(this.props.navigation.state.params.routeName)
        let routeName = this.props.navigation.state.params.routeName
        let id = this.props.navigation.state.params.id
        if (id == 1) {
            this.setState({routeName})
        }
        
    }

    _tabs() {
        const Tabs = createMaterialTopTabNavigator({
            LikedShop:{
                screen: LikedShop,
                navigationOptions:{
                    tabBarLabel:'收藏店铺'
                }
            },
            LikedMall:{
                screen:LikedMall,
                navigationOptions:{
                    tabBarLabel:'收藏宝贝'
                }
            }
        },{
            tabBarPosition: 'top',
            swipeEnabled: true,
            initialRouteName:this.state.routeName,
            order:["LikedShop","LikedMall"],
            tabBarOptions:{
                activeTintColor: '#f00',
                inactiveTintColor: '#000',
                tabStyle: {mindWidth:0},
                upperCaseLabel: false, //是否使标签大写，默认为true
                // scrollEnabled: true,  //是否支持 选项卡滚动，默认为false
                style: {
                    backgroundColor: '#fff', //Tabbar 的背景色
                    height: 40
                },
                indicatorStyle: {
                    height: 2,
                    backgroundColor: 'red'
                },//标签指示器的样式
                labelStyle: {
                    fontSize: 13,
                    marginBottom: 8,
                    color:'#000'
                },//文字的样式
            }
        })
        
        const Liked = createAppContainer(Tabs)

        return <Liked />
    }
    

    render(){
        return <View style={{flex:1}}>{this._tabs()}</View>
    }
}