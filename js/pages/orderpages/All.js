import React, {Component} from 'react';
import {View, Text, ScrollView, Image, Dimensions, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('window');

export default class All extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }

    renderItem(){
        
    }

    render(){
        
        return(
            <View style={styles.container}>
                <Text>All Page</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#f7f7f7'
    }
});