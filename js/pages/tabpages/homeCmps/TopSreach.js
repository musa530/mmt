import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NavigationUtil from '../../../AppNavigator/NavigationUtil';
import Toast from '../../../AppNavigator/ToastDemo';


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
                {/* <TouchableOpacity
                    onPress={()=>{
                        NavigationUtil.goPage({
                            navigation: this.props.navigation,
                            id:1,
                            navigate:"Category"
                        }, "HomePage")
                    }}
                >
                    <View style={styles.category_item}>
                        <Ionicons
                            name={'ios-options'}
                            size={20}
                            style={{color: '#fff'}}
                        />
                        <Text 
                            style={{fontSize: 12, color: 'white'}}
                        >{this.state.categonry_text}</Text>
                    </View>
                </TouchableOpacity> */}
                <TextInput
                    placeholder={'请输入搜索店铺/商品名称'}
                    style={styles.input}
                    onFocus={()=>{
                        NavigationUtil.goPage({
                            navigation: this.props.navigation
                        }, "SearchPage")
                    }}
                />
                {/* <TouchableOpacity
                    onPress={()=>{
                        Toast.show('正在开发中...');
                    }}
                >
                    <View style={styles.category_item}>
                        <Ionicons
                            name={'md-headset'}
                            size={20}
                            style={{color: '#fff'}}
                        />
                        <Text style={{fontSize: 12, color: 'white'}}>{this.state.kefu}</Text>
                    </View>
                </TouchableOpacity> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    conatainer: {
        flexDirection: 'row',
        position: "absolute",
        paddingTop: 10,
        alignItems:'center'
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