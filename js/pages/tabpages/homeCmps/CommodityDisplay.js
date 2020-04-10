import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, Image, Text, Dimensions, Modal} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import NavigationUtil from '../../../AppNavigator/NavigationUtil';

const {height, width} = Dimensions.get('window');
var helfWidth = Dimensions.get('window').width/2;
var itemWidth = helfWidth -10;
var imgWidth = helfWidth - 12;
var Goods = [
	{
		title: '本色集卷纸本色集卷纸本色集卷纸本色集卷纸本色集卷纸本色集卷纸 12卷一提',
		url: require('../../../../assest/images/mall/mall1.jpg'),
		price: '19.80'
	},
	{
		title: '百岁山矿产水多样微量元素矿物质水百岁山矿产水多样微量元素矿物质水 570ml',
		url: require('../../../../assest/images/mall/mall2.jpg'),
		price: '4.00'
	},
	{
		title: '洽洽香瓜子葵花子零食五香恰恰瓜子洽洽香瓜子葵花子零食五香恰恰瓜子 160g',
		url: require('../../../../assest/images/mall/mall3.jpg'),
		price: '6.50'
	},
	{
		title: '品品Q豆干 Q弹豆腐干 烧烤味 烧烤味品品Q豆干 Q弹豆腐干 烧烤味 烧烤味 105g',
		url: require('../../../../assest/images/mall/mall4.png'),
		price: '4.95'
	},
];

//单元格组件
class Item extends Component{
	constructor(props){
		super(props);
		this.state={
			addCart: false,
		}
	}

	press=()=>{//加入购物车
		const {addCart} = this.state;
		this.setState({
			addCart: !addCart
		})
	}
	
	render(){
		return(
			<View style={styles.mallItem}>
				<TouchableOpacity onPress={this.props.press}>
					<Image style={styles.mallImg}
					   source={this.props.url}
					   resizeMode="stretch"
					/>
					<Text style={{fontSize: 14, marginTop: 5,marginBottom: 3, color: '#666'}}
						numberOfLines={2}
					>{this.props.title}</Text>
				</TouchableOpacity>
				<View style={{flexDirection:'row', justifyContent:'space-between', paddingRight: 5}}>
					<Text style={styles.mallPrice}>￥ {this.props.price}</Text>
					<TouchableOpacity
						onPress={
							this.props.setVisible,
							()=>{
								this.press()
							}
						}
					><AntDesign
						name={'shoppingcart'}
						size={18}
						style={{color: 'red'}}
					/></TouchableOpacity>
				</View>
			</View>
		);
	}
}

//列表组件
class List extends Component{
	constructor(props){
		super(props);
		this.state={
			animationType: 'slide',//none slide fade
			modalVisible: false,//模态场景是否可见
			transparent: true,//是否透明显示
		}
	}
	render() {
		var data = this.props.goods;
		var list = [];
		for(var i in data){
			if(i % 2 === 0){
				var row = (
					<View key={i} style={styles.mall}>
						{/* 底标为偶数商品 */}
						<Item url={data[i].url}
							title={data[i].title}
							price={data[i].price}
							press={this.press.bind(this, data[i])}
						/>
						
						{/* 底标为奇数商品 */}
						<Item
							url={data[parseInt(i)+1].url}
							title={data[parseInt(i)+1].title}
							price={data[parseInt(i)+1].price}
							press={this.press.bind(this, data[parseInt(i)+1])}
						/>
					</View>
				);
				list.push(row);
			}
		}
		
		return(
			<View>
				{list}
			</View>
		);
	}

	

	setVisible=()=>{
		this._setModalVisible(true)
	}

	_setModalVisible = (visible) => {//弹窗显示控制
		this.setState({ modalVisible: visible });
	}

	addCartModal=({...data})=>{
		let modalBackgroundStyle = {
			backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.5)' : 'red',
		  };
		let innerContainerTransparentStyle = this.state.transparent
		? { backgroundColor: '#fff', padding: 20 }
		: null;

		let finishButtom = {
            marginLeft: 30,
            marginRight: 30,
            borderRadius: 16,
            backgroundColor: '#f40',
            height: 40, 
            alignItems: 'center',
            justifyContent: 'center'
        }

		return(
			<Modal
				animationType={this.state.animationType}
				transparent={this.state.transparent}
				visible={this.state.modalVisible}
				onRequestClose={() => { this._setModalVisible(false) } }
			>
				<View style={[styles.outContainer, modalBackgroundStyle]}>
					<View style={[styles.innerContainer, innerContainerTransparentStyle]}>
						<View>
							<Text>{data.title}</Text>
						</View>
						<TouchableOpacity style={[finishButtom]}
								onPress={()=>{
									this._setParameterVisible(false)
								}}
							>
                            <Text style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>完成</Text>
                        </TouchableOpacity>
					</View>
				</View>
			</Modal>
		);
	}
	
	press(data) {
		NavigationUtil.goPage({
			navigation: this.props.navigation,
			topTitle: '商品',
			data: {...data},
		}, "DetailPage")
	}
}

export default class CommodityDisplay extends Component{
    constructor(props){
        super(props);
    }
    render() {
        // console.log(`mall_imageWidth: ${imgWidth}`);
        return (
            <View style={styles.container}>
                <View style={styles.title}>
                    <Text style={styles.txt}>{this.props.title}</Text>
					<Text style={{color: '#cdcdcd'}}>more</Text>
			    </View>
                <View style={{flex: 1}}>
                    <List goods={Goods}/>
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