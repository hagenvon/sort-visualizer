import {createStore, applyMiddleware, combineReducers,compose } from 'redux'
// import {createAction} from 'redux-actions'
import createSagaMiddleware from 'redux-saga'
import { watchStartMergeSort } from './sagas'
import {createRandomArray, mergeSort} from "./sortings/mergeSort";
import * as actionTypes from "./actionTypes";
import {putAt, swapItems} from "./helper/arrayUtils";

const reducer = combineReducers({
    array: displayArray,
    controller: arrayController
});

const sagaMiddleware = createSagaMiddleware();

let store = createStore(reducer,
    compose(
        applyMiddleware(sagaMiddleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )

);
sagaMiddleware.run(watchStartMergeSort);


function displayArray(state = [], action){

    switch(action.type){
        case actionTypes.UPDATE_ARRAY:
            const {index, item} = action.payload;

            return putAt(state, index, item);
        case actionTypes.SWAP_ITEMS:
            const {from, to} = action.payload;

            return swapItems(state, from, to);
        case actionTypes.CREATE_ARRAY:
            return [...action.payload];
        default:
            return state;
    }
}

function arrayController(state = {
    active: false,
    paused: false,
    startingState: [],
    highlighted: [],
    sortType: ""
}, action){

    switch(action.type){
        case actionTypes.START_SORTING:
            let {startingState, sortType} = action.payload;
            return {
                ...state,
                active: true,
                paused: false,
                startingState,
                sortType
            };
        case actionTypes.CANCEL_SORTING:
            return {
                ...state,
                active: false,
                paused: false,
                highlighted: []
            };
        case actionTypes.STOP_SORTING:
            return {
                ...state,
                paused: true
            };
        case actionTypes.RESUME_SORTING:
            return {
                ...state,
                paused: false
            };
        case actionTypes.HIGHLIGHT_ELEMENTS:
            return {
                ...state,
                highlighted: [...action.payload]
            };
        default:
            return state;
    }
}









export default store
