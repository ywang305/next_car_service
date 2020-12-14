import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './loginSlice';
import reserveReducer from './reserveSlice';

export default configureStore({
    reducer: {
        login: loginReducer,
        reserve: reserveReducer,
    },
});
