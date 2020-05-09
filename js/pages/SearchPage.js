import React, {Component} from 'react';
import {View, Image, StyleSheet, TextInput, Text, ActivityIndicator, TouchableOpacity, Alert, FlatList, Dimensions,RefreshControl, BackHandler} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from '../AppNavigator/ToastDemo';
import NavigationUtil from '../AppNavigator/NavigationUtil'
// import AsyncStorage from '../AppNavigator/AsyncStorage'

var rootArr = ['火锅调料', 'VIVO', '华为', '好礼多'];
const tabArr = ['综合排序','销量排序','新品'];


const {height, width} = Dimensions.get('window')

export default class SearchPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            value: '',
            placeholder: '请输入搜索店铺/商品名称',
            isPostList: false, //是否搜索
            keyword: '',//搜索关键字
            searchHistory: [],// 搜索历史数组
            newArr: rootArr,
            isChangedKeyword: false,
            error: false,
            errorInfo:'',
            keyword: '',
            goods_list: [],
            page_total: 0,
            page: 1,
            isLoading: true,
            isRefreshing: false,
            isSearchMall: true,
            showFoot: 0,
            sort_key: '',//排序键 goods_salenum销量 goods_click浏览量 goods_price价格
            sort_order:'',//排序值 1升序 2降序
            store_list: []
        };
    }

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", ()=> {
            return false
        })
    }

    _netMallFetch = (keyword,sort_key, sort_order,page) => {
        // console.log(this.state.keyword)
        fetch(`https://satarmen.com/api/Goods/goods_list?keyword=${keyword}&b_id=&gc_id=&price_from=&price_to=&
            own_shop=&gift=&area_id=&groupbuy=&xianshi=&virtual=&sort_key=${sort_key}&sort_order=${sort_order}&page=${page}`)
        .then(response => response.json())
        .then(res => {
            // console.log(res.result)
            let goods_list = res.result.goods_list
            let page_total = res.result.page_total

            let foot = 0
            if(this.state.page>=page_total){
                foot = 1
            }

            this.setState({
                goods_list: this.state.goods_list.concat(goods_list),
                page_total,
                isLoading:false,
                showFoot: foot,
                isRefreshing: false
            })
        })
        .catch(error => {
            this.setState({
                error: true,
                errorInfo: error
            })
        })
    }

    _netShopFetch(keyword,page){
        fetch(`https://satarmen.com/api/Store/store_list?keyword=${keyword}&b_id=&gc_id=&price_from=&
            price_to=&own_shop=&gift=&area_id=&groupbuy=&xianshi=&virtual=&sort_key=&sort_order=&page=${page}`)
        .then(response => response.json())
        .then(res => {
            let store_list = res.result.store_list
            // console.log(store_list)
            this.setState({
                store_list
            })
        })
        .catch(error => {
            this.setState({
                error: true,
                errorInfo:error
            })
        })
    }

    UNSAFE_componentWillMount() {}

    //删除历史搜索记录
    _delArrItem() {
        Alert.alert('删除搜索记录', '确定要删除搜索记录吗？',
            [
                {text: '确定', onPress: ()=>{
                    for (let i = rootArr.length; i >= 0; i--) {
                        rootArr.pop();
                    }
                    this.setState({
                        rootArr
                    })
                }},
                {text: '取消'}
            ]
        )
    }

    //历史和热门标签值赋值输入框
    _setValues(item) {
        this.setState({value: item})
    }

    //聚焦
    _onFous(v) {
        if (v.nativeEvent.target) {
            this.setState({isPostList: false})
        }
    }

    //获取历史记录
    _getHistory() {
        // 查询本地历史
        getItems("searchHistory").then(data => {
            if (data == null) {
                this.setState({
                    searchHistory: [],
                })
            } else {
                this.setState({
                    searchHistory: data,
                })
            }
        })
    }

    //保存搜索标签
    insertSearch(newText) {
    }
    //关键字变化
    onChangeTextKeyword(Val) {
        console.log(Val)
        if(!Val){
            Toast.show('请输入关键字')
        } else{
            for(let i in rootArr){
                // console.log(Val.toString())
                // console.log(rootArr[i])
                if(rootArr.indexOf(Val) === -1){
                    rootArr.unshift(Val.toString());
                }
            }
        }
        this._netMallFetch(Val,this.state.sort_key, this.state.sort_order, this.state.page)
        this.setState({
            rootArr,
            keyword: Val,
            // value: ''
            isChangedKeyword:true
        })
        
    }

    valueEmpty =(text)=>{
        if(text == ''){
            this.setState({
                isChangedKeyword: false,
                keyword: ''
            })
        }
    }

    loadingData(){
        return(
            <View>
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

    _renderItem = info => {
        let item = info.item
        // console.log(item)
        return (
            <TouchableOpacity style={{}}
                onPress={() =>{
                    NavigationUtil.goPage({
                        navigation: this.props.navigation,
                        goods_id: item.goods_id
                    },"DetailPage")
                }}
            >
                
                <View style={{marginHorizontal:5,width: width/2 - 10}}>
                    <Image
                        source={{uri: item.goods_image_url}}
                        style={{width:width/2 - 10,height:width/2 - 10}}
                    />
                    <Text style={{textAlign:'left',marginTop:10,marginBottom:5}} numberOfLines={2}>{item.goods_name}</Text>
                    <Text style={{color: 'red',fontSize:16,fontWeight:'bold'}}>￥{item.goods_price}</Text>
                </View>
            </TouchableOpacity>
            
        );
    }

    renderShopItem = (info) => {
        let item = info.item
        return(
            <TouchableOpacity style={{paddingHorizontal:5}}
                onPress={() => {
                    NavigationUtil.goPage({
                        navigation: this.props.navigation,
                        store_id: item.store_id,
                        store_name: item.store_name
                    },"ShopPage")
                }}
            >
                <View style={{width: width/2 - 10,alignItems:'center'}}>
                    <Image
                        source={{uri: item.store_logo}}
                        style={{width:width/2 - 15,height:100}}
                    />
                    <Text style={{width: width/2 - 10,paddingLeft:5,paddingTop:8}} numberOfLines={2}>{item.store_name}</Text>
                </View>
            </TouchableOpacity>
            
        )
    }

    renderTabArr(newArr){
        // console.log(newArr)
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

    handleRefresh = () => {
        this.setState({
            page: 1,
            goods_list:[],
            isRefreshing:true
        })
        this._netMallFetch(this.state.keyword,this.state.sort_key, this.state.sort_order, 1)
    }

    renderFooter = () => {
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

    onEndReached = () => {
        if(this.state.showFoot != 0){
            return ;
        }
        if((this.state.page != 1) &&(this.state.page>=this.state.page_total)){
            return ;
        } else {
            this.state.page++
        }
        this.setState({
            showFoot: 2
        })
        if(this.state.page>1){
            this._netMallFetch(this.state.keyword,this.state.sort_key,this.state.sort_order, this.state.page)
        }
    }

    renderMallOrShop = () =>{
        if(!this.state.isSearchMall){
            this._netShopFetch(this.state.keyword, this.state.page)
        }
        return(
            <View>
                {this.state.isSearchMall ? 
                    <View>
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-around',marginVertical:15,borderColor:'#789',borderWidth:1,paddingVertical:5}}>
                            {this.renderTabArr(tabArr)}
                        </View>
                        <View style={{height:'87%'}}>
                            <FlatList
                                numColumns={2}
                                renderItem={this._renderItem}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={this.state.isRefreshing}
                                        onRefresh={this.handleRefresh}
                                        colors={['cyan','red','black']}
                                        tintColor='#f00'
                                    />
                                }
                                
                                data={this.state.goods_list}
                                ItemSeparatorComponent={()=><View style={{marginBottom:10}}/>}
                                ListHeaderComponent={()=><View />}
                                ListFooterComponent={this.renderFooter}
                                onEndReachedThreshold={20}
                                onEndReached={this.onEndReached}
                                keyExtractor={(item, index) => 'key' + index + item}
                            />
                        </View>
                    </View>
                    :
                    <View style={{paddingBottom:50}}>
                        <View style={{padding:10}}>
                            <Text style={{color: 'red',fontSize:16,fontWeight:'bold'}}>店铺列表</Text>
                        </View>
                        <FlatList
                            numColumns={2}
                            data={this.state.store_list}
                            renderItem={this.renderShopItem}
                            ItemSeparatorComponent={()=> <View/>}
                            ListFooterComponent={()=> <View/>}
                            ListHeaderComponent={()=> <View/>}
                            keyExtractor={(item, index) => 'key' + index + item}
                        />
                    </View>
                }
            </View>
        );
    }

    renderSearchDetail = () => {
        let isSearchMall = this.state.isSearchMall
        let backColor = {backgroundColor: 'red'}
        let topNavStyle = {justifyContent:'center',alignItems:'center',width: width/2,}
        let activeStyle = {color:'#fff'}
        return(
            <View>
                <View style={{backgroundColor:'#fff',}}>
                    <View style={{height:40,flexDirection:'row',width:width,justifyContent:'space-between'}}>
                        <TouchableOpacity style={[topNavStyle, isSearchMall ? backColor : {}]}
                            onPress={() => this.setState({
                                isSearchMall: true
                            })}
                        >
                            <Text style={[isSearchMall ?  activeStyle : {}, {fontWeight:'bold'}]}>商品</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[topNavStyle, isSearchMall ? {} : backColor]}
                            onPress={() => this.setState({
                                isSearchMall: false
                            })}
                        >
                            <Text style={[isSearchMall ? {} : activeStyle, {fontWeight:'bold'}]}>店铺</Text>
                        </TouchableOpacity>
                        
                    </View>
                    {(this.state.isLoading && !this.state.error) ? 
                        this.loadingData()
                        :
                        this.renderMallOrShop()
                    }
                    
                </View>
            </View>
        );
    }

    renderSearchResult = () => {
        return(
            <View>
                {
                    this.renderSearchDetail()
                }
            </View>
            
            
        );
    }

    render() {
        const {newArr} = this.state;
        return(
            <View style={styles.container}>
                <View style={styles.top_search}>
                    <TextInput
                        placeholder={this.state.placeholder}
                        style={styles.input}
                        onChangeText={text=>{
                                this.valueEmpty(text)
                                this.setState({
                                    value: text
                                })
                        }}
                        onSubmitEditing={()=>{
                            //开始搜索
                            this.onChangeTextKeyword(this.state.value);
                            //保存搜索内容
                            this.insertSearch(this.state.value);
                        }} 
                        onFocus={()=>{}}
                        returnKeyType={"search"}
                        autoCapitalize={"none"}
                        // autoFocus={'true'}
                        defaultValue={this.state.value}
                        keyboardType={'default'}
                        value={this.state.value}
                    />
                    {this.state.value ?
                        <TouchableOpacity style={[styles.icon,{backgroundColor:'#E31E3D',padding:8,paddingLeft:13,paddingRight:13,borderRadius:8}]}>
                            <Text style={{color:'#fff'}}>搜索</Text>
                        </TouchableOpacity>
                        :
                        <Ionicons
                            name={'ios-search'}
                            size={28}
                            style={styles.icon}
                        />
                    }
                    
                </View>
                {this.state.isChangedKeyword ? 
                    this.renderSearchResult()
                    :
                    <View style={{flex:1,backgroundColor:'#fff',marginTop:10}}>
                        <View style={styles.record_del}>
                            <Text style={styles.record_text}>最近搜索</Text>
                            <TouchableOpacity
                                onPress={()=>{
                                    this._delArrItem()
                                }}
                            >
                            <Text style={styles.delete}>清理</Text></TouchableOpacity>
                        </View>
                        <View style={styles.record_arrary}>
                            {
                                newArr.map((item, index)=> {
                                    return(
                                        <TouchableOpacity
                                            onPress={() => {
                                                this.setState({
                                                    value: item
                                                })
                                                this.onChangeTextKeyword(item)
                                            }}
                                        >
                                        <Text
                                            style={styles.arr_item}
                                            key={index}
                                        >{item}</Text></TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                    </View>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#f7f7f7',
      flex:1
    },
    top_search: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        flex: 1,
        height: 40,
        backgroundColor: 'white',
        borderRadius: 12,
        paddingLeft: 15,
    },
    icon: {
        color: '#cdcdcd',
        marginRight: 10,
        position:'absolute',
        right:0
    },
    record_del: {
        marginTop: 10,
        flexDirection: 'row',
        backgroundColor: 'white',
        justifyContent: 'space-between',
        height: 40,
        padding: 5
    },
    record_text: {
        fontSize: 16
    },
    delete: {
        color: 'red'
    },
    record_arrary: {
        backgroundColor: 'white',
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingLeft: 10,
    },
    arr_txt: {
        backgroundColor: '#333',
        color: '#eee',
        marginRight: 10,
        padding: 2,
        borderRadius: 2
    },
    arr_item: {
        marginRight: 10,
        backgroundColor: '#666',
        fontSize: 12,
        color: 'white',
        padding: 2,
        borderRadius: 3,
        marginBottom: 5
    },
    footer:{
        flexDirection:'row',
        height:24,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:10,
    }
});