import { put, take, delay, select } from 'redux-saga/effects'
import {cancelSorting, highlightElements, swapItemsInArray, updateArray} from "../actions";
import {getPaused, getSpeed} from "../selectors";
import * as actionTypes from "../actionTypes";
import {radixSort} from "../sortings/radixSort";


export function* radixSortSaga(action){
    try {
        const iterator = radixSort(action.payload.startingState);

        for (let step of iterator){

            const indexToChange = step.position;

            yield put(highlightElements([indexToChange]));

            if (step.update){
                yield put(updateArray(step.output));
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
