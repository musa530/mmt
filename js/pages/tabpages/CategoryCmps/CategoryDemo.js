import React, {Component} from 'react';
import {View, Image, Text, TouchableOpacity, StyleSheet, FlatList, SectionList, Dimensions} from 'react-native';

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
        CateData: []
      }
    }

    componentDidMount() {
        this.fetchData()
    }

    fetchData() {
        fetch('http://localhost:8081/CategoryData.json')
            .then((response)=> response.json())
            .then((responseJson) => {
                this.setState({
                    CateData: responseJson
                })
            })
            .catch(error => {
                error && console.log(error.toString());
            })
            .done();
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
            style={[{alignItems: 'center', justifyContent: 'center', width: leftList, height: 44}, this.state.selectedRootCate === index ? {backgroundColor: '#F5F5F5', borderLeftWidth: 3, borderLeftColor: 'red'} : {backgroundColor: 'white'}]}
            onPress={() => {
              setTimeout(() => {
                (CateData.data.length - index) * 45 > height - 40 ? this._flatList.scrollToOffset({animated: true, offset: index * 45}) : null
                this._sectionList.scrollToLocation({itemIndex: 0, sectionIndex: 0, animated: true, viewOffset: 20})
              }, 100)
              this.setState({selectedRootCate: index})
            }}
          >
            <Text style={{fontSize: 13, color: this.state.selectedRootCate === index ? 'red' : '#333'}}>{title}</Text>
          </TouchableOpacity>
        )
      }
    
      renderRootCate() {//左侧根分类
        let data = []
        CateData.data.map((item, index) => {
          data.push({key: index, title: item.firstCateName, id: item.firstCateId})
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
        return (
          <View style={{backgroundColor: '#F5F5F5', justifyContent: 'center'}}>
            <Text style={{color: '#711', marginBottom: 8}}>{item.section.key}</Text>
          </View>
        )
      }
    
      renderCell(item, sectionIndex, index) {//单元格详细
        return (
          <TouchableOpacity
            key={index}
            style={{height: 110, width: (width - 160) / 3, backgroundColor: 'white', marginBottom: 8, marginRight: 10, alignItems: 'center'}}
            onPress={() => alert(`点击了第${sectionIndex+1}组中的第${index+1}个商品`)}
          >
            <Image style={{width: 60, height: 70, marginVertical: 10}} source={{uri: item.itemImg}}/>
            <Text style={{color: '#ccc', fontSize: 13}}>{item.title}</Text>
          </TouchableOpacity>
        )
      }
    
      renderItem(item) {//右侧item的封装
        let sectionIndex = item.section.data.sectionId
        let data = item.section.data
        return item.index === 0 ?
          <View key={item.index} style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            {data.map((cell, index) => this.renderCell(cell, sectionIndex, index))}
          </View> : null
      }
    
      renderItemCate() {//重组右侧分类数据
        let tempArr = CateData.data[this.state.selectedRootCate].secondCateItems.map((item, index) => {
          let tempObj = {}
          tempObj.key = item.secondCateName//二级分类名称
          tempObj.data = item.items///详细数据
          tempObj.data.sectionId = index//索引(下标)
          return tempObj
        })
        return (
          <View style={{flex: 1, backgroundColor: '#F5F5F5', marginLeft: 10, marginTop: 8}}>
            <SectionList
              ref={(ref) => this._sectionList = ref}
              renderSectionHeader={this.sectionComp}
              renderItem={(data) => this.renderItem(data)}
              sections={tempArr}
              ItemSeparatorComponent={() => <View/>}
              ListHeaderComponent={() => <View/>}
              ListFooterComponent={() => <View/>}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => 'key' + index + item}
            />
          </View>
        )
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