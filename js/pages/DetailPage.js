import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, ScrollView, SectionList} from 'react-native';
import Modal from 'react-native-modal';
import Toast from '../AppNavigator/ToastDemo';
import NavigationUtil from '../AppNavigator/NavigationUtil';
import EmpityBox from './EmpityBox';
import { log } from 'react-native-reanimated';
import AntDesign from 'react-native-vector-icons/AntDesign';

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
            expressFee: '0.00',
            address: '新疆乌鲁木齐',
            evaluateNum: '7894',
            userName: 'r***2',
            shopName: '雪山果园旗舰店',
            evaluateText:'宝贝收到了，很喜欢，物流快，包装很严谨，没有破损摔坏情况，很满意！卖家服务到位，服务态度好，很热情！良心商家，推荐推荐推荐！',
            selected: '高 梦幻蓝咖啡杯碟',
            kucun: 9, //库存
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
            swiperImg:'',
            goods_info:[],//商品信息
            store_info:[],//店铺信息
            goods_evaluate_info:[],//商品评价
            index: 0,
        }
    }

    //设置页眉
    static navigationOptions = () => ({
        title: '详情页'
    });
    componentDidMount() {
        // const {navigation} = this.props;
        // const {state, setParams} = navigation;
        // const {params} = state;
        // this.setState({index:0})
        let id = this.props.navigation.state.params.goods_id
        console.log('goods_id: ' + id)
        this._netFetch(id)
        Toast.show('数据读取中...')
    }

    _netFetch = (id) => {
        fetch(`https://satarmen.com/api/goods/goods_detail?goods_id=${id}&key=null`)
        .then(response => response.json())
        .then((res) => {
            console.log('res.result')
            let goods_evaluate_info = res.result.goods_evaluate_info
            let goods_info = res.result.goods_info
            let goods_image = res.result.goods_image
            let store_info = res.result.store_info
            console.log(typeof goods_image)
            this.setState({
                swiperImg:goods_image, goods_info, store_info,goods_evaluate_info
            })
        })
        .catch(error => console.log(error))
    }

    renderTitle=(title, price, salenum, freight, address) => {//商品标题价格快递月销地址
        return (
            <View style={{paddingRight: 5, paddingLeft: 5, backgroundColor: 'white', top: -13, paddingTop: 5}}>
                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
                    <Text numberOfLines={2}
                        style={{width: titleWidth, flex: 1, color: '#333', fontSize: 15}}
                    >{title}</Text>
                    <TouchableOpacity style={{alignItems: 'center',marginLeft: 5, marginRight: 3}}>
                        <Image style={{width: 25, height: 25}} source={require('../../assest/images/fenxiang.png')}/>
                        <Text style={{color: '#999', fontSize: 12}}>{this.state.share}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{marginBottom: 10}}>
                    <Text style={{fontSize: 22,color:'red'}}>￥{price}</Text>
                </View>
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

    renderEvaluate(evaluate) {//商品评价部分
        return(
            <View style={{backgroundColor: 'white',padding: 5, marginTop: 10}}>
                <View style={{marginTop: 5, marginBottom: 5}}>
                    <Text style={{fontSize: 18}}>商品评价  ({evaluate.all})</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
                    <View style={{backgroundColor: '#ccc', width: 40, height: 40, borderRadius: 999}}></View>
                    <Text style={{color: '#666', marginLeft: 8}}>{this.state.userName}</Text>
                </View>
                <View style={{marginTop: 5, marginBottom: 5}}>
                    <Text style={{color: '#333'}} numberOfLines={2}>{this.state.evaluateText}</Text>
                </View>
                <View style={{arginBottom: 5}}>
                    <Text style={{color: '#cdcdcd', fontSize: 13}} numberOfLines={1}>颜色分类: {this.state.selected}</Text>
                </View>
                <TouchableOpacity style={{alignItems: 'center', margin: 8}}
                    onPress={()=>{
                        NavigationUtil.goPage({
                            navigation: this.props.navigation
                        }, "AllEvaluate")
                    }}
                >
                    <Text style={{padding: 5, backgroundColor:'#8a8a8a', color: 'white'}}>查看全部评价</Text>
                </TouchableOpacity>
            </View>
        );
    }

    renderShopInfo = (name,logo, store_credit) => {//店铺信息
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
            <View style={{backgroundColor: '#fff', marginTop: 10, padding: 5}}>
                <View style={{flexDirection: 'row'}}>
                    <View style={{width: 60, height: 60}}>
                        <Image source={{uri:logo}} style={{width:60,height:60}}/>
                    </View>
                    <Text style={{color: '#f00', marginLeft: 10, marginTop: 8, fontSize: 15}}>{name}</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10}}>
                    {
                        tempArr.map((item, index) => {
                            return (
                                <View style={itemStyle} key={index}>
                                    <Text style={{color: '#666', fontSize: 15}}>{item.text} </Text>
                                    <Text style={{color: '#666', fontSize: 15}}>{item.credit}</Text>
                                    <Text style={{color: '#f00', fontSize: 15}}>{item.percent_text}</Text>
                                </View>
                            )
                            
                        })
                    }
                    
                </View>
                <View style={{width: width, height: 20}}></View>
                <View style={{flexDirection: 'row', justifyContent: 'center', marginBottom: 10}}>
                    <TouchableOpacity style={{backgroundColor: '#8a8a8a', padding: 5}}>
                        <Text style={{color: '#fff', fontSize: 15}}>查看分类</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{backgroundColor: '#8a8a8a', padding: 5, marginLeft: 20}}>
                        <Text style={{color: '#fff', fontSize: 15}}>进店逛逛</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    renderDisplay() {//商品详细图展示
        return(
            <View>
                <View style={{height: 60, backgroundColor: '#333', alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontSize: 18, color: '#fff'}}>商品详细</Text>
                </View>
                {/* 添加网图（长图） */}
                {/* <Image source={{uri: 'https://satarmen.com/uploads/home/store/goods/554/554_2019122712562410694.png'}}
                    style={{width: width, height: 1600, resizeMode: 'stretch'}}
                /> */}
                <Image source={{uri: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=186611946,905648253&fm=26&gp=0.jpg'}}
                    style={{width: width, height: width, resizeMode: 'stretch'}}
                />
                <Image source={{uri: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=129639009,1876542785&fm=26&gp=0.jpg'}}
                    style={{width: width, height: width, resizeMode: 'stretch'}}
                />
                <Image source={{uri: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1017050554,3701300423&fm=26&gp=0.jpg'}}
                    style={{width: width, height: width, resizeMode: 'stretch'}} 
                />
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

    sectionCmpn = (item) => {
        console.log(item)
        return(
            <View>
                <Text>1</Text>
            </View>
        );
    }

    renderItem = (cell) =>{
        return(
            <View>
                <Text>1</Text>
            </View>
        );
    }

    renderSelectModal = (storage, price, url, spec_name, spec_value) => {//选择颜色和分类模板
        let innerContainerTransparentStyle = { backgroundColor: '#fff', padding: 5 }

        let paddingLR = { paddingLeft: 12, paddingRight: 12 }

        let specArr = []
        for (let i in spec_name) {
            let tempObj = {}
            tempObj.name = spec_name[i]
            let innerArr = []
            for (let j in spec_value) {
                console.log(spec_value[j])
                if (j == i) {
                    let innerObj = spec_value[j]
                    innerArr.push(innerObj)
                }
            }
            if(innerArr != ''){
                tempObj.item = innerArr
            }
            
            specArr.push(tempObj)
        }
        console.log(specArr)
        return(
            <Modal
                animationIn={this.state.animationIn}
                animationOut={this.state.animationOut}
                backdropOpacity={this.state.backdropOpacity}
                backdropColor={this.state.backdropColor}
                onSwipeComplete={() => this._setModalVisible(false)}
                swipeDirection={this.state.swipeDirection}
                isVisible={this.state.modalVisible}
                onBackButtonPress={() => this._setModalVisible(false)}
                onBackdropPress={()=> this._setModalVisible(false)}
                backdropTransitionOutTiming={this.state.backdropTransitionOutTiming}
                style={{margin:0}}
            >
                <View style={{flex:1, justifyContent:'flex-end'}}>
                    <View style={[innerContainerTransparentStyle,styles.modalInnerContainer]}>
                        <ScrollView>
                        <View style={{flexDirection: 'row',justifyContent:'space-between'}}>
                            <View style={{flexDirection: 'row',}}>
                                <Image
                                    style={{width: 100, height: 100, resizeMode: 'stretch', borderWidth: 1, borderColor: '#eee'}}
                                    source={{uri: url}}
                                />
                                <View style={{justifyContent: 'center', marginLeft: 15}}>
                                    <View style={{marginBottom: 30, flexDirection: 'row'}}>
                                        <Text style={{fontSize: 18}}>价格: ￥</Text>
                                        <Text style={{fontSize: 18, color: '#f00'}}>{price}</Text>
                                    </View>
                                    <Text style={{color: '#666'}}>库存：{storage}件</Text>
                                </View>
                            </View>
                            <TouchableOpacity
                                onPress={()=>{
                                    this._setModalVisible(false)
                                }}
                                style={{borderRadius: 999,width: 20, height: 20,
                                    justifyContent: 'center', alignItems: 'center',marginRight:10,
                                    borderWidth: 1, borderColor: '#f03'
                                }}
                            >
                                <Text style={{fontSize:13, color: '#f03', fontWeight: 'bold'}}>×</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <SectionList
                                renderSectionHeader={this.sectionCpm}
                                renderItem={(data) => this.renderItem(data)}
                                sections={specArr}
                                ItemSeparatorComponent={()=><View/>}
                                ListHeaderComponent={() => <View/>}
                                ListFooterComponent={()=><View/>}
                                showsVerticalScrollIndicator={false}
                                keyExtractor={(item, index) => 'key' + index + item}
                            />
                            
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
                        </View>
                        </ScrollView>

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
        const {goods_info, store_info,goods_evaluate_info} = this.state//获取商品信息
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
        console.log(evaluate)
        return(
            <View style={styles.container}>
                <ScrollView>
                    {this.renderSwiper()}
                    {this.renderTitle(title, price,salenum,freight,address)}
                    {this.renderCoupon()}
                    {this.renderSelect()}
                    {this.renderEvaluate(evaluate,store_id)}
                    {this.renderShopInfo(store_name, store_logo, store_credit)}
                    {this.renderDisplay()}
                    {this.renderSelectModal(storage, price,'https://satarmen.com/uploads/home/store/goods/544/544_2019122413355384699_240.jpg', spec_name, spec_value)}
                    {this.renderParameter()}
                    <EmpityBox/>
                </ScrollView>
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
    }
});