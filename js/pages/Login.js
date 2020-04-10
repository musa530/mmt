import React, {Component} from 'react';
import {Text, ImageBackground, View, StyleSheet} from 'react-native';
import NavigationUtil from '../AppNavigator/NavigationUtil';


export default class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            time: 4,
        }
    }

    componentDidMount() {
        this.timer = setTimeout(() => {
            NavigationUtil.resetToHomePage({
                navigation: this.props.navigation
            })
        }, 200);
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
        this.time && clearTimeout(this.time);
    }

    render() {
        this.time = setTimeout(() => {
            var ct = this.state.time;
            if(ct>=0){
                ct--;
                this.setState({
                    time: ct,
                });
            }
        }, 1000);
        return(
            <ImageBackground style={{flex: 1}}
                    source={require('../../assest/images/backImg.jpg')}>
                <View style={styles.pop}>
                    <View style={styles.count_down}>
                        <Text style={styles.count_num}>{this.state.time}</Text>
                    </View>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    pop: {
        alignItems: 'flex-end',
        padding: 10,
    },
    count_down: {
        width: 35,
        borderRadius: 50,
        backgroundColor: 'black',
        alignItems: 'center'
    },
    count_num: {
        color: 'white',
        fontSize: 20,
        padding: 5
    }
});