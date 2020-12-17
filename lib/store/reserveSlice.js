import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
} from '@reduxjs/toolkit';

const initialState = {
    pickup: null,
    dropoff: null,
};

export const slice = createSlice({
    name: 'reserve',
    initialState,
    reducers: {
        pickupAction: {
            reducer(state, action) {
                state.pickup = action.payload;
            },
            prepare(addrObj, inputSrc /* typein, airport, pinonmap*/) {
                return {
                    payload: {
                        ...addrObj,
                        inputSrc,
                    },
                };
            },
        },
        dropoffAction: {
            reducer(state, action) {
                state.dropoff = action.payload;
            },
            prepare(addrObj, inputSrc) {
                return {
                    payload: {
                        ...addrObj,
                        inputSrc,
                    },
                };
            },
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
