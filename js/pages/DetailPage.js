import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, ScrollView, SectionList, DeviceEventEmitter, FlatList, Alert, BackHandler} from 'react-native';
import Modal from 'react-native-modal';
import Toast from '../AppNavigator/ToastDemo';
import NavigationUtil from '../AppNavigator/NavigationUtil';
import EmpityBox from './EmpityBox';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient'

const {width, height} = Dimensions.get('window');
const titleWidth = width/5 * 4.5;
const modalHeight = height/3 * 2.2;//选择颜色卡的高度
const paramHeight = height/3 * 2.5;//产品参数卡的高度
const buttonWidth = width/2 - 5;

export default class DetailPage extends Component{
    constructor(props){
        super(props);
        this.state={
            share: '分享',
            mallCouont: 1, //商品数量
            inLike:false,
            animationIn:'slideInUp',
            animationOut: 'slideOutDown',
            backdropOpacity: 0.8,
            backdropColor: '#333',
            swipeDirection:'down',
            modalVisible: false,//颜色选择模态场景是否可见
            parameterModal: false,//产品参数模态场景是否可见
            backdropTransitionOutTiming: 0,
            swiperImg:'',//商品图信息
            goods_info:[],//商品信息
            store_info:[],//店铺信息
            spec_list:[],//规格商品ID列表
            goods_evaluate_info:[],//商品评价信息
            mb_body:[],//商品详细
            goods_eval_list: [],//商品评价列表
            goods_commend_list:[],//店铺推荐
            temp_id: 0,//商品ID
            show_more: false,//查看更多
            specIndex: [],//选中属性的索引
            shop_mall_image:'',
            goods_spec:[],
            bim:[],
            outoutId:[],
            list:[]
        }
    }

    //设置页眉
    static navigationOptions = () => ({
        title: '详情页',
        headerRight:() => (
            <TouchableOpacity style={{marginRight: 13}}
                onPress={() => Alert.alert('分享')}
            >
                <Image style={{width: 25, height: 25}} source={require('../../assest/images/fenxiang.png')}/>
            </TouchableOpacity>
        )
    });

    UNSAFE_componentWillMount() {
        let id = this.props.navigation.state.params.goods_id
        this.setState({temp_id: id})
        
    }

    returnData() {
        
    }

    componentDidMount() {
        // const {navigation} = this.props;
        // const {state, setParams} = navigation;
        // const {params} = state;
        // this.setState({index:0})
        // this.props.navigation.goBack()
        const {temp_id} = this.state
        this._netFetch(temp_id)
        // BackHandler.addEventListener('hardwareBackPress',  ()=> {
        //     this.props.navigation.goBack(); // 返回上一页
        //     return true;
        // });
        
    }

    componentWillUnmount(){

    }

    UNSAFE_componentWillUpdate(){}

    _netFetch = (id) => {
        fetch(`https://satarmen.com/api/goods/goods_detail?goods_id=${id}&key=null`)
        .then(response => response.json())
        .then((res) => {
            console.log('res.result')
            let goods_evaluate_info = res.result.goods_evaluate_info//商品评论信息
            let goods_info = res.result.goods_info//商品信息
            let goods_image = res.result.goods_image//商品图片
            let store_info = res.result.store_info//店铺信息
            let mb_body = res.result.mb_body//详情信息
            let goods_eval_list = res.result.goods_eval_list//评论信息列表
            let goods_commend_list = res.result.goods_commend_list//店铺推荐列表
            let spec_list = res.result.spec_list

            let goods_spec = goods_info.goods_spec//获取当前商品的key和颜色值

            let list = res.result

            let specIndex = []
            let shop_mall_image = ''
            for(let k in goods_spec){
                
                specIndex.push(k);
            }
            let b = goods_image.split(",")
            shop_mall_image = b[0]
            specIndex = specIndex.join("|")
            // console.log(temp_key)
            // console.log(specIndex)
            let c = new Array()
            c = specIndex.split("|")
            // console.log(c)

            this.setState({
                swiperImg:goods_image, 
                goods_info, 
                store_info,
                goods_evaluate_info,
                mb_body,
                goods_eval_list,
                goods_commend_list,
                spec_list,
                specIndex,
                shop_mall_image,
                goods_spec,
                bim: c,
                list
            })
        })
        .catch(error => console.log(error))
    }


