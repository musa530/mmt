import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, ScrollView} from 'react-native';
import Modal from 'react-native-modal';
import Swiper from './tabpages/homeCmps/Swiper';
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
            monthSeles: '8980',
            address: '新疆乌鲁木齐',
            evaluateNum: '7894',
            userName: 'r***2',
            shopName: '雪山果园旗舰店',
            evaluateText:'宝贝收到了，很喜欢，物流快，包装很严谨，没有破损摔坏情况，很满意！卖家服务到位，服务态度好，很热情！良心商家，推荐推荐推荐！',
            selected: '高 梦幻蓝咖啡杯碟',
            price: 19.80, //商品价格
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
        }
    }

    //设置页眉
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.topTitle}`
    });
    componentDidMount() {
        let topTitle = this.props.navigation.state.params.topTitle;
    }

    renderTitle=(title, price) => {//商品标题价格快递月销地址
        return (
            <View style={{paddingRight: 5, paddingLeft: 5, backgroundColor: 'white', top: -13, paddingTop: 5}}>
                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
                    <Text numberOfLines={2}
                        style={{width: titleWidth, flex: 1, color: '#333', fontSize: 15}}
                    >默认标题前缀添加部分为了增加标题字数{title}</Text>
                    <TouchableOpacity style={{alignItems: 'center',marginLeft: 5, marginRight: 3}}>
                        <Image style={{width: 25, height: 25}} source={require('../../assest/images/fenxiang.png')}/>
                        <Text style={{color: '#999', fontSize: 12}}>{this.state.share}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{marginBottom: 10}}>
                    <Text style={{fontSize: 22}}>￥{price}</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3}}>
                    <Text style={{color: '#666', fontSize: 13}}>快递：{this.state.expressFee}</Text>
                    <Text style={{color: '#666', fontSize: 13}}>月销{this.state.monthSeles}</Text>
                    <Text style={{color: '#666', fontSize: 13}}>{this.state.address}</Text>
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

    renderEvaluate() {//商品评价部分
        return(
            <View style={{backgroundColor: 'white',padding: 5, marginTop: 10}}>
                <View style={{marginTop: 5, marginBottom: 5}}>
                    <Text style={{fontSize: 18}}>商品评价  ({this.state.evaluateNum})</Text>
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

    renderShopInfo() {//店铺信息
        return(
            <View style={{backgroundColor: '#fff', marginTop: 10, padding: 5}}>
                <View style={{flexDirection: 'row'}}>
                    <View style={{width: 60, height: 60, backgroundColor: '#ccc'}}></View>
                    <Text style={{color: '#666', marginLeft: 10, marginTop: 8, fontSize: 15}}>{this.state.shopName}</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingTop: 5}}>
                    <Text style={{color: '#666', fontSize: 15}}>宝贝描述 5.0</Text>
                    <Text style={{color: '#666', fontSize: 15}}>卖家服务 5.0</Text>
                    <Text style={{color: '#666', fontSize: 15}}>物流服务 5.0</Text>
                </View>
                <View style={{width: width, height: 40}}></View>
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
                <Image source={{uri: 'https://satarmen.com/uploads/home/store/goods/554/554_2019122712562410694.png'}}
                    style={{width: width, height: 1600, resizeMode: 'stretch'}}
                />
                {/* <Image source={{uri: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=186611946,905648253&fm=26&gp=0.jpg'}}
                    style={{width: width, height: width, resizeMode: 'stretch'}}
                />
                <Image source={{uri: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=129639009,1876542785&fm=26&gp=0.jpg'}}
                    style={{width: width, height: width, resizeMode: 'stretch'}}
                />
                <Image source={{uri: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1017050554,3701300423&fm=26&gp=0.jpg'}}
                    style={{width: width, height: width, resizeMode: 'stretch'}} 
                />*/}
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
        count++;

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

    renderSelectModal(){//选择颜色和分类模板
        let innerContainerTransparentStyle = { backgroundColor: '#fff', padding: 5 }

        let paddingLR = {
            paddingLeft: 12, paddingRight: 12
        }
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
                                    source={{uri: 'https://satarmen.com/uploads/home/store/goods/1/1_2019081619260225812.jpg'}}
                                />
                                <View style={{justifyContent: 'center', marginLeft: 15}}>
                                    <View style={{marginBottom: 30, flexDirection: 'row'}}>
                                        <Text style={{fontSize: 18}}>价格: ￥</Text>
                                        <Text style={{fontSize: 18, color: '#f00'}}>{this.state.price}</Text>
                                    </View>
                                    <Text style={{color: '#666'}}>库存：{this.state.kucun}件</Text>
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
                            <View>
                                <Text style={{color:'#666',margin: 8, fontSize: 16,marginRight:0}}>图片联动：</Text>
                            </View>
                            <View style={{flexDirection:'row', alignItems:'center',paddingLeft:8}}>
                                <View style={{backgroundColor:'#eee',padding: 5}}>
                                    <Text style={{color:'#666', fontSize: 14}}>图片联动</Text>
                                </View>
                                <View style={{backgroundColor:'#eee',padding: 5}}>
                                    <Text style={{color:'#666', fontSize: 14}}>图片联动</Text>
                                </View>
                            </View>
                            <View>
                                <Text style={{color:'#666',margin: 8, fontSize: 16}}>层数/卷数：</Text>
                            </View>
                            
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
                            <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center',width: buttonWidth, backgroundColor: '#3CB371'}}>
                                <Text style={{color: '#fff', fontSize: 18, padding: 10}}>加入购物车</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center', width: buttonWidth, backgroundColor: '#E31E3D'}}>
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

    renderFooterComp(){
        const {inLike} = this.state;
        return(
            <View style={{height:50,backgroundColor:'#fff',width:width,flexDirection:'row',alignItems:'center',padding:5}}>
                <View style={{width:buttonWidth,flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}>
                    <TouchableOpacity
                        style={{alignItems:'center'}}
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

    render() {
        const {navigation} = this.props;
        const {state, setParams} = navigation;
        const {params} = state;
        const title = params.data.title;
        const price = params.data.price;
        // console.log(params.data);
        
        

        return(
            <View style={styles.container}>
                <ScrollView>
                    <View style={{width: width, height: width}}>
                        <Swiper height={width}/>
                    </View>
                    {this.renderTitle(title, price)}
                    {this.renderCoupon()}
                    {this.renderSelect()}
                    {this.renderEvaluate()}
                    {this.renderShopInfo()}
                    {this.renderDisplay()}
                    {this.renderSelectModal()}
                    {this.renderParameter()}
                    <EmpityBox/>
                </ScrollView>
                {this.renderFooterComp()}
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