import { combineReducers } from '@reduxjs/toolkit';

import userFormReducer, { actions as userFormActions } from './userForm';

const rootReducer = combineReducers({
    userFormReducer: userFormReducer
});

export const actions = {
    ...userFormActions
};

export default rootReducer;
