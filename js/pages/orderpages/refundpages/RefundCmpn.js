import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import TuiHuo from './TuiHuo';
import TuiKuan from './TuiKuan';


const Tabs = createMaterialTopTabNavigator({
    TuiKuan:{
        screen: TuiKuan,
        navigationOptions:{
            tabBarLabel:'退款'
        }
    },
    TuiHuo:{
        screen:TuiHuo,
        navigationOptions:{
            tabBarLabel:'退货'
        }
    }
},{
    tabBarPosition: 'top',
    swipeEnabled: true,
    initialRouteName:'TuiKuan',
    order:["TuiKuan","TuiHuo"],
    tabBarOptions:{
        activeTintColor: '#f00',
        inactiveTintColor: '#000',
        tabStyle: {mindWidth:0},
        upperCaseLabel: false, //是否使标签大写，默认为true
        // scrollEnabled: true,  //是否支持 选项卡滚动，默认为false
        style: {
            backgroundColor: '#fff', //Tabbar 的背景色
            height: 40
        },
        indicatorStyle: {
            height: 2,
            backgroundColor: 'red'
        },//标签指示器的样式
        labelStyle: {
            fontSize: 13,
            marginBottom: 8,
            color:'#000'
        },//文字的样式
    }
})

const TopTabs = createAppContainer(Tabs)

export default TopTabs;