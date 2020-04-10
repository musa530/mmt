import React , {Component} from 'react';
import {View, Text, Dimensions, StyleSheet, ScrollView, TouchableOpacity, Image, SectionList,Switch} from 'react-native';
import NavigationUtil from '../../AppNavigator/NavigationUtil'

const {width, height} = Dimensions.get('window');

const itemWidth = width -10
const mallNameWidth = itemWidth - 70

export default class SubOrder extends Component {
    constructor(props){
        super(props)
        this.state = {
            data: [],
            telNumber:17320097737,
            address:'乌市天山区新华南路379号键龙金融中心第一期15楼新疆恒安泰宇集团',
            totalPrice: 0,
            switchValue: false,
            shopOneAmount:0,
            shopTwoAmount:0
        }
    }

    static navigationOptions = () => ({
        title: '确认订单'
    });

    UNSAFE_componentWillMount(){
        let data = this.props.navigation.state.params.data
        let tempArr = []
        let tempTotalPrice = 0
        for(let i in data) {
            let shopObj = {}
            let items = data[i].items
            let tempItems = []
            let shopAmount = 0
            for (let j = 0; j < items.length; j++) {
                let item = items[j];
                if (item.checked == true) {
                    tempTotalPrice += item.mallPrice * item.quantity
                    shopAmount += item.mallPrice * item.quantity
                    let yunFei = 0
                    shopObj.shopAmount = shopAmount
                    shopObj.shopTotalAmount = shopAmount + yunFei
                    let tempItem = item
                    tempItem.yunFei = yunFei
                    shopObj.shopName = data[i].shopName
                    tempItems.push(tempItem)
                }
            }
            shopObj.items = tempItems
            tempArr.push(shopObj)
        }
        // console.log(tempArr[0].items)
        // console.log(tempArr[1])
        this.setState({data: tempArr, totalPrice: tempTotalPrice})

    }

    componentDidMount() {}

