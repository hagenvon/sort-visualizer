import { put, takeEvery, take, call, fork, cancel, spawn, cancelled, delay, select } from 'redux-saga/effects'
import * as actionTypes from "./actionTypes";


import {bubbleSortSaga} from "./sagas/bubbleSortSaga";
import {mergeSortSaga} from "./sagas/mergeSortSaga";
import {radixSortSaga} from "./sagas/radixSortSaga";
import {quickSortSaga} from "./sagas/quickSortSaga";

function getSortSaga(sortType){
    const lib = {
        mergeSort: mergeSortSaga,
        bubbleSort: bubbleSortSaga,
        radixSort: radixSortSaga,
        quickSort: quickSortSaga
    };

    return lib[sortType];
}


export function* watchSortingActions() {


    while(true){

        const action = yield take(actionTypes.START_SORTING);

        let sortTask = yield fork(getSortSaga(action.payload.sortType), action);

        yield take([actionTypes.CREATE_ARRAY, actionTypes.START_SORTING, actionTypes.CANCEL_SORTING]);

        yield cancel(sortTask)

    }
}

