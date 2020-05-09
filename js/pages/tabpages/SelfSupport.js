import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ScrollView, ActivityIndicator, FlatList} from 'react-native';
// import Search from './SelfSupportCpms/Search';
import Swiper from 'react-native-swiper';
// import EmpityBox from '../EmpityBox';
// import CommodityDisplay from './homeCmps/CommodityDisplay';
import NavigaionUtil from '../../AppNavigator/NavigationUtil'

const {width, height} = Dimensions.get('window');
const couponWidth = width/3 - 6;
const imgWidth = width - 10

export default class SelfSupport extends Component{
    constructor(props){
        super(props);
        this.state={
            isFlow: false,
            hotMallName: '美味新鲜水果',
            hasQuan: false, //是否有代金券
            error: false,
            errorInfo:'',
            isLoading: true,
            isRefresh: false,
            remen_list: [],
            rec_goods_list: [],
            bigImg: [],
            voucher: []
        }
    }

    componentDidMount(){
        this._netFetch()
    }
    
    _netFetch = () => {
        fetch('https://satarmen.com/api/Store/ziying_remen_list')
        .then(response => response.json())
        .then(res => {
            let remen_list = res.result.ziying_remen_list
            // console.log(list)
            this.setState({
                remen_list
            })

            remen_list = null;
        })
        .catch(error => {
            this.setState({
                error: true,
                errorInfo: error
            })
        })

        fetch('https://satarmen.com/api/store/store_info?store_id=1&key=&member_id=0')
        .then(response => response.json())
        .then(res => {
            let rec_goods_list = res.result.rec_goods_list
            let bigImg = res.result.store_info.mb_sliders
            let voucher = res.result.store_info.voucher
            this.setState({
                rec_goods_list,bigImg,voucher,
                isLoading: false,
                isRefresh: false
            })

            rec_goods_list = null;
            bigImg = null;
            voucher = null;
        })
        .catch(error => {
            this.setState({
                error: true,
                errorInfo: error
            })
        })

    }

