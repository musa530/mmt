import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ScrollView} from 'react-native';
import Search from './SelfSupportCpms/Search';
import Swiper from '../tabpages/homeCmps/Swiper';
import EmpityBox from '../EmpityBox';
import CommodityDisplay from './homeCmps/CommodityDisplay';

const {width, height} = Dimensions.get('window');
const couponWidth = width/3 - 6;
const imgWidth = width - 10

export default class SelfSupport extends Component{
    constructor(props){
        super(props);
        this.state={
            isFlow: false,
            hotMallName: '美味新鲜水果'
        }
    }

    flowing=()=>{//关注或已关注
        const {isFlow} = this.state;
        this.setState({
            isFlow: !isFlow,
        });
    }

    renderNavBar() {//页面头部
        const {isFlow} = this.state;
        return (
            <View style={{height: 40, justifyContent: 'space-between',alignItems: 'center', backgroundColor: '#E31E3D', padding: 5, flexDirection: 'row'}}>
                <Text style={{marginTop: 5, color: 'white', fontSize: 16}}>新疆商城自营超市</Text>
                <TouchableOpacity style={{flexDirection: 'row', backgroundColor: '#f40', padding: 3, borderRadius: 8}}
                    onPress={()=>this.flowing()}
                >
                    {isFlow?
                        <Image source={require('../../../assest/images/flowing.png')}
                            style={{
                                width: 17, height: 17
                            }}
                        />
                        :
                        <Image source={require('../../../assest/images/flow.png')}
                            style={{
                                width: 17, height: 17
                            }}
                        />
                    }
                    <Text style={{marginLeft: 3,fontSize: 14, color: 'white', width: 48}}>{this.state.isFlow? "已关注": "关注"}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    renderCoupon() {//优惠券
        return (
            <View style={{backgroundColor:'#fff', padding: 5}}>
                <Title Ltitle={'代金券'} Rtitle={'领券更优惠'}/>
                <View style={{flexDirection: 'row', flexWrap:'wrap', justifyContent:'space-around'}}>
                    <View style={{width: couponWidth, height: 80, marginBottom: 5}}>
                        <View style={{height: 40, backgroundColor:'#E31E3D'}}></View>
                        <View style={{height: 40, backgroundColor: '#ccc'}}></View>
                    </View>
                    
                    <View style={{width: couponWidth, height: 80, marginBottom: 5}}>
                        <View style={{height: 40, backgroundColor:'#E31E3D'}}></View>
                        <View style={{height: 40, backgroundColor: '#ccc'}}></View>
                    </View>

                    <View style={{width: couponWidth, height: 80, marginBottom: 5}}>
                        <View style={{height: 40, backgroundColor:'#E31E3D'}}></View>
                        <View style={{height: 40, backgroundColor: '#ccc'}}></View>
                    </View>

                    <View style={{width: couponWidth, height: 80, marginBottom: 5}}>
                        <View style={{height: 40, backgroundColor:'#E31E3D'}}></View>
                        <View style={{height: 40, backgroundColor: '#ccc'}}></View>
                    </View>

                    <View style={{width: couponWidth, height: 80, marginBottom: 5}}>
                        <View style={{height: 40, backgroundColor:'#E31E3D'}}></View>
                        <View style={{height: 40, backgroundColor: '#ccc'}}></View>
                    </View>

                    <View style={{width: couponWidth, height: 80, marginBottom: 5}}>
                        <View style={{height: 40, backgroundColor:'#E31E3D'}}></View>
                        <View style={{height: 40, backgroundColor: '#ccc'}}></View>
                    </View>
                    
                </View>
            </View>
        );
    }

    renderHot() {//热门推荐
        return(
            <View style={{backgroundColor: '#fff', padding: 5, marginTop: 10, paddingTop: 10, paddingBottom: 15}}>
                <Title Ltitle={'热门推荐'} Rtitle={'火爆直降'}/>
                <View>
                    <Image source={require('../../../assest/images/pinpai.png')}
                        style={{
                            width: imgWidth, height: 180, resizeMode: 'stretch'
                        }}
                    />
                </View>
                <View>
                <ScrollView
                    horizontal={true}
                >
                    <View style={{alignItems: 'center'}}>
                        <View style={{width: couponWidth, height: 80, backgroundColor: '#ccc', margin: 5}}></View>
                        <Text>{this.state.hotMallName}</Text>
                        <View style={{backgroundColor: '#e31e3d', paddingRight: 15, paddingLeft: 15, marginTop: 5, borderRadius: 16}}>
                            <Text style={{color: '#fff', padding: 3}}>爆款直降</Text>
                        </View>
                    </View>

                    <View style={{alignItems: 'center'}}>
                        <View style={{width: couponWidth, height: 80, backgroundColor: '#ccc', margin: 5}}></View>
                        <Text>{this.state.hotMallName}</Text>
                        <View style={{backgroundColor: '#e31e3d', paddingRight: 15, paddingLeft: 15, marginTop: 5, borderRadius: 16}}>
                            <Text style={{color: '#fff', padding: 3}}>爆款直降</Text>
                        </View>
                    </View>

                    <View style={{alignItems: 'center'}}>
                        <View style={{width: couponWidth, height: 80, backgroundColor: '#ccc', margin: 5}}></View>
                        <Text>{this.state.hotMallName}</Text>
                        <View style={{backgroundColor: '#e31e3d', paddingRight: 15, paddingLeft: 15, marginTop: 5, borderRadius: 16}}>
                            <Text style={{color: '#fff', padding: 3}}>爆款直降</Text>
                        </View>
                    </View>

                    <View style={{alignItems: 'center'}}>
                        <View style={{width: couponWidth, height: 80, backgroundColor: '#ccc', margin: 5}}></View>
                        <Text>{this.state.hotMallName}</Text>
                        <View style={{backgroundColor: '#e31e3d', paddingRight: 15, paddingLeft: 15, marginTop: 5, borderRadius: 16}}>
                            <Text style={{color: '#fff', padding: 3}}>爆款直降</Text>
                        </View>
                    </View>
                </ScrollView>
                </View>
            </View>
        );
    }

    renderAllDisplay() {//全部商品
        return(
            <View style={{backgroundColor: '#fff', padding: 5, paddingTop: 10, marginTop: 10}}>
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>全部商品</Text>
            </View>
        );
    }

    render() {
        return(
            <View style={styles.container}>
                {this.renderNavBar()}
                <ScrollView>
                    <Search/>
                    <View style={{height: 200}}>
                        <Swiper height={200}/>
                    </View> 
                    {this.renderCoupon()}
                    {this.renderHot()}
                    <CommodityDisplay title={'全部商品'}/>
                    <EmpityBox/>
                </ScrollView>
            </View>
        );
    }
}

class Title extends Component{
    constructor(props){
        super(props);
    }

    render() {
        return(
            <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 8,padding: 5}}>
                <Text style={{fontSize: 16,marginRight: 8, fontWeight: 'bold'}}>{this.props.Ltitle}</Text>
                <Text style={{fontSize: 13,paddingLeft: 5,borderLeftColor: '#cdcdcd', color: '#666', borderLeftWidth: 1}}>{this.props.Rtitle}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#eee',
      position: 'relative'
    },
    welcome: {
      color: '#333',
      fontSize: 18
    }
});