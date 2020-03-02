import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, ScrollView, Modal} from 'react-native';
import Swiper from './tabpages/homeCmps/Swiper';
import Toast from '../AppNavigator/ToastDemo';
import NavigationUtil from '../AppNavigator/NavigationUtil';
import EmpityBox from './EmpityBox';

const {width, height} = Dimensions.get('window');
const titleWidth = width/5 * 4.5;
const modalHeight = height/3 * 1.5;
const cencle = modalHeight - 55;
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
            animationType: 'slide',//none slide fade
            modalVisible: false,//模态场景是否可见
            transparent: true,//是否透明显示
            price: 19.80, //商品价格
            kucun: 9, //库存
            mallCouont: 1, //商品数量
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
                        style={{width: titleWidth, flex: 1, color: '#666', fontSize: 15}}
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
                    <TouchableOpacity style={{left: 135,justifyContent: 'center'}}>
                        <Text
                            style={{backgroundColor: '#666', padding: 5, fontSize: 16,
                                color: '#fff'}}
                        >领取</Text>
                    </TouchableOpacity>
                </View>
                
                <View style={[styles.couponPart1, {justifyContent: 'space-between'}]}>
                    <View style={styles.partOneItem}>
                        <Text style={{color: '#666'}}>每人限购10件</Text>
                        <Text style={{color: '#666'}}>满78元，享包邮；新疆享满39元包邮</Text>
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
                        <Text style={{color: '#666'}}>正品保证·破损暴涨·极速退款·七天退换</Text>
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
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
                    borderBottomColor: '#cdcdcd', borderBottomWidth: 1}}
                >
                    <Text style={{fontSize: 16}}>产品参数</Text>
                    <TouchableOpacity style={{justifyContent: 'center'}}>
                        <Image source={require('../../assest/images/more.png')}
                            style={{
                                width: 30,height: 30, marginRight: 6
                            }}
                        />
                    </TouchableOpacity>
                </View>

                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5}}>
                    <Text style={{fontSize: 16}}>选择 颜色分类</Text>
                    <TouchableOpacity style={{justifyContent: 'center'}}
                        onPress={()=>{
                            this._setModalVisible(true)
                        }}
                    >
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

    //判断modal是否显示
    _setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
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

    render() {
        const {navigation} = this.props;
        const {state, setParams} = navigation;
        const {params} = state;
        const title = params.data.title;
        const price = params.data.price;

        let modalBackgroundStyle = {
            backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.5)' : 'red',
          };
        let innerContainerTransparentStyle = this.state.transparent
        ? { backgroundColor: '#fff', padding: 5 }
        : null;

        let paddingLR = {
            paddingLeft: 12, paddingRight: 12
        }

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
                    <Modal
                        animationType={this.state.animationType}
                        transparent={this.state.transparent}
                        visible={this.state.modalVisible}
                        onRequestClose={() => { this._setModalVisible(false) } }
                    >
                        <View style={[styles.modalContainer, modalBackgroundStyle]}>
                            <View style={[styles.modalInnerContainer, innerContainerTransparentStyle]}>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end'}}>
                                    <TouchableOpacity
                                        onPress={()=>{
                                            this._setModalVisible(false)
                                        }}
                                        style={{backgroundColor: '#eee', padding: 3,borderRadius: 999, top: -25, width: 40, height: 40,
                                            justifyContent: 'center', alignItems: 'center'
                                        }}
                                    >
                                        <Text style={{fontSize:20, color: '#f03', fontWeight: 'bold'}}>
                                            X
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{flexDirection: 'row'}}>
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
                                <View>
                                    <Text style={{color:'#666',margin: 8, fontSize: 16}}>图片联动：</Text>
                                    <Text style={{color:'#666',margin: 8, fontSize: 16}}>层数/卷数：</Text>
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
                                

                                <View style={{flexDirection: 'row', marginTop: 20}}>
                                    <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center', width: buttonWidth, backgroundColor: '#3CB371'}}>
                                        <Text style={{color: '#fff', fontSize: 18, padding: 10}}>加入购物车</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center', width: buttonWidth, backgroundColor: '#E31E3D'}}>
                                        <Text style={{color: '#fff', fontSize: 18, padding: 10}}>立即购买</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                    <EmpityBox/>
                </ScrollView>
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
        borderBottomWidth: 1,
        borderBottomColor: '#cdcdcd',
        height: 70,
    },
    couponText: {
        color:'#666',
        borderColor: '#666',
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
        justifyContent: 'flex-end'
    },
    modalInnerContainer: {
        height: modalHeight,
        width: width
    }
});