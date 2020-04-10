import React, {Component} from 'react';
import {View, Text, ScrollView, Image, Dimensions, StyleSheet,TouchableOpacity} from 'react-native';

const {width, height} = Dimensions.get('window');
const topHeight = height/3;

export default class GoPay extends Component{
    constructor(props){
        super(props)
        this.state={
            totalPrice: 0.01
        }
    }

    UNSAFE_componentWillMount() {
        let amount = this.props.navigation.state.params.amount
        console.log(amount)
        this.setState({
            totalPrice: amount
        })
    }

    componentDidMount(){

    }

    static navigationOptions=()=>({
        title: '订单结算'
    });

    renderTop(){
        return(
            <View>
                <View style={styles.topStyle}>
                    <View>
                        <Text style={{color:'#fff'}}>提交订单成功</Text>
                    </View>
                    <View style={{marginTop: 15}}>
                        <Text style={{fontSize: 16,color:'#fff'}}>
                            合计：￥{parseFloat(this.state.totalPrice).toFixed(2)}
                        </Text>
                    </View>
                </View>
            </View>
        );
    }

    renderFooter(){
        return(
            <View>
                <TouchableOpacity style={styles.footerStyle}>
                    <Text style={{color:'#fff',fontSize:16}}>
                        微信付款
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    render(){
        return(
            <View style={styles.container}>
                {this.renderTop()}
                {this.renderFooter()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#f7f7f7'
    },
    topStyle: {
        backgroundColor: '#E31E3D',
        width: width,
        height: topHeight,
        justifyContent:'center',
        alignItems:'center'
    },
    footerStyle:{
        backgroundColor: '#E31E3D',
        marginTop:60,
        marginLeft:60,
        marginRight:60,
        alignItems:'center',
        padding:10,
        borderRadius:8
    }
});