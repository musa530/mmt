import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions, ScrollView, Image,TouchableOpacity,SectionList,Alert,StatusBar} from 'react-native';
import CommodityDisplay from '../homeCmps/CommodityDisplay';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import CheckBox from 'react-native-check-box';
import NavigationUtil from '../../../AppNavigator/NavigationUtil';
import CartData from '../../../../CartData.json';

const {width, height} = Dimensions.get('window');
const imgWidth = width/2;
const allSelectWidth = width/3;
const titleWidth = width - 132;

export default class CartPageDemo extends Component {
    constructor(props) {
        super(props);
        console.disableYellowBox = true;
    }

    render() {
        return(
            <Empity/>
        );
    }
}

class Empity extends Component{
    constructor(props) {
        super(props);
        this.state = {
            empity_text: '购物车空空如也，快去逛逛吧~',
            isEmpty: false,//查看购物车数组是否为空
            totalPrice:0,//购买商品的总价格
            isManaged: true, //购物车右上角管理与完成之间的切换判断
            status: [],
            isSelectedAllItem:false,
            totalNum:0,
            totalArr: []
        }
    }

    UNSAFE_componentWillMount(){
        let dataArr = CartData.data
        let tempStatusArr = []
        for (let i = 0; i < dataArr.length; i++) {
            let items = dataArr[i].shopInfo
            let shopObj = {}
            shopObj.checked = false
            shopObj.shopName = dataArr[i].shopName
            let tempItems = []
            for (let j = 0; j < items.length; j++) {
                let item = items[j];
                item.checked = false
                item.quantity = item.minQuantity
                tempItems.push(item)
            }
            shopObj.items = tempItems
            tempStatusArr.push(shopObj)
        }
        this.state.status = tempStatusArr
        // console.log(this.state.status)
    }

    componentDidMount(){}

    componentWillUnmount(){
        
    }

    renderNavBar() {//页面头部
        const {isManaged} = this.state;
        let boxStyle = {
            height: 40,
            justifyContent:'space-between',
            alignItems: 'center',
            backgroundColor: 'red',
            flexDirection:'row',
            paddingLeft:15,
            paddingRight:15
        };
        return (
            <View style={boxStyle}>
                <View>
                    <Text style={{marginTop: 5, color: 'white', fontSize: 20}}>购物车</Text>
                </View>
                {isManaged ?
                    <TouchableOpacity
                        onPress={()=>{
                            this._setManaged(false)
                        }}
                    >
                        <Text style={{marginTop: 5, color: 'white', fontSize: 16}}>管理</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity
                        onPress={()=>{
                            this._setManaged(true)
                        }}
                    >
                        <Text style={{marginTop: 5, color: 'white', fontSize: 16}}>完成</Text>
                    </TouchableOpacity>
                }
            </View>
        )
    }

    _setManaged=(manage)=>{//管理与完成
        this.setState({
            isManaged: manage
        })
    }

    renderEmptyCart(){//购物车没有添加商品时
        return(
            <View style={styles.content}>
                <FontAwesome5
                    name={'inbox'}
                    size={60}
                    style={{color: '#F83150', marginBottom: 15}}
                />
                <Text style={{fontSize: 16, color:'#666'}}>{this.state.empity_text}</Text>
            </View>
        );
    }

    checkedItem=(sectionIndex, index)=>{//单个商品选择
        let tempStatus = this.state.status
        let tempShop = tempStatus[sectionIndex]
        let tempShopItems = tempStatus[sectionIndex].items
        let item = tempShopItems[index]
        item.checked = !item.checked

        let isSelectedAllShopItem = true
        for (let j = 0; j < tempShopItems.length; j++) {
            let item = tempShopItems[j];
            if (!item.checked) {
                isSelectedAllShopItem = false
                break
            }
        }

        tempShop.checked = isSelectedAllShopItem

        let isSelectedAllShop = true
        for (let k = 0; k < tempStatus.length; k++) {
            let shop = tempStatus[k];
            if (!shop.checked) {
                isSelectedAllShop = false
                break
            }
        }
        this.calculateCountAndPrice()
        this.setState({isSelectedAllItem: isSelectedAllShop, status: tempStatus})
    }

    checkedShop=(index)=>{//店铺选择
        let tempStatus = this.state.status
        let shop = tempStatus[index]
        shop.checked = !shop.checked
        let items = shop.items
        for (let j  = 0; j < items.length; j++) {
            let item = items[j];
            item.checked = shop.checked
        }

        let isSelectedAllShop = true
        for (let j = 0; j < tempStatus.length; j++) {
            let shop = tempStatus[j];
            if (!shop.checked){
                isSelectedAllShop = false
                break
            }
        }
        this.calculateCountAndPrice()
        this.setState({isSelectedAllItem: isSelectedAllShop, status: tempStatus})
    }

