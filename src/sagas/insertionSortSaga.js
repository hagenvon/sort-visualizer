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
import {insertionSort} from "../sortings/insertionSort";


export function* insertionSortSaga(action){
    try {
        const iterator = insertionSort(action.payload.startingState);

        for (let step of iterator){

            let from = step.from;
            let to = step.to;

            yield put(highlightElements([from, to]));

            if (step.key) {
                yield put(putAtInArray({
                    index : from,
                    item: step.key
                }));
            } else {
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
