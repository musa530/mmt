import React, {Component} from 'react';
import {View, Text, ScrollView, Image, Dimensions, StyleSheet} from 'react-native';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import All from './orderpages/All';
import DaiFaHuo from './orderpages/DaiFaHuo';
import DaiFuKuan from './orderpages/DaiFuKuan';
import DaiShouHuo from './orderpages/DaiShouHuo';
import Finished from './orderpages/Finished';

const {width, height} = Dimensions.get('window');

export default class AllOrder extends Component{
    constructor(props){
        super(props);
        this.state={
            routeName:'All'
        }
    }

    componentDidMount(){
        this.tabTopSelect()
    }

    tabTopSelect(){//判断顶部导航栏跳转的页面
        const {navigate} = this.props.navigation.state.params;
        const {id} = this.props.navigation.state.params;
        if (id==1) {
            this.setState({
                routeName: navigate
            })
        }
        if (id==2) {
            this.setState({
                routeName: navigate
            })
        }
        if (id==3) {
            this.setState({
                routeName: navigate
            })
        }
        if (id==4) {
            this.setState({
                routeName: navigate
            })
        }
    }

    _tabNavigator(){
        return createAppContainer(createMaterialTopTabNavigator({
            All:{
                screen: All,
                navigationOptions:{
                    tabBarLabel: '全部'
                }
            },
            DaiFuKuan:{
                screen: DaiFuKuan,
                navigationOptions:{
                    tabBarLabel: '待付款'
                }
            },
            DaiFaHuo:{
                screen: DaiFaHuo,
                navigationOptions:{
                    tabBarLabel: '待发货'
                }
            },
            DaiShouHuo:{
                screen: DaiShouHuo,
                navigationOptions:{
                    tabBarLabel: '待收货'
                }
            },
            Finished:{
                screen: Finished,
                navigationOptions:{
                    tabBarLabel: '已完成'
                }
            },
        },{
            tabBarPosition: 'top',
            swipeEnabled: true,
            initialRouteName:this.state.routeName,
            order:["All","DaiFuKuan","DaiFaHuo","DaiShouHuo","Finished"],
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
        }));
    }

    static navigationOptions=()=>({
        title: '订单管理'
    });

    render(){
        const Top = this._tabNavigator();
        return(
            <View style={styles.container}>
                <Top></Top>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#f7f7f7'
    }
});