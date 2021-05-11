import { createStore, applyMiddleware, compose } from '@reduxjs/toolkit';
import ReduxThunk from 'redux-thunk';

import rootReducer from './reducers';

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, compose(applyMiddleware(ReduxThunk)));
};
