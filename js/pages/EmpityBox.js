import React, {Component} from 'react';
import {View, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

export default class EmpityBox extends Component{
    render() {
        return <View style={{width: width, height: 60}}></View>
    }
}