import React, {Component} from 'react';
import {View, ScrollView, StyleSheet, TextInput, Text, Modal, FlatList, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

var rootArr = ['火锅调料', 'VIVO', '华为', '好礼多', 'VIVO', '华为', 'VIVO', '华为', 'VIVO', '华为'];

export default class SearchPage extends Component{
    constructor(props){
        super(props);
        this._flatList = null;
        this.state = {
            value: '',
            placeholder: '请输入搜索店铺/商品名称',
            isPostList: false, //是否搜索
            keyword: '',//搜索关键字
            searchHistory: [],// 搜索历史数组
            hotTagsArr: [],// 热门搜索标签数组
            newArr: rootArr
        };
    }

    _delArrItem() {
        for (let i = rootArr.length; i >= 0; i--) {
            rootArr.pop();
        }
        this.setState({
            rootArr
        })
        console.log(rootArr)
    }

    _inserSearch(v) {

    }
    

    onChangeTextKeyword(Val) {
        // let keys = {};
        //输入关键字去空格空字符
        // let newVal = Val.replace(/(^\s*)|(\s*$)/g, "");
        // if(!_.isEmpty(newVal)) {
        //     keys = {
        //         keyword: newVal
        //     };
        //     this.setState({
        //         isPostList: true,
        //     })
        // } else {
        //     return <Modal/>;
        // }
        // this.setState({keyword: keys});
        rootArr.unshift(Val.toString());
        this.setState({
            rootArr,
            value: ''
        })
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
                        onFocus={()=>{
                        }}
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