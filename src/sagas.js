import { put, takeEvery, take, call, fork, cancel, spawn, cancelled, delay, select } from 'redux-saga/effects'
import * as actionTypes from "./actionTypes";

import {updateArray, stopSorting, highlightElements, cancelSorting, swapItemsInArray} from "./actions";
import {getIndexOfItem, getPaused} from "./selectors";

import {mergeSort} from "./sortings/mergeSort";

import {bubbleSortSaga} from "./sagas/bubbleSortSaga";
import {mergeSortSaga} from "./sagas/mergeSortSaga";

// worker Saga


function getSortSaga(sortType){
    const lib = {
        mergeSort: mergeSortSaga,
        bubbleSort: bubbleSortSaga
    };

    return lib[sortType];
}


export function* watchStartMergeSort() {


    while(true){

        const action = yield take(actionTypes.START_SORTING);

        let sortTask = yield fork(getSortSaga(action.payload.sortType), action);

        yield take([actionTypes.CREATE_ARRAY, actionTypes.START_SORTING, actionTypes.CANCEL_SORTING]);

        yield cancel(sortTask)

    }
}




// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
// export function* watchStartMergeSort() {
//     yield takeEvery(actionTypes.START_SORTING, startMergeSort);
// }
