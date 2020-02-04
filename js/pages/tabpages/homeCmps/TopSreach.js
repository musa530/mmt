import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NavigationUtil from '../../../AppNavigator/NavigationUtil';


export default class TopSreach extends Component{
    constructor(props){
        super(props);
        this.state={
            categonry_text: '分类',
            kefu: '客服'
        }
    }

    render() {
        return(
            <View style={styles.conatainer}>
                <TouchableOpacity
                    onPress={()=>{
                        NavigationUtil.goPage({
                            navigation: this.props.navigation,
                        }, "Category")
                    }}
                >
                    <View style={styles.category_item}>
                        <Ionicons
                            name={'ios-options'}
                            size={22}
                            style={{color: '#fff'}}
                        />
                        <Text 
                            style={{fontSize: 12, color: 'white'}}
                        >{this.state.categonry_text}</Text>
                    </View>
                </TouchableOpacity>
                <TextInput
                    placeholder={'请输入搜索店铺/商品名称'}
                    style={styles.input}
                    onFocus={()=>{
                        NavigationUtil.goPage({
                            navigation: this.props.navigation
                        }, "SearchPage")
                    }}
                />
                <TouchableOpacity>
                    <View style={styles.category_item}>
                        <Ionicons
                            name={'md-headset'}
                            size={22}
                            style={{color: '#fff'}}
                        />
                        <Text style={{fontSize: 12, color: 'white'}}>{this.state.kefu}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    conatainer: {
        flexDirection: 'row',
        position: "absolute",
        paddingTop: 5,
        paddingStart: 15,
        paddingEnd: 15,
    },
    input: {
        flex: 1,
        backgroundColor: '#fff',
        textAlign: 'center',
        height: 40,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#cdcdcd',
        marginLeft: 5,
        marginRight: 5,
    },
    category_item: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});