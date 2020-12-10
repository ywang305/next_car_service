import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
} from '@reduxjs/toolkit';
import {
    signInWithEmailPassword,
    requestVerifyCode,
    signOut,
    signUpWithEmailPassword,
} from '../firebase/auth';

const initialState = {
    isLogin: false,
    isLoading: false,
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

export const signUpThunk = createAsyncThunk(
    '/login/signUpThunk',
    ({ email, password }) => signUpWithEmailPassword(email, password)
);

// -- Thunks end --

const _pendingReducer = (state, action) => {
    state.isLoading = true;
};
const _fulfilledReducer = (state, action) => {
    state.isLogin = true;
    state.isLoading = false;
};

export const slice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isLogin = true;
        },
        logout: (state, action) => {
            state.isLogin = false;
        },
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
                state.isLoading = false;
            })
            .addCase(signUpThunk.fulfilled, _fulfilledReducer)
            .addCase(signUpThunk.pending, _pendingReducer)
            .addDefaultCase((state, action) => {
                state.isLoading = false;
            });
    },
});

export const { login, logout } = slice.actions;

export default slice.reducer;

export const selectIsLogin = (state) => state.login.isLogin;
export const selectIsLoading = (state) => state.login.isLoading;
