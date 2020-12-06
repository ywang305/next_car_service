import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
} from '@reduxjs/toolkit';
import { signInWithEmailPassword } from '../firebase/auth';

const initialState = {
    isLogin: false,
    status: 'idle',
};

// Thunk functions
export const signInWithEmailPasswordThunk = createAsyncThunk(
    'login/signInWithEmailPasswordThunk',
    async ({ email, password }) => {
        const user = await signInWithEmailPassword(email, password);
        return user;
    }
);

export const slice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        // clrUser: (state) => {
        //     state.user = null;
        // },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signInWithEmailPasswordThunk.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(
                signInWithEmailPasswordThunk.fulfilled,
                (state, action) => {
                    state.isLogin = true;
                    state.status = 'idle';
                }
            )
            .addCase(signInWithEmailPasswordThunk.rejected, (state, action) => {
                state.status = 'error';
                state.errorMessage = action.error.message;
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
export const selectErrorMessage = (state) => state.login.errorMessage;