    checkAllShop=()=>{//全选
        let tempSelectedAllItem = !this.state.isSelectedAllItem
        let tempStatus = this.state.status
        for (let i = 0; i < tempStatus.length; i++) {
            let shop = tempStatus[i];
            shop.checked = tempSelectedAllItem
            let items = shop.items
            for (let j = 0; j < items.length; j++) {
                let item = items[j];
                item.checked = tempSelectedAllItem
            }
        }

        this.calculateCountAndPrice()
        this.setState({isSelectedAllItem: tempSelectedAllItem, status: tempStatus})
    }

    pressSub=(sectionIndex, index)=>{//数量减少
        let tempStatus = this.state.status
        let shop = tempStatus[sectionIndex]
        let items = shop.items
        let item = items[index]
        if (item.quantity <= item.minQuantity) {
            Alert.alert('我也是有底线的呦!')
        } else {
            item.quantity -=1
        }

        if (item.checked) {
            this.calculateCountAndPrice()
        }
        this.setState({status: tempStatus})
    }

    pressAdd=(sectionIndex, index)=>{//数量增加
        let tempStatus = this.state.status
        let shop = tempStatus[sectionIndex]
        let items = shop.items
        let item = items[index]
        if (item.quantity >= item.maxQuantity) {
            Alert.alert('商品数量不能大于' + item.maxQuantity)
        } else {
            item.quantity +=1
        }

        if (item.checked) {
            this.calculateCountAndPrice()
        }

        this.setState({status: tempStatus})
    }

    calculateCountAndPrice=()=>{//结算商品数量和总价格
        let tempTotalNum = 0
        let tempTotalPrice = 0
        let tempStatus = this.state.status
        for (let i = 0; i < tempStatus.length; i++) {
            let shop = tempStatus[i];
            let items = shop.items
            for (let j = 0; j < items.length; j++) {
                let item = items[j];
                if (item.checked) {
                    tempTotalNum += 1
                    tempTotalPrice += item.mallPrice * item.quantity
                }
            }
        }
        this.setState({totalNum: tempTotalNum, totalPrice: tempTotalPrice, status: tempStatus})
    }

    renderDelMallItem=()=>{//管理加入购物车的商品
        let tempStatus = this.state.status
        Alert.alert('','确定将所选的宝贝删除？',
            [
                {text: '我再想想',style:'cancel'},
                {text:'删除',onPress:()=>{
                    // for (let i = 0; i < tempStatus.length; i++) {
                    //     let shop = tempStatus[i];
                    //     if(shop.checked){
                    //         shop.pop()
                    //     }
                    //     let items = shop.items
                    //     for (let j = 0; j < items.length; j++) {
                    //         let item = items[j];
                    //         if (item.checked) {
                    //             item.pop()
                    //         }
                    //     }
                    // }
                    // this.setState({status: tempStatus})
                    Alert.alert('','删除成功')
                }}
            ]
        )
    }

    sectionComp=(item)=>{//sectionList店铺名称（section头部）
        let section = item.section.key//店铺名称
        let index = item.section.index
        let shop = this.state.status[index]//获取每一个shopItem
        return(
            <View style={styles.sectionCompBoxStyle}>
                <TouchableOpacity onPress={()=>{this.checkedShop(index)}}>
                    <Image
                        style={{width:30,height:30}}
                        source={shop.checked ? require('../../../../assest/ic_selected.png') : require('../../../../assest/ic_defult.png')} resizeMode={'center'}
                    />
                </TouchableOpacity>
                <View style={{marginLeft:5}}>
                    <Text style={{color:'#f00',fontSize:16,fontWeight:'bold'}}>{section}</Text>
                </View>
            </View>
        );
    }

    renderItem=(info)=>{
        let index = info.index
        let item = info.item
        let sectionIndex = info.section.index
        let shop = this.state.status[sectionIndex]
        let statusItem = shop.items[index]
        return (
            <View style={{flexDirection:'row',marginTop:10}}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <TouchableOpacity onPress={()=>{this.checkedItem(sectionIndex, index)}}>
                        <Image
                            style={{width:30,height:30}}
                            source={statusItem.checked ? require('../../../../assest/ic_selected.png') : require('../../../../assest/ic_defult.png')} resizeMode={'center'}
                        />
                    </TouchableOpacity>
                    <View style={{width:100,alignItems:'center',justifyContent:'center'}}>
                        <Image
                            source={{uri:item.url}}
                            style={{width:90,height:90}}
                        />
                    </View>
                </View>
                <View style={{marginTop:2,width:titleWidth}}>
                    <View>
                        <Text style={{fontSize:13,color:'#666'}}
                            numberOfLines={2}
                        >{item.mallName}</Text>
                    </View>

                    <View style={{margin:3,flexDirection:'row',justifyContent:'space-between',marginTop:8}}>
                        <View>
                            <Text>库存{item.kuCun}件</Text>
                        </View>
                        <TouchableOpacity style={{marginRight:38}}>
                            <Text>点击移除</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{margin:3,flexDirection:'row',justifyContent:'space-between',marginTop:8}}>
                        <View>
                            <Text style={{color:'#f00',fontSize:16,fontWeight:'bold'}}>￥{item.mallPrice}</Text>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center',marginRight:30}}>
                            <TouchableOpacity
                                style={styles.sellNumStyle}
                                onPress={()=>{
                                    this.pressSub(sectionIndex, index)
                                }}
                            >
                                <Text>-</Text>
                            </TouchableOpacity>
                            <View
                                style={[styles.sellNumStyle,{paddingRight:12,paddingLeft:12}]}
                            >
                                <Text style={{fontWeight:'bold'}}>{statusItem.quantity}</Text>
                            </View>
                            <TouchableOpacity style={styles.sellNumStyle}
                                onPress={()=>{
                                    this.pressAdd(sectionIndex, index)
                                }}
                            >
                                <Text>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    }

