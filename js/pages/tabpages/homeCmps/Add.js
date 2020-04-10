import React, {Component} from 'react';
import {Image, StyleSheet, Dimensions, View, TouchableOpacity} from 'react-native';
import NavigationUtil from '../../../AppNavigator/NavigationUtil';

const windowWidth = Dimensions.get('window').width;
const imageWidth = windowWidth/2;

export default class Add extends Component{
    render() {
        console.log(`add_imageWidth:${imageWidth}`)
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={()=>{
                        NavigationUtil.goPage({
                            navigation: this.props.navigation,
                            topTitle: '商品',
                            data: {
                                title: '华为Nova3系列 6千4百万像素照亮你的美!',
                                price: "2300.00"
                            }
                        }, "DetailPage")
                    }}
                >
                    <Image style={styles.add_image} source={{uri:'https://satarmen.com/uploads/home/adv/5d283e86baa9a.jpg'}}/>
                </TouchableOpacity>
                <View>
                    <TouchableOpacity
                        onPress={()=>{
                            NavigationUtil.goPage({
                                navigation: this.props.navigation,
                                topTitle: '商品',
                                data: {
                                    title: '华为Nova3系列 6千4百万像素照亮你的美!',
                                    price: "2300.00"
                                }
                            }, "DetailPage")
                        }}
                    >
                        <Image style={[styles.add_image, {height: 75}]} source={{uri:'https://satarmen.com/uploads/home/adv/5d283f476b13f.jpg'}}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={()=>{
                            NavigationUtil.goPage({
                                navigation: this.props.navigation,
                                topTitle: '商品',
                                data: {
                                    title: 'this is default mall name',
                                    price: "2300.00"
                                }
                            }, "DetailPage")
                        }}
                    >
                        <Image style={[styles.add_image, {height: 75}]} source={{uri:'https://satarmen.com/uploads/home/adv/5d283e80c7dd7.jpg'}}/>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: windowWidth,
        marginTop: 5
    },
    add_image: {
        resizeMode: "stretch",
        width: imageWidth,
        height: 150,
    }
});