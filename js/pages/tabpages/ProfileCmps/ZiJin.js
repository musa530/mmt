import React , { Component } from "react";
import { View, Text, StyleSheet} from "react-native";





export default class ZiJin extends Component{
    constructor(props){
        super(props)
        this.state={
            jifen: 1120,
            yucunkuan: '10.00',
            memberLevel: '普通会员',
        }
    }

    renderTop(){//顶部渲染
        let textColor = {
            color:'#fff'
        }
        return(
            <View style={{backgroundColor: '#E31E3D', padding: 5}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 15}}>
                    <View>
                        <Text style={[textColor, {fontSize: 16}]}>会员积分</Text>
                        <View style={styles.numStyle}>
                            <Text style={[textColor, {fontSize: 22,fontWeight:'bold'}]}>{this.state.jifen}</Text>
                            <Text style={[textColor]}>分</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={{color: 'white', fontSize: 16}}>预存款</Text>
                        <View style={styles.numStyle}>
                            <Text style={[textColor, {fontSize: 22,fontWeight:'bold'}]}>{this.state.yucunkuan}</Text>
                            <Text style={[textColor]}>元</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.memberLevel}>
                    <View style={{margin: 20}}>
                        <Text style={[textColor, {fontSize: 20,fontWeight:'bold'}]}>{this.state.memberLevel}</Text>
                    </View>
                </View>
            </View>
        );
    }

    render() {
        return(
            <View style={styles.container}>
                {this.renderTop()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#f7f7f7'
    },
    numStyle: {
        flexDirection: 'row',
        justifyContent:'center',
        alignItems: 'baseline',
        marginTop: 30
    },
    memberLevel: {
        flexDirection: 'row',
        backgroundColor: '#FF667E',
        margin: 20,
        justifyContent: 'center', 
        borderRadius: 16
    }
});