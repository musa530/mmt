import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';


export default class SelfSupport extends Component{
    constructor(props){
        super(props);
    }

    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.welcome}>Welcome the SelfSupportPage</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10
    },
    welcome: {
      color: '#333',
      fontSize: 18
    }
});