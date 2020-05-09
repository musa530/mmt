import React , {Component} from 'react';
import {View, Text, Dimensions, ScrollView} from 'react-native';
import CommodityDisplay from '../pages/tabpages/homeCmps/CommodityDisplay';
import EmpityBox from '../pages/EmpityBox';

const {width, height} = Dimensions.get('window');

export default class AllEvaluate extends Component{
    constructor(props){
        super(props);
        this.state={
            userName: 'r***2',
            evaluateText: '宝贝收到了，很喜欢，物流快，包装很严谨，没有破损摔坏情况，很满意！卖家服务到位，服务态度好，很热情！良心商家，推荐推荐推荐！',
            selected: '高 梦幻蓝咖啡杯碟'
        }
    }

    static navigationOptions=()=>({
        title: '全部评价'
    });

    renderEvaluateItem(){//品论单个封装
        return(
            <View style={{borderColor: '#eee', borderBottomWidth: 1, paddingBottom: 8}}>
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
            </View>
        );
    }

    renderEvaluate(){//评论部分渲染
        return(
            <View>
                {this.renderEvaluateItem()}
                {this.renderEvaluateItem()}
                {this.renderEvaluateItem()}
                {this.renderEvaluateItem()}
                {this.renderEvaluateItem()}
                {this.renderEvaluateItem()}
                {this.renderEvaluateItem()}
                {this.renderEvaluateItem()}
            </View>
        );
    }

    render(){
        console.log(this.props.navigation.state.params.evaluate_list)
        let evaluate_list = this.props.navigation.state.params.evaluate_list
        return(
            <View style={{flex: 1, backgroundColor: '#fff', padding: 5}}>
                <ScrollView>
                    {
                        evaluate_list.map((item, index) => {
                            return(
                                <View style={{borderColor: '#eee', borderBottomWidth: 1, paddingBottom: 8}}>
                                    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
                                        <View style={{backgroundColor: '#ccc', width: 40, height: 40, borderRadius: 999}}></View>
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
                            );
                        })
                    }
                    <CommodityDisplay title={'您可能想要'}/>
                    <EmpityBox/>
                </ScrollView>
            </View>
        );
    }
}