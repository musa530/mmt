import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CartPageDemo from './CartCmps/CartPageDemo';


export default class Cart extends Component{
    constructor(props){
        super(props);
    }

    render() {
        return(
            <View style={styles.container}>
                <CartPageDemo/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
});