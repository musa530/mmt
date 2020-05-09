import React, {Component} from 'react';
import {Image, StyleSheet, Dimensions, View, TouchableOpacity} from 'react-native';
import NavigationUtil from '../../../AppNavigator/NavigationUtil';

const windowWidth = Dimensions.get('window').width;
const imageWidth = windowWidth/2;

export default class Add extends Component{
    constructor(props){
        super(props);
        this.state ={
            left: 'https://f10.baidu.com/it/u=3998801886,1996684736&fm=76',
            righttop:'https://f10.baidu.com/it/u=3998801886,1996684736&fm=76',
            rightbottm:'https://f10.baidu.com/it/u=3998801886,1996684736&fm=76'
        }
    }

    render() {
        console.log(`add_imageWidth:${imageWidth}`)
        let promotion_ads = this.props.promotion_ads
        // console.log(promotion_ads)
        let left = '';
        let righttop = '';
        let rightbottm = '';
        promotion_ads.map((item, index) => {
            // console.log(item.adv_id)
            
            if(item.adv_id == 6){
                rightbottm = item.adv_code
            }
            if(item.adv_id == 5){
                righttop = item.adv_code
            }
            if (item.adv_id == 4) {
                left = item.adv_code
            }
        })
        // console.log(left)
       
        return (
            <View style={styles.container}>
                    <TouchableOpacity
                        onPress={()=>{
                            NavigationUtil.goPage({
                                navigation: this.props.navigation,
                                goods_id:287981
                            }, "DetailPage")
                        }}
                    >
                        <Image style={styles.add_image} source={{uri: left}}/>
                    </TouchableOpacity>
                    <View>
                        <TouchableOpacity
                            onPress={()=>{
                                NavigationUtil.goPage({
                                    navigation: this.props.navigation,
                                    goods_id:132567
                                }, "DetailPage")
                            }}
                        >
                            <Image style={[styles.add_image, {height: 75}]} source={{uri: righttop}}/>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={()=>{
                                NavigationUtil.goPage({
                                    navigation: this.props.navigation,
                                    goods_id:266710
                                }, "DetailPage")
                            }}
                        >
                            <Image style={[styles.add_image, {height: 75}]} source={{uri: rightbottm}}/>
                        </TouchableOpacity>
                    </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        width: windowWidth,
        marginTop: 5
    },
    add_image: {
        resizeMode: "stretch",
        width: imageWidth,
        height: 150,
    }
});