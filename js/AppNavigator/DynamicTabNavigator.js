import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator, BottomTabBar} from 'react-navigation-tabs';
import {StyleSheet, Button, View, Text} from 'react-native';
import Home from '../pages/tabpages/Home';
import Category from '../pages/tabpages/Category';
import SelfSupport from '../pages/tabpages/SelfSupport';
import Cart from '../pages/tabpages/Cart';
import Profile from '../pages/tabpages/Profile';
import AntDesign from 'react-native-vector-icons/AntDesign';
import NavigationUtil from './NavigationUtil';

const TABS = {
    Home: {
        screen: Home,
        navigationOptions: {
            tabBarLabel: "首页",
            tabBarIcon: ({tintColor, focused}) => (
                <AntDesign
                    name={'home'}
                    size={24}
                    style={{color: tintColor}}
                />
            )
        }
    },
    SelfSupport: {
        screen: SelfSupport,
        navigationOptions: {
            tabBarLabel: "自营",
            tabBarIcon: ({tintColor, focused}) => (
                <AntDesign
                    name={'isv'}
                    size={24}
                    style={{color: tintColor}}
                />
            )
        }
    },
    Category: {
        screen: Category,
        navigationOptions: {
            tabBarLabel: "分类",
            tabBarIcon: ({tintColor, focused}) => (
                <AntDesign
                    name={'appstore-o'}
                    size={24}
                    style={{color: tintColor}}
                />
            )
        }
    },
    Cart: {
        screen: Cart,
        navigationOptions: {
            tabBarLabel: "购物车",
            tabBarIcon: ({tintColor, focused}) => (
                <AntDesign
                    name={'shoppingcart'}
                    size={25}
                    style={{color: tintColor}}
                />
            )
        }
    },
    Profile: {
        screen: Profile,
        navigationOptions: {
            tabBarLabel: "我的",
            tabBarIcon: ({tintColor, focused}) => (
                <AntDesign
                    name={'user'}
                    size={24}
                    style={{color: tintColor}}
                />
            )
        }
    },
};

export default class DynamicTabNavigator extends Component{
    constructor(props){
        super(props);
        console.disableYellowBox = true;
    }

    _tabNavigator() {
        if(this.Tabs){
            return this.Tabs
        }

        const {Home, SelfSupport, Category, Cart, Profile} = TABS;
        const tabs = {Home, SelfSupport, Category, Cart, Profile};
        return this.Tabs = createAppContainer(createBottomTabNavigator(tabs, {
            tabBarOptions: {
                activeTintColor: '#f20'
            }
        }))
    }

    render() {
        NavigationUtil.navigaton = this.props.navigaton;
        const Tab = this._tabNavigator();
        return <Tab></Tab>
    }
}
