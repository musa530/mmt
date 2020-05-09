import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions, Image, ActivityIndicator, FlatList, RefreshControl, TouchableOpacity} from 'react-native';
import NavigationUtil from '../AppNavigator/NavigationUtil'

const {width, height} = Dimensions.get('window');
const itemWidth = width - 10
const imageWidth = itemWidth - 115

export default class ActivePage extends Component{
    constructor(props){
        super(props);
        this.state={
            empityText: '暂时无数据',
            page: 1,
            isLoading: true,
            isRefreshing:false,
            error: false,
            errorInfo: '',
            page_total: 0,
            list:[],
            url:'',
            showFoot:0,
            activepage_id:0
        }
    }

    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.topTitle}`
    });
    componentDidMount() {
        let page_id = this.props.navigation.state.params.page_id;
        let BASE_URL = `https://satarmen.com/api/miaosha?page=${this.state.page}`
        let miao_sha = `https://satarmen.com/api/promotion?page=${this.state.page}`
        let shen_quan = `https://satarmen.com/api/voucher?page=${this.state.page}`
        let url = ''
        if (page_id == 0){
            url = BASE_URL
        } else if(page_id == 1) {
            url = miao_sha
        } else {
            url = shen_quan
        }
        this.setState({
            url,
            activepage_id: page_id
        })
        this._netFetch(url)
    }

    _netFetch = (url) => {
        fetch(url)
        .then(response => response.json())
        .then(res => {
            // console.log(res.result)
            let list = res.result.list
            let page_total = res.result.page_total
            let foot = 0
            if (this.state.page>=page_total){
                foot = 1
            }
            this.setState({
                list, page_total,
                isLoading: false,
                isRefreshing:false,
                showFoot: foot
            })
            list = null
        })
        .catch(error => {
            this.setState({
                error: true,
                errorInfo: error
            })
        })
    }

    renderEmpity() {//无数据时
        const {empityText} = this.state;
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',backgroundColor:'#E31E3D'}}>
                <View style={{top: -60, alignItems: 'center'}}>
                    <Image style={{width: 64, height: 64, marginBottom: 8}} source={require('../../assest/images/jinggao.png')}/>
                    <Text style={{color: 'white', fontSize: 18}}>{empityText}</Text>
                </View>
            </View>
        );
    }

    renderLoadingView() {
        return(
            <View style={{paddingTop:60,alignItems:'center',flex:1,backgroundColor:'#E31E3D'}}>
                <ActivityIndicator
                    animating={true}
                    color='blue'
                    size="small"
                />
                   <Text style={{color:'#fff'}}>数据加载中...</Text>
            </View>
        );
    }

    renderFooter = () => {
        if (this.state.showFoot === 1) {
            return (
                <View style={{height:30,alignItems:'center',justifyContent:'flex-start',}}>
                    <Text style={{color:'#789',fontSize:14,marginTop:5,marginBottom:5,}}>
                        没有更多数据了
                    </Text>
                </View>
            );
        } else if(this.state.showFoot === 2) {
            return (
                <View style={styles.footer}>
                    <ActivityIndicator />
                    <Text>正在加载更多数据...</Text>
                </View>
            );
        } else if(this.state.showFoot === 0){
            return (
                <View style={styles.footer}>
                    <Text></Text>
                </View>
            );
        }
    }

    onEndReached = () => {
        if(this.state.showFoot != 0 ){
            return ;
        }
        //如果当前页大于或等于总页数，那就是到最后一页了，返回
        if((this.state.page!=1) && (this.state.page>=this.state.page_total)){
            return;
        } else {
            this.state.page++;
        }
        //底部显示正在加载更多数据
        this.setState({showFoot:2});
        //获取数据，在componentDidMount()已经请求过数据了
        if (this.state.page>1){
            this._netFetch(this.state.url);
        }
    }

    handleRefresh = () => {
        this.setState({
            page:1,
            isRefreshing:true,
            list:[]
        })
        this._netFetch(this.state.url)
    }

    renderItem = (info) => {
        let goods_name = info.item.goods_name//商品名称
        let goods_price = info.item.goods_price//商品价格
        let promotion_price = info.item.goods_promotion_price//商品活动价格
        let goods_url = info.item.goods_image//商品图片
        let store_name = info.item.store_name;//店铺名称
        let xianshi_name = info.item.xianshi_name//活动名称
        let xianshigoods_lower_limit = info.item.xianshigoods_lower_limit//商品购买最低数量
        let goods_id = info.item.goods_id
        return (
            <TouchableOpacity 
                style={{backgroundColor:'#fff',marginRight: 5,marginLeft: 5,borderRadius:6,padding:5, width: itemWidth,paddingBottom:10}}
                onPress={() => {
                    NavigationUtil.goPage({
                        navigation: this.props.navigation,
                        goods_id: goods_id
                    }, "DetailPage")
                }}
            >
                <View style={{flexDirection:'row',alignItems:'center',paddingTop:5,paddingBottom:10,justifyContent:'space-between'}}>
                    <View>
                        <Text style={{color:'red',fontWeight:'bold'}}>SHOP：{store_name}</Text>
                    </View>
                    <View style={{marginRight:15,flexDirection:'row'}}>
                        <Text style={{backgroundColor:'red',color:'#fff',fontSize:13,padding:2}}>爆</Text>
                        <Text 
                            style={{borderWidth:1,borderColor:'red',paddingRight:10,paddingLeft:10,color:'red',padding:2,fontSize:13}}
                        >{parseFloat((promotion_price/goods_price)*10).toFixed(1)}折</Text>
                    </View>
                    
                </View>
                <View style={{flexDirection:'row'}}>
                    <Image source={{uri: goods_url}} style={{width: 100, height: 100}}/>
                    <View>
                        <Text style={{marginLeft: 5, width: imageWidth, color:'#333'}} numberOfLines={2}>{goods_name}</Text>
                        <View style={{marginTop:10,marginLeft: 5,width:imageWidth}}>
                            <Text style={{color:'#f60',fontSize:12,letterSpacing:0}} numberOfLines={1}>{xianshi_name}</Text>
                        </View>
                        <View style={{flexDirection:'row',marginTop:10,marginLeft: 5}}>
                            <Text style={{color:'red',fontWeight:'bold'}}>￥{promotion_price}</Text>
                            <Text style={{color:'#cdcdcd',marginLeft:8,textDecorationLine:'line-through'}}>{goods_price}</Text> 
                        </View>
                        <View style={{marginTop:5,marginLeft:5}}>
                            <Text style={{color:'red',fontSize:12}}>此商品最低{xianshigoods_lower_limit}件起售</Text>
                        </View>
                    </View>
                    
                </View>
                
                
            </TouchableOpacity>
        );
    }

    rednerMiaoSha = (info) => {
        // console.log(info.item)
        let goods_name = info.item.goods_name//商品名称
        let goods_price = info.item.goods_price//商品价格
        let groupbuy_price = info.item.groupbuy_price//商品活动价格
        let goods_url = info.item.groupbuy_image//商品图片
        let store_name = info.item.store_name;//店铺名称
        let groupbuy_name = info.item.groupbuy_name//活动名称
        let groupbuy_upper_limit = info.item.groupbuy_upper_limit//限购数量
        let cha_jia = goods_price - groupbuy_price//差价
        let goods_id = info.item.goods_id
        return (
            <TouchableOpacity 
                style={{backgroundColor:'#fff',marginRight: 5,marginLeft: 5,borderRadius:6,padding:5, width: itemWidth,paddingBottom:10}}
                onPress={() => {
                    NavigationUtil.goPage({
                        navigation: this.props.navigation,
                        goods_id: goods_id
                    }, "DetailPage")
                }}
            >
                <View style={{flexDirection:'row',alignItems:'center',paddingTop:5,paddingBottom:10,justifyContent:'space-between'}}>
                    <View>
                        <Text style={{color:'red',fontWeight:'bold'}}>SHOP：{store_name}</Text>
                    </View>
                    <View style={{marginRight:15,flexDirection:'row'}}>
                        <Text style={{backgroundColor:'red',color:'#fff',fontSize:13,padding:2}}>省</Text>
                        <Text style={{borderWidth:1,borderColor:'red',paddingRight:10,paddingLeft:10,color:'red',padding:2,fontSize:13}}>￥{parseFloat(cha_jia).toFixed(2)}</Text>
                    </View>
                    
                </View>
                <View style={{flexDirection:'row'}}>
                    <Image source={{uri: goods_url}} style={{width: 100, height: 100}}/>
                    <View>
                        <Text style={{marginLeft: 5, width: imageWidth, color:'#333'}} numberOfLines={2}>{goods_name}</Text>
                        <View style={{marginTop:10,marginLeft: 5,width:imageWidth}}>
                            <Text style={{color:'#f60',fontSize:12,letterSpacing:0}} numberOfLines={1}>{groupbuy_name}</Text>
                        </View>
                        <View style={{flexDirection:'row',marginTop:10,marginLeft: 5}}>
                            <Text style={{color:'red',fontWeight:'bold'}}>￥{groupbuy_price}</Text>
                            <Text style={{color:'#cdcdcd',marginLeft:8,textDecorationLine:'line-through'}}>{goods_price}</Text> 
                        </View>
                        <View style={{marginTop:5,marginLeft:5}}>
                            <Text style={{color:'red',fontSize:12}}>此商品每人仅限购{groupbuy_upper_limit}件</Text>
                        </View>
                    </View>
                    
                </View>
                
                
            </TouchableOpacity>
        );
    }

    renderItemSelect = (info) => {
        if (this.state.activepage_id == 0) {
            return this.renderItem(info)
        } else if(this.state.activepage_id == 1){
            return this.rednerMiaoSha(info)
        } else {
            return <View><Text>神犬</Text></View>
        }
        
    }

    renderData = (list) => {
        return (
            <View style={{marginTop:20}}>
                <FlatList
                    data={list}
                    renderItem={this.renderItemSelect}
                    ListHeaderComponent={() => <View />}
                    ListFooterComponent={this.renderFooter}
                    ItemSeparatorComponent={() => <View style={{height: 15}}/>}
                    onEndReachedThreshold={20}
                    onEndReached={this.onEndReached}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this.handleRefresh}
                            colors={['cyan','blue','black']}
                            tintColor={'#fff'}
                            enabled={true}
                            progressBackgroundColor='#fff'
                        />
                    }
                    keyExtractor={(item, index) => 'key' + index + item}
                />
            </View>
        );
    }

    render() {
        const {navigation} = this.props;
        const {state, setParams} = navigation;
        const {params} = state;
        const topTitle = params.topTitle;

        if (this.state.isLoading && !this.state.error) {
            return this.renderLoadingView()
        }
        
        if (this.state.list == '') {
            return this.renderEmpity()
        }

        return(
            <View style={styles.container}>
                {this.renderData(this.state.list)}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#E31E3D'
    },
});