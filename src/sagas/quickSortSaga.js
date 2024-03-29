import { put, take, delay, select } from 'redux-saga/effects'
import {
    cancelSorting,
    highlightElements,
    putAtInArray,
    swapItemsInArray,
    updateArray,
    updateSequenceInArray
} from "../actions";
import {getIndexOfItem, getPaused, getSpeed} from "../selectors";
import * as actionTypes from "../actionTypes";
import {quickSort} from "../sortings/quickSort";


export function* quickSortSaga(action){
    console.log("start", action.payload.startingState);
    try {
        const iterator = quickSort(action.payload.startingState);


        for (let step of iterator){


            let pivotIndex = yield select(getIndexOfItem, step.pivot);
            let from = yield select(getIndexOfItem, step.from);
            let to = yield select(getIndexOfItem, step.to);

            yield put(highlightElements([from, to, pivotIndex]));

            if (step.update) {
                yield put(swapItemsInArray({
                    from : from,
                    to: to
                }));
            }

            const paused = yield select(getPaused);
            if (paused) {
                yield take(actionTypes.RESUME_SORTING);
                continue
            }

            yield delay( yield select(getSpeed) );


        }

    } finally {
        yield put(cancelSorting())
    }
}
