/**
 * @format
 */

import {AppRegistry} from 'react-native';
// import App from './App';
import AppNavigators from './js/AppNavigator/AppNavigators';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => AppNavigators);