    renderCartItem(){//购物车商品浏览
        let tempArr = CartData.data.map((item, index) => {
            let tempObj = {}
            tempObj.key = item.shopName//店铺名称
            tempObj.data = item.shopInfo///详细数据
            tempObj.index = index//索引(下标)
            return tempObj
        })
        return(
            <View>
                <View style={{padding:5}}>
                    {/* 利用SectionList展示购物车商品 */} 
                    <SectionList
                        renderSectionHeader={this.sectionComp}
                        renderItem={(data) => this.renderItem(data)}
                        sections={tempArr}
                        ItemSeparatorComponent={() => <View/>}
                        ListHeaderComponent={() => <View/>}
                        ListFooterComponent={() => <View/>}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => 'key' + index + item}
                    />
                </View>
            </View>
        );
    }
    
    renderAllSelect=() => {//全选选择框
        const {totalNum} = this.state
        return(
            <View style={{height:45,backgroundColor:'#fff',width:width,flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingRight:5,paddingLeft:5}}>
                <View style={{width:allSelectWidth}}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <TouchableOpacity onPress={() => this.checkAllShop()}>
                            <Image style={{width:30,height:30}} source={this.state.isSelectedAllItem ? require('../../../../assest/ic_selected.png') : require('../../../../assest/ic_defult.png')} resizeMode={'center'}/>
                        </TouchableOpacity>
                        <Text style={{color:'#f00',fontSize:16,fontWeight:'bold'}}>全选</Text>
                    </View>
                </View>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text style={{fontSize:16,fontWeight:'bold',marginRight:5}}>
                        <Text>总计：</Text>
                        <Text style={{color:'#f00'}}>￥{parseFloat(this.state.totalPrice).toFixed(2)}</Text>
                    </Text>
                    <TouchableOpacity
                        style={{backgroundColor:'#f00',height:45,justifyContent:'center',paddingRight:10,paddingLeft:10}}
                        onPress={()=>{
                            if (totalNum >= 1) {
                                NavigationUtil.goPage({
                                    navigation: this.props.navigation,
                                    data: {...this.state.status}
                                }, "SubOrder")
                            }
                        }}
                    >
                        <Text style={{color:'#fff',fontWeight:'bold',fontSize:16}}>去结算({this.state.totalNum})</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    renderDelete=() => {//管理删除加入购物车的商品
        return(
            <View style={{height:45,backgroundColor:'#fff',width:width,flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingRight:5,paddingLeft:5}}>
                <View style={{width:allSelectWidth}}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <TouchableOpacity onPress={() => this.checkAllShop()}>
                            <Image style={{width:30,height:30}} source={this.state.isSelectedAllItem ? require('../../../../assest/ic_selected.png') : require('../../../../assest/ic_defult.png')} resizeMode={'center'}/>
                        </TouchableOpacity>
                        <Text style={{color:'#f00',fontSize:16,fontWeight:'bold'}}>全选</Text>
                    </View>
                </View>
                <View>
                    <TouchableOpacity
                        style={{backgroundColor:'#f00',height:45,justifyContent:'center',paddingRight:10,paddingLeft:10}}
                        onPress={()=>{
                            this.renderDelMallItem()
                        }}
                    >
                        <Text style={{color:'#fff',fontWeight:'bold',fontSize:16}}>删除({this.state.totalNum})</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    render() {
        const {isManaged} = this.state;
        return (
            <View style={styles.container}>
                {this.renderNavBar()}
                <ScrollView>
                    {this.state.isEmpty?
                        // 购物车没有数据传入时
                        this.renderEmptyCart()
                        :
                        // 购物车有数据时
                        this.renderCartItem()
                    }
                    <View style={{borderBottomColor:'#cdcdcd',borderBottomWidth:1,margin:30}}></View>
                    {/* <CommodityDisplay title={'可能您想要'}/> */}
                </ScrollView>
                {isManaged? this.renderAllSelect() : this.renderDelete()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7'
    },
    content: {
        alignItems: 'center',
        padding: 40,
        marginTop: 100,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 20
    },
    img: {
        width: imgWidth,
        height: 150,
        marginBottom: 20,
        resizeMode: "stretch"
    },
    sellNumStyle:{
        padding:5,
        borderWidth:1,
        borderColor:'#cdcdcd',
        paddingRight:13,
        paddingLeft:13
    },
    sectionCompBoxStyle: {
        flexDirection:'row',
        alignItems:'center',
        borderBottomWidth:1,
        borderBottomColor:'#eee',
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:'#fff',
        marginTop:15,
        height: 44
    }
});