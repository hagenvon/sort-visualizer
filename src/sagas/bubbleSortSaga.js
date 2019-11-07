import { put, take, delay, select } from 'redux-saga/effects'
import {bubbleSort} from "../sortings/bubbleSort";
import {cancelSorting, highlightElements, swapItemsInArray} from "../actions";
import {getPaused} from "../selectors";
import * as actionTypes from "../actionTypes";


export function* bubbleSortSaga(action){
    try {
        const bubbleSortIterator = bubbleSort(action.payload.startingState);

        for (let step of bubbleSortIterator){

            const indexToChange = step.from;

            yield put(highlightElements([indexToChange]));

            if (step.swap){
                yield put(swapItemsInArray({
                    from : step.from,
                    to: step.to
                }));
            }

            const paused = yield select(getPaused);
            if (paused) {
                yield take(actionTypes.RESUME_SORTING);
                continue
            }

            yield delay( 10 );

        }

    } finally {
        yield put(cancelSorting())
    }
}
