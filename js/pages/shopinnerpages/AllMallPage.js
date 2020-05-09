import React , {Component} from 'react';
import {View, Text, Dimensions, ScrollView, StyleSheet, TouchableOpacity, Image, Alert,FlatList,RefreshControl,ActivityIndicator,Picker} from 'react-native';
import SelfadaptModal from 'react-native-selfadapt-modal';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NavigationUtil from '../../AppNavigator/NavigationUtil';

const {width, height} = Dimensions.get('window');
const itemWidth = width/2 -8;
const imageWidth = width/2 -11;
const imgWdith = width/3;

const tabArr = ['销量排序','新品'];

export default class AllMall extends Component{
    constructor(props){
        super(props);
        this.state={
            tabBarIndex: 2,
            isColor: true,
            newArr:tabArr,
            currentIndex:0,
            columns:2,
            key: 1,
            page:1,
            store_id:this.props.store_id,
            goods_list:[],
            page_total:0,
            isRefreshing: false,
            isLoading: true,
            error: false,
            errorInfo:'',
            showFoot: 0,
            inlarge: false,
            pickerValue: '综合排序',
            sort_order: 0,
            sort_key:undefined
        }
    }

    componentDidMount(){
        const {page,store_id, sort_order, sort_key} = this.state
        // console.log(this.props.store_id)
        this._netFetch(page, store_id, sort_order, sort_key)
    }
    //https://satarmen.com/api/Store/store_goods?page=1&per_page=undefined&storegc_id=&keyword=&store_id=1&sort_order=&sort_key=4
    //https://satarmen.com/api/Store/store_goods?store_id=${store_id}&page=${page}
    _netFetch = (page, store_id, sort_order, sort_key) => {
        let url = `https://satarmen.com/api/Store/store_goods?page=${page}&per_page=undefined&storegc_id=&keyword=&store_id=${store_id}&sort_order=${sort_order}&sort_key=${sort_key}`
        fetch(url)
        .then(response => response.json())
        .then(res => {
            console.log(url)
            let page_total = res.result.page_total
            let goods_list = res.result.goods_list
            let foot = 0
            if(this.state.page>=page_total){
                foot = 1
            }
            this.setState({
                goods_list: this.state.goods_list.concat(goods_list),
                page_total,
                isRefreshing:false,
                isLoading:false,
                showFoot: foot
            })
            goods_list = null;
        })
        .catch(error => {
            this.setState({
                error: true,
                errorInfo: error
            })
        })
    }

    renderActiveIndicator() {
        return (
            <View style={{marginTop:60,alignItems:'center'}}>
                <ActivityIndicator
                    animating={true}
                    color='blue'
                    size="small"
                />
                   <Text>数据加载中...</Text> 
                
            </View>
        );
    }

    _requireNet = con => {
        this.setState({
            isLoading: true,
            goods_list:[],
        })

        if (con == '综合排序'){
            this.setState({
                sort_order: 0,
                sort_key: undefined
            })
            this._netFetch(1, this.state.store_id, 0, undefined)
        }
        if (con == '人气最高'){
            this.setState({
                sort_key: 4
            })
            this._netFetch(1, this.state.store_id, this.state.sort_order, 4);
            
        }
        if (con == '价格高到低'){
            this.setState({
                sort_key: 2
            })
            this._netFetch(1, this.state.store_id, this.state.sort_order, 2);
        }
        if (con == '价格低到高'){
            this.setState({
                sort_order: 1,
                sort_key: 2
            })
            this._netFetch(1, this.state.store_id, 1, 2);
        }
        
    }

    dropDown = () => {
        let tabIndex = this.state.tabBarIndex
        let act = tabIndex == 2 ? {color:'#f00'} : {color: '#333'}
        return (
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <SelfadaptModal
                    menuList={['综合排序','人气最高','价格高到低','价格低到高']}
                    containerStyle={styles.dmeOneBtn}
                    content={this.state.pickerValue}
                    onPress={(content)=> {
                        
                        this.setState({
                            pickerValue: content,
                            tabBarIndex: 2
                        })
                        this._requireNet(content)
                    }}>
                    <Text style={[{fontSize:14}, act]}>{this.state.pickerValue}</Text>
                </SelfadaptModal>
                <Image 
                    source={require('../../../assest/drop_down.png')}
                    style={{margin:0,width:10,height:10}}
                />
            </View>
            
        );
    }

    changeIndex = index => {
        console.log(index)
        this.setState({
            goods_list:[],
            isLoading: true
        })
        if(index == 0){
            this.setState({
                sort_key: 3
            })
            this._netFetch(1, this.state.store_id, this.state.sort_order, 3);
        }
        if(index == 1){
            this.setState({
                sort_key: 3
            })
            this._netFetch(1, this.state.store_id, this.state.sort_order, 1);
        }
    }

