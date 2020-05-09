import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions, Image, TouchableOpacity} from 'react-native';
import NavigationUtil from '../../../AppNavigator/NavigationUtil';

const BAR_NAME = ['折扣专区', '限时秒杀', '神券专区', '自营专区', '会员中心'];
const BAR_ICON = ['ios-options', 'ios-options','ios-options','ios-options','ios-options'];

export default class NavigationBar extends Component{
    constructor(props){
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                
                <View>
                    <TouchableOpacity
                        style={styles.bar_item}
                        onPress={()=>{
                            NavigationUtil.goPage({
                                navigation: this.props.navigation,
                                topTitle: '折扣专区',
                                page_id:0
                            }, "ActivePage")
                        }}
                    >
                        <Image style={styles.bar_image} source={{uri:'https://satarmen.com/h5/img/promotion.458946b6.png'}}/>
                        <Text style={styles.bar_text}>折扣专区</Text>
                    </TouchableOpacity>
                </View>
                
                
                <View>
                    <TouchableOpacity
                        style={styles.bar_item}
                        onPress={()=>{
                            NavigationUtil.goPage({
                                navigation: this.props.navigation,
                                topTitle: '限时秒杀',
                                page_id:1
                            }, "ActivePage")
                        }}
                    >
                        <Image style={styles.bar_image} source={{uri:'https://satarmen.com/h5/img/miaosha.c504fdea.png'}}/>
                        <Text style={styles.bar_text}>限时秒杀</Text>
                    </TouchableOpacity>
                </View>
                
                <View>
                    <TouchableOpacity
                        style={styles.bar_item}
                        onPress={()=>{
                            NavigationUtil.goPage({
                                navigation: this.props.navigation,
                                topTitle: '神券专区',
                                page_id:2
                            }, "ActivePage")
                        }}    
                    >
                        <Image style={styles.bar_image} source={{uri:'https://satarmen.com/h5/img/coupon.b1868411.png'}}/>
                        <Text style={styles.bar_text}>神券专区</Text>
                    </TouchableOpacity>
                </View>
                
                
                <View>
                    <TouchableOpacity
                        style={styles.bar_item}
                        onPress={()=>{
                            NavigationUtil.goPage({
                                navigation: this.props.navigation,
                                store_id: 1,
                                store_name: '新疆商城自营超市'
                            }, "ShopPage")
                        }}
                    >
                        <Image style={styles.bar_image} source={{uri:'https://satarmen.com/h5/img/ziying.89784b4d.png'}}/>
                        <Text style={styles.bar_text}>自营专区</Text>
                    </TouchableOpacity>  
                </View>
                
                
                <View>
                    <TouchableOpacity
                        style={styles.bar_item}
                        onPress={()=>{
                            NavigationUtil.goPage({
                                navigation: this.props.navigation,
                                topTitle: '会员中心'
                            }, "MemberCenter")
                        }}
                    >
                        <Image style={styles.bar_image} source={{uri:'https://satarmen.com/h5/img/pintuan.754899ec.png'}}/>
                        <Text style={styles.bar_text}>会员中心</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'white',
        paddingTop: 8,
        paddingBottom: 8,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10
    },
    bar_item: {
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 5
    },
    bar_text: {
        color: '#555',
        fontSize: 14
    },
    bar_image: {
        width: 60,
        height: 60
    },
});