    renderAddress = () => {
        return(
            <View style={{backgroundColor:'#fff',borderRadius:8}}>
                <TouchableOpacity style={{padding:10,flexDirection:'row',alignItems:'center',width:itemWidth,justifyContent:'space-between'}}>
                    <View>
                        <Image
                            style={{width:30,height:30}}
                            source={require('../../../assest/images/dizhi1.png')}
                        />
                    </View>
                    <View style={{marginLeft:5}}>
                        <View style={{paddingLeft:5,paddingBottom:5}}>
                            <Text style={{color:'#333'}}>{this.state.telNumber}</Text>
                        </View>
                        <View style={{width:mallNameWidth}}>
                            <Text style={{color:'#333'}}
                                numberOfLines={2}
                            >{this.state.address}</Text>
                        </View>
                    </View>
                    <View style={{}}>
                        <Text style={{color:'#cdcdcd',fontSize:16,fontWeight:'bold'}}>＞</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    sectionComp(info){
        if (info.section.key) {
            return (
                <View style={{backgroundColor:'#fff',padding:5,borderTopRightRadius:8,borderTopLeftRadius:8, marginTop:15,paddingLeft:15,paddingTop:10}}>
                    <Text style={{fontSize:15,fontWeight:'bold', color:'red'}}>{info.section.key}</Text>
                </View>
            );
        }
        
    }

    renderItem = (info) => {
        let index = info.index
        let item = info.item
        let sectionIndex = info.section.index
        let shop = this.state.data[sectionIndex]
        let statusItem = shop.items[index]
        let tempIndex = index + 1;
        let length = Object.keys(shop.items).length;
        return(
            <View style={{backgroundColor:'#fff',padding:5,borderBottomLeftRadius:8,borderBottomRightRadius:8,width:itemWidth}}>
                <View>
                    <View style={{flexDirection:'row'}}>
                        <View>
                            <Image
                                source={{uri: item.url}}
                                style={{width:60, height:75}}
                            />
                        </View>
                        <View>
                            <View style={{paddingLeft:5,width: mallNameWidth,marginBottom:5}}>
                                <Text numberOfLines={2} style={styles.textStyle}>{item.mallName}</Text>
                            </View>
                            <View style={{marginLeft:5,marginRight:8,flexDirection:'row',justifyContent:'space-between',marginBottom:5}}>
                                <Text style={{color:'#f40'}}>￥{item.mallPrice}</Text>
                                <Text style={{color:'#666'}}>×{item.quantity}</Text>
                            </View>
                            <View style={{marginLeft:5,borderRadius:6,width:95,backgroundColor:'#FFF3EE'}}>
                                <Text style={{color:'#f40',fontSize:13}}>七天无理由退换</Text>
                            </View>
                        </View>
                    </View>
                    {tempIndex == length ?
                        <View style={{marginTop:10}}>
                            <View style={styles.shopAmount}>
                                <Text>商品金额:</Text>
                                <Text>￥{parseFloat(shop.shopAmount).toFixed(2)}</Text>
                            </View>
                            <View style={styles.shopAmount}>
                                <Text>运费:</Text>
                                <Text>￥{parseFloat(item.yunFei).toFixed(2)}</Text>
                            </View>
                            <View style={styles.shopAmount}>
                                <Text>店铺合计:</Text>
                                <Text>￥{parseFloat(shop.shopTotalAmount).toFixed(2)}</Text>
                            </View>
                        </View> : null
                    }
                    
                </View>
                
                
                
                
            </View>
        );
    }

    renderMain = () => {
        return(
            <View style={{margin:8,marginBottom:0}}>
                {this.renderAddress()}
            </View>
        );
    }

    render() {
        let data = this.state.data;
        let tempArr = data.map((item, index) => {
            let tempObj = {}
            tempObj.key = item.shopName//店铺名称
            tempObj.data = item.items///详细数据
            tempObj.index = index//索引(下标)
            return tempObj
        })
        return (
            <View style={{flex:1,backgroundColor:'#f7f7f7'}}>
                <ScrollView>
                    {this.renderMain()}
                    <View style={{margin:8,marginTop:0}}>
                        <SectionList
                            renderSectionHeader={this.sectionComp}
                            renderItem={(item) => this.renderItem(item)}
                            sections={tempArr}
                            ItemSeparatorComponent={() => <View style={{height:1,backgroundColor:'#cdcdcd'}}/>}
                            ListHeaderComponent={() => <View/>}
                            ListFooterComponent={() => <View/>}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item, index) => 'key' + index + item}
                        />
                    </View>
                    <View style={{height: 40, width:width}}/>
                </ScrollView>
                <View style={{flexDirection:'row',width:width, height:44,backgroundColor:'#fff',justifyContent:'space-between',alignItems:'center',paddingLeft:5}}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Text style={{fontWeight:'bold'}}>预存款</Text>
                        <Switch
                            value={this.state.switchValue}
                            trackColor='#5BFcdd'
                            onValueChange={(value)=>this.setState({
                                switchValue: value
                            })}
                        />
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{fontWeight:'bold'}}>总计:</Text>
                        <Text style={{color:'red',fontWeight:'bold'}}>￥{parseFloat(this.state.totalPrice).toFixed(2)}</Text>
                    </View>
                    <TouchableOpacity style={{backgroundColor:'#f00',height:44,justifyContent:'center',paddingLeft:15,paddingRight:15}}
                        onPress={()=>{
                            NavigationUtil.goPage({
                                navigation: this.props.navigation,
                                amount: this.state.totalPrice
                            },"GoPay")
                        }}
                    >
                        <Text style={{color:'#fff',fontWeight:'bold'}}>提交订单</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    textStyle:{
        color:'#333',
        fontSize:13
    },
    shopAmount:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginRight:10,
        marginBottom:10
    }
});