import React, {Component} from 'react';
import {View, StyleSheet, Dimensions, Image} from 'react-native';

export default class DynamicPic extends Component{

    render() {
        let floor_ads = this.props.floor_ads
        // console.log(floor_ads)
        return (
            <View style={styles.circle}>
                {
                    floor_ads.map((item, index) => {
                        // console.log(item.adv_code)
                        return <Image
                            source={{uri:item.adv_code}}
                            style={styles.imageStyle}
                            key={index}
                        />
                    })
                }
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