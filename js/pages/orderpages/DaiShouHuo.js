import React, {Component} from 'react';
import {View, Text, ScrollView, Image, Dimensions, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('window');

export default class DaiShouHuo extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }

    render(){
        
        return(
            <View style={styles.container}>
                <Text>DaiShouHuo Page</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#f7f7f7'
    }
});