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
import MyJifen from '../pages/tabpages/ProfileCmps/MyJifen';
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
    HomePage: {//首页
        screen: HomePage,
        navigationOptions: {
            headerShown: false,
        }
    },
    DetailPage: {//商品详情页
        screen: DetailPage,
        navigationOptions: {
        }
    },
    ActivePage: {//首页活动页面
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
    SearchPage: {//搜索页面
        screen: SearchPage,
        navigationOptions: {
            headerShown: false
        }
    },
    Category: {//分类页面
        screen: Category,
        navigationOptions: {
            headerShown: false
        }
    },
    SelfSupport: {//自营超市
        screen: SelfSupport,
        navigationOptions: {
            headerShown: false
        }
    },
    ModalDemo: {//模板案例
        screen: ModalDemo,
        navigationOptions: {
            headerShown: false
        }
    },
    AllEvaluate: {//全部评论
        screen: AllEvaluate,
        navigationOptions: {
        }
    },
    MemberCenter: {//会员中心
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
    MyJifen: {//我的积分
        screen: MyJifen,
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