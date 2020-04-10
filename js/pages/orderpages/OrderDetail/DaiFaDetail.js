import React, {Component} from 'react';
import {View, Text, ScrollView, Image, Dimensions, StyleSheet,TouchableOpacity} from 'react-native';

const {width, height} = Dimensions.get('window');
const titleWidth = width - 80;

export default class DaiFuDetail extends Component{
    constructor(props){
        super(props);
        this.state={
            telNumber:17320097737,
            address:'乌市天山区新华南路379号键龙金融中心第一期15楼新疆恒安泰宇集团',
            orderNum:7897456487454,
            orderTime:'2020-03-19 17:45:36',
            totalPrice:0.01,
            yunFei:'0.00',
            totalPaid:0.01,
            mallName:'【测试】羽绒棉服女中长款过膝大毛领棉衣韩版面包服学生加厚外套宽松棉袄 红色 M 短板',
            mallprice:0.01,
            mallNum:1
        }
    }

    componentDidMount(){}

    renderTopNav(){//头部nav
        return(
            <View style={styles.topNav}>
                <Text style={{color:'#fff',fontSize:16}}>待发货</Text>
            </View>
        );
    }

    renderMallInfo(){//商品信息
        return(
            <View style={{marginTop:15,backgroundColor:'#fff',paddingTop:10,paddingBottom:10}}>
                <View style={{padding:5,flexDirection:'row',justifyContent:'space-between'}}>
                    <View style={{width:70,padding:3,borderColor:'#eee',borderWidth:1,marginRight:3}}>
                        <Image
                            source={require('../../../../assest/images/mall/mall1.jpg')}
                            style={{width:60,height:60}}
                        />
                    </View>
                    <View style={{width:titleWidth,marginTop:3}}>
                        <Text style={{fontSize:13,color:'#666'}}>{this.state.mallName}</Text>
                        <View style={{justifyContent:'space-around',flexDirection:'row',padding:10,marginTop:5,alignItems:'center'}}>
                            <Text style={{fontSize:15}}>
                                <Text style={{color:'#f00'}}>￥{this.state.mallprice}</Text>
                                <Text> ×{this.state.mallNum}</Text>
                            </Text>
                            <TouchableOpacity
                                style={{borderWidth:1,borderColor:'#999',padding:5,paddingRight:10,paddingLeft:10,borderRadius:8}}
                            >
                                <Text style={{color:'#666'}}>投诉</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    }

    renderAddress(){//地址栏
        return(
            <View style={{backgroundColor:'#fff'}}>
                <TouchableOpacity style={{padding:10,flexDirection:'row',alignItems:'center',width:width}}>
                    <View>
                        <Image
                            style={{width:40,height:40}}
                            source={require('../../../../assest/images/dizhi1.png')}
                        />
                    </View>
                    <View style={{marginLeft:8,marginRight:10}}>
                        <View style={{padding:5}}>
                            <Text style={{color:'#666'}}>{this.state.telNumber}</Text>
                        </View>
                        <View style={{padding:5,paddingRight:25}}>
                            <Text style={{color:'#666'}}
                                numberOfLines={2}
                            >{this.state.address}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    renderOrderOnfo(){//订单编号和下单时间
        return(
            <View style={{marginTop:15,backgroundColor:'#fff'}}>
                <View style={{borderBottomColor: '#eee',borderBottomWidth:1}}>
                    <View style={{padding:5}}>
                        <Text style={styles.orderInfoStyle}>订单编号：{this.state.orderNum}</Text>
                        <Text style={styles.orderInfoStyle}>下单时间：{this.state.orderTime}</Text>
                    </View>
                </View>
                <View style={{borderBottomColor: '#eee',borderBottomWidth:1}}>
                    <View style={{padding:5}}>
                        <Text style={styles.orderInfoStyle}>商家承诺：72小时内发货</Text>
                    </View>
                </View>
                <View>
                    <View style={{padding:5}}>
                        <Text style={styles.orderInfoStyle}>商家备注：</Text>
                    </View>
                </View>
            </View>
        );
    }
    
    renderCloseAccount(){//订单结算
        return(
            <View style={{marginTop:15,backgroundColor:'#fff',marginBottom:60}}>
                <View style={{padding:5,borderBottomWidth:1,borderBottomColor:'#eee'}}>
                    <View style={{padding:5,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                        <View>
                            <Text>商品总额</Text>
                        </View>
                        <View>
                            <Text style={{color:'#f00'}}>￥{this.state.totalPrice}</Text>
                        </View>
                    </View>
                    <View style={{padding:5,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                        <View>
                            <Text>运费</Text>
                        </View>
                        <View>
                            <Text style={{color:'#f00'}}>￥{this.state.yunFei}</Text>
                        </View>
                    </View>
                </View>

                <View style={{padding:5}}>
                    <View style={{padding:5,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                        <View>
                            <Text>实付款</Text>
                        </View>
                        <View>
                            <Text style={{color:'#f00'}}>￥{this.state.totalPaid}</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }

    render(){
        return(
            <View>
                <ScrollView>
                    {this.renderTopNav()}
                    {this.renderAddress()}
                    {this.renderMallInfo()}
                    {this.renderOrderOnfo()}
                    {this.renderCloseAccount()}
                </ScrollView>
            </View>
        );
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#f7f7f7'
    },
    topNav:{
        backgroundColor:'#E93B3D',
        padding:20
    },
    orderInfoStyle: {
        color:'#666',
        padding:5
    }
});