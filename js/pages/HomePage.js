import React, {Component} from 'react';
import {BackHandler, Dimensions} from 'react-native';
import {NavigationActions} from 'react-navigation';
import DynamicTabNavigator from '../AppNavigator/DynamicTabNavigator';
import NavigationUtil from '../AppNavigator/NavigationUtil';
import {connect} from 'react-redux';

const {width, height} = Dimensions.get('window')

class HomePage extends Component{
    constructor(props){
        super(props);
        this.state = {
            isModalVisible: false,
        }
    }

    componentDidMount(){
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
    }

    componentWillUnmount(){
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
    }

    onBackPress=()=>{
        const {dispatch, nav} = this.props;

        if(nav.routes[1].index === 0) {
            return false;
        }
        dispatch(NavigationActions.back());
        return true;
    }

    render() {
        NavigationUtil.navigation = this.props.navigation;
        return(
            <DynamicTabNavigator/>
        );
    }
}

const mapStateToProps = state => ({
    nav: state.nav
})

export default connect(mapStateToProps)(HomePage);