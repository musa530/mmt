import React, {Component} from 'react';
import {View, Image, Text, TouchableOpacity, StyleSheet, FlatList, SectionList, Dimensions, ScrollView,ActivityIndicator} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const leftList = (width/3);
const CateData = require('../../../../CategoryData.json')

export default class CategoryDemo extends Component {

    constructor(props) {
      super(props)
      this._flatList = null
      this._sectionList = null
      this.state = {
        selectedRootCate: 0,
        error: false,
        errorInfo:'',
        class_list:[],
        isLoading:true,
      }
    }

    componentDidMount() {
      this.fetchData()
    }

    fetchData() {
      fetch('https://satarmen.com/api/Goodsclass/index')
      .then((response)=> response.json())
      .then((res) => {
        // console.log(res.result)
        let class_list = res.result.class_list
        

        this.setState({
          isLoading: false,
          class_list,
        })

        class_list = null
      })
      .catch(error => {
        this.setState({
          error:true,
          errorInfo: error
        })
      })
      .done();
    }

    renderLoading(){
      return(
        <View>
          {this.renderNavBar()}
          <View style={{marginTop:60,alignItems:'center'}}>
            <ActivityIndicator
              animating={true}
              color='blue'
              size="small"
            />
            <Text>数据加载中...</Text>
          </View>
        </View>
      )
    }
  
    renderNavBar() {//页面头部
      return (
        <View style={{height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red'}}>
          <Text style={{marginTop: 5, color: 'white', fontSize: 18}}>分类</Text>
        </View>
      )
    }
  
      _renderItem = item => {//flatList之renderItem,以item 名称接受data数据
        let index = item.index
        let title = item.item.title
        return (
          <TouchableOpacity
            key={index}
            style={[{alignItems: 'center', justifyContent: 'center', width: leftList, height: 47.5}, this.state.selectedRootCate === index ? {backgroundColor: '#F5F5F5', borderLeftWidth: 3, borderLeftColor: 'red'} : {backgroundColor: 'white'}]}
            onPress={() => {
              // setTimeout(() => {
              //   (CateData.data.length - index) * 45 > height - 40 ? this._flatList.scrollToOffset({animated: true, offset: index * 45}) : null
              //   this._sectionList.scrollToLocation({itemIndex: 0, sectionIndex: 0, animated: true, viewOffset: 20})
              // }, 100)
              this.setState({selectedRootCate: index})
            }}
          >
            <Text style={{fontSize: 13,textAlign:'center', color: this.state.selectedRootCate === index ? 'red' : '#333'}} numberOfLines={3}>{title}</Text>
          </TouchableOpacity>
        )
      }
    
      renderRootCate() {//左侧根分类
        let data = []
        this.state.class_list.map((item, index) => {
          data.push({key: index, title: item.value, id: item.id})
        })
        return (
          <View style={{backgroundColor: '#F5F5F5'}}>
            <FlatList
              ref={flatList => this._flatList = flatList}
              data={data}
              ListHeaderComponent={() => (<View/>)}//头部组件
              ListFooterComponent={() => (<View/>)}//底部组件
              ItemSeparatorComponent={() => <View style={{height:1, backgroundColor:'#F5F5F5'}}/>}//行与行之间的分割线组件
              renderItem={this._renderItem}//从数据源中逐个解析数据，然后返回一个设定好格式的组件来渲染。item
              onEndReachedThreshold={20}//触发onEndReached回调函数
              showsVerticalScrollIndicator={false}
              >
            </FlatList>
          </View>
        )
      }
    
      sectionComp(item) {//sectionHeader二级分类名称
        // console.log(item)
        return (
          <View style={{backgroundColor: '#F5F5F5', justifyContent: 'center',alignItems:'center',marginTop:8,borderBottomColor:'#8a8a8a',borderBottomWidth:1,marginBottom:3}}>
            <Text style={{color: '#f00', marginBottom: 3,fontSize:15,fontWeight:'bold'}}>{item.section.value}</Text>
          </View>
        )
      }
    
      renderItem(item) {//右侧item的封装
        let sectionIndex = item.section.data.sectionId
        let data = item.section.data
        return item.index === 0 ?
          <View key={item.index} style={{flexDirection: 'row', flexWrap: 'wrap',width: width - leftList}}>
            {data.map((cell, index) => {
              return <TouchableOpacity
              key={index}
              style={{height: 110, width: (width - 150) / 3, marginBottom: 8, marginRight: 10, alignItems: 'center'}}
              onPress={() => alert(`点击了第${sectionIndex+1}组中的第${index+1}个商品`)}
            >
              <Image style={{width: 60, height: 70, marginVertical: 10}} source={{uri: `https://satarmen.com/uploads/home/common/category-pic-${cell.id}.jpg`}}/>
              <Text style={{color: '#333', fontSize: 13}}>{cell.value}</Text>
            </TouchableOpacity>
            })}
          </View> : null
      }
    
      renderItemCate = () => {//重组右侧分类数据
        let class_list = this.state.class_list
        // console.log(class_list)
        let tempArr = class_list[this.state.selectedRootCate].children.map((item, index) => {
          let tempObj = {}
          tempObj.value = item.value
          tempObj.id = item.id
          tempObj.data = item.children
          tempObj.data.sectionId = index
          return tempObj
        })
        
        // console.log(tempArr)
        return(
          <View style={{marginLeft:5}}>
            <SectionList
              renderSectionHeader={this.sectionComp}
              sections={tempArr}
              renderItem={this.renderItem}
              ListHeaderComponent={() => <View/>}
              ListFooterComponent={()=><View style={{height:20}}/>}
              ItemSeparatorComponent={()=><View/>}
              keyExtractor={(item, index) => 'key' + index + item}
            />
          </View>
        );
            
            
      }
    
      renderCategory() {
        
        return (
          <View style={{flexDirection: 'row', flex: 1, backgroundColor: '#F5F5F5'}}>
            {this.renderRootCate()}
            {this.renderItemCate()}
          </View>
        )
      }
    
      render() {
        if(this.state.isLoading && !this.state.error){
          return this.renderLoading()
        }
        return (
          <View style={styles.container}>
            {this.renderNavBar()}
            {this.renderCategory()}
          </View>
        )
      }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  })