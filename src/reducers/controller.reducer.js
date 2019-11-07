// TODO: rename

import * as actionTypes from "../actionTypes";

export default function controllerReducer(state = {
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



