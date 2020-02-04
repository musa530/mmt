import React, {Component} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';

export default class Circle extends Component{
    render() {
        return <View style={styles.circle}></View>;
    }
}

const styles = StyleSheet.create({
    circle: {
        width: Dimensions.width,
        height: 450,
        backgroundColor:'#d81c06',
        borderRadius:810,
        marginTop: -260,
        marginRight: -80,
        marginLeft: -80
    },
});