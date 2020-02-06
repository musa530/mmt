import React, {Component} from 'react';
import {View, ScrollView, StyleSheet, TextInput, Text, Modal, TouchableOpacity, Alert} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from '../AppNavigator/ToastDemo';

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
        if (!rootArr) {
            Toast.show('历史记录已为空');
        }
        for (let i = rootArr.length; i >= 0; i--) {
            rootArr.pop();
        }
        this.setState({
            rootArr
        })
        Toast.show('删除成功');
        
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

    //删除历史搜索数据
    _deleteHistory() {
        // 判断是否有本地搜索历史
        if (this.state.searchHistory.length > 0) {
            Alert.alert(
                '提示',
                '确定清除所有历史搜索记录吗？',
                [
                    {text: '取消', onPress: () => console.log('取消'), style: 'cancel'},
                    {
                        text: '确定', onPress: () => {
                            Toast.message('清除历史搜索记录成功')
                            removeItem("searchHistory");
                            this.setState({
                                value: '',
                                searchHistory: [],
                            })
                        }
                    },
                ]
            )
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
    _insertSearch(newText) {
        let text = newText.replace(/(^\s*)|(\s*$)/g, "")
        if (!_.isEmpty(text)) {
            if (this.state.searchHistory.indexOf(text) != -1) {
                // 本地历史 已有 搜索内容
                let index = this.state.searchHistory.indexOf(text);
                let tempArr = arrDelete(this.state.searchHistory, index)
                tempArr.unshift(text);
                setItem("searchHistory", tempArr);
            } else {
                // 本地历史 无 搜索内容
                let tempArr = this.state.searchHistory;
                tempArr.unshift(text);
                setItem("searchHistory", tempArr);
            }
        }
    }

    onChangeTextKeyword(Val) {   
        let keys = {};
        //输入的关键字去空格空字符
        let newVal = Val.replace(/(^\s*)|(\s*$)/g, "")
        if (!_.isEmpty(newVal)) {
            keys = {
                keyword: newVal
            };
            this.setState({isPostList: true})
        } else {
            Toast.show('请输入搜索关键字')
        }
        this.setState({keyword: keys});

        // rootArr.unshift(Val.toString());
        // this.setState({
        //     rootArr,
        //     value: ''
        // })
    }

    _setValues(item){
        this.setState({value: item})
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
                            this._inserSearch(this.state.value);
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