import React , { Component } from "react";
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity} from "react-native";

const {width, height} = Dimensions.get('window');
const circleWidth = width*2;
const top = circleWidth/1.4


export default class SafeCenter extends Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }

    renderPassWord() {//修改密码
        return(
            <TouchableOpacity style={styles.itemStyle}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <View style={{marginRight:10,marginLeft:5}}>
                        <Image
                            source={require('../../../../assest/password.png')}
                            style={{width:16,height:16}}
                        />
                    </View>
                    <View>
                        <Text style={{color:'#333'}}>修改密码</Text>
                    </View>
                </View>

                <View style={{flexDirection:'row',alignItems:'center',marginRight:10}}>
                    <View style={{marginRight:5}}>
                        <Text style={{color:'#8a8a8a'}}>已设置</Text>
                    </View>

                    <View>
                        <Text style={{fontSize:16,color:'#cdcdcd'}}>＞</Text>
                    </View>
                </View>    
            </TouchableOpacity>
        );
    }

    renderParPassword() {//修改支付密码
        return(
            <TouchableOpacity style={styles.itemStyle}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <View style={{marginRight:10,marginLeft:5}}>
                        <Image
                            source={require('../../../../assest/paymima.png')}
                            style={{width:16,height:16}}
                        />
                    </View>
                    <View>
                        <Text style={{color:'#333'}}>修改支付密码</Text>
                    </View>
                </View>

                <View style={{flexDirection:'row',alignItems:'center',marginRight:10}}>
                    <View style={{marginRight:5}}>
                        <Text style={{color:'#8a8a8a'}}>可修改</Text>
                    </View>

                    <View>
                        <Text style={{fontSize:16,color:'#cdcdcd'}}>＞</Text>
                    </View>
                </View>    
            </TouchableOpacity>
        );
    }

    renderTelNumber() {
        return(
            <TouchableOpacity style={styles.itemStyle}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <View style={{marginRight:10,marginLeft:5}}>
                        <Image
                            source={require('../../../../assest/shoujihao.png')}
                            style={{width:16,height:16}}
                        />
                    </View>
                    <View>
                        <Text style={{color:'#333'}}>修改手机号</Text>
                    </View>
                </View>

                <View style={{flexDirection:'row',alignItems:'center',marginRight:10}}>
                    <View style={{marginRight:5}}>
                        <Text style={{color:'#8a8a8a'}}>已绑定</Text>
                    </View>

                    <View>
                        <Text style={{fontSize:16,color:'#cdcdcd'}}>＞</Text>
                    </View>
                </View>    
            </TouchableOpacity>
        );
    }

    render() {
        // console.log(top/11)
        return(
            <View style={styles.container}>
                <View>
                    <Circle />
                    <View style={{flex:1,alignItems:'center',marginTop:top/11}}>
                        <Image
                            source={require('../../../../assest/safeCenter.png')}
                        />
                    </View>
                </View>
                <View style={{top: top/4,padding:5,marginTop:10}}>
                    {this.renderPassWord()}
                    {this.renderParPassword()}
                    {this.renderTelNumber()}
                </View>
                
            </View>
        );
    }
}

class Circle extends Component{
    render() {
        return(
            <View style={{alignItems:'center'}}>
                <View style={styles.circleStyle}>
                </View>
            </View>
            
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#fff',
    },
    circleStyle: {
        backgroundColor:'#4DBB88',
        width:circleWidth,
        height:circleWidth/1.05,
        borderRadius:999,
        position: "absolute",
        top:-top,
    },
    itemStyle:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingTop:15
    }
});