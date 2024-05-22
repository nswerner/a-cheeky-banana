// store.js
import { createStore, combineReducers } from 'redux';
import authReducer from './authReducer';
import logsReducer from './logsReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  logs: logsReducer
});

const store = createStore(rootReducer);

export default store;
