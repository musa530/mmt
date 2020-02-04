import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Login from '../pages/Login';
import HomePage from '../pages/HomePage';
import DetailPage from '../pages/DetailPage';
import SearchPage from '../pages/SearchPage';
import Category from '../pages/tabpages/Category';

const InitNvigator = createStackNavigator({
    Login: {
        screen: Login,
        navigationOptions: {
            headerShown: false,
        }
    }
});

const MainNvigator = createStackNavigator({
    HomePage: {
        screen: HomePage,
        navigationOptions: {
            headerShown: false,
        }
    },
    DetailPage: {
        screen: DetailPage,
        navigationOptions: {
            title: ''
        }
    },
    SearchPage: {
        screen: SearchPage,
        navigationOptions: {
            headerShown: false
        }
    },
    Category: {
        screen: Category,
        navigationOptions: {
            headerShown: false
        }
    },
});

const RootNavigator = createSwitchNavigator({
    Init: InitNvigator,
    Main: MainNvigator,
},{
    initialRouteName: 'Init',
    navigationOptions: {
        headerShown: false,
    }
});

export default createAppContainer(RootNavigator);