    daoJiSHi = () => {
        const {goods_info} = this.state
        let promotion_end_time = goods_info.promotion_end_time//活动结束时间
        // let unixDate = new Date(promotion_end_time * 1000);
        // let commonDate = unixDate.toLocaleString()
        // console.log(commonDate)
        let nowDate = Date.parse(new Date().getTime()/1000);//获取当前时间戳
        // let now = Date.parse(new Date());//获取当前时间戳
        let subDate = promotion_end_time - nowDate;
        if(subDate !== undefined) {
            var day = Math.floor(subDate / 1000 / 60 / 60 / 24); //天
            subDate = subDate % (1000 * 60 * 60 * 24)
            var hour = Math.floor(subDate / 1000 / 60 / 60); //小时
            subDate = subDate % (1000 * 60 * 60)
            var min = Math.floor(subDate / 1000 / 60); //分钟
            subDate = subDate % (1000 * 60)
            var second = Math.floor(subDate / 1000)
        }
        setTimeout(() => {
            console.log(day + 'day' + hour + 'hour' + min + 'min' + second + 'second')
        }, 1000);
        
    }

    renderTitle=(title, price, salenum, freight, address,promotion_type,promotion_price,typeTitle) => {//商品标题价格快递月销地址
        let type = ''
        if(promotion_type == 'xianshi'){
            type = '限时'
        }
        if(promotion_type == 'groupbuy'){
            type = typeTitle
        }

        
        
        // console.log(promotion_type)
        return (
            <View style={{paddingRight: 5, paddingLeft: 5, backgroundColor: 'white', top: -13, paddingTop: 5}}>
                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
                    
                    <Text numberOfLines={2}
                        style={{width: titleWidth, flex: 1, color: '#333', fontSize: 15}}
                    >  <Text style={{backgroundColor: 'red',color:'#fff',fontWeight:'bold'}}>{type}</Text>  {title}</Text>
                </View>
                {promotion_type ==  undefined ?
                    <View style={{marginBottom: 10}}>
                        <Text style={{fontSize: 22,color:'red'}}>￥{price}</Text>
                    </View>
                    :
                    <View style={{marginBottom: 10,flexDirection:'row',alignItems:"center"}}>
                        <Text style={{fontSize: 22,color:'red'}}>￥{promotion_price}</Text>
                        <Text style={{fontSize: 20,color:'#cdcdcd',marginLeft:8,textDecorationLine:'line-through'}}>{price}</Text>
                    </View>
                }
                {this.daoJiSHi()}
                {/* <Text style={{color:'red'}}>
                    <Text>{day}:</Text>
                    <Text>{hour}:</Text>
                    <Text>{min}:</Text>
                    <Text>{second}</Text>
                </Text> */}
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3}}>
                    <Text style={{color: '#666', fontSize: 13}}>快递：{freight}</Text>
                    <Text style={{color: '#666', fontSize: 13}}>月销 {salenum}</Text>
                    <Text style={{color: '#666', fontSize: 13, width:90}} numberOfLines={1}>{address}</Text>
                </View>
            </View>
        );
    }

    renderCoupon(){//优惠券包邮
        return(
            <View style={{backgroundColor: 'white', padding: 5}}>
                <View style={styles.couponPart1}>
                    <View style={{flexDirection:'row'}}>
                        <View style={styles.partOneItem}>
                            <Text style={styles.couponText}
                            >商城购物券</Text>
                            <Text style={styles.couponText}
                            >店铺购物券</Text>
                        </View>
                        <View style={styles.partOneItem}>
                            <Text>全商城可用</Text>
                            <Text>领取优惠券</Text>
                        </View>
                    </View>
                    
                    <TouchableOpacity style={{left: 135,justifyContent: 'center'}}>
                        <Text
                            style={{backgroundColor: 'red', padding: 5, fontSize: 16,borderRadius:8,paddingLeft:10,paddingRight:10,
                                color: '#fff'}}
                        >领取</Text>
                    </TouchableOpacity>
                </View>
                
                <View style={[styles.couponPart1, {justifyContent: 'space-between'}]}>
                    <View style={styles.partOneItem}>
                        <Text style={{color: '#f00'}}>每人限购10件</Text>
                        <Text style={{color: '#711'}}>满78元，享包邮；新疆享满39元包邮</Text>
                    </View>
                    <TouchableOpacity style={{justifyContent: 'center'}}>
                        <Image source={require('../../assest/images/more.png')}
                            style={{
                                width: 30,height: 30, marginRight: 6
                            }}
                        />
                    </TouchableOpacity>
                </View>

                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, alignItems: 'center'}}>
                    <View style={styles.partOneItem}>
                        <Text style={{color: '#711'}}>正品保证·破损暴涨·极速退款·七天退换</Text>
                    </View>
                    <TouchableOpacity style={{justifyContent: 'center'}}>
                        <Image source={require('../../assest/images/more.png')}
                            style={{
                                width: 30,height: 30, marginRight: 6
                            }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    renderSelect() {//商品参数和选择颜色尺码
        return (
            <View style={{padding: 5, backgroundColor: 'white', marginTop: 10}}>
                <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
                    borderBottomColor: '#cdcdcd', borderBottomWidth: 1}}
                    onPress={()=>{
                        this._setParameterVisible(true)
                    }}
                >
                    <Text style={{fontSize: 16}}>产品参数</Text>
                    <View style={{justifyContent: 'center'}}>
                        <Image source={require('../../assest/images/more.png')}
                            style={{
                                width: 30,height: 30, marginRight: 6
                            }}
                        />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5}}
                    onPress={()=>{
                        this._setModalVisible(true)
                    }}
                >
                    <Text style={{fontSize: 16}}>选择 颜色分类</Text>
                        <View style={{justifyContent: 'center'}}>
                            <Image source={require('../../assest/images/more.png')}
                                style={{
                                    width: 30,height: 30, marginRight: 6
                                }}
                            />
                        </View>
                </TouchableOpacity>
            </View>
        );
    }

    renderEvaluate(evaluate,evaluate_list) {//商品评价部分
        console.log(evaluate_list)
        return(
            <View>
                {evaluate.all == 0 ?
                    null
                    :
                    <View style={{backgroundColor: 'white',padding: 5, marginTop: 10}}>
                        <View style={{marginTop: 5, marginBottom: 5}}>
                            <Text style={{fontSize: 18}}>商品评价  ({evaluate.all})</Text>
                        </View>
                        {
                            evaluate_list.map((item, index) =>{
                                if(index == 0){
                                    return(
                                        <View key={index}>
                                            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
                                                <View style={{ width: 40, height: 40, borderRadius: 999, alignItems:'center',justifyContent:'center'}}>
                                                    <Image source={require('../../assest/user.png')} style={{width:30,height:30}}/>
                                                </View>
                                                <Text style={{color: '#666', marginLeft: 8,width:60}} numberOfLines={1} ellipsizeMode='middle'>{item.geval_frommembername}</Text>
                                            </View>
                                            <View style={{marginTop: 5, marginBottom: 5}}>
                                                <Text style={{color: '#333'}} numberOfLines={2}>{item.geval_content}</Text>
                                            </View>
                                            <View style={{marginBottom: 5,flexDirection:'row',alignItems:'center'}}>
                                                <Text style={{color: '#cdcdcd', fontSize: 13}}>颜色分类: </Text>
                                                <Text style={{color: '#cdcdcd', fontSize: 13,width:80}} numberOfLines={1} ellipsizeMode='head'>{item.geval_goodsname}</Text>
                                            </View>
                                            
                                        </View>
                                    )
                                }
                                
                            })
                        }
                        <TouchableOpacity style={{alignItems: 'center', margin: 8}}
                            onPress={()=>{
                                NavigationUtil.goPage({
                                    navigation: this.props.navigation,
                                    evaluate_list//传出商品评价列表
                                }, "AllEvaluate")
                            }}
                        >
                            <Text style={{padding: 5, backgroundColor:'#8a8a8a', color: 'white'}}>查看全部评价</Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>
        );
    }

    renderCommendList = (commend_list) => {//店铺推荐渲染
        let itemWidth = width/3 - 6
        let imageWidth = itemWidth - 3
        return commend_list.map((item, index) => {
            return (
                <TouchableOpacity style={{width:itemWidth,marginBottom:10}}
                    key={index}
                    onPress={()=>{
                        NavigationUtil.goPush({
                            navigation: this.props.navigation,
                            goods_id: item.goods_id
                        },"DetailPage")
                    }}
                >
                    <Image source={{uri: item.goods_image_url}} style={{borderRadius:3,width:imageWidth,height:imageWidth}}/>
                    <View style={{marginTop:10}}>
                        <Text numberOfLines={2} style={{color:'#333'}}>{item.goods_name}</Text>
                    </View>
                    <View style={{marginTop:10}}>
                        <Text numberOfLines={2} style={{color:'red'}}>￥{item.goods_price}</Text>
                    </View>
                </TouchableOpacity>
            );
        })
    }

    renderShopInfo = (store_name,logo, store_credit, store_id,commend_list) => {//店铺信息
        // let desccredit = store_credit.store_desccredit//宝贝描述
        // let servicecredit = store_credit.store_servicecredit//卖家服务
        // let deliverycredit = store_credit.store_deliverycredit//物流服务
        // console.log(store_credit)
        let tempArr = []
        for(let i in store_credit){
            let tempObj = store_credit[i]
            tempArr.push(tempObj)
        }
        // console.log(tempArr)
        let itemStyle = {flexDirection:'row',alignItems:'center'}

        return(
            <View>
                <View style={{backgroundColor: '#fff', marginTop: 10, padding: 5}}>
                    <View style={{flexDirection: 'row',alignItems:'flex-start',justifyContent:'space-between'}}>
                        <View style={{flexDirection:'row',width:buttonWidth}}>
                            <View style={{}}>
                                <Image source={{uri:logo}} style={{width:60,height:60}}/>
                            </View>
                            <Text style={{color: '#f00', marginLeft: 10, marginTop: 5, fontSize: 15,width:buttonWidth-60}} numberOfLines={1}>{store_name}</Text>
                        </View>
                        
                        <View style={{width:buttonWidth,flexDirection:'row',justifyContent:'flex-end'}}>
                            <TouchableOpacity style={{padding: 5,marginLeft:20,borderWidth:1,borderRadius:6,borderColor:'red'}}
                                onPress={()=>{
                                    NavigationUtil.goPage({
                                        navigation: this.props.navigation,
                                        store_name,store_id,
                                        page_id: 1
                                    },"ShopPage")
                                }}
                            >
                                <Text style={{color: 'red', fontSize: 13}}>全部宝贝</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{backgroundColor: '#f00', padding: 5, marginLeft: 10,borderRadius:6}}
                                onPress={()=>{
                                    NavigationUtil.goPage({
                                        navigation: this.props.navigation,
                                        store_name,store_id
                                    },"ShopPage")
                                }}
                            >
                                <Text style={{color: '#fff', fontSize: 13}}>进店逛逛</Text>
                            </TouchableOpacity>
                        </View>
                        
                    </View>
                    <View style={{width: width, height: 20}}></View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10,marginBottom:10}}>
                        {
                            tempArr.map((item, index) => {
                                return (
                                    <View style={itemStyle} key={index}>
                                        <Text style={{color: '#666', fontSize: 15}}>{item.text} </Text>
                                        <Text style={{color: '#666', fontSize: 15}}>{parseFloat(item.credit).toFixed(1)}</Text>
                                        <Text 
                                            style={{
                                                color: '#f00',marginLeft:3,
                                                fontSize: 13,
                                                backgroundColor:'#FFF1EB',
                                                borderRadius:999,
                                                alignItems:'center',justifyContent:'center'
                                            }}
                                        >{item.percent_text}</Text>
                                    </View>
                                )
                            })
                        }
                    </View>
                </View>
                <View style={{height: 50, backgroundColor: '#333', alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontSize: 16, color: '#fff'}}>———— 店铺推荐 ————</Text>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between',flex:1,flexWrap:'wrap',paddingTop:5,paddingLeft:5,paddingRight:5}}>
                    {this.renderCommendList(commend_list)}
                </View>
            </View>
        );
    }

    renderDisplay = () => {//商品详细图展示
        const {mb_body,show_more} = this.state
        let detailImgStyle = show_more ? {} : {height: width*3}
        return(
            <View>
                <View style={{height: 50, backgroundColor: '#333', alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontSize: 16, color: '#fff'}}>———— 商品详细 ————</Text>
                </View>
                <View style={[detailImgStyle,{backgroundColor:'#eee',alignItems:'center'}]}>
                    <FlatList
                        data={mb_body}
                        renderItem={(data)=><Image source={{uri: data.item.value}}
                            style={{width: width-6, height: width}}/>
                        }
                        ItemSeparatorComponent={() => <View/>}
                        ListHeaderComponent={()=><View/>}
                        ListFooterComponent={() => <View/>}
                        keyExtractor={(item,index) => 'key' + index + item}
                    />
                    
                </View>
                <LinearGradient colors={["#eee","#f7f7f7","#ccc"]} style={{marginTop:12}}>
                        <TouchableOpacity style={{alignItems:'center',flexDirection:'row',justifyContent:'center',paddingTop:8,paddingBottom:8}}
                            onPress={()=>this.setState({show_more:!show_more})}
                        >
                            <Text style={{fontSize:16}}>{show_more? '收起查看' : '查看更多'}</Text>
                            <Text style={{fontSize:10}}>{show_more? '∧' : '∨'}</Text>
                        </TouchableOpacity>
                    </LinearGradient>
            </View>
        );
    }

    //判断选择规格弹窗是否显示
    _setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }

    _setParameterVisible = (vis) => {
        this.setState({
            parameterModal: vis
        });
        console.log(this.state.parameterModal);
    }

    //商品数量增加
    addCount=(count)=>{
        //点击之后数量增加
        if (count<10) {
            count++;
        }

        //数量变化界面渲染
        this.setState({
            mallCouont: count
        })
    }

    //商品数量减少
    subCount=(count)=>{
        //判断count最少值
        if (count>1) {
            //点击之后数量减少
            count--;
        }

        //商品数量变化界面渲染
        this.setState({
            mallCouont: count
        })
    }

    shouldComponentUpdate() {
        return true
    }

    
    
    _netFetchAgain = (in_id,specIndex,c,goods_spec) => {//根据所选规格重新发起网络请求
        this.setState({
            shop_mall_image: this.state.list.spec_image[in_id],
            specIndex,
            bim: c,
            goods_spec,
        })
        let idss = this.state.list.spec_list[specIndex]
        this.setState({
            temp_id: idss
        })
        this._netFetch(idss)
    }


    renderItem = (info) => {//渲染规格名称
        const {goods_info} = this.state;
        let spec_value = goods_info.spec_value
        let out_id = info.item.out_id
        return(
            <FlatListItem 
                spec_value={spec_value} 
                out_id={out_id} 
                info={info} 
                bim={this.state.bim} 
                goods_info={this.state.goods_info} 
                goods_spec={this.state.goods_spec} 
                _netFetchAgain={this._netFetchAgain}
            />
        );
    }

    renderSpecList = (spec_name) => {//渲染规格标题
        
        let tempspecName = new Array()
        for(let item in spec_name) {
            let tempObj = new Object()
            tempObj.out_id = item
            tempObj.out_value = spec_name[item]
            tempspecName.push(tempObj)
        }
        return (
            <FlatList
                data={tempspecName}
                renderItem={(info) => this.renderItem(info)}
                ItemSeparatorComponent={()=><View/>}
                ListHeaderComponent={()=><View/>}
                ListFooterComponent={()=><View/>}
                keyExtractor={(item, index) => 'key' + index + item}
            />
        );
    }

    renderSelectModal = (storage, price, spec_name,promotion_type,promotion_price) => {//选择颜色和分类模板
        console.log(promotion_type)
        console.log(promotion_price)
        let innerContainerTransparentStyle = { backgroundColor: '#fff', padding: 5 }

        let paddingLR = { paddingLeft: 12, paddingRight: 12 }

        return(
            <Modal
                animationIn={this.state.animationIn}
                animationOut={this.state.animationOut}
                backdropOpacity={this.state.backdropOpacity}
                backdropColor={this.state.backdropColor}
                isVisible={this.state.modalVisible}
                onBackButtonPress={() => this._setModalVisible(false)}
                onBackdropPress={()=> this._setModalVisible(false)}
                backdropTransitionOutTiming={this.state.backdropTransitionOutTiming}
                style={{margin:0}}
            >
                <View style={{flex:1, justifyContent:'flex-end'}}>
                    <View style={[innerContainerTransparentStyle,styles.modalInnerContainer]}>
                        <View style={{flexDirection: 'row',}}>
                            <View style={{width: 100, height: 100, borderWidth: 1, borderColor: '#eee'}}>
                                <Image
                                    style={{width: 99, height: 99}}
                                    source={{uri: this.state.shop_mall_image}}
                                />
                            </View>
                            
                            
                            <View style={{justifyContent: 'center', marginLeft: 15}}>
                                { promotion_type == undefined ? 
                                    <View style={{marginBottom: 30, flexDirection: 'row'}}>
                                        <Text style={{fontSize: 18}}>价格: </Text>
                                        <Text style={{fontSize: 18, color: '#f00'}}>￥{price}</Text>
                                    </View>
                                    :
                                    <View style={{marginBottom: 30, flexDirection: 'row'}}>
                                        <Text style={{fontSize: 18}}>价格: </Text>
                                        <Text style={{fontSize: 18, color: '#f00'}}>￥{promotion_price}</Text>
                                    </View>
                                }
                                
                                <Text style={{color: '#666'}}>库存：{storage}件</Text>
                            </View>
                            <View style={{flex:1,alignItems:'flex-end'}}>
                                <TouchableOpacity
                                    onPress={()=>{
                                        this._setModalVisible(false)
                                    }}
                                    style={{borderRadius: 999,width: 20, height: 20,
                                        justifyContent: 'flex-end', alignItems: 'center',marginRight:10,
                                        borderWidth: 1, borderColor: '#f03'
                                    }}
                                >
                                    <Text style={{fontSize:13, color: '#f03', fontWeight: 'bold',}}>×</Text>
                                </TouchableOpacity>
                            </View>
                            
                        </View>
                        <ScrollView>
                        <View style={{flexDirection: 'row',justifyContent:'space-between'}}>
                            
                            
                        </View>
                        <View>
                            {this.renderSpecList(spec_name)}
                            
                            
                        </View>
                        </ScrollView>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{color:'#666',margin: 8, fontSize: 16, flex: 1}}>数量：</Text>
                            <TouchableOpacity style={[{padding: 3, borderWidth: 1,borderColor: '#eee'}, paddingLR]}
                                onPress={()=>{
                                    this.subCount(this.state.mallCouont)
                                }}
                            >
                                <Text style={{fontSize: 16}}>-</Text>
                            </TouchableOpacity>
                            <View style={[{padding: 3, borderWidth: 1,borderColor: '#eee'}, paddingLR]}>
                                <Text style={{fontSize: 16, fontWeight: "bold"}}>{this.state.mallCouont}</Text>
                            </View>
                            <TouchableOpacity style={[{padding: 3, borderWidth: 1,borderColor: '#eee'}, paddingLR]}
                                onPress={()=>{
                                    this.addCount(this.state.mallCouont)
                                }}
                            >
                                <Text style={{fontSize: 16}}>+</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{flexDirection: 'row', marginTop: 20}}>
                            <TouchableOpacity 
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: buttonWidth,
                                    backgroundColor: '#3CB371',
                                    borderTopLeftRadius:16,
                                    borderBottomLeftRadius:16
                                }}
                            >
                                <Text style={{color: '#fff', fontSize: 18, padding: 10}}>加入购物车</Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                style={{
                                    justifyContent: 'center', 
                                    alignItems: 'center', 
                                    width: buttonWidth, 
                                    backgroundColor: '#E31E3D',
                                    borderTopRightRadius:16,
                                    borderBottomRightRadius:16
                                }}
                            >
                                <Text style={{color: '#fff', fontSize: 18, padding: 10}}>立即购买</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }

    renderParameter(){//产品参数
        let innerContainerTransparentStyle = { backgroundColor: '#fff', padding: 5 }

        let paramStyle = {
            height: paramHeight,
            width: width,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
        }

        let finishButtom = {
            marginLeft: 30,
            marginRight: 30,
            borderRadius: 16,
            backgroundColor: '#f40',
            height: 40, 
            alignItems: 'center',
            justifyContent: 'center'
        }

        return(
            <Modal
                animationIn={this.state.animationIn}
                animationOut={this.state.animationOut}
                backdropOpacity={this.state.backdropOpacity}
                backdropColor={this.state.backdropColor}
                // onSwipeComplete={() => this._setParameterVisible(false)}
                // swipeDirection={this.state.swipeDirection}
                isVisible={this.state.parameterModal}
                propagateSwipe={true}
                onBackButtonPress={() => this._setParameterVisible(false)}
                onBackdropPress={()=> this._setParameterVisible(false)}
                backdropTransitionOutTiming={this.state.backdropTransitionOutTiming}
                style={{margin:0}}
            >
                <View style={styles.modalContainer}>
                    <View style={[paramStyle, innerContainerTransparentStyle]}>
                        <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 20}}>
                            <Text style={{fontSize: 18, fontWeight: 'bold'}}>产品参数</Text>
                        </View>
                        <ScrollView>
                            <ParamItem left={'品牌'} right={'叶梦提'}/>
                            <ParamItem left={'材质'} right={'天然皓石'}/>
                            <ParamItem left={'图案'} right={'水果'}/>
                            <ParamItem left={'风格'} right={'原创设计'}/>
                            <ParamItem left={'成色'} right={'全新'}/>
                            <ParamItem left={'价格区间'} right={'51-100元'}/>
                            <ParamItem left={'适用性别'} right={'男'}/>
                            <ParamItem left={'颜色分类'} right={'美码7号（内周长55mm）美码8号（内周长57mm）美码9号（内周长60mm）美码10号（内周长62.5mm）美码11号（内周长65mm）美码12号（内周长67mm）'}/>
                            <ParamItem left={'是否现货'} right={'现货'}/>
                            <ParamItem left={'货号'} right={'货号63700519461'}/>
                            <ParamItem left={'货号'} right={'货号63700519461'}/>
                        </ScrollView>
                        <TouchableOpacity style={[finishButtom]}
                            onPress={()=>{
                                this._setParameterVisible(false)
                            }}
                        >
                            <Text style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>完成</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    }

    renderInlike=(inLike)=>{
        if (inLike) {
            Toast.show('取消收藏')
        } else {
            Toast.show('已收藏')
        }
    }

    renderFooterComp(store_id,store_name){
        const {inLike} = this.state;
        return(
            <View style={{height:50,backgroundColor:'#fff',width:width,flexDirection:'row',alignItems:'center',padding:5}}>
                <View style={{width:buttonWidth,flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}>
                    <TouchableOpacity
                        style={{alignItems:'center'}}
                        onPress={() => {
                            NavigationUtil.goPage({
                                navigation: this.props.navigation,
                                store_id,store_name
                            },"ShopPage")
                        }}
                    >
                        <AntDesign
                            name={'isv'}
                            size={22}
                            style={{color: '#f40'}}
                        />
                        <Text style={{fontSize:13,color:'#666'}}>店铺</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{alignItems:'center'}}
                    >
                        <Image
                            source={require('../../assest/images/dian_kefu.png')}
                            style={{width:24,height:24}}
                        />
                        <Text style={{fontSize:13,color:'#666'}}>客服</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{alignItems:'center'}}
                        onPress={()=>{
                            this.setState({inLike:!inLike})
                            this.renderInlike(inLike)
                        }}
                    >
                        {inLike ?
                            <Image
                                source={require('../../assest/images/inlike.png')}
                                style={styles.likeImageStyle}
                            />
                            :
                            <Image
                                source={require('../../assest/images/outlike.png')}
                                style={styles.likeImageStyle}
                            />
                        }
                        <Text style={{fontSize:13,color:'#666'}}>收藏</Text>
                    </TouchableOpacity>
                </View>
                <View style={{width:buttonWidth,}}>
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginRight:5}}>
                        <TouchableOpacity 
                            style={{backgroundColor:'#FFA404',padding:12,borderTopLeftRadius:15,borderBottomLeftRadius:15}}
                            onPress={()=>{this._setModalVisible(true)}}
                        >
                            <Text style={{color:'#fff',fontWeight:'bold'}}>加入购物车</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={{backgroundColor:'#FF7100',padding:12,borderTopRightRadius:15,borderBottomRightRadius:15}}
                            onPress={()=>{this._setModalVisible(true)}}    
                        >
                            <Text style={{color:'#fff',fontWeight:'bold'}}>立即购买</Text>
                        </TouchableOpacity>
                    </View>
                    
                </View>
            </View>
        );
    }

    renderSwiper = () => {
        let swiperImg = this.state.swiperImg
        let banArr = swiperImg.split(",")
        // console.log(banArr.length)
        return (
            <ScrollView
                horizontal={true}
                pagingEnabled={true}
                style={{height:width}}
            >
                {
                    banArr.map((item, index) => {
                        return (
                            <View>
                                <Image source={{uri:item}} style={{height:width,width:width}} key={index}/>
                                <View
                                    style={{position:'absolute',backgroundColor:'#cdcdcd',
                                        right:20,top:10,padding:5,borderRadius:999,width:30,height:30,
                                        alignItems:'center'
                                    }}
                                >
                                    <Text style={{color:'#000'}}>{index + 1 + "/" + banArr.length}</Text>
                                </View>
                            </View>
                        );
                    })
                }
            </ScrollView>
        );
    }

    render() {
        const {goods_info, store_info,goods_evaluate_info,goods_eval_list,goods_commend_list} = this.state//获取商品信息
        const title = goods_info.goods_name;//商品名称
        const price = goods_info.goods_price;//商品价格
        const salenum = goods_info.goods_salenum//商品销量
        const freight = goods_info.goods_freight//商品运费
        const storage = goods_info.goods_storage//商品库存
        const evaluate = goods_evaluate_info//商品评价
        const spec_name = goods_info.spec_name//规格名称
        const spec_value = goods_info.spec_value//规格值
        const address = store_info.store_address//店铺地址
        const store_name = store_info.store_name//店铺名称
        const store_logo = store_info.store_logo//店铺Logo
        const store_id = store_info.store_id//店铺ID
        const store_credit = store_info.store_credit//店铺评分
        const promotion_type = goods_info.promotion_type//活动类型
        const promotion_price = goods_info.promotion_price//活动价格
        const typeTitle = goods_info.title//活动标签
        
        return(
            <View style={styles.container}>
                <ScrollView
                    ref={(view) => this.scrollview = view}
                    // onScroll={(e)=>this.contentOffset(e)}
                >

                    {this.renderSwiper()}
                    {this.renderTitle(title, price,salenum,freight,address,promotion_type,promotion_price,typeTitle)}
                    {this.renderCoupon()}
                    {this.renderSelect()}
                    {this.renderEvaluate(evaluate,goods_eval_list)}
                    {this.renderShopInfo(store_name, store_logo, store_credit,store_id,goods_commend_list,)}
                    {this.renderDisplay()}
                    {this.renderSelectModal(storage, price, spec_name, promotion_type,promotion_price)}
                    {this.renderParameter()}
                    <EmpityBox/>
                    
                </ScrollView>
                {/* {this.state.isToTop ?
                    <TouchableOpacity style={styles.toTopStyle}
                        onPress={() => this.scrollview.scrollTo({x: 0, y: 0, animated:true})}
                    >
                        <Image source={require('../../assest/to-top.png')} style={{width:25,height:25}}/>
                        <Text style={{color:'red'}}>TOP</Text>
                    </TouchableOpacity>
                    :
                    null
                }*/}
                {this.renderFooterComp(store_id,store_name)} 
            </View>
        );
    }
}

