import {combineReducers} from 'redux';
import theme from './theme';
import {rootCom, RootNavigator} from '../AppNavigator/AppNavigators';

//1.指定默认state
const navState = RootNavigator.router.getStateForAction(RootNavigator.router.getActionForPathAndParams(rootCom));

/**
 * 2.创建自己的navigation reducer
 */
const navReducer = (state = navState, action) => {
    const nextState = RootNavigator.router.getStateForAction(action, state);
    //如果next State 为null或未定义，只需返回原始state
    return nextState || state;
};

/**
 * 3.合并reducer
 * @type {Redducer<any> | Reducer<any, AnyAction>}
 */
const index = combineReducers({
    nav: navReducer,
    theme: theme,
});

export default index;