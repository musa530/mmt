import React , {Component} from 'react';
import {Text, View, Image, StyleSheet, Dimensions,FlatList} from 'react-native';

const {width, height} = Dimensions.get('window');
const helfWidth = width / 2 - 5;
const imageWidth = helfWidth - 6

export default class LikedMall extends Component{
    constructor(props){
        super(props);
    }

    renderItem = (info) => {
        // console.log(info.item)
        let item = info.item
        return(
            <View style={{marginTop:5,width:helfWidth,backgroundColor:'#dbdbdb',borderRadius:5}}>
                <View style={{padding:3}}>
                    <Image
                        source={{uri: item.mallImg}}
                        style={{width: imageWidth, height: imageWidth}}
                    />
                </View>
                <View style={{padding:3,backgroundColor:'#e6e6e6',width:helfWidth,borderRadius:5}}>
                    <Text numberOfLines={2} style={{color:'#333'}}>{item.mallName}</Text>
                </View>
            </View>
        );
    }

    renderItems(info){
        return(
            <View style={{flex:1,justifyContent:'space-evenly'}}>
                {this.renderItem(info)}
            </View>
        );
    }

    renderFlatList(){
        return(
            <View style={{}}>
                <FlatList
                    refreshing={true}
                    data={data.data}
                    renderItem={(info)=>this.renderItems(info)}
                    numColumns={2}
                    ItemSeparatorComponent={()=><View/>}
                    ListHeaderComponent={()=><View/>}
                    ListFooterComponent={()=><View/>}
                    keyExtractor={(item,index)=> 'key' + index + item}
                />
            </View>
        );
    }

    render(){
        return(
            <View style={{flex:1}}>
                {this.renderFlatList()}
            </View>
        );
    }
}

const data = {
    "data":[
        {
            "mallImg": "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2709372839,1855512064&fm=26&gp=0.jpg",
            "mallName": "【测试】羽绒棉服女中长款过膝大毛领棉衣韩版面包服学生加厚外套宽松棉袄 红色 M 短板"
        },
        {
            "mallImg": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586434063074&di=dade5a6138d933b28e5aa2b3eb5d71c1&imgtype=0&src=http%3A%2F%2Fa.vpimg3.com%2Fupload%2Fmerchandise%2F128732%2FHUNHE-6931697790018-1.jpg",
            "mallName": "【测试】羽绒棉服女中长款过膝大毛领棉衣韩版面包服学生加厚外套宽松棉袄 红色 M 短板"
        },
        {
            "mallImg": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586434063074&di=dade5a6138d933b28e5aa2b3eb5d71c1&imgtype=0&src=http%3A%2F%2Fa.vpimg3.com%2Fupload%2Fmerchandise%2F128732%2FHUNHE-6931697790018-1.jpg",
            "mallName": "【测试】羽绒棉服女中长款过膝大毛领棉衣韩版面包服学生加厚外套宽松棉袄 红色 M 短板"
        },
        {
            "mallImg": "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2709372839,1855512064&fm=26&gp=0.jpg",
            "mallName": "【测试】羽绒棉服女中长款过膝大毛领棉衣韩版面包服学生加厚外套宽松棉袄 红色 M 短板"
        }
    ]
}