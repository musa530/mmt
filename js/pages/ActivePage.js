import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';

const {width, height} = Dimensions.get('window');

export default class ActivePage extends Component{
    constructor(props){
        super(props);
        this.state={
            empityText: '暂时无数据'
        }
    }

    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.topTitle}`
    });
    componentDidMount() {
        let topTitle = this.props.navigation.state.params.topTitle;
        console.log(this.props.navigation.state.params);
    }

    renderEmpity() {//无数据时
        const {empityText} = this.state;
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <View style={{top: -60, alignItems: 'center'}}>
                    <Image style={{width: 64, height: 64, marginBottom: 8}} source={require('../../assest/images/jinggao.png')}/>
                    <Text style={{color: 'white', fontSize: 18}}>{empityText}</Text>
                </View>
            </View>
        );
    }

    render() {
        const {navigation} = this.props;
        const {state, setParams} = navigation;
        const {params} = state;
        const topTitle = params.topTitle;
        return(
            <View style={styles.container}>
                {this.renderEmpity()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#E31E3D'
    },
});