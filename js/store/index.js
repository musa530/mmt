import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducer'
import {middleware} from '../AppNavigator/AppNavigators';

const logger = store => next => action => {
    if (typeof action==='function') {
        console.log('dispatch is a function');
    } else {
        console.log('dispatching', action);
    }
    const result = next(action);
    console.log('nextState', store.getState());
}

const middlewares = [
    middleware,
    logger,
    thunk,
];

export default createStore(reducers, applyMiddleware(...middlewares));