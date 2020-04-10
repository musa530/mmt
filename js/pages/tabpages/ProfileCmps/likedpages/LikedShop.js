import React , {Component} from 'react';
import {Text, View, Image, StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
const helfWidth = width / 2;

export default class LikedShop extends Component{
    constructor(props){
        super(props);
    }

    UNSAFE_componentWillMount(){
        // console.log(data.data)
    }

    _renderData(){
        return data.data.map((item, index) => {
            return(
                <View style={{padding:8,flexDirection:'row',alignItems:'center',borderBottomWidth:1,borderBottomColor:'#eee'}} key={index}>
                    <View style={{padding:5}}>
                        <Image
                            source={{uri: item.shopLogo}}
                            style={{width:60,height:60,borderRadius:999}}
                        />
                    </View>
                    <View style={{marginLeft:15}}>
                        <Text style={{color:'#666'}}>{item.shopName}</Text>
                    </View>
                </View>
            );
        })
        
    }

    render(){
        return(
            <View style={{flex:1,}}>
                <View style={{backgroundColor:'#fff'}}>
                    {this._renderData()}
                    
                </View>
                
            </View>
        );
    }
}


const data = {
    "data":[
        {
            "shopLogo": "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2709372839,1855512064&fm=26&gp=0.jpg",
            "shopName": "新疆商城自营超市"
        },
        {
            "shopLogo": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586434063074&di=dade5a6138d933b28e5aa2b3eb5d71c1&imgtype=0&src=http%3A%2F%2Fa.vpimg3.com%2Fupload%2Fmerchandise%2F128732%2FHUNHE-6931697790018-1.jpg",
            "shopName": "ceshi"
        }
    ]
}