    renderLoading() {
        return(
            <View>
                {this.renderNavBar()}
                <View style={{marginTop:60,alignItems:'center'}}>
                    <ActivityIndicator
                    animating={true}
                    color='blue'
                    size="small"
                    />
                    <Text>数据加载中...</Text>
                </View>
            </View>
        );
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

    renderSwiper() {
        return(
            <View style={{width: width, backgroundColor:'#f00', height: 200}}>
                <Swiper
                    autoplay={true}
                    autoplayTimeout={3}
                    activeDotColor='#f00'
                >
                    {
                        this.state.bigImg.map((item, index) => {
                            return <Image source={{uri: item.imgUrl}}
                                style={{width: width,height:200}}
                                key={index}
                            />
                        })
                    }
                </Swiper>
            </View>
        );
    }

    renderCouponItem(){//优惠券item
        return(
            <View style={{width: couponWidth, height: 80, marginBottom: 5}}>
                <View style={{height: 40, backgroundColor:'#E31E3D'}}></View>
                <View style={{height: 40, backgroundColor: '#ccc'}}></View>
            </View>
        );
    }

    renderCoupon() {//优惠券
        return (
            <View>
                {this.state.voucher ? 
                    <View style={{backgroundColor:'#fff', padding: 5,marginBottom: 10}}>
                        <Title Ltitle={'代金券'} Rtitle={'领券更优惠'}/>
                        <View style={{flexDirection: 'row', flexWrap:'wrap', justifyContent:'space-around'}}>
                            {this.renderCouponItem()}
                            {this.renderCouponItem()}
                            {this.renderCouponItem()}
                            {this.renderCouponItem()}
                            {this.renderCouponItem()}
                            {this.renderCouponItem()}
                        </View>
                    </View> : null
                }
            </View>
            
        );
    }

    renderHot() {//热门推荐
        return(
            <View style={{backgroundColor: '#fff', padding: 5, paddingTop: 10, paddingBottom: 15}}>
                <Title Ltitle={'热门推荐'} Rtitle={'火爆直降'}/>
                <View>
                    <Image source={{uri:'https://satarmen.com/uploads/images/wx/zybg.png'}}
                        style={{
                            width: imgWidth, height: 180, resizeMode: 'stretch'
                        }}
                    />
                </View>
                <View>
                <ScrollView
                    horizontal={true}
                >
                    {
                        this.state.remen_list.map((item, index) =>{
                            return(
                                <TouchableOpacity style={{alignItems: 'center'}} key={index}
                                    onPress={() => {
                                        NavigaionUtil.goPage({
                                            navigation: this.props.navigation,
                                            goods_id: item.goods_id
                                        },"DetailPage")
                                    }}
                                >
                                    <Image style={{width: couponWidth, height: 80,margin: 5}} source={{uri: item.goods_img_480}}></Image>
                                    <Text style={{width:couponWidth, color: '#333', height:40}} numberOfLines={2}>{item.goods_name}</Text>
                                    <View style={{backgroundColor: '#e31e3d', paddingRight: 15, paddingLeft: 15, marginTop: 5, borderRadius: 16}}>
                                        <Text style={{color: '#fff', padding: 3}}>￥{item.goods_price}</Text>
                                    </View>
                                </TouchableOpacity>
                            );
                        })
                    }
                </ScrollView>
                </View>
            </View>
        );
    }

    renderItem = info => {
        let item = info.item
        return(
            <View style={{paddingBottom:8}}>
                <TouchableOpacity style={{width: width/2 - 5}}
                    onPress={() => {
                        NavigaionUtil.goPage({
                            navigation: this.props.navigation,
                            goods_id: item.goods_id
                        },"DetailPage")
                    }}
                >
                    <Image style={{width: width/2 - 10, height: width/2}}
                        source={{uri: item.goods_image_url}}
                    />
                    <View style={{paddingTop: 8,backgroundColor:'#eee',width: width/2 - 10}}>
                        <Text style={{width: width/2 - 10, color: '#333',height:40}} numberOfLines={2}>{item.goods_name}</Text>
                        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center', paddingHorizontal:5,width:width/2 - 12,paddingBottom:8}}>
                            <Text style={{color:'#f00',fontWeight:'bold'}}>￥{item.goods_price}</Text>
                            <Text style={{backgroundColor: '#f00', color:'#fff',paddingHorizontal:5,paddingVertical:3,borderRadius:3}}>购买</Text>
                        </View>
                    </View>
                    
                </TouchableOpacity>
            </View>
        );
    }

    renderItems = info => {
        return(
            <View style={{alignItems:'center',}}>
                {this.renderItem(info)}
            </View>
        );
    }

    renderAllDisplay() {//全部商品
        let data = this.state.rec_goods_list
        return(
            <View style={{backgroundColor: '#fff', padding: 5, paddingTop: 10, marginTop: 10}}>
                <Text style={{fontSize: 16, fontWeight: 'bold',color:'#f00'}}>店铺推荐</Text>
                <View style={{marginLeft:3}}>
                    <FlatList
                        data={data}
                        numColumns={2}
                        renderItem={this.renderItems}
                        ItemSeparatorComponent={()=><View/>}
                        ListHeaderComponent={()=><View/>}
                        ListFooterComponent={()=><View style={{height:30,}}><Text style={{color:'#bababa',textAlign:'center'}}>没有更多数据了</Text></View>}
                        keyExtractor={(item, index) => 'key' + index + item}
                    />
                </View>
            </View>
        );
    }

    render() {
        // console.log(this.state.remen_list)
        if(this.state.isLoading && !this.state.error){
            return this.renderLoading()
        }

        return(
            <View style={styles.container}>
                {this.renderNavBar()}
                <ScrollView>
                    {this.renderSwiper()}
                    {/* <Search/> */}
                    {/* <View style={{height: 200}}>
                        <Swiper height={200}/>
                    </View>  */}
                    {this.renderCoupon()}
                    {this.renderHot()}
                    {this.renderAllDisplay()}
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