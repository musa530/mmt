import React, {Component} from 'react';
import {View, ScrollView, StyleSheet, TextInput, Text, Modal, TouchableOpacity, Alert} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from '../AppNavigator/ToastDemo';
import AsyncStorage from '../AppNavigator/AsyncStorage'

var rootArr = ['火锅调料', 'VIVO', '华为', '好礼多', 'VIVO', '华为', 'VIVO', '华为', 'VIVO', '华为'];

export default class SearchPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            value: '',
            placeholder: '请输入搜索店铺/商品名称',
            isPostList: false, //是否搜索
            keyword: '',//搜索关键字
            searchHistory: [],// 搜索历史数组
            newArr: rootArr
        };
    }

    componentDidMount() {}

    componentWillMount() {}

    //删除历史搜索记录
    _delArrItem() {
        Alert.alert('删除搜索记录', '确定要删除搜索记录吗？',
            [
                {text: '确定', onPress: ()=>{
                    for (let i = rootArr.length; i >= 0; i--) {
                        rootArr.pop();
                    }
                    this.setState({
                        rootArr
                    })
                }},
                {text: '取消'}
            ]
        )
    }

    //历史和热门标签值赋值输入框
    _setValues(item) {
        this.setState({value: item})
    }

    //聚焦
    _onFous(v) {
        if (v.nativeEvent.target) {
            this.setState({isPostList: false})
        }
    }

    //获取历史记录
    _getHistory() {
        // 查询本地历史
        getItems("searchHistory").then(data => {
            if (data == null) {
                this.setState({
                    searchHistory: [],
                })
            } else {
                this.setState({
                    searchHistory: data,
                })
            }
        })
    }

    //保存搜索标签
    insertSearch(newText) {
    }
    //关键字变化
    onChangeTextKeyword(Val) {
        if(!Val){
            Toast.show('请输入关键字')
        } else{
            rootArr.unshift(Val.toString());
        }
        this.setState({
            rootArr,
            value: ''
        })
    }

    render() {
        const {newArr} = this.state;
        return(
            <View style={styles.container}>
                <View style={styles.top_search}>
                    <TextInput
                        placeholder={this.state.placeholder}
                        style={styles.input}
                        onChangeText={text=>this.setState({
                            value: text
                        })}
                        onSubmitEditing={()=>{
                            //开始搜索
                            this.onChangeTextKeyword(this.state.value);
                            //保存搜索内容
                            this.insertSearch(this.state.value);
                        }} 
                        onFocus={()=>{}}
                        returnKeyType={"search"}
                        autoCapitalize={"none"}
                        autoFocus={'true'}
                        defaultValue={this.state.value}
                        keyboardType={'default'}
                        value={this.state.value}
                    />
                    <Ionicons
                        name={'ios-search'}
                        size={28}
                        style={styles.icon}
                    />
                </View>
                <View style={styles.record_del}>
                    <Text style={styles.record_text}>最近搜索</Text>
                    <TouchableOpacity
                        onPress={()=>{
                            this._delArrItem()
                        }}
                    >
                    <Text style={styles.delete}>清理</Text></TouchableOpacity>
                </View>
                <View style={styles.record_arrary}>
                    {
                        newArr.map((item, index)=> {
                            return(
                                <TouchableOpacity>
                                <Text
                                    style={styles.arr_item}
                                    key={index}
                                >{item}</Text></TouchableOpacity>
                            )
                        })
                    }
                </View>
                <View style={{height: 500, backgroundColor: 'white'}}></View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#f7f7f7',
      padding: 10,
    },
    top_search: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        flex: 1,
        height: 40,
        backgroundColor: 'white',
        borderRadius: 12,
        paddingLeft: 15,
    },
    icon: {
        color: '#cdcdcd',
        marginLeft: -40,
        marginRight: 15
    },
    record_del: {
        marginTop: 10,
        flexDirection: 'row',
        backgroundColor: 'white',
        justifyContent: 'space-between',
        height: 40,
        padding: 5
    },
    record_text: {
        fontSize: 16
    },
    delete: {
        color: 'red'
    },
    record_arrary: {
        backgroundColor: 'white',
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingLeft: 10,
    },
    arr_txt: {
        backgroundColor: '#333',
        color: '#eee',
        marginRight: 10,
        padding: 2,
        borderRadius: 2
    },
    arr_item: {
        marginRight: 10,
        backgroundColor: '#666',
        fontSize: 12,
        color: 'white',
        padding: 2,
        borderRadius: 3,
        marginBottom: 5
    }
});