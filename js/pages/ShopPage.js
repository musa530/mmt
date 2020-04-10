import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions, ScrollView, Image,TouchableOpacity,SectionList,Alert,TextInput,ImageBackground} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ShopHomePage from './shopinnerpages/ShopHomePage';
import AllMallPage from './shopinnerpages/AllMallPage';
import ShopCategoryPage from './shopinnerpages/ShopCategoryPage';
import { withNavigationFocus } from 'react-navigation';

const {width, height} = Dimensions.get('window');

const TabArr = ['店铺首页','全部商品','店铺分类']

export default class ShopPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            placeholder:'搜索本店商品',
            inLikedNum: 44,
            inLiked: true,
            shopName:'新疆商城自营超市',
            routeName:'Home',
            newArr: TabArr,
            currentIndex:0,
            id: -1
        }
    }

    componentDidMount(){
        // console.log(this.props.navigation.state.params);
    }

    static navigationOptions = ({navigation}) => ({
        title: `${navigation.state.params.topTitle}`
    });

    renderSearch(){
        return(
            <View>
                <ImageBackground
                    source={{uri:'http://mpic.tiankong.com/bc7/fa6/bc7fa6d7856b0c72fdb31ad01e16c8bc/640.jpg@670w'}}
                    style={{width:width,height:200}}
                >
                    <View style={styles.top_search}>
                        <TextInput
                            placeholder={this.state.placeholder}
                            style={{flex:1}}
                            onChangeText={text=>this.setState({
                                value: text
                            })}
                            onSubmitEditing={()=>{
                                //开始搜索
                                this.onChangeTextKeyword(this.state.value);
                                //保存搜索内容
                                this.insertSearch(this.state.value);
                            }} 
                            onFocus={()=>{}}
                            returnKeyType={"search"}
                            autoCapitalize={"none"}
                            autoFocus={false}
                            defaultValue={this.state.value}
                            keyboardType={'default'}
                            value={this.state.value}
                        />
                        <Ionicons
                            name={'ios-search'}
                            size={28}
                            style={styles.icon}
                        />
                    </View>
                    {this.renderShopInfo()}
                </ImageBackground>
            </View>
        );
    }

    renderShopInfo(){
        const {inLiked,newArr} = this.state;
        return(
            <View style={{marginTop:10,marginRight:8,marginLeft:8}}>
                <View style={{backgroundColor:'#fff',borderRadius:5}}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <View style={{padding:10}}>
                            <Image
                                source={{uri:'http://mpic.tiankong.com/bc7/fa6/bc7fa6d7856b0c72fdb31ad01e16c8bc/640.jpg@670w'}}
                                style={{width:80,height:40}}
                            />
                        </View>
                        <View style={{flex:1,padding:5}}>
                            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                                <View style={{backgroundColor:'#eee',padding:3,borderRadius:8}}>
                                    <Text style={{color:'#666'}}>官方店铺</Text>
                                </View>
                                <View>
                                    <Text style={{color:'red',fontSize:16,letterSpacing:-1}}>★★★★★</Text>
                                </View>
                                <TouchableOpacity 
                                    style={{backgroundColor:'#f00',padding:2,paddingLeft:5,paddingRight:5,borderRadius:8,width:55,alignItems:'center'}}
                                    onPress={()=>this.setState({inLiked:!inLiked})}
                                >
                                    {inLiked ?
                                        <Text style={{color:'#fff'}}>已收藏</Text>
                                        :
                                        <Text style={{color:'#fff'}}>收藏</Text>
                                    }
                                    
                                </TouchableOpacity>
                            </View>
                            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:2}}>
                                <View>
                                    <Text style={{color:'#666',fontSize:13}}>{this.state.shopName}</Text>
                                </View>
                                <View>
                                    <Text style={{color:'#666'}}>{this.state.inLikedNum}人收藏</Text>
                                </View>
                            </View>
                        </View>
                        
                    </View>
                    <View style={{marginTop:10,padding:10,marginBottom:8}}>
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}>
                            {this.renderShopTabs(newArr)}
                        </View>
                        
                    </View>
                </View>
            </View>
        );
    }

    renderShopTabs=(newArr)=>{
        const {currentIndex} = this.state;
        let activeStyle = {
            color: '#f00'
        }
        let tintColor = {
            color:'#666',
            fontSize: 16
        }

        let colorContro;
        return(
            newArr.map((item,index)=>{
                colorContro = index===currentIndex ? activeStyle : tintColor
                return(
                    <TouchableOpacity
                        onPress={()=>{
                            this.setState({currentIndex: index})
                        }}
                    >
                        <Text
                            key={index}
                            style={[tintColor,colorContro]}
                        >{item}</Text>
                    </TouchableOpacity>
                );
                
            })
        );
        
    }

    

    _setId=(id)=>{
        this.setState({
            currentIndex:id,
        })
        console.log(id)
    }

    // renderCategory(){
    //     return(
    //         <ShopCategoryPage />
    //     );
    // }

    renderShopPage=(index,id)=>{
        if (index==0) {
            return(
                <ShopHomePage />
            );
        }
        if (index==1||id==1) {
            return(
                <AllMallPage />
            );
        }
        if (index==2) {
            return(
                <ShopCategoryPage _setId={this._setId.bind(this)}/>
            );
        }
    }

    render(){
        // const {navigation} = this.props;
        // cosnt {state,setParams} = navigation;
        const {currentIndex} = this.state;
        return(
            <View style={{flex:1}}>
                <ScrollView>
                    <View>
                        {this.renderSearch()}
                    </View>
                    <View>
                        {this.renderShopPage(currentIndex,this.state.id)}
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    top_search: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height:40,
        marginLeft:30,
        marginRight:30,
        borderRadius:16,
        borderWidth:1,
        borderColor:'#eee',
        backgroundColor:'#fff',
        paddingRight:5,
        paddingLeft:5,
        marginTop:3
    },
    icon: {
        color: '#cdcdcd',
    },
});