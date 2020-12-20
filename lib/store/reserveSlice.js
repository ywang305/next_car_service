import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
} from '@reduxjs/toolkit';

const initialState = {
    pickup: null,
    dropoff: null,
    distance: 0,
    duration: 0,
    vehicleId: 'BMW iR',
};

export const slice = createSlice({
    name: 'reserve',
    initialState,
    reducers: {
        pickupAction: {
            reducer(state, action) {
                state.pickup = action.payload;
                if (!state.pickup) {
                    state.distance = 0;
                    state.duration = 0;
                }
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
                if (!state.dropoff) {
                    state.distance = 0;
                    state.duration = 0;
                }
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
        routeAction: {
            reducer(state, action) {
                const { distance, duration } = action.payload;
                state.distance = distance;
                state.duration = duration;
            },
            prepare(distance, duration) {
                return {
                    payload: {
                        distance,
                        duration,
                    },
                };
            },
        },
        vehicleIdAction: (state, action) => {
            const vid = action.payload;
            state.vehicleId = vid;
        },
    },
});

export default slice.reducer;

export const {
    pickupAction,
    dropoffAction,
    routeAction,
    vehicleIdAction,
} = slice.actions;

export function selectPickup(state) {
    return state.reserve.pickup;
}
export function selectDropoff(state) {
    return state.reserve.dropoff;
}

export function selectDistance(state) {
    return state.reserve.distance;
}
export function selectVehicldeId(state) {
    return state.reserve.vehicleId;
}
