import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions, ScrollView, Image,TouchableOpacity,SectionList,Alert,FlatList,ImageBackground} from 'react-native';
import ShopCateData from '../../../ShopCateData.json';

const {width,height} = Dimensions.get('window');
const cellItemWidth = width/2.1
const cellItemHeight = cellItemWidth+50;
const cellImageWidth = cellItemWidth-5

export default class TempPage extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    componentWillMount(){
        
    }

    componentDidMount(){
        
    }

    renderItem=(item)=>{
        // let sectionIndex = item.section.data.sectionId
        // let index = item.data.id
        console.log(item)
        return item.index === 0 ?
            <View key={item.index} style={{flexDirection:'row',flexWrap:'wrap'}}>
                {data.map((cell, index) => this.renderCell(cell, index))}
            </View> : null
    }

    renderCell=(item, index) => {
        return (
            <TouchableOpacity
                key={index}
                style={{height:cellItemHeight,width:cellItemWidth,backgroundColor:'#fff',alignItems:'center'}}
            >
                <Image
                    style={{width:cellImageWidth,height:cellImageWidth,marginVertical:3}}
                    source={{uri:item.url}}
                />
                <Text style={{color: '#666',fontSize:13}}>{item.mallName}</Text>
            </TouchableOpacity>
        );
    }

    render(){
        let tempArr = ShopCateData.data[this.props.id].secondCateItems.map((item, index) => {
            let tempObj = {}
            tempObj.key = item.secondCateName//二级分类名称
            tempObj.data = item.items///详细数据
            tempObj.data.id = index//索引(下标)
            return tempObj
        })
        return(
            <View style={{flex:1,backgroundColor:'#fff'}}>
                {this.renderItem(tempArr)}
                <View>
                    <Text>1345</Text>
                </View>
            </View>
        );
    }
}