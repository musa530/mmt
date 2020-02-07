import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import Swiper from './tabpages/homeCmps/Swiper';

const {width, height} = Dimensions.get('window');

export default class DetailPage extends Component{
    constructor(props){
        super(props);
    }

    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.topTitle}`
    });
    componentDidMount() {
        let topTitle = this.props.navigation.state.params.topTitle;
        console.log(this.props.navigation.state.params);
    }

    render() {
        const {navigation} = this.props;
        const {state, setParams} = navigation;
        const {params} = state;
        const topTitle = params.topTitle;
        return(
            <View style={styles.container}>
                <View style={{width: width, height: width}}>
                    <Swiper height={width}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    welcome: {
      color: '#333',
      fontSize: 18
    }
});