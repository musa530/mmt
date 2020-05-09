import React, {Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
} from 'react-native';
import {Provider} from 'react-redux';
import AppNavigators from './js/AppNavigator/AppNavigators';
import store from './js/store';

export default class App extends Component{
	render(){
		return <Provider store={store}>
			<AppNavigators/>
		</Provider>
	}
}