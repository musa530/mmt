import React , {Component} from 'react';
import {Text, View, Image, StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
const helfWidth = width / 2;

export default class TuiHuo extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={{flex:1,alignItems:'center',marginTop:100}}>
                <Text style={{color:'#cdcdcd'}}>没有找到任何信息~</Text>
            </View>
        );
    }
}