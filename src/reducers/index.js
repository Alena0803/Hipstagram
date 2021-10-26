import thunk from 'redux-thunk';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import { authReducer } from './authReducer';
import { promiseReducer } from './promiseReducer';

const reducer = combineReducers({
    promiseReducer,
    authReducer
})

const store = createStore(reducer, applyMiddleware(thunk)) 
store.subscribe(()=> console.log(store.getState()))
export default store