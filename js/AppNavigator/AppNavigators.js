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
import OrderDetail from '../pages/orderpages/OrderDetail/OrderDetail';
import GoPay from '../pages/orderpages/GoPay';
import AllOrder from '../pages/AllOrder';
import ShopPage from '../pages/ShopPage';
import SubOrder from '../pages/orderpages/SubOrder';
import RefundPage from '../pages/orderpages/RefundPage';
import Liked from '../pages/tabpages/ProfileCmps/Liked';
import ZiJin from '../pages/tabpages/ProfileCmps/ZiJin';
import DaiJinQuan from '../pages/tabpages/ProfileCmps/DaiJinQuan';
import SafeCenter from '../pages/tabpages/ProfileCmps/SafeCenter';

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
    AllOrder: {//全部订单
        screen: AllOrder,
        navigationOptions: {
            headerTintColor: 'white',//返回图标和文字的颜色
            headerStyle: {
                backgroundColor: '#E31E3D',
                height: 45
            },
            headerTitleStyle: {
                flex: 1,
                alignSelf: 'center',
                textAlign: 'center',
                fontSize: 15
            },
            headerTitleContainerStyle: {
                left: TITLE_OFFSET,
                right: TITLE_OFFSET,
            },
        }
    },
    OrderDetail: {//订单详情
        screen: OrderDetail,
        navigationOptions: {
            headerTintColor: 'white',//返回图标和文字的颜色
            headerStyle: {
                backgroundColor: '#E31E3D',
                height: 45
            },
            headerTitleStyle: {
                flex: 1,
                alignSelf: 'center',
                textAlign: 'center',
                fontSize: 15
            },
            headerTitleContainerStyle: {
                left: TITLE_OFFSET,
                right: TITLE_OFFSET,
            },
        }
    },
    GoPay: {//订单结算
        screen: GoPay,
        navigationOptions: {
            headerTintColor: 'white',//返回图标和文字的颜色
            headerStyle: {
                backgroundColor: '#E31E3D',
                height: 45
            },
            headerTitleStyle: {
                flex: 1,
                alignSelf: 'center',
                textAlign: 'center',
                fontSize: 15
            },
            headerTitleContainerStyle: {
                left: TITLE_OFFSET,
                right: TITLE_OFFSET,
            },
        }
    },
    ShopPage: {//首页跳转自营超市店铺
        screen: ShopPage,
        navigationOptions: {
            headerTintColor: 'white',//返回图标和文字的颜色
            headerStyle: {
                backgroundColor: '#E31E3D',
                height:40
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
    SubOrder: {//提交订单页面
        screen: SubOrder,
        navigationOptions: {

        }
    },
    RefundPage: {//提交订单页面
        screen: RefundPage,
        navigationOptions: {
            title:'退款/退后管理',
            headerTintColor: 'white',//返回图标和文字的颜色
            headerStyle: {
                backgroundColor: '#E31E3D',
                height:40
            },
            headerTitleStyle: {
                flex: 1,
                alignSelf: 'center',
                textAlign: 'center',
                fontSize:18
            },
            headerTitleContainerStyle: {
                left: TITLE_OFFSET,
                right: TITLE_OFFSET,
            },
        }
    },
    Liked: {//我的收藏
        screen: Liked,
        navigationOptions: {
            title:'我的收藏',
            headerTintColor: 'white',//返回图标和文字的颜色
            headerStyle: {
                backgroundColor: '#E31E3D',
                height:40
            },
            headerTitleStyle: {
                flex: 1,
                alignSelf: 'center',
                textAlign: 'center',
                fontSize:18
            },
            headerTitleContainerStyle: {
                left: TITLE_OFFSET,
                right: TITLE_OFFSET,
            },
        }
    },
    ZiJin: {//我的资金
        screen: ZiJin,
        navigationOptions: {
            title:'我的资金',
            headerTintColor: 'white',//返回图标和文字的颜色
            headerStyle: {
                backgroundColor: '#E31E3D',
                height:40
            },
            headerTitleStyle: {
                flex: 1,
                alignSelf: 'center',
                textAlign: 'center',
                fontSize:18
            },
            headerTitleContainerStyle: {
                left: TITLE_OFFSET,
                right: TITLE_OFFSET,
            },
        }
    },
    DaiJinQuan: {//我的代金券
        screen: DaiJinQuan,
        navigationOptions: {
            title:'我的代金券',
            headerTintColor: 'white',//返回图标和文字的颜色
            headerStyle: {
                backgroundColor: '#E31E3D',
                height:40
            },
            headerTitleStyle: {
                flex: 1,
                alignSelf: 'center',
                textAlign: 'center',
                fontSize:18
            },
            headerTitleContainerStyle: {
                left: TITLE_OFFSET,
                right: TITLE_OFFSET,
            },
        }
    },
    SafeCenter: {//安全中心
        screen: SafeCenter,
        navigationOptions: {
            title:'安全中心',
            headerTintColor: 'white',//返回图标和文字的颜色
            headerStyle: {
                backgroundColor: '#4DBB88',
                height:40
            },
            headerTitleStyle: {
                flex: 1,
                alignSelf: 'center',
                textAlign: 'center',
                fontSize:18
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