let leftWidth = width/4;
let rightWidth = width - leftWidth-30;

//产品参数单行封装
class ParamItem extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={{padding: 10, borderBottomWidth:1, borderBottomColor:'#eee'}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{margin: 5, width: leftWidth}}>
                        <Text style={{fontSize: 16}}>{this.props.left}</Text>
                    </View>
                    <View style={{margin: 5, width: rightWidth}}>
                        <Text style={{color: '#666', flexWrap: 'wrap'}}>{this.props.right}</Text>
                    </View>
                </View>
            </View>
        );
    }
}

class FlatListItem extends Component{
    constructor(props) {
        super(props);
        this.state = {
            info:{}
        }
    }

    setGoodsId = (in_id) => {
        // console.log(this.props.info.item.out_id)
        let out_id = this.props.info.item.out_id
        // console.log(in_id)
        let goods_spec = this.props.goods_spec
        let attrs = this.props.goods_info.spec_value[out_id]
        // console.log(spec_name)
        // console.log(goods_spec)
        let specIndex = []


        
        for(let k in attrs){
            // console.log(attrs[k])
            // console.log(goods_spec[k])
            if(typeof (goods_spec[k]) !== 'undefined'){
                // console.log(goods_spec[k])
                delete goods_spec[k]
                // console.log(goods_spec)
                goods_spec[in_id] = attrs[in_id]
                break
            }
        }
        // console.log(spec_value)
        
        // console.log(goods_spec)

        for(let k in goods_spec) {
            specIndex.push(k)
        }
        specIndex = specIndex.join('|')
        let c = new Array()
        c = specIndex.split("|")
        this.props._netFetchAgain(in_id,specIndex,c,goods_spec)
        
    }

