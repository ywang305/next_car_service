import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
} from '@reduxjs/toolkit';
import {
    signInWithEmailPassword,
    requestVerifyCode,
    signOut,
} from '../firebase/auth';

const initialState = {
    isLogin: false,
    status: 'idle',
};

// -- Thunk functions start --
export const signInWithEmailPasswordThunk = createAsyncThunk(
    'login/signInWithEmailPasswordThunk',
    async ({ email, password }) => {
        const user = await signInWithEmailPassword(email, password);
        return user;
    }
);

export const signInWithVerifyCodeThunk = createAsyncThunk(
    'login/signInWithVerifyCodeThunk',
    async ({ confirmationResult, code }) => {
        const user = requestVerifyCode(confirmationResult, code);
        return user;
    }
);

export const signOutThunk = createAsyncThunk(
    '/login/signOutThunk',
    async () => {
        await signOut();
    }
);

// -- Thunks end --

const _pendingReducer = (state, action) => {
    state.status = 'loading';
};
const _fulfilledReducer = (state, action) => {
    state.isLogin = true;
    state.status = 'idle';
};

export const slice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        // clrUser: (state) => {
        //     state.user = null;
        // },
    },
    extraReducers: (builder) => {
        // pending, fulfilled, rejected
        builder
            .addCase(signInWithEmailPasswordThunk.pending, _pendingReducer)
            .addCase(signInWithEmailPasswordThunk.fulfilled, _fulfilledReducer)
            .addCase(signInWithVerifyCodeThunk.pending, _pendingReducer)
            .addCase(signInWithVerifyCodeThunk.fulfilled, _fulfilledReducer)
            .addCase(signOutThunk.pending, _pendingReducer)
            .addCase(signOutThunk.fulfilled, (state, action) => {
                state.isLogin = false;
                state.status = 'idle';
            })
            .addDefaultCase((state, action) => {
                state.status = 'idle';
            });
    },
});

export const { clrUser } = slice.actions;

export default slice.reducer;

export const selectIsLogin = (state) => state.login.isLogin;
export const selectStatus = (state) => state.login.status;
