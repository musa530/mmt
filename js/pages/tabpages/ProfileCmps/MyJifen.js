import React , {Component} from 'react';
import {View, Text, StyleSheet, ScrollView, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export default class MyJifen extends Component{
    constructor(props){
        super(props);
        this.state={
            jifen: 1120,
            yucunkuan: '10.00',
            memberLevel: '普通会员',
            addReson: '会员登录',
            addDate: '2020-03-03 11:21:26',
            JifenNum: 1
        }
    }

    static navigationOptions =() => ({
        title: '我的积分'
    });

    renderTop(){//会员积分和预存款显示
        let textColor = {
            color:'#fff'
        }
        return(
            <View style={{backgroundColor: '#E31E3D', padding: 5}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 15}}>
                    <View>
                        <Text style={[textColor, {fontSize: 16}]}>会员积分</Text>
                        <View style={styles.numStyle}>
                            <Text style={[textColor, {fontSize: 22}]}>{this.state.jifen}</Text>
                            <Text style={[textColor]}>分</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={{color: 'white', fontSize: 16}}>预存款</Text>
                        <View style={styles.numStyle}>
                            <Text style={[textColor, {fontSize: 22}]}>{this.state.yucunkuan}</Text>
                            <Text style={[textColor]}>元</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.memberLevel}>
                    <View style={{margin: 20}}>
                        <Text style={[textColor, {fontSize: 20}]}>{this.state.memberLevel}</Text>
                    </View>
                </View>
            </View>
        );
    }

    renderJifen(){//积分明细显示
        return(
            <View style={{backgroundColor: '#fff'}}>
                {this.renderJifenItem()}
                {this.renderJifenItem()}
                {this.renderJifenItem()}
                {this.renderJifenItem()}
                {this.renderJifenItem()}
                {this.renderJifenItem()}
                {this.renderJifenItem()}
                {this.renderJifenItem()}
                {this.renderJifenItem()}
                {this.renderJifenItem()}
                {this.renderJifenItem()}
                {this.renderJifenItem()}
            </View>
        );
    }

    renderJifenItem(){//单个积分明细封装
        return(
            <View style={{borderBottomColor: '#eee', borderBottomWidth: 1}}>
                <View style={{flexDirection: 'row', alignItems: 'center', padding: 15, justifyContent: 'space-between'}}>
                    <View style={{alignItems: 'center', flexDirection:'row'}}>
                        <Text style={{fontSize: 16}}>{this.state.addReson}</Text>
                        <Text style={{color: '#666', marginLeft: 10}}>({this.state.addDate})</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems:'baseline'}}>
                        <Text style={{fontSize: 18}}>{this.state.JifenNum}</Text>
                        <Text style={{color: '#666', fontSize: 13}}>分</Text>
                    </View>
                </View>
            </View>
        );
    }

    render(){
        return(
            <View style={{flex: 1, backgroundColor: '#f7f7f7'}}>
                <ScrollView style={{flex: 1}}>
                    {this.renderTop()}
                    {this.renderJifen()}
                </ScrollView>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    numStyle: {
        flexDirection: 'row',
        justifyContent:'center',
        alignItems: 'baseline',
        marginTop: 30
    },
    memberLevel: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#FF667E',
        margin: 20,
        justifyContent: 'center', 
        borderRadius: 16
    },
});