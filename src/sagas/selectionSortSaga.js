import { put, take, delay, select } from 'redux-saga/effects'
import {
    cancelSorting,
    highlightElements,
    swapItemsInArray
} from "../actions";
import { getPaused, getSpeed} from "../selectors";
import * as actionTypes from "../actionTypes";
import {selectionSort} from "../sortings/selectionSort";


export function* selectionSortSaga(action){
    try {
        const iterator = selectionSort(action.payload.startingState);

        for (let step of iterator){

            let from = step.from;
            let to = step.to;

            yield put(highlightElements([from, to]));

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
