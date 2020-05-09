import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions, ScrollView, Image,TouchableOpacity,FlatList,Alert,TextInput,ImageBackground} from 'react-native';
import NavigationUtil from '../../AppNavigator/NavigationUtil'

const {height, width} = Dimensions.get('window');
var helfWidth = width/2;
var itemWidth = helfWidth -10;
var imgWidth = helfWidth - 12;

export default class ShopHomePage extends Component{
    constructor(props){
        super(props)
        this.state = {
            
        }
    }

    itemChild = (data) => {
        // console.log(data)
        let temp_data = data.item
        let goods_url = temp_data.goods_image_url
        let goods_id = temp_data.goods_id
        
        let goods_name = temp_data.goods_name
        let store_name = temp_data.store_name
        let store_id = temp_data.store_id
        let salenum = temp_data.goods_salenum
        let goods_price = temp_data.goods_price
        return(
            <View style={{borderWidth:1, borderColor:'#eee',width:itemWidth,marginBottom:2}}>
				<TouchableOpacity
					onPress={()=> {
						NavigationUtil.goPush({
							navigation: this.props.navigation,
							goods_id: goods_id
						},"DetailPage")
					}}
				>
				<Image source={{uri:goods_url}} style={{width:imgWidth, height:imgWidth}}/></TouchableOpacity>
				<View style={{backgroundColor:'#eee'}}>
					<View style={{marginTop:8}}>
						<Text numberOfLines={2} style={{color:'#333'}}>{goods_name}</Text>
					</View>
					<View style={{marginTop:8,flexDirection:'row',justifyContent:'space-between',marginBottom:5,paddingRight:5,paddingLeft:5,alignItems:'center'}}>
						<Text numberOfLines={1} style={{color:'red',fontWeight:'bold',fontSize:16,width:imgWidth/5 *3.4 }}>￥{goods_price}</Text>
						<View>
							<Text style={{color:'#fff',padding:3,paddingRight:8,paddingLeft:8,fontSize:15}}>销量{salenum}</Text>
						</View>
					</View>
				</View>
				
			</View>
        );
    }

    renderItem = (data) => {
        return(
            <View style={{flex: 1,marginLeft:3,alignItems:'flex-start'}}>
                {this.itemChild(data)}
            </View>
        );
    }

    rechFooter = () => {
        return(
            <View style={{height:30,alignItems:'center',justifyContent:'flex-start',}}>
                <Text style={{color:'#999999',fontSize:14,marginTop:5,marginBottom:5,}}>
                    没有更多数据了
                </Text>
            </View>
        );
    }

    render(){
        let data = this.props.data;
        
        return(
            <View style={{height: height - 255}}>
                <View style={{backgroundColor:'white',padding: 8,}}>
                    <Text style={{color:'red',fontSize:18,fontWeight:'bold'}}>热门推荐</Text>
                </View>
                <View style={{padding:5,paddingTop:0,flex:1,justifyContent:'space-between'}}>
                    <FlatList
                        renderItem={(data) => this.renderItem(data)}
                        data={data}
                        numColumns={2}
                        ListHeaderComponent={() => <View/>}
                        ListFooterComponent={this.rechFooter}
                        ItemSeparatorComponent={()=><View/>}
                        keyExtractor={(item,index) => 'key' + index + item}
                        refreshing={this.props.refreshing}
                        onRefresh={() => this.props.handleRefresh()}
                    />
                </View>
                
            </View>
        )
    }
}