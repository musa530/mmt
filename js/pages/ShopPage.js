import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions, RefreshControl, Image,TouchableOpacity,ActivityIndicator,Alert,TextInput,ImageBackground} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ShopHomePage from './shopinnerpages/ShopHomePage';
import AllMallPage from './shopinnerpages/AllMallPage';
import ShopCategoryPage from './shopinnerpages/ShopCategoryPage';
import Toast from '../AppNavigator/ToastDemo'
import NavigationUtil from '../AppNavigator/NavigationUtil';

const {width, height} = Dimensions.get('window');

const TabArr = ['店铺首页','全部商品','店铺分类']

export default class ShopPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            placeholder:'搜索本店商品',
            inLikedNum: 44,
            inLiked: true,
            routeName:'Home',
            newArr: TabArr,
            currentIndex:0,
            page_id: -1,
            store_id:0,
            store_info:[],//店铺信息
            rec_goods_list:[],//推荐商品
            goods_id:0,
            isLoading:true,
            error: false,
            errorInfo: '',
            isRefreshing: false,
            inlarge: false
        }
    }

    componentDidMount(){
        // console.log(this.props.navigation.state.params);
        // Toast.show('数据加载中...')
        let store_id = this.props.navigation.state.params.store_id
        let page_id = this.props.navigation.state.params.page_id
        let store_name = this.props.navigation.state.params.store_name
        this.setState({shopName: store_name, page_id,store_id})
        this._netFetch(store_id)
    }

    static navigationOptions = ({navigation}) => ({
        title: `${navigation.state.params.store_name}`
    });

    _netFetch = (store_id) => {
        fetch(`https://satarmen.com/api/Store/store_info?store_id=${store_id}`)
        .then(response => response.json())
        .then(res => {
            // console.log(res.result)
            let store_info = res.result.store_info
            let rec_goods_list = res.result.rec_goods_list
            // console.log(rec_goods_list)
            this.setState({
                store_info,rec_goods_list,
                isLoading: false,
                isRefreshing: false
            })
            store_info = null;
            rec_goods_list = null;
        })
        .catch(error => {
            this.setState({
                error: true,
                errorInfo: error
            })
        })
        
    }

    renderLoadingView() {
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

    handleRefresh = () => {
        this.setState({
            isRefreshing: true,
            store_info: [],
            rec_goods_list: []
        })

        this._netFetch(this.state.store_id)
    }

    renderSearch = () => {//店铺搜索框
        const {store_info} = this.state
        return(
            <View>
                <ImageBackground
                    source={{uri:store_info.mb_title_img}}
                    style={{width:width,height:200}}
                >
                    <View style={styles.top_search}>
                        <TextInput
                            placeholder={this.state.placeholder}
                            style={{flex:1}}
                            onChangeText={text=>this.setState({
                                value: text
                            })}
                            onSubmitEditing={()=>{
                                //开始搜索
                                this.onChangeTextKeyword(this.state.value);
                                //保存搜索内容
                                this.insertSearch(this.state.value);
                            }} 
                            onFocus={()=>{}}
                            returnKeyType={"search"}
                            autoCapitalize={"none"}
                            autoFocus={false}
                            defaultValue={this.state.value}
                            keyboardType={'default'}
                            value={this.state.value}
                        />
                        <Ionicons
                            name={'ios-search'}
                            size={28}
                            style={styles.icon}
                        />
                    </View>
                    {this.renderShopInfo()}
                </ImageBackground>
            </View>
        );
    }

    renderShopInfo(){//店铺信息
        const {inLiked,store_info,newArr} = this.state;
        return(
            <View style={{marginTop:10,marginRight:8,marginLeft:8}}>
                <View style={{backgroundColor:'#fff',borderRadius:5}}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <View style={{padding:10}}>
                            <Image
                                source={{uri:store_info.store_avatar}}
                                style={{width:80,height:40}}
                            />
                        </View>
                        <View style={{flex:1,padding:5}}>
                            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                                <View style={{backgroundColor:'#eee',padding:3,borderRadius:8}}>
                                    <Text style={{color:'#666'}}>官方店铺</Text>
                                </View>
                                <View>
                                    <Text style={{color:'red',fontSize:16,letterSpacing:-1}}>★★★★★</Text>
                                </View>
                                <TouchableOpacity 
                                    style={{backgroundColor:'#f00',padding:2,paddingLeft:5,paddingRight:5,borderRadius:8,width:55,alignItems:'center'}}
                                    onPress={()=>this.setState({inLiked:!inLiked})}
                                >
                                    {store_info.is_favorate ?
                                        <Text style={{color:'#fff'}}>已收藏</Text>
                                        :
                                        <Text style={{color:'#fff'}}>收藏</Text>
                                    }
                                </TouchableOpacity>
                            </View>
                            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:2}}>
                                <View>
                                    <Text style={{color:'#666',fontSize:13}}>{this.state.shopName}</Text>
                                </View>
                                <View>
                                    <Text style={{color:'#666'}}>{store_info.store_collect}人收藏</Text>
                                </View>
                            </View>
                        </View>
                        
                    </View>
                    <View style={{marginTop:10,padding:10,marginBottom:8}}>
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}>
                            {this.renderShopTabs(newArr)}
                        </View>
                        
                    </View>
                </View>
            </View>
        );
    }

    renderShopTabs=(newArr)=>{//店铺导航栏的切换
        const {currentIndex} = this.state;
        let activeStyle = {
            color: '#f00'
        }
        let tintColor = {
            color:'#666',
            fontSize: 16
        }

        let colorContro;
        return(
            newArr.map((item,index)=>{
                colorContro = index===currentIndex ? activeStyle : tintColor
                return(
                    <TouchableOpacity
                        onPress={()=>{
                            this.setState({currentIndex: index})
                        }}
                    >
                        <Text
                            key={index}
                            style={[tintColor,colorContro]}
                        >{item}</Text>
                    </TouchableOpacity>
                );
                
            })
        );
        
    }

    

    _setId=(id)=>{
        this.setState({
            // goods_id:id,
        })
    }

    // renderCategory(){
    //     return(
    //         <ShopCategoryPage />
    //     );
    // }

    _renderFullPage = () =>{
        const {inlarge} = this.state
        console.log('我被电击了')
        this.setState({
            inlarge:!inlarge
        })
    }

    renderShopPage=(index,page_id,store_id)=>{//导航栏页面切换
        const {rec_goods_list} = this.state;
        
        
        if (index==0) {
            return(
                <ShopHomePage data={rec_goods_list} handleRefresh={() => this.handleRefresh()} refreshing={this.state.isRefreshing}/>
            );
        }
        if (index==1) {
            return(
                <AllMallPage store_id={store_id} _renderFullPage={this._renderFullPage}/>
            );
        }
        if (index==2) {
            return(
                <ShopCategoryPage store_id={store_id}/>
            );
        }
    }

    render(){
        // const {navigation} = this.props;
        // cosnt {state,setParams} = navigation;
        const {currentIndex, page_id,store_id} = this.state;
        // this.props.navigation.goBack()

        if (this.state.isLoading && !this.state.error) {
            return this.renderLoadingView()
        }
        return(
            <View style={{flex:1}}>
                {/* <ScrollView> */}
                {this.state.inlarge ?
                    null
                    :
                    <View>
                        {this.renderSearch()}
                    </View>
                }
                    
                    <View>
                        {this.renderShopPage(currentIndex,page_id,store_id)}
                    </View>
                {/* </ScrollView> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    top_search: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height:40,
        marginLeft:30,
        marginRight:30,
        borderRadius:16,
        borderWidth:1,
        borderColor:'#eee',
        backgroundColor:'#fff',
        paddingRight:5,
        paddingLeft:5,
        marginTop:3
    },
    icon: {
        color: '#cdcdcd',
    },
});