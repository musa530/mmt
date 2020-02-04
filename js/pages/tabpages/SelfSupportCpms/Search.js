import React, { Component } from "react";
import {Text, Image, View, TextInput} from 'react-native';
import Swiper from '../homeCmps/Swiper';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class Search extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <Input/>
        );
    }
}

class Input extends Component{
    constructor(props){
        super(props);
        this.state={
            placeholder: '逛自营超市 满99包邮哦',
            value: '',
        }
    }

    render(){
        return(
            <View style={{flex: 1, backgroundColor: '#f40'}}>
                <View style={{flexDirection: 'row', alignItems: 'center',backgroundColor: 'white', marginRight:5, marginLeft:5, borderRadius: 8,bottom: 3}}>
                    <Ionicons
                        name={'ios-search'}
                        size={22}
                        style={{color: '#999',paddingLeft: 8}}
                    />
                    <TextInput
                        style={{height: 40, borderRadius: 16, borderColor: 'black', flex: 1}}
                        placeholder={this.state.placeholder}
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
                </View>
                
                <View style={{height: 200,}}>
                    <Swiper/>
                </View>
            </View>
        );
    }
}