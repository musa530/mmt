import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CategoryDemo from './CategoryCmps/CategoryDemo';


export default class Category extends Component{
    constructor(props){
        super(props);
    }

    render() {
        return(
            <View style={styles.container}>
                <CategoryDemo/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
});