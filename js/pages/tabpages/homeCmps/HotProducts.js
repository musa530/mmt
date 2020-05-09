import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, Image, Text, Dimensions, Modal, FlatList} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import NavigationUtil from '../../../AppNavigator/NavigationUtil';

const {height, width} = Dimensions.get('window');
var helfWidth = width/2;
var itemWidth = helfWidth -10;
var imgWidth = helfWidth - 12;

export default class HotProducts extends Component{
    constructor(props){
		super(props);
		this.state = {
			data:[]
		}
	}
	
	componentDidMount() {
		let {hot_products,recently_products} = this.props;
		this.setState({
			data: hot_products
		})
	}

	renderMallItem = info => {
		let goods_image = info.item.goods_img_480
		let goods_name = info.item.goods_name
		let store_name = info.item.store_name
        let goods_price = info.item.goods_price
        let goods_id = info.item.goods_id
		let store_id = info.item.store_id
		return (
			<View style={{borderWidth:1, borderColor:'#eee',width:itemWidth,marginBottom:2}}>

                <TouchableOpacity
					onPress={()=> {
						NavigationUtil.goPage({
							navigation: this.props.navigation,
							goods_id: goods_id
						},"DetailPage")
					}}
				>
				<Image source={{uri:goods_image}} style={{width:imgWidth, height:imgWidth}}/></TouchableOpacity>
				<View style={{backgroundColor:'#eee'}}>
					<View style={{marginTop:8}}>
						<Text numberOfLines={2} style={{color:'#333'}}>{goods_name}</Text>
					</View>
					<View style={{marginTop:8}}>
						<Text numberOfLines={2} style={{color:'red',fontWeight:'bold'}}>￥{goods_price}</Text>
					</View>
					<View style={{marginTop:8,flexDirection:'row',justifyContent:'space-between',marginBottom:5,paddingRight:5,paddingLeft:5,alignItems:'center'}}>
						<Text numberOfLines={1} style={{color:'red',fontWeight:'bold',fontSize:12,letterSpacing:-1,width:imgWidth/5 *3.4 }}>{store_name}</Text>
						<TouchableOpacity
							onPress={() => {
								NavigationUtil.goPage({
									navigation: this.props.navigation,
									store_name,store_id
								},"ShopPage")
							}}
							style={{backgroundColor:'#f40',borderRadius:5}}
						>
							<Text style={{color:'#fff',padding:3,paddingRight:8,paddingLeft:8,fontSize:12}}>进店</Text>
						</TouchableOpacity>
					</View>
				</View>
				
			</View>
		);
	}

	renderCell = info => {
		// console.log(info)
		return (
			<View style={{flex:1,justifyContent:'space-between',alignItems:'center'}}>
				{this.renderMallItem(info)}
			</View>
		);
	}

    render() {
		// console.log(`mall_imageWidth: ${imgWidth}`);
		// console.log(this.state.data)
		let data = this.props.hot_products
        return (
            <View style={styles.container}>
                <View style={styles.title}>
                    <Text style={styles.txt}>{this.props.title}</Text>
					<Text style={{color: '#cdcdcd'}}>more</Text>
			    </View>
                <View style={{flex: 1}}>
                    <FlatList
						data={data}
						numColumns={2}
						ListHeaderComponent={() => <View />}
						ListHeaderComponent={() => <View />}
						ItemSeparatorComponent={() => <View />}
						renderItem={this.renderCell}
						onEndReachedThreshold={20}
						showsVerticalScrollIndicator={false}
						keyExtractor={(item, index) => 'key' + index + item}
					/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        marginRight: 5,
        marginLeft: 5,
        marginTop: 10
    },
    title: {
		padding: 10,
		backgroundColor: 'white',
		borderBottomWidth: 1,
		borderColor: '#cdcdcd',
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	txt: {
		color: 'red',
		fontWeight: 'bold',
		fontSize: 16,
    },
    mall: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    mallItem: {
		position: 'relative',
        width: itemWidth,
		backgroundColor: '#f5f5f5',
		borderColor: '#cdcdcd',
        borderWidth: 1,
        marginTop: 1,
        paddingBottom: 3
    },
    mallImg: {
        width: imgWidth,
        height: imgWidth
    },
    mallPrice: {
        color: 'red',
        fontSize: 16
	},
	outContainer: {
		flex: 1,
		justifyContent: 'flex-end',
	},
	innerContainer: {
		alignItems: 'center',
		height: 500,
	},
});