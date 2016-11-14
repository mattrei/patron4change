import { createStore, applyMiddleware, compose } from 'redux';
import promiseMiddleware from '../middleware/PromiseMiddleware';
import createLogger from 'redux-logger';
import combinedReducers from '../reducers';

window.$REDUX_DEVTOOL = false;

const logger = createLogger({
  level: 'info',
  collapsed: true,
  // use for debugging to trace only the essential actions
  predicate: (getState, action) => Boolean(action.no_log)
});

const enhancer = compose(
	applyMiddleware( promiseMiddleware, logger )
)

export default function configureStore( initialState = undefined  ) {

  const store = createStore( combinedReducers, initialState, enhancer);

  if (module.hot) {

  	module.hot.accept('../reducers', () => {
  	  const nextRootReducer = require('../reducers');
  	  store.replaceReducer(nextRootReducer);
  	});
  }

  return store;
}