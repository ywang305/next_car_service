import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
} from '@reduxjs/toolkit';

const initialState = {
    pickup: '',
    dropoff: '',
};

export const slice = createSlice({
    name: 'reserve',
    initialState,
    reducers: {
        pickupAction: (state, action) => {
            state.pickup = action.payload;
        },
        dropoffAction: (state, action) => {
            state.dropoff = action.payload;
        },
    },
});

export default slice.reducer;

export const { pickupAction, dropoffAction } = slice.actions;

export function selectPickup(state) {
    return state.reserve.pickup;
}
export function selectDropoff(state) {
    return state.reserve.dropoff;
}
