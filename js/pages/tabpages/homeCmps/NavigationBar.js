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
                                topTitle: '折扣专区'
                            }, "ActivePage")
                        }}
                    >
                        <Image style={styles.bar_image} source={require('../../../../assest/images/navigator/zhekou.png')}/>
                        <Text style={styles.bar_text}>折扣专区</Text>
                    </TouchableOpacity>
                </View>
                
                
                <View>
                    <TouchableOpacity
                        style={styles.bar_item}
                        onPress={()=>{
                            NavigationUtil.goPage({
                                navigation: this.props.navigation,
                                topTitle: '限时秒杀'
                            }, "ActivePage")
                        }}
                    >
                        <Image style={styles.bar_image} source={require('../../../../assest/images/navigator/miaosha.png')}/>
                        <Text style={styles.bar_text}>限时秒杀</Text>
                    </TouchableOpacity>
                </View>
                
                <View>
                    <TouchableOpacity
                        style={styles.bar_item}
                        onPress={()=>{
                            NavigationUtil.goPage({
                                navigation: this.props.navigation,
                                topTitle: '神券专区'
                            }, "ActivePage")
                        }}    
                    >
                        <Image style={styles.bar_image} source={require('../../../../assest/images/navigator/quan.png')}/>
                        <Text style={styles.bar_text}>神券专区</Text>
                    </TouchableOpacity>
                </View>
                
                
                <View>
                    <TouchableOpacity
                        style={styles.bar_item}
                        onPress={()=>{
                            NavigationUtil.goPage({
                                navigation: this.props.navigation,
                                topTitle: '自营专区'
                            }, "SelfSupport")
                        }}
                    >
                        <Image style={styles.bar_image} source={require('../../../../assest/images/navigator/self.png')}/>
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
                            }, "ActivePage")
                        }}
                    >
                        <Image style={styles.bar_image} source={require('../../../../assest/images/navigator/huiyuan.png')}/>
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
        marginTop: 15,
        backgroundColor: 'white',
        paddingTop: 8,
        paddingBottom: 8,
        marginLeft: 10,
        marginRight: 10
    },
    bar_item: {
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 5
    },
    bar_text: {
        color: '#555',
        marginTop: 8,
        fontSize: 14
    },
    bar_image: {
        width: 24,
        height: 24
    },
});