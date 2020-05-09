import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, ScrollView, Alert, Linking, TextInput,ImageBackground} from 'react-native';
import NavigationUtil from '../AppNavigator/NavigationUtil';
import Modal from 'react-native-modal';

const {width, height} = Dimensions.get('window');

export default class SignIn extends Component{
    constructor(props){
        super(props);
        this.state = {
            opacity:1,
            isVisible: false,
            animationIn:'slideInUp',
            animationOut: 'slideOutDown',
            backdropOpacity: 0.8,
            backdropColor: '#333',
            swipeDirection:'down',
        }
    }

    renderHead() {
        return(
            <View>
                <Text style={{width: width/2,textAlign:'center',flexDirection:'row-reverse',fontSize:16,fontWeight:'bold',color:'#333'}}>شىنجاڭ سودا شەھەرچىسى</Text>
                <Text style={{width: width/2,textAlign:'center',letterSpacing:25,fontSize:20,fontWeight:'bold',color:'#333',paddingTop:10}}>新疆商城</Text>
            </View>
        );
    }

    renderSanFangAccount(){
        return(
            <View style={{marginTop:60}}>
                <Text style={{textDecorationLine:'underline',color:'#333',textAlign:'center'}}>第三方账号</Text>
                <TouchableOpacity style={{alignItems:'center',width:width/2,marginTop:15}}
                    onPress={()=>{
                        Linking.canOpenURL('weixin://').then(supported => {
                            console.log(supported)
                            if(supported){
                                Linking.openURL('weixin://');
                            } else {

                            }
                        })
                    }}
                >
                    <Image
                        source={require('../../assest/wechat.png')}
                        style={{width: 50,height:50}}
                    />
                </TouchableOpacity>
            </View>
        );
    }

    _setModalVisible = val => {
        this.setState({
            isVisible: val
        })
    }

    renderLoginIn = () => {
        let innerContainerTransparentStyle = { 
            backgroundColor: '#fff', 
            padding: 5,
            height: width ,
            width: width - 10,
            paddingTop:10,
            marginHorizontal:5,
            borderRadius:6
        }

        let paddingLR = { paddingLeft: 12, paddingRight: 12 }

        return(
            <Modal
                animationIn={this.state.animationIn}
                animationOut={this.state.animationOut}
                backdropOpacity={this.state.backdropOpacity}
                backdropColor={this.state.backdropColor}
                isVisible={this.state.isVisible}
                onBackButtonPress={() => this._setModalVisible(false)}
                onBackdropPress={()=> this._setModalVisible(false)}
                backdropTransitionOutTiming={0}
                style={{margin:0}}
                onSwipeComplete={() => this._setModalVisible(false)}
                swipeDirection={this.state.swipeDirection}
            >
                <View style={{flex:1, justifyContent:'center',}}>
                    <View style={innerContainerTransparentStyle}>
                        {/* <View style={{alignItems:'center',marginTop:50}}>
                            <Text style={{fontSize:25,letterSpacing:10,color:'#000'}}>注册</Text>
                        </View> */}
                        <View style={{alignItems:'center',marginTop:30}}>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                {/* <Text style={{width: 70,marginTop:3}}>手机号：</Text> */}
                                <TextInput 
                                    placeholder='输入用户名'
                                    style={{borderColor:'#ccc',borderWidth:1,height:40,width:width/3 * 2,borderRadius:6,marginTop:10}}    
                                />
                            </View>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                {/* <Text style={{width: 70,marginTop:3}}>手机号：</Text> */}
                                <TextInput 
                                    placeholder='请输入手机号'
                                    style={{borderColor:'#ccc',borderWidth:1,height:40,width:width/3 * 2,borderRadius:6,marginTop:10}}    
                                />
                            </View>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                {/* <Text style={{width: 70,marginTop:3}}>密码：</Text> */}
                                <TextInput 
                                    placeholder='请输入密码'
                                    secureTextEntry={true}
                                    style={{borderColor:'#ccc',borderWidth:1,height:40,width:width/3 * 2,borderRadius:6,marginTop:10}}
                                />
                            </View>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                {/* <Text style={{width: 70,marginTop:3}}>确认密码：</Text> */}
                                <TextInput 
                                    placeholder='确认密码'
                                    secureTextEntry={true}
                                    style={{borderColor:'#ccc',borderWidth:1,height:40,width:width/3 * 2,borderRadius:6,marginTop:10}}
                                />
                            </View>
                        </View>
                        <TouchableOpacity style={{marginTop:30,alignItems:'center'}}>
                            <Text style={{fontSize:20,backgroundColor:'#FF3B45',width:width/3,textAlign:'center',paddingVertical:5,borderRadius:9,color:'#fff'}}>注册</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    }

    render() {
        let opacity = this.state.opacity
        return(
            <View style={{flex: 1}}>
                {/* <ImageBackground
                        source={{uri: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1176399748,573207986&fm=26&gp=0.jpg'}}
                        style={{width: width,height:height,opacity:opacity}}
                    > */}
                    <View style={{alignItems:'center',marginTop:130,height:height}}>
                        <View>
                            {/* <Image
                                source={{uri: 'https://satarmen.com/uploads/home/common/site_mobile_logo.png'}}
                                style={{width:width/2,height:100}}
                                resizeMode='center'
                            /> */}
                            
                            {this.renderHead()}
                        </View>
                        <TextInput 
                            placeholder='请输入手机号' 
                            style={{borderColor:'#ccc',borderWidth:1,height:40,width:width/3 * 2,borderRadius:6,marginTop:60}}
                        />
                        <TextInput 
                            placeholder='请输入密码'
                            secureTextEntry={true}
                            style={{borderColor:'#ccc',borderWidth:1,height:40,width:width/3 * 2,borderRadius:6,marginTop:10}}
                        />
                        <View style={{flexDirection:'row',alignItems:'baseline',justifyContent:'space-between',width:width/2}}>
                            <TouchableOpacity 
                                style={{marginTop:20}}
                                onPress={() => {
                                    this.props.navigation.goBack()
                                }}
                            >
                                <Text style={{color:'#fff',backgroundColor:'green',paddingHorizontal:25,paddingVertical:6,fontSize:16,borderRadius:6}}>登录</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    this._setModalVisible(true)
                                }}
                            >
                                <Text style={{textDecorationLine:'underline',fontSize:15,color:'#f90'}}>注册</Text>
                            </TouchableOpacity>
                        </View>
                        
                        {this.renderSanFangAccount()}
                    </View>
                {/* </ImageBackground> */}
                {this.renderLoginIn()}
            </View>
        );
    }
}