    render(){
        let spec_value = this.props.spec_value;
        let out_id = this.props.out_id;
        let info = this.props.info
        let bim = this.props.bim
        let tempspecValue = new Array()
        for(let id in spec_value[out_id]){
            // console.log(id + '|' + out_id)
            let tempInObj = new Object()
            tempInObj.in_id = id
            tempInObj.in_value = spec_value[out_id][id]
            tempspecValue.push(tempInObj)
        }
        // console.log(info)
        this.setState=({info})
        return(
            <View key={info.item.out_id} style={{padding:8}}>
                <Text style={{color:'#333'}}>{info.item.out_value}:</Text>
                <FlatList
                    ref={(flist) => {this.flat = flist}}
                    data={tempspecValue}
                    renderItem={(child) => <ItemChild child={child} bim = {bim} setGoodsId={this.setGoodsId}/>}
                    ItemSeparatorComponent={()=><View/>}
                    ListHeaderComponent={()=><View/>}
                    ListFooterComponent={()=><View/>}
                    keyExtractor={(item, index) => 'key' + index + item}
                    horizontal={true}
                />
                
            </View>
        );
    }
}

class ItemChild extends Component{
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    renderMap = child => {
        let item = child.item
        let tempArr = new Array();
        for(let i in item){
            if (i == 'in_value')
            {
                console.log(item[i])
                tempArr.push(
                    <TouchableOpacity>

                    </TouchableOpacity>
                )
            }
            
        }
    }

