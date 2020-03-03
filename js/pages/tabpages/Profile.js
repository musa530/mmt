import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, ScrollView, Alert} from 'react-native';
import Circle from './homeCmps/Circle';
import NavigationUtil from '../../AppNavigator/NavigationUtil';

const {width, height} = Dimensions.get('window');
const settingIcon = width - 40;
const itemWidth = (width/4) - 20;
const iconWidth = (width/4) - 50;

export default class Profile extends Component{
    constructor(props){
        super(props);
    }

    render() {
        console.log(`iconWidth: ${iconWidth}`)
        return(
            <View style={styles.container}>
                {/* 页眉布局 */}
                <View style={{height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red', width: width}}>
                    <Text style={{marginTop: 5, color: 'white', fontSize: 16}}>个人中心</Text>
                </View>
                <ProfileCmps/>
            </View>
        );
    }
}

class ProfileCmps extends Component {
    constructor(props){
        super(props);
        this.state = {
            user_name: 'Free·z Z',
            user_id: 'wx_99456125',
            money: '1000.00'
        }
    }

    
    renderHead() {//头像部分
        return (
            <View style={{position: "absolute"}}>

                {/* 设置按钮布局 */}
                {/*<TouchableOpacity
                    onPress={()=>{
                        alert('Setting')
                    }}
                >
                <Image source={require('../../../assest/images/setting.png')} style={styles.setting}/></TouchableOpacity>*/}

                {/* 用户信息布局 */}
                <View style={{top: 10, left: 15, flexDirection: 'row', alignItems: 'center'}}>
                    <Image source={require('../../../assest/images/mall/mall1.jpg')}
                        style={{width: 65, height: 65, borderRadius: 999, borderWidth: 1, borderColor: '#333'}}
                        resizeMode= 'cover'
                    />
                    <View>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{fontSize: 20, marginLeft: 12, color: 'white'}}>{this.state.user_name}</Text>

                            <View style={{flexDirection: 'row', alignItems: 'center', backgroundColor: '#333',padding: 2,marginLeft: 3, borderRadius: 8}}>
                                <Image source={require('../../../assest/images/level.png')}
                                    style={{width: 15,height: 15}}
                                />
                                <Text style={{color: 'white',fontSize: 12}}>白金</Text>
                            </View>
                        </View>
                        <Text style={{fontSize: 14, marginLeft: 8, marginTop: 10, color: '#cdcdcd'}}>会员ID：{this.state.user_id}</Text>
                    </View>
                </View>
                
            </View>
        );
    }

    renderUserInfo() {//预存款和会员中心部分
        return (
            <View style={styles.userInfo}>
                <View style={{flexDirection: 'row', justifyContent: 'space-around', padding: 5}}>
                    <TouchableOpacity
                        onPress={() =>{
                            Alert.alert('预存款明细',`您的预存款为￥${this.state.money}`)
                        }}
                    >
                    <Text style={{fontSize: 16, padding: 5}}>预存款￥{this.state.money}</Text></TouchableOpacity>
                    <TouchableOpacity
                        onPress={() =>{
                            NavigationUtil.goPage({
                                navigation: this.props.navigation
                            }, "MemberCenter")
                        }}
                    >
                    <Text style={{fontSize: 16, padding: 5}}>会员中心</Text></TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-evenly', paddingTop: 5, paddingBottom: 15}}>
                    <TouchableOpacity
                        onPress={() =>{
                            NavigationUtil.goPage({
                                navigation: this.props.navigation
                            }, "MyJifen")
                        }}
                    >
                    <View style={{alignItems: 'center'}}>
                        <Image style={styles.image} source={require('../../../assest/images/jifen.png')}/>
                        <Text>我的积分</Text>
                    </View></TouchableOpacity>

                    <TouchableOpacity
                        onPress={() =>{
                            alert('我的兑换')
                        }}
                    >
                    <View style={{alignItems: 'center'}}>
                        <Image style={styles.image} source={require('../../../assest/images/duihuan.png')}/>
                        <Text>我的兑换</Text>
                    </View></TouchableOpacity>

                    <TouchableOpacity
                        onPress={() =>{
                            alert('我的好友')
                        }}
                    >
                    <View style={{alignItems: 'center'}}>
                        <Image style={styles.image} source={require('../../../assest/images/haoyou.png')}/>
                        <Text>我的好友</Text>
                    </View></TouchableOpacity>
                    
                    <TouchableOpacity
                        onPress={() =>{
                            alert('我的消息')
                        }}
                    >
                    <View style={{alignItems: 'center'}}>
                        <Image style={styles.image} source={require('../../../assest/images/xinxi.png')}/>
                        <Text>我的消息</Text>
                    </View></TouchableOpacity>
                </View>
            </View>
        );
    }

    renderOrder() {//订单详细
        return(
            <View style={{marginLeft: 15, marginRight: 15, padding: 3, top: -60, backgroundColor: 'white', borderRadius: 8}}>
                {/* allOrder */}
                <View style={{flexDirection: 'row',alignItems: 'center', justifyContent: 'space-between',padding: 10}}>
                    <Text>我的订单</Text>
                    <TouchableOpacity>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text>查看全部订单</Text>
                        <Image style={{width: 15, height: 15}} source={require('../../../assest/images/rightside.png')}/>
                    </View></TouchableOpacity>
                </View>

                {/* orderInfo */}
                <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10}}>
                    <TouchableOpacity>
                    <View style={{alignItems: 'center'}}>
                        <Image style={{width: 32, height: 32, marginBottom: 8}} source={require('../../../assest/images/daifu.png')}/>
                        <Text>待发货</Text>
                    </View></TouchableOpacity>

                    <TouchableOpacity>
                    <View style={{alignItems: 'center'}}>
                        <Image style={{width: 32, height: 32, marginBottom: 8}} source={require('../../../assest/images/daifa.png')}/>
                        <Text>待付货</Text>
                    </View></TouchableOpacity>

                    <TouchableOpacity>
                    <View style={{alignItems: 'center'}}>
                        <Image style={{width: 32, height: 32, marginBottom: 8}} source={require('../../../assest/images/daishou.png')}/>
                        <Text>待收货</Text>
                    </View></TouchableOpacity>

                    <TouchableOpacity>
                    <View style={{alignItems: 'center'}}>
                        <Image style={{width: 32, height: 32, marginBottom: 8}} source={require('../../../assest/images/daiping.png')}/>
                        <Text>待评价</Text>
                    </View></TouchableOpacity>

                    <TouchableOpacity>
                    <View style={{alignItems: 'center'}}>
                        <Image style={{width: 32, height: 32, marginBottom: 8}} source={require('../../../assest/images/tuiK_shouH.png')}/>
                        <Text>退款/售后</Text>
                    </View></TouchableOpacity>
                </View>
            </View>
        );
    }

    renderList() {//八项功能列
        return(
            <View style={{flexDirection: 'row', flexWrap: 'wrap', backgroundColor: 'white', marginRight: 15, marginLeft: 15, paddingTop: 15, justifyContent: 'space-around', paddingBottom: 10, top: -25}}>
                
                <TouchableOpacity>
                <View style={{alignItems: 'center', width: itemWidth, marginBottom: 15}}>
                    <Image style={{width: iconWidth, height: iconWidth, marginBottom: 8}} source={require('../../../assest/images/like.png')}/>
                    <Text>收藏宝贝</Text>
                </View></TouchableOpacity>

                <TouchableOpacity>
                <View style={{alignItems: 'center', width: itemWidth, marginBottom: 15}}>
                    <Image style={{width: iconWidth, height: iconWidth, marginBottom: 8}} source={require('../../../assest/images/shop.png')}/>
                    <Text>收藏店铺</Text>
                </View></TouchableOpacity>

                <TouchableOpacity>
                <View style={{alignItems: 'center', width: itemWidth, marginBottom: 15}}>
                    <Image style={{width: iconWidth, height: iconWidth, marginBottom: 8}} source={require('../../../assest/images/tixian.png')}/>
                    <Text>提现管理</Text>
                </View></TouchableOpacity>

                <TouchableOpacity>
                <View style={{alignItems: 'center', width: itemWidth, marginBottom: 15}}>
                    <Image style={{width: iconWidth, height: iconWidth, marginBottom: 8}} source={require('../../../assest/images/chongzhi.png')}/>
                    <Text>充值管理</Text>
                </View></TouchableOpacity>

                <TouchableOpacity>
                <View style={{alignItems: 'center', width: itemWidth, marginBottom: 15}}>
                    <Image style={{width: iconWidth, height: iconWidth, marginBottom: 8}} source={require('../../../assest/images/zijin.png')}/>
                    <Text>我的资金</Text>
                </View></TouchableOpacity>

                <TouchableOpacity>
                <View style={{alignItems: 'center', width: itemWidth, marginBottom: 15}}>
                    <Image style={{width: iconWidth, height: iconWidth, marginBottom: 8}} source={require('../../../assest/images/quan.png')}/>
                    <Text>我的代金券</Text>
                </View></TouchableOpacity>

                <TouchableOpacity>
                <View style={{alignItems: 'center', width: itemWidth, marginBottom: 15}}>
                    <Image style={{width: iconWidth, height: iconWidth, marginBottom: 8}} source={require('../../../assest/images/anquan.png')}/>
                    <Text>安全中心</Text>
                </View></TouchableOpacity>

                <TouchableOpacity>
                <View style={{alignItems: 'center', width: itemWidth, marginBottom: 15}}>
                    <Image style={{width: iconWidth, height: iconWidth, marginBottom: 8}} source={require('../../../assest/images/kefu.png')}/>
                    <Text>商城客服</Text>
                </View></TouchableOpacity>

            </View>
        );
    }

    renderFooter() {//底部功能列
        return(
            <View style={{backgroundColor: 'white', padding: 10}}>

                <TouchableOpacity>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', padding: 5}}>
                        <Image style={{width: 20, height: 20, marginRight: 8}} source={require('../../../assest/images/zhinan.png')}/>
                        <Text>新手指南</Text>
                    </View>
                    <Image style={{width: 20, height: 20}} source={require('../../../assest/images/rightside.png')}/>
                </View></TouchableOpacity>

                <TouchableOpacity>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', padding: 5}}>
                        <Image style={{width: 20, height: 20, marginRight: 8}} source={require('../../../assest/images/zixun.png')}/>
                        <Text>咨询管理</Text>
                    </View>
                    <Image style={{width: 20, height: 20}} source={require('../../../assest/images/rightside.png')}/>
                </View></TouchableOpacity>

                <TouchableOpacity>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', padding: 5}}>
                        <Image style={{width: 20, height: 20, marginRight: 8}} source={require('../../../assest/images/jubao.png')}/>
                        <Text>举报管理</Text>
                    </View>
                    <Image style={{width: 20, height: 20}} source={require('../../../assest/images/rightside.png')}/>
                </View></TouchableOpacity>

                <TouchableOpacity>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', padding: 5}}>
                        <Image style={{width: 20, height: 20, marginRight: 8}} source={require('../../../assest/images/tousu.png')}/>
                        <Text>投诉管理</Text>
                    </View>
                    <Image style={{width: 20, height: 20}} source={require('../../../assest/images/rightside.png')}/>
                </View></TouchableOpacity>

                <TouchableOpacity>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', padding: 5}}>
                        <Image style={{width: 20, height: 20, marginRight: 8}} source={require('../../../assest/images/fapiao.png')}/>
                        <Text>发票管理</Text>
                    </View>
                    <Image style={{width: 20, height: 20}} source={require('../../../assest/images/rightside.png')}/>
                </View></TouchableOpacity>

                <TouchableOpacity>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', padding: 5}}>
                        <Image style={{width: 20, height: 20, marginRight: 8}} source={require('../../../assest/images/dizhi.png')}/>
                        <Text>收货地址</Text>
                    </View>
                    <Image style={{width: 20, height: 20}} source={require('../../../assest/images/rightside.png')}/>
                </View></TouchableOpacity>

                <TouchableOpacity>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', padding: 5}}>
                        <Image style={{width: 20, height: 20, marginRight: 8}} source={require('../../../assest/images/liaotian.png')}/>
                        <Text>我的评价</Text>
                    </View>
                    <Image style={{width: 20, height: 20}} source={require('../../../assest/images/rightside.png')}/>
                </View></TouchableOpacity>

                <TouchableOpacity>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', padding: 5}}>
                        <Image style={{width: 20, height: 20, marginRight: 8}} source={require('../../../assest/images/liaotian.png')}/>
                        <Text>聊天记录</Text>
                    </View>
                    <Image style={{width: 20, height: 20}} source={require('../../../assest/images/rightside.png')}/>
                </View></TouchableOpacity>

            </View>
        );
    }

    renderExit() {//退出账号
        return(
            <View style={{marginTop: 20, backgroundColor: 'white', padding: 10}}>
                <TouchableOpacity>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', padding: 5}}>
                        <Image style={{width: 20, height: 20, marginRight: 8}} source={require('../../../assest/images/tuichu.png')}/>
                        <Text>退出账号</Text>
                    </View>
                    <Image style={{width: 20, height: 20}} source={require('../../../assest/images/rightside.png')}/>
                </View></TouchableOpacity>
            </View>
        );
    }
    
    renderBox() {//页面底部
        return (
            <View style={{height: 130}}></View>
        );
    }

    render () {
        return (
            <View style={styles.content}>
                <ScrollView>
                    <Circle/>
                    {this.renderHead()}
                    {this.renderUserInfo()}
                    {this.renderOrder()}
                    {this.renderList()}
                    {this.renderFooter()}
                    {this.renderExit()}
                    {this.renderBox()}
                </ScrollView>
            </View>
        );
    }
}




const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f7f7f7'
    },
    content: {
        position: "relative"
    },
    setting: {
        width: 25,
        height: 25,
        left: settingIcon,
        top: 10
    },
    userInfo: {
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: 'white',
        top: -90,
        borderRadius: 8
    },
    image: {
        width: 28,
        height: 28,
        marginBottom: 8
    }
});