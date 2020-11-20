import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

import { combineReducers } from 'redux';
import loginReducer from './login/reducer';

/*
// this is for top level
const rootPersistConfig = {
	key: 'root',
	storage: storage,
	blacklist: [], // whitelist:[]
};
*/

const loginPersistConfig = {
	key: 'login',
	storage,
	whitelist: ['userId'],
};

export default combineReducers({
	login: persistReducer(loginPersistConfig, loginReducer),
	// profile: persistReducer(profileInfoPersistConfig, profileReducer),
	// payment: paymentReducer,
	// notification: notificationReducer,
});
