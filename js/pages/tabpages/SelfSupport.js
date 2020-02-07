import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, TouchableHighlight} from 'react-native';
import Search from './SelfSupportCpms/Search';
import Swiper from '../tabpages/homeCmps/Swiper';


export default class SelfSupport extends Component{
    constructor(props){
        super(props);
        this.state={
            isFlow: false,
        }
    }

    flowing=()=>{
        const {isFlow} = this.state;
        this.setState({
            isFlow: !isFlow,
        });
    }

    renderNavBar() {//页面头部
        const {isFlow} = this.state;
        return (
            <View style={{height: 40, justifyContent: 'space-between',alignItems: 'center', backgroundColor: 'red', padding: 5, flexDirection: 'row'}}>
                <Text style={{marginTop: 5, color: 'white', fontSize: 16}}>新疆商城自营超市</Text>
                <TouchableOpacity style={{flexDirection: 'row', backgroundColor: '#f60', padding: 3, borderRadius: 8}}
                    onPress={()=>this.flowing()}
                >
                    {isFlow?
                        <Image source={require('../../../assest/images/flowing.png')}
                            style={{
                                width: 17, height: 17
                            }}
                        />
                        :
                        <Image source={require('../../../assest/images/flow.png')}
                            style={{
                                width: 17, height: 17
                            }}
                        />
                    }
                    <Text style={{marginLeft: 3,fontSize: 14, color: 'white', width: 48}}>{this.state.isFlow? "已关注": "关注"}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        return(
            <View style={styles.container}>
                {this.renderNavBar()}
                <Search/>
                <View style={{height: 200}}>
                    <Swiper height={200}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f40'
    },
    welcome: {
      color: '#333',
      fontSize: 18
    }
});