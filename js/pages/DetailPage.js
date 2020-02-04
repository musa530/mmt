import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';


export default class DetailPage extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount() {
        let title = this.props.navigation.state.params.title;
        console.log(title);
    }

    render() {
        const {navigation} = this.props;
        const {state, setParams} = navigation;
        const {params} = state;
        const title = params.title;
        return(
            <View style={styles.container}>
                <Text style={styles.welcome}>{title}</Text>
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