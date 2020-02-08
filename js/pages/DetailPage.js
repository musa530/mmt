import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions, Image, TouchableOpacity} from 'react-native';
import Swiper from './tabpages/homeCmps/Swiper';

const {width, height} = Dimensions.get('window');
const titleWidth = width/5 * 4.5;

export default class DetailPage extends Component{
    constructor(props){
        super(props);
        this.state={
            share: '分享'
        }
    }

    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.topTitle}`
    });
    componentDidMount() {
        let topTitle = this.props.navigation.state.params.topTitle;
        console.log(this.props.navigation.state.params);
    }

    renderTitle=(title, price) => {
        return (
            <View style={{paddingRight: 5, paddingLeft: 5}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text numberOfLines={2}
                        style={{width: titleWidth, flex: 1, color: '#666'}}
                    >默认标题前缀添加部分为了增加标题字数{title}</Text>
                    <TouchableOpacity style={{alignItems: 'center',marginLeft: 5}}>
                        <Image style={{width: 25, height: 25}} source={require('../../assest/images/fenxiang.png')}/>
                        <Text style={{color: '#999', fontSize: 12}}>{this.state.share}</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={{fontSize: 18}}>{price}</Text>
                </View>
                <View></View>
            </View>
        );
    }

    render() {
        const {navigation} = this.props;
        const {state, setParams} = navigation;
        const {params} = state;
        const title = params.data.title;
        const price = params.data.price;
        return(
            <View style={styles.container}>
                <View style={{width: width, height: width}}>
                    <Swiper height={width}/>
                </View>
                {this.renderTitle(title, price)}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
});