import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { reducer as articleNumReducer } from './articles-fetch-wrap/';
import { reducer as articleItemsReduer} from './constant/';

const win = window;

const reducer = combineReducers({
  articleNum: articleNumReducer,
  articleItems: articleItemsReduer,
});

const middlewares = [thunkMiddleware];
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(require('redux-immutable-state-invariant').default());
}

const storeEnhancers = compose(
  applyMiddleware(...middlewares),
  (win && win.devToolsExtension) ? win.devToolsExtension() : (f) => f,
);

export default createStore(reducer, {}, storeEnhancers);

