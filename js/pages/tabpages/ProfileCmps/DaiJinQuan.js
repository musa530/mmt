import React , { Component } from "react";
import { View, Text, StyleSheet} from "react-native";





export default class DaiJinQuan extends Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render() {
        return(
            <View style={styles.container}>
                <Text style={{color:'#cdcdcd',fontSize:16}}>没有找到任何信息~</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#f7f7f7',
        alignItems:'center',
        paddingTop: 150
    }
});