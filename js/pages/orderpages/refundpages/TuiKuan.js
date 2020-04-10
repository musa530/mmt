import React , {Component} from 'react';
import {Text, View, Image, StyleSheet, Dimensions,TouchableOpacity,ScrollView} from 'react-native';
import data from './DetailData';

const {width, height} = Dimensions.get('window');
const helfWidth = width / 2;
const mallNameWidth = width - 100


export default class TuiKuan extends Component{
    constructor(props){
        super(props);
        this.state = {
            bianHao: 14587414551215487,
            orderStatus: '已完成',
            mallName: '【测试】羽绒棉服女中长款过膝大毛领棉衣韩版面包服学生加厚外套宽松棉袄 红色 M 短板',
            tuiKuanPrice: 0.01,
            url:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2709372839,1855512064&fm=26&gp=0.jpg',
            showDetail: false
        }
    }

    UNSAFE_componentWillMount(){
        // console.log(data.data)
    }

    renderItemDetail = () => {
        return(
            <View style={{backgroundColor:'#fff'}}>
                <View style={{marginTop:15,paddingLeft:3}}>
                    
                        {
                            data.data.map((item, index) => {
                                // infoArr.map((cell, id) => {
                                   return(
                                        <View style={{flexDirection:'row',alignItems:'center',paddingBottom:10}} key={index}>
                                            <Text>{item.name}：</Text>
                                            <Text>{item.info}</Text>
                                        </View>
                                    ); 
                                // })
                                
                            })
                        }
                        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:15}}>
                            <Text>退款凭证：</Text>
                            <View style={{marginRight:15}}>
                                <Image
                                    source={{uri:this.state.url}}
                                    style={{width:70,height:70}}
                                />
                            </View>
                        </View>
                        <View style={styles.call}>
                            <TouchableOpacity>
                                <Text style={{color:'#fff',fontWeight:'bold'}}>商家客服</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={{color:'#fff',fontWeight:'bold'}}>拨打电话</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={{color:'#fff',fontWeight:'bold'}}>商城客服</Text>
                            </TouchableOpacity>
                        </View>
                </View>
            </View>
        );
    }

    renderItem(){
        let showDetail = this.state.showDetail
        return(
            <View style={{margin:10,backgroundColor:'#fff',borderRadius:5}}>
                <View>
                    <View style={{}}>
                        <View style={styles.itemStyle}>
                            <View style={{flexDirection:'row'}}>
                                <Text style={styles.itemTextStyle}>退款编号：</Text>
                                <Text style={styles.itemTextStyle}>{this.state.bianHao}</Text>
                            </View>
                            <View>
                                <Text style={{color:'#666'}}>{this.state.orderStatus}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.mallInfoStyle}>
                    <View style={{padding:10}}>
                        <Image
                            source={{uri:this.state.url}}
                            style={{width:60,height:60}}
                        />
                    </View>
                    <View style={{paddingLeft:5,paddingTop:10,width:mallNameWidth}}>
                        <Text numberOfLines={3} style={{color:'#333'}}>{this.state.mallName}</Text>
                    </View>
                </View>

                <View style={styles.footerStyle}>
                    <View>
                        <Text style={{color:'#333'}}>退款金额：{this.state.tuiKuanPrice}</Text>
                    </View>
                    <TouchableOpacity
                            onPress={()=>this.setState({showDetail: !showDetail})}
                            style={{flexDirection:'row',alignItems:'flex-end'}}
                    >
                        <Text style={{color:'#666'}}>{showDetail ? '收起详细' : '查看详细'}</Text>
                        <Text style={{color:'#666',fontSize:10}}>{showDetail ? '∧' : '∨'}</Text>
                    </TouchableOpacity>
                </View>
                {this.state.showDetail ?
                    this.renderItemDetail()
                    :
                    null
                }
            </View>
        );
    }

    render(){
        return(
            <View style={{flex:1,backgroundColor:'#f7f7f7'}}>
                <ScrollView>
                    {this.renderItem()}
                    <View style={{height:50}}></View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    itemStyle: {
        borderBottomColor:'#eee',
        borderBottomWidth:1,
        padding:3,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingTop: 12,
        marginBottom:5,
        paddingBottom:12
    },
    itemTextStyle:{
        color:'#333'
    },
    mallInfoStyle:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:12,
        borderBottomColor:'#eee',
        borderBottomWidth:1,
        paddingBottom:5
    },
    footerStyle:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:12,
        paddingRight:5,
        paddingLeft:3
    },
    call:{
        backgroundColor:'#E31E3D',
        height:40,
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center'
    }
});