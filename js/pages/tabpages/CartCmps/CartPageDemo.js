import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions, ScrollView, Image} from 'react-native';
import CommodityDisplay from '../homeCmps/CommodityDisplay';

const {width, height} = Dimensions.get('window');
const imgWidth = width/2;

export default class CartPageDemo extends Component {
    constructor(props) {
        super(props);
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
        }
    }

    renderNavBar() {//页面头部
        return (
            <View style={{height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red'}}>
                <Text style={{marginTop: 5, color: 'white', fontSize: 16}}>购物车</Text>
            </View>
        )
    }

    render() {
        console.log(imgWidth);
        return (
            <View style={styles.container}>
                 {this.renderNavBar()}
                <ScrollView style={styles.scroll}>
                    <View style={styles.content}>
                        <Image source={require('../../../../assest/images/empity.png')} style={styles.img} />
                        <Text style={{fontSize: 16, color:'#666'}}>{this.state.empity_text}</Text>
                    </View>
                    <CommodityDisplay title={'可能您想要'}/>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7'
    },
    scroll: {
        flex: 1,
    },
    content: {
        alignItems: 'center',
        padding: 40,
        borderBottomColor: '#cdcdcd',
        borderBottomWidth: 1,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 20
    },
    img: {
        width: imgWidth,
        height: 150,
        marginBottom: 20,
        resizeMode: "stretch"
    }
});