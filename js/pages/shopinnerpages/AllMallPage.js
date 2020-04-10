import React , {Component} from 'react';
import {View, Text, Dimensions, ScrollView, StyleSheet, TouchableOpacity, Image, Alert,FlatList} from 'react-native';
import Foundation from 'react-native-vector-icons/Foundation';
import MallData from '../../../MallData.json';

const {width, height} = Dimensions.get('window');
const itemWidth = width/2 -8;
const imageWidth = width/2 -11;
const imgWdith = width/3;

const tabArr = ['综合排序','销量排序','新品'];

export default class AllMall extends Component{
    constructor(props){
        super(props);
        this.state={
            isColor: true,
            newArr:tabArr,
            currentIndex:0,
            columns:2,
            key: 1
        }
    }

    static navigationOptions=()=>({
        title: '会员中心'
    });

    renderTabArr(newArr){
        return(
            newArr.map((item,index) =>{
                return(
                    <TouchableOpacity>
                        <Text
                            key={index}
                            style={{color:'#666'}}
                        >{item}</Text>
                    </TouchableOpacity>
                );
            })
        );
    }

    renderAllMallNav(){//页面导航栏以及商品排列的切换
        const {isColor,newArr} = this.state;
        return(
            <View style={{backgroundColor:'#fff',padding:5,top:-15,marginLeft:8,marginRight:8}}>
                <View style={{flexDirection:'row',alignItems:'center',padding:5,justifyContent:'space-between'}}>
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-around',flex:1}}>
                        {this.renderTabArr(newArr)}
                    </View>
                    
                    <TouchableOpacity
                        onPress={()=>{
                            this.change(this.state.isColor)
                        }}
                    >
                        {isColor?
                            <Foundation
                                name={'indent-more'}
                                size={24}
                                style={{color: '#F83150'}}
                            />
                            :
                            <Foundation
                                name={'indent-more'}
                                size={24}
                                style={{color: '#808080'}}
                            />
                        }
                    </TouchableOpacity>
                </View>
                
            </View>
        );
    }

    change=(color)=>{//改变渲染排版样式
        this.setState({
            isColor: !color,
        })
    }

    press=()=>{//积分兑换结果提示
        Alert.alert('积分兑换', '您的积分不够!')
    }

    renderIntegralMarket(){//商品展示
        const {isColor} = this.state;
        let data=[]
        MallData.data.map((item, index) => {
            data.push({
                key: index,
                title: item.title,
                url: item.url,
                price: item.price
            })
        })
        return(
            <View style={{padding: 5,top:-5}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between',backgroundColor: '#fff', alignItems: 'center'}}>
                    <View style={{padding: 10}}>
                        <Text style={{color: '#f00', fontSize: 16, fontWeight: 'bold'}}>热门推荐</Text>
                    </View>
                </View>
                <View>
                    <FlatList
                        data={data}
                        key={this.state.isColor ? 1 : 2}
                        numColumns={this.state.isColor ? 2 : 1}
                        ListHeaderComponent={()=><View />}
                        ListFooterComponent={()=><View />}
                        ItemSeparatorComponent={()=><View />}
                        renderItem={this.renderCell}
                        onEndReachedThreshold={20}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index)=>'key' + index + item}
                        contentContainerStyle={{
                        }}
                    />
                </View>
            </View>
        );
    }

    renderOneItem=(index, title, url, price)=> {//一个商品为一行显示
        return(
            <View style={{marginBottom: 10, backgroundColor: '#fff'}} key={index}>
                <TouchableOpacity
                    style={{flexDirection: 'row',alignItems: 'center', }}
                    onPress={()=>{}}
                >
                    <View style={{borderWidth: 1, borderColor: '#eee'}}>
                            <Image
                                source={{uri: url}}
                                style={{width: imgWdith, height: imgWdith}}
                            />
                    </View>
                    <View style={{marginLeft: 10, flex: 1}}>
                        <Text style={{color: '#F83150', marginBottom: 25, fontSize: 16}}
                            numberOfLines={2}
                        >{title}</Text>
                        <View style={{paddingBottom:8}}>
                            <Text style={{color:'#333'}}>新疆商城自营店铺</Text>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#eee', padding: 5}}>
                            <Text style={{color:'#f00',fontSize:16}}>{price}￥</Text>
                            <Text>11人购买</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    renderTwoItem = (index, title, url, price) => {//两个商品为一行展示
        return(
            <View style={{}}>
                <TouchableOpacity 
                    onPress={()=>{
                        
                    }}
                    key={index}
                    style={{borderWidth: 1, borderColor:'#eee', width: itemWidth, marginBottom: 10}}
                >
                    <Image
                        source={{uri: url}}
                        style={{width: imageWidth, height: imageWidth}}
                    />
                    <View style={{marginTop: 3, marginBottom: 3}}>
                        <Text numberOfLines={2}
                            style={{fontSize: 16, color: '#333'}}
                        >{title}</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between',padding: 5, backgroundColor: '#eee'}}>
                        <Text style={{color: '#f00', fontSize: 16}}>￥{price}</Text>
                        <Text style={{color: '#666', fontSize: 16}}>11人购买</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    renderCell=(item)=>{
        let index = item.index
        let title = item.item.title
        let url = item.item.url
        let price = item.item.price
        const {isColor} = this.state;
        return(
            <View style={{flex: 1,justifyContent:'space-around'}}>
                {isColor?
                    this.renderTwoItem(index, title, url, price)
                    :
                    this.renderOneItem(index, title, url, price)
                }
            </View>
        );
    }

    render(){
        return(
            <View style={{flex: 1, backgroundColor: '#f7f7f7'}}>
                {this.renderAllMallNav()}
                {this.renderIntegralMarket()}
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