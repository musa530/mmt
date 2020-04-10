import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions, ScrollView, Image,TouchableOpacity,SectionList,Alert,TextInput,ImageBackground} from 'react-native';
import CommodityDisplay from '../tabpages/homeCmps/CommodityDisplay';

const {width, height} = Dimensions.get('window');

export default class ShopHomePage extends Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render(){
        return(
            <View>
                <CommodityDisplay title={'热门推荐'}/>
                <View style={{width: width,height:50}}></View>
            </View>
        )
    }
}