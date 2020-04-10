import React, {Component} from 'react';
import {View, StyleSheet, Dimensions, Image} from 'react-native';

export default class DynamicPic extends Component{

    render() {
        return (
            <View style={styles.circle}>
                <Image
                    source={require('../../../../assest/images/Dynamic.png')}
                    style={styles.imageStyle}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    circle: {
        marginRight: 10,
        marginLeft: 10
    },
    imageStyle: {
        width: Dimensions.width,
        resizeMode: 'stretch'
    }
});