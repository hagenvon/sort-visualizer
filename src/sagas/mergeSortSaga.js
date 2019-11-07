import { put, take, delay, select } from 'redux-saga/effects'
import {mergeSort} from "../sortings/mergeSort";
import {getIndexOfItem, getPaused} from "../selectors";
import {cancelSorting, highlightElements, updateArray} from "../actions";
import * as actionTypes from "../actionTypes";

export function* mergeSortSaga(action) {
    try {
        const mergeSortIterator = mergeSort(action.payload.startingState);

        for (let step of mergeSortIterator){


            let newPart = [...step.output];
            let indexToChange;

            for (let i=0; i < newPart.length; i++){

                indexToChange = i === 0
                    ? yield select(getIndexOfItem, step.positioner)
                    : indexToChange + 1;

                yield put(highlightElements([indexToChange]));

                yield put(updateArray({
                    index : indexToChange,
                    item: newPart[i]
                }));

                const paused = yield select(getPaused);
                if (paused) {
                    yield take(actionTypes.RESUME_SORTING);
                    continue
                }

                yield delay( 10 );

            }

        }
    } finally {
        yield put(cancelSorting())
    }

}