    render(){
        let child = this.props.child
        let bim = this.props.bim
        let tintStyle = {padding:3,paddingLeft:5,paddingRight:5,borderRadius:3,borderColor:'#eee',borderWidth: 1}
        let activeStyle = {padding:3,paddingLeft:5,paddingRight:5,borderRadius:3,backgroundColor: 'red',color: '#fff'}
        let isActive = false
        for(let i in bim) {
            if(bim[i] == child.item.in_id){
                isActive = true
            }
        }
        return(
            <View
                ref={(v) => {this.view = v}}
                key={child.item.in_id}
                style={{marginTop:8,height:30}}
            >
                {/* {this.renderMap(child)} */}
                <TouchableOpacity
                     
                    style={{marginRight:8,marginBottom:5}}
                    onPress={() => {
                        this.props.setGoodsId(child.item.in_id)
                    }}
                >
                    <Text style={isActive ? activeStyle : tintStyle}>{child.item.in_value}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    couponPart1: {
        flexDirection: 'row',
        justifyContent:'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#cdcdcd',
        height: 70,
    },
    couponText: {
        color:'#333',
        borderColor: '#8a8a8a',
        borderRadius: 16,
        padding: 2,
        borderWidth: 1,
    },
    partOneItem: {
        justifyContent:'space-evenly',
        marginRight: 10
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    modalInnerContainer: {
        height: modalHeight,
        width: width,
        paddingTop:10
    },
    likeImageStyle:{
        width:26,
        height:26
    },
});