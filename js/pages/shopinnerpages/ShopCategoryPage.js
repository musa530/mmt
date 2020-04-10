import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions, ScrollView, Image,TouchableOpacity,SectionList,Alert,FlatList,ImageBackground} from 'react-native';
import ShopCateData from '../../../ShopCateData.json';
import TempPage from './TempPage';

const {width,height} = Dimensions.get('window');
const itemWidth = width/2.3;
const listHeight = height - 280;
const cellItemWidth = width/2.1
const cellItemHeight = cellItemWidth+50;
const cellImageWidth = cellItemWidth-5

const id = 1;

export default class ShopCategoryPage extends Component{
    constructor(props){
        super(props);
        this._flatList = null
        this._sectionList = null
        this.state = {
            selectedRootCate: 0,
            isPressed: false
        }
    }

    componentDidUpdate(){
        // console.log(this.state.isPressed)
    }

    componentWillUnmount=() => {
        this.setState({
            isPressed:false
        })
        // console.log(this.state.isPressed)
    }

    _renderItem=(item)=>{//一级类目item封装
        let index = item.index;
        let title = item.item.title
        return(
            <TouchableOpacity
                key={index}
                style={[{
                    alignItems:'center',
                    justifyContent:'center',
                    width:itemWidth,height:44
                },
                this.state.selectedRootCate === index ? {backgroundColor:'#f7f7f7',borderLeftWidth:3,borderLeftColor:'red'} : {backgroundColor:'white'}
            ]}
                onPress={()=>{
                    // setTimeout(()=>{
                    //     (ShopCateData.data.length - index) * 45 > height - 240 ? this._flatList.scrollToOffset({animated: true, offset: index * 45}) : null
                    //     this._sectionList.scrollToLocation({itemIndex:0,sectionIndex:0,animated:true,viewOffset:20})
                    // },100)
                    this.setState({selectedRootCate: index})
                }}
            >
                <Text style={{fontSize: 13, color: this.state.selectedRootCate === index ? 'red' : '#333'}}>{title}</Text>
            </TouchableOpacity>
        );
    }

    renderRootCate(){//左侧根目录&一级类目
        let data = []
        ShopCateData.data.map((item, index) => {
            data.push({key: index, title: item.firstCateName, id: item.firstCateId})
        })
        return(
            <View style={{backgroundColor:'#f5f5f5',height:listHeight}}>
                <FlatList
                    ref={flatList => this._flatList = flatList}
                    data={data}
                    ListHeaderComponent={()=>(<View />)}
                    ListFooterComponent={()=>(<View />)}
                    ItemSeparatorComponent={()=> <View style={{height:1,backgroundColor:'#f5f5f5'}}/>}
                    renderItem={this._renderItem}
                    onEndReachedThreshold={20}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        );
    }

    sectionComp=(item)=>{//二级类目标题
        return(
            <TouchableOpacity 
                style={{flex:1,backgroundColor:'#f7f7f7',justifyContent:'center',alignItems:'center',height:44}}
                onPress={()=>{
                    console.log(`点击了${item.section.key}`)
                }}    
            >
                <Text style={{color:'#711',marginBottom:10,marginTop:10}}>{item.section.key}</Text>
            </TouchableOpacity>
        );
    }

    renderItem = item => {
        let secondIndex = item.section.data.sectionId;
        let data = item.section.data
        let key = item.section.key
        let mallData = []
        data.map((item, index) => {
            mallData.push({
                key: index, title: item.mallName, url: item.url, price: item.mallPrice
            })
        })
        console.log(secondIndex,key,mallData)
        return null
    }

    renderItemCate(){//二级类目数组打包与使用SectionList展示
        let tempArr = ShopCateData.data[this.state.selectedRootCate].secondCateItems.map((item, index) => {
            let tempObj = {}
            tempObj.key = item.secondCateName//二级分类名称
            tempObj.data = item.items///详细数据
            tempObj.data.sectionId = index//索引(下标)
            return tempObj
        })
        return(
            <View style={{flex:1,backgroundColor:'#f5f5f5'}}>
                <SectionList
                    ref={(ref) => this._sectionList = ref}
                    renderSectionHeader={this.sectionComp}
                    renderItem={(data)=>this.renderItem(data)}
                    sections={tempArr}
                    ItemSeparatorComponent={()=><View style={{height:1,backgroundColor:'#eee'}}/>}
                    ListHeaderComponent={()=><View/>}
                    ListFooterComponent={()=><View/>}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => 'key' + index + item}
                />
            </View>
        );
    }

    renderCategory=()=>{
        return(
            <View style={{flex:1,flexDirection:'row',backgroundColor:'#f5f5f5'}}>
                {this.renderRootCate()}
                {this.renderItemCate()}
            </View>
        );
    }

    render(){
        const {isPressed} = this.state;
        console.log(this.props)
        return(
            <View style={styles.container}>
                {this.renderCategory()}
                {/* <TouchableOpacity
                    onPress={()=>{
                        this.props._setId(id)
                    }}
                    style={{width:width,padding:20,alignItems:'center',backgroundColor:'cyan'}}
                >
                    <Text>点击</Text>
                </TouchableOpacity> */}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    }
});