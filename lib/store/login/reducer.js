import TYPE from './action_type';

const initState = {
    userId: '',
    password: '',
};

const loginReducer = (myState = initState, action) => {
    switch (action.type) {
        case TYPE.SET_LOGIN_USER: {
            const { userId, password } = action;
            return { ...myState, userId, password };
        }
        case TYPE.CLR_LOGIN_USER: {
            return initState;
        }
        default:
            return myState;
    }
};
export default loginReducer;
