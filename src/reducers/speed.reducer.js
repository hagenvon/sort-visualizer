import * as actionTypes from "../actionTypes";

const MIN_DELAY = 10;
const MAX_DELAY = 1000;

export default function speedReducer(initialState = 10, action){
    switch(action.type){
        case actionTypes.SET_SPEED:
            return action.payload;
        case actionTypes.SPEED_UP:
            return Math.max(action.payload, MIN_DELAY);
        case actionTypes.SLOW_DOWN:
            return Math.min(action.payload, MAX_DELAY);
        default:
            return initialState;
    }
}
