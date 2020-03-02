import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Login from '../pages/Login';
import HomePage from '../pages/HomePage';
import DetailPage from '../pages/DetailPage';
import SearchPage from '../pages/SearchPage';
import ActivePage from '../pages/ActivePage';
import Category from '../pages/tabpages/Category';
import SelfSupport from '../pages/tabpages/SelfSupport';
import ModalDemo from '../pages/ModalDemo';
import AllEvaluate from '../pages/AllEvaluate';
import MemberCenter from '../pages/MemberCenter';
const TITLE_OFFSET = Platform.OS === 'ios' ? 70 : 56;

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
        }
    },
    ActivePage: {
        screen: ActivePage,
        navigationOptions: {
            headerTintColor: 'white',//返回图标和文字的颜色
            headerStyle: {
                backgroundColor: '#E31E3D',
            },
            headerTitleStyle: {
                flex: 1,
                alignSelf: 'center',
                textAlign: 'center'
            },
            headerTitleContainerStyle: {
                left: TITLE_OFFSET,
                right: TITLE_OFFSET,
            },
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
    SelfSupport: {
        screen: SelfSupport,
        navigationOptions: {
            headerShown: false
        }
    },
    ModalDemo: {
        screen: ModalDemo,
        navigationOptions: {
            headerShown: false
        }
    },
    AllEvaluate: {
        screen: AllEvaluate,
        navigationOptions: {
        }
    },
    MemberCenter: {
        screen: MemberCenter,
        navigationOptions: {
            headerTintColor: 'white',//返回图标和文字的颜色
            headerStyle: {
                backgroundColor: '#E31E3D',
            },
            headerTitleStyle: {
                flex: 1,
                alignSelf: 'center',
                textAlign: 'center'
            },
            headerTitleContainerStyle: {
                left: TITLE_OFFSET,
                right: TITLE_OFFSET,
            },
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