import React , {Component} from 'react';
import {View, Text, Dimensions, ScrollView, StyleSheet, TouchableOpacity, Image, Alert} from 'react-native';
import Foundation from 'react-native-vector-icons/Foundation';
const {width, height} = Dimensions.get('window');
const itemWidth = width/2 -8;
const imageWidth = width/2 -11;
const imgWdith = width/3;

export default class MemberCenter extends Component{
    constructor(props){
        super(props);
        this.state={
            jifen: 120,
            yucunkuan: '10.00',
            memberLevel: '普通会员',
            isColor: true,
            mallName: 'this is default mall Name!',
            mallPrice: '11.00', 
            mallJifen: 175000
        }
    }

    static navigationOptions=()=>({
        title: '会员中心'
    });

    change=(color)=>{//改变渲染排版
        this.setState({
            isColor: !color
        })
    }

    renderTop(){//顶部渲染
        let textColor = {
            color:'#fff'
        }
        return(
            <View style={{backgroundColor: '#E31E3D', padding: 5}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 15}}>
                    <View>
                        <Text style={[textColor, {fontSize: 16}]}>会员积分</Text>
                        <View style={styles.numStyle}>
                            <Text style={[textColor, {fontSize: 22}]}>{this.state.jifen}</Text>
                            <Text style={[textColor]}>分</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={{color: 'white', fontSize: 16}}>预存款</Text>
                        <View style={styles.numStyle}>
                            <Text style={[textColor, {fontSize: 22}]}>{this.state.yucunkuan}</Text>
                            <Text style={[textColor]}>元</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.memberLevel}>
                    <View style={{margin: 20}}>
                        <Text style={[textColor, {fontSize: 20}]}>{this.state.memberLevel}</Text>
                    </View>
                </View>
            </View>
        );
    }

    press=()=>{//积分兑换结果提示
        Alert.alert('积分兑换', '您的积分不够!')
    }

    renderTwoItem(){//两个商品为一行时的商品组件封装
        return(
            <View style={{borderWidth: 1, borderColor:'#eee', width: itemWidth, marginBottom: 10}}>
                <TouchableOpacity 
                    onPress={()=>{
                        this.press()
                    }}
                >
                    <Image
                        source={{uri: 'https://satarmen.com/uploads/home/store/goods/1/1_2019081619260225812.jpg'}}
                        style={{width: imageWidth, height: imageWidth}}
                    />
                    <Text numberOfLines={2}
                        style={{fontSize: 18, color: '#666'}}
                    >{this.state.mallName}</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between',padding: 5, backgroundColor: '#eee'}}>
                        <Text style={{color: '#F83150', fontSize: 16}}>{this.state.mallJifen}分</Text>
                        <Text style={{color: '#666', fontSize: 16}}>￥{this.state.mallPrice}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    renderOneItem(){//一个商品为一行时的商品渲染
        return(
            <View style={{marginBottom: 10, backgroundColor: '#fff'}}>
                <TouchableOpacity
                    style={{flexDirection: 'row',alignItems: 'center', }}
                    onPress={()=>{this.press()}}
                >
                    <View style={{borderWidth: 1, borderColor: '#eee'}}>
                            <Image
                                source={{uri: 'https://satarmen.com/uploads/home/store/goods/1/1_2019081619260225812.jpg'}}
                                style={{width: imgWdith, height: imgWdith}}
                            />
                    </View>
                    <View style={{marginLeft: 10}}>
                        <Text style={{color: '#F83150', marginBottom: 35, fontSize: 16}}>{this.state.mallName}</Text>
                        <View style={{flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#eee', padding: 5}}>
                            <Text style={{color: '#f83150'}}>{this.state.mallJifen}分</Text>
                            <Text>{this.state.mallPrice}￥</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    twoMall=()=>{//两个商品为一行渲染
        return(
            <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around'}}>
                {this.renderTwoItem()}
                {this.renderTwoItem()}
                {this.renderTwoItem()}
                {this.renderTwoItem()}
            </View>
        );
    }

    oneMall=()=>{//一个商品为一行渲染
        return(
            <View style={{backgroundColor: '#f7f7f7'}}>
                {this.renderOneItem()}
                {this.renderOneItem()}
                {this.renderOneItem()}
                {this.renderOneItem()}
            </View>
        );
    }

    renderIntegralMarket(){//积分超市
        const {isColor} = this.state;
        return(
            <View style={{padding: 5}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between',backgroundColor: '#fff', alignItems: 'center'}}>
                    <View style={{padding: 10}}>
                        <Text style={{color: '#f00', fontSize: 16, fontWeight: 'bold'}}>会员积分超市</Text>
                    </View>
                    <TouchableOpacity
                        onPress={()=>{
                            this.change(this.state.isColor)
                        }}
                    >
                        {isColor?
                            <Foundation
                                name={'indent-more'}
                                size={26}
                                style={{color: '#F83150'}}
                            />
                            :
                            <Foundation
                                name={'indent-more'}
                                size={26}
                                style={{color: '#808080'}}
                            />
                        }
                    </TouchableOpacity>
                </View>
                {isColor? 
                    <View style={{marginBottom: 8}}>
                        {this.twoMall()}
                    </View>
                    :
                    <View style={{marginBottom: 8}}>
                        {this.oneMall()}
                    </View>
                }
            </View>
        );
    }

    render(){
        return(
            <View style={{flex: 1, backgroundColor: '#f7f7f7'}}>
                <ScrollView style={{flex: 1}}>
                    {this.renderTop()}
                    {this.renderIntegralMarket()}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    numStyle: {
        flexDirection: 'row',
        justifyContent:'center',
        alignItems: 'baseline',
        marginTop: 30
    },
    memberLevel: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#FF667E',
        margin: 20,
        justifyContent: 'center', 
        borderRadius: 16
    }
});