    renderTabArr(newArr){
        let tabIndex = this.state.tabBarIndex
        return(
            newArr.map((item,index) =>{
                let act = tabIndex == index ? {color:'#f00'} : {color:'#333'}
                return(
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({
                                tabBarIndex: index
                            })
                            this.changeIndex(index)
                        }}
                    >
                        <Text
                            key={index}
                            style={act}
                        >{item}</Text>
                    </TouchableOpacity>
                );
            })
        );
    }

    renderAllMallNav(){//页面导航栏以及商品排列的切换
        const {isColor,newArr, inlarge} = this.state;
        let top = inlarge ? 0 : -15
        return(
            <View style={{backgroundColor:'#fff',padding:5,top:top,marginLeft:8,marginRight:8}}>
                <View style={{flexDirection:'row',alignItems:'center',padding:5,justifyContent:'space-between'}}>
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-around',flex:1}}>
                        {this.dropDown()}
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

    handleRefresh = () => {
        this.setState({
            page:1,
            isRefreshing:true,//tag,下拉刷新中，加载完全，就设置成flase
            goods_list:[]
        });
        this._netFetch(1, this.state.store_id,this.state.sort_order, this.state.sort_key)
    }

    _renderFooter = () => {
        if (this.state.showFoot === 1) {
            return (
                <View style={{height:30,alignItems:'center',justifyContent:'flex-start',}}>
                    <Text style={{color:'#999999',fontSize:14,marginTop:5,marginBottom:5,}}>
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

    _onEndReached = () =>{
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
            this._netFetch(this.state.page, this.state.store_id,this.state.sort_order, this.state.sort_key);
        }
    }

    renderIntegralMarket(){//商品展示
        let data = this.state.goods_list
        const {inlarge} = this.state
        let dynimacHeight = inlarge ? {height: height - 135} : {height: height - 335}
        return(
            <View style={[{padding: 5,top:-5}, dynimacHeight]}>
                <View style={{backgroundColor: '#fff'}}>
                    <View style={{padding: 10,flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginRight:5}}>
                        <Text style={{color: '#f00', fontSize: 16, fontWeight: 'bold'}}>热门推荐</Text>
                        
                        <TouchableOpacity
                            onPress={() => {
                                this.props._renderFullPage()
                                this.setState({
                                    inlarge: !inlarge
                                })
                            }}
                        >
                            {inlarge ?
                               <Ionicons
                                    name={'ios-contract'}
                                    size={26}
                                    color={'red'}
                                />
                                :
                                <Ionicons
                                    name={'ios-expand'}
                                    size={26}
                                    color={'red'}
                                />
                            } 
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{}}>
                    <FlatList
                        data={data}
                        key={this.state.isColor ? 1 : 2}
                        numColumns={this.state.isColor ? 2 : 1}
                        ListHeaderComponent={()=><View />}
                        ListFooterComponent={this._renderFooter}
                        ItemSeparatorComponent={()=><View />}
                        renderItem={this.renderCell}
                        onEndReachedThreshold={20}
                        onEndReached={this._onEndReached}
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.isRefreshing}
                                onRefresh={this.handleRefresh}
                                colors={['cyan','red','black']}
                                tintColor={'#f00'}
                                enabled={true}
                                progressBackgroundColor="#fff"
                            />
                        }
                        keyExtractor={(item, index)=>'key' + index + item}
                        contentContainerStyle={{
                        }}
                    />
                </View>
            </View>
        );
    }

    renderOneItem=(index, title, url, price,salenum,store_name,goods_id)=> {//一个商品为一行显示
        return(
            <View style={{marginBottom: 10, backgroundColor: '#fff'}} key={index}>
                <TouchableOpacity
                    style={{flexDirection: 'row',alignItems: 'center', }}
                    onPress={()=>{
                        NavigationUtil.goPush({
                            navigation: this.props.navigation,
                            goods_id
                        },"DetailPage")
                    }}
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
                            <Text style={{color:'#333'}}>{store_name}</Text>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#eee', padding: 5}}>
                            <Text style={{color:'#f00',fontSize:16}}>{price}￥</Text>
                            <Text style={{color:'#fff'}}>销量{salenum}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    renderTwoItem = (index, title, url, price,salenum,goods_id) => {//两个商品为一行展示
        return(
            <View style={{}}>
                <TouchableOpacity 
                    onPress={()=>{
                        NavigationUtil.goPush({
                            navigation: this.props.navigation,
                            goods_id
                        },"DetailPage")
                    }}
                    key={index}
                    style={{borderWidth: 1, borderColor:'#eee', width: itemWidth, marginBottom: 10}}
                >
                    <Image
                        source={{uri: url}}
                        style={{width: imageWidth, height: imageWidth}}
                    />
                    <View style={{marginTop: 3, paddingBottom: 3,backgroundColor:'#eee'}}>
                        <Text numberOfLines={2}
                            style={{fontSize: 16, color: '#333'}}
                        >{title}</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between',padding: 5, backgroundColor: '#eee'}}>
                        <Text style={{color: '#f00', fontSize: 16}}>￥{price}</Text>
                        <Text style={{color: '#fff', fontSize: 16}}>销量{salenum}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    renderCell=(info)=>{
        // console.log(info.item)
        let index = info.index
        let title = info.item.goods_name
        let url = info.item.goods_image_url
        let price = info.item.goods_price
        let salenum = info.item.goods_salenum
        let store_name = info.item.store_name
        let goods_id = info.item.goods_id
        const {isColor} = this.state;
        return(
            <View style={{flex: 1,justifyContent:'space-around'}}>
                {isColor?
                    this.renderTwoItem(index, title, url, price,salenum,goods_id)
                    :
                    this.renderOneItem(index, title, url, price,salenum, store_name,goods_id)
                }
            </View>
        );
    }

    render(){
        if (this.state.isLoading && !this.state.error) {
            return this.renderActiveIndicator();
        }
        return(
            <View style={{backgroundColor: '#f7f7f7'}}>
                {this.renderAllMallNav()}
                {this.renderIntegralMarket()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    footer:{
        flexDirection:'row',
        height:24,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:10,
    },
    dmeOneBtn:{
        padding: 5,
        borderRadius: 5,
        backgroundColor:'#fff'
        // backgroundColor: '#58A0FF',
    }
});