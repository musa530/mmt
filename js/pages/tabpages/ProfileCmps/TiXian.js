import React , { Component } from "react";
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity} from "react-native";

const {width, height} = Dimensions.get('window');
const circleWidth = width*2;
const top = circleWidth/1.4

export default class TiXian extends Component{
    constructor(props){
        super(props);
        this.state = {
            balance: 50
        }
    }

    renderMain = () => {
        return(
            <View style={{alignItems:'center',marginTop:70}}>
                <View>
                    <View>
                        <Text style={{color:'#000',fontSize:18,fontWeight:"bold",}}>可提现余额</Text>
                    </View>
                    <View style={{marginTop:20}}>
                        <Text style={{color:'#f00',fontSize:18,fontWeight:"bold",textAlign:'center',}}>￥{parseFloat(this.state.balance).toFixed(2)}</Text>
                    </View>
                </View>
            </View>
        );
    }

    render() {
        return(
            <View style={styles.container}>
                {this.renderMain()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:'#f7f7f7',
        flex:1
    }
});