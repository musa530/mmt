import React, {Component} from 'react';
import {View, Text, ScrollView, Image, Dimensions, StyleSheet,TouchableOpacity} from 'react-native';
import NavigationUtil from '../../AppNavigator/NavigationUtil'

const {width, height} = Dimensions.get('window');
const marginTop = height/3;
const imageWidth = width/4;
const mallNameWidth = width/1.7;

export default class DaiFaHuo extends Component{
    constructor(props){
        super(props);
        this.state={
            isShow: false,
            noOrderText: '亲，您还暂未下单哦~~',
            shopName: '木萨江测试',
            mallName:'【测试】羽绒棉服女中长款过膝大毛领棉衣韩版面包服学生加厚外套宽松棉袄 红色 M 短板',
            mallNum:1,
            mallPrice: 0.01,
            yunFei: '0.00'
        }
    }

    componentDidMount(){
        this.setState({
            isShow: true,
        })
    }

    renderOrderItem(){//待付款单个订单封装
        let boxStyle = {
            marginLeft: 10,
            marginRight: 10,
            backgroundColor: 'white',
            padding: 5,
            paddingLeft: 10,
            paddingTop:10,
            borderRadius: 10,
            marginTop: 20
        }
        return(
            <View style={boxStyle}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <TouchableOpacity>
                        <Text style={{color:'#f00', fontSize: 16,fontWeight:'bold'}}>{this.state.shopName}</Text>
                    </TouchableOpacity>
                    <Text style={{color: '#C25721',fontSize: 13}}>等待买家付款</Text>
                </View>
                <TouchableOpacity style={{flexDirection: 'row',marginTop:10}}
                    onPress={()=>{
                        NavigationUtil.goPage({
                            navigation: this.props.navigation,
                            id: 2
                        },"OrderDetail")
                    }}
                >
                    <View style={{padding: 5}}>
                        <Image
                            source={{uri: 'https://satarmen.com/uploads/home/store/goods/576/576_2020010713050599362_240.jpg'}}
                            style={{width: imageWidth,height:80,resizeMode: 'stretch'}}
                        />
                    </View>
                    <View style={{marginTop: 15}}>
                        <View style={{width: mallNameWidth}}>
                            <Text numberOfLines={2}
                                style={{color:'#666'}}
                            >{this.state.mallName}</Text>
                        </View>
                        <View style={{padding:2,marginTop:5}}>
                            <Text style={{color:'#C25721'}}>七天无理由退换</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={styles.tuikuan}>
                    <Text
                        style={{color:'#666', fontSize:13}}
                    >(共计{this.state.mallNum}种商品)合计：￥{this.state.mallPrice}(运费：￥{this.state.yunFei})</Text>
                    <TouchableOpacity
                        onPress={()=>{}}
                        style={{
                            backgroundColor: '#FB4D46',
                            padding:5,
                            borderRadius:8,
                            paddingLeft:15,
                            paddingRight:15
                        }}
                    >
                        <Text style={{color:'#fff'}}>退款</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    renderAllOrder=()=>{//待付款全部订单
        return(
            <View>
                {this.state.isShow?
                    <View style={{marginBottom:60}}>
                        {this.renderOrderItem()}
                    </View>
                    :
                    <View style={styles.innerContainer}>
                        <View style={{marginTop: marginTop}}>
                            <Text style={{fontSize: 18, color:'#666'}}>{this.state.noOrderText}</Text>
                        </View>
                    </View>
                }
            </View>
        );
    }

    render(){
        
        return(
            <View style={styles.container}>
                <ScrollView>
                    {this.renderAllOrder()}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#f7f7f7'
    },
    innerContainer:{
        alignItems: 'center',
    },
    goPay:{
        backgroundColor:'#FB4D46',
        padding:5,
        marginTop:18,
        marginBottom:12,
        borderRadius:12,
        alignItems:'center'
    },
    tuikuan:{
        paddingLeft: 5,
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom:10
    }
});