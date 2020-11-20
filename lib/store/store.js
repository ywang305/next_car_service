import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { compose } from 'redux';
import { persistStore } from 'redux-persist';
import window from 'global';

import rootReducer from './rootReducer'; // the value from combineReducers

const composeEnhancers =
    (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            trace: true,
            traceLimit: 25,
        })) ||
    compose;

export const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunkMiddleware))
);

export const persistor = persistStore(store);
