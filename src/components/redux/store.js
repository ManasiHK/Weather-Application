import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducer from './reducer';
import { routerMiddleware } from 'connected-react-router';
import createHistory from 'history/createBrowserHistory';

export const history = createHistory()

const store = createStore(reducer, {}, applyMiddleware(thunk, logger, routerMiddleware(history)));
export default store;