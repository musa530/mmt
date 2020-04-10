import React , {Component} from 'react';
import {Text, View, Image, StyleSheet, Dimensions} from 'react-native';
import TopTabs from './refundpages/RefundCmpn';

const {width, height} = Dimensions.get('window');
const helfWidth = width / 2;

export default class RefundPage extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <View style={{flex:1}}>
                <TopTabs/>
            </View>
        );
    }
}