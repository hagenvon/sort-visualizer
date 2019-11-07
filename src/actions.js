import {createAction} from 'redux-actions'
import * as actionTypes from "./actionTypes";

export const createArray = createAction(actionTypes.CREATE_ARRAY);
export const updateArray = createAction(actionTypes.UPDATE_ARRAY);
export const swapItemsInArray = createAction(actionTypes.SWAP_ITEMS);

export const startSorting = createAction(actionTypes.START_SORTING);
export const stopSorting = createAction(actionTypes.STOP_SORTING);
export const cancelSorting = createAction(actionTypes.CANCEL_SORTING);
export const resumeSorting = createAction(actionTypes.RESUME_SORTING);

export const highlightElements = createAction(actionTypes.HIGHLIGHT_ELEMENTS);