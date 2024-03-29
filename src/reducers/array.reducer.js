import * as actionTypes from "../actionTypes";
import {putAt, swapItems, updateSequence} from "../helper/arrayUtils";

export default function arrayReducer(state = [], action){

    switch(action.type){
        case actionTypes.UPDATE_ARRAY:
            return [...action.payload];

        case actionTypes.PUT_AT:
            const {index, item} = action.payload;
            return putAt(state, index, item);

        case actionTypes.SWAP_ITEMS:
            const {from, to} = action.payload;
            return swapItems(state, from, to);

        case actionTypes.UPDATE_SEQUENCE:
            const {startingIndex, items} = action.payload;
            return updateSequence(state, startingIndex, items);

        case actionTypes.CREATE_ARRAY:
            return [...action.payload];
        default:
            return state;
    }
}
