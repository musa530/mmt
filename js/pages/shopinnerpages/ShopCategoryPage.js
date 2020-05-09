import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions, ScrollView, Image,TouchableOpacity,SectionList,Alert,FlatList,RefreshControl,ActivityIndicator} from 'react-native';
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
            isPressed: false,
            store_id: this.props.store_id,
            isRefreshing: true,
            error: false,
            errorInfo: '',
            goods_class: []
        }
    }

    componentDidMount(){
        let store_id = this.state.store_id
        this._netFetch(store_id)
    }

    _netFetch = (store_id) => {
        fetch(`https://satarmen.com/api/Store/store_goods_class?store_id=${store_id}`)
        .then(response => response.json())
        .then(res => {
            let goods_class = res.result.store_goods_class
            this.setState({
                goods_class,
                isRefreshing: false
            })
            goods_class = null
        })
        .catch(error => {
            this.setState({
                error: true,
                errorInfo: error
            })
        })
    }

    renderRefresh = () => {
        return (
            <View style={{marginTop:60,alignItems:'center'}}>
                <ActivityIndicator
                    animating={true}
                    color='blue'
                    size="small"
                />
                   <Text>数据加载中...</Text>
            </View>
        );
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
        this.state.goods_class.map((item, index) => {
            data.push({key: index, title: item.value, id: item.id})
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

    sectionComp=(info)=>{//二级类目标题
        // console.log(info)
        return(
            <TouchableOpacity 
                style={{flex:1,backgroundColor:'#f7f7f7',justifyContent:'center',alignItems:'center',height:44}}
                onPress={()=>{
                    Alert.alert(`点击了${info.item.key}`)
                }}    
            >
                <Text style={{color:'#711',marginBottom:10,marginTop:10}}>{info.item.key}</Text>
            </TouchableOpacity>
        );
    }


    renderItemCate(){//二级类目数组打包与使用SectionList展示
        let tempArr = this.state.goods_class[this.state.selectedRootCate].children.map((item, index) => {
            let tempObj = {}
            tempObj.key = item.value//二级分类名称
            tempObj.id = item.id///详细数据
            tempObj.index = index//索引(下标)
            return tempObj
        })
        console.log(tempArr)
        return(
            <View style={{flex:1,backgroundColor:'#f5f5f5',height: listHeight}}>
                <FlatList
                    ref={flatList => this._flatList = flatList}
                    data={tempArr}
                    ListHeaderComponent={()=>(<View />)}
                    ListFooterComponent={()=>(<View />)}
                    ItemSeparatorComponent={()=> <View style={{height:1,backgroundColor:'#f5f5f5'}}/>}
                    renderItem={this.sectionComp}
                    onEndReachedThreshold={20}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        );
    }

    renderCategory=()=>{
        return(
            <View style={{flexDirection:'row',backgroundColor:'#f5f5f5'}}>
                {this.renderRootCate()}
                {this.renderItemCate()}
            </View>
        );
    }

    render(){
        const {isPressed} = this.state;
        if (this.state.isRefreshing && !this.state.error) {
            return this.renderRefresh()
        }
        console.log(this.state.goods_class)
        return(
            <View style={styles.container}>
                {this.state.goods_class == '' ?
                    <View style={{alignItems:'center',marginTop:50}}>
                        <Text style={{color:'#cdcdcd'}}>暂没有相关分类~</Text>
                    </View>
                    :
                    this.renderCategory()
                }
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
    }
});