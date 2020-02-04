import React, {Component} from 'react';
import DynamicTabNavigator from '../AppNavigator/DynamicTabNavigator';
import NavigationUtil from '../AppNavigator/NavigationUtil';



export default class HomePage extends Component{
    constructor(props){
        super(props);
    }

    render() {
        NavigationUtil.navigation = this.props.navigation;
        return(
            <DynamicTabNavigator/>
        );
    }
}