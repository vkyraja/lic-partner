import axios from 'axios';

const USER_MAP_DATA_SUCCESS = 'userForm/USER_MAP_DATA_SUCCESS';
const USER_MAP_DATA_ERROR = 'userForm/USER_MAP_DATA_ERROR';
const RESET_USER_MAP_DATA = 'userForm/RESET_USER_MAP_DATA';

const initialState = {
    userMapData: null,
    userMapDataError: false
};

const getUserMapData = (userData) => {
    return (dispatch) => {
        return axios.get(`http://api.zippopotam.us/${userData.country}/${userData.state}/${userData.city}`)
            .then(resp => {
                if (resp && resp.status === 200) {
                    dispatch(updateUserDataSuccess(resp.data));
                } else {
                    dispatch(updateUserDataError());
                }
            })
            .catch(() => {
                dispatch(updateUserDataError());
            });
    };
};

const updateUserDataSuccess = (userData) => {
    return { type: USER_MAP_DATA_SUCCESS, payload: { data: userData } };
};

const updateUserDataError = () => {
    return { type: USER_MAP_DATA_ERROR };
};

const userFormReducer = (state = initialState, action) => {
    let nextState;
    const { type, payload } = action;
    switch(type) {
        case USER_MAP_DATA_SUCCESS: {
            nextState = { ...state, userMapData: payload.data, userMapDataError: false };
            return nextState;
        }
        case USER_MAP_DATA_ERROR: {
            nextState = { ...state, userMapData: null, userMapDataError: true };
            return nextState;
        }
        case RESET_USER_MAP_DATA:
            return initialState;
        default:
            return state;
    }
};

export const actions = {
    getUserMapData
};;

export default userFormReducer;
