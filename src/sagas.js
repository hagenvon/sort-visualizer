import {
  put,
  takeEvery,
  take,
  call,
  fork,
  cancel,
  spawn,
  cancelled,
  delay,
  select
} from "redux-saga/effects";
import * as actionTypes from "./actionTypes";

import * as sortTypes from "./sortings/_sortTypes";
import { bubbleSortSaga } from "./sagas/bubbleSortSaga";
import { mergeSortSaga } from "./sagas/mergeSortSaga";
import { radixSortSaga } from "./sagas/radixSortSaga";
import { quickSortSaga } from "./sagas/quickSortSaga";
import { insertionSortSaga } from "./sagas/insertionSortSaga";
import { selectionSortSaga } from "./sagas/selectionSortSaga";
import { heapSortSaga } from "./sagas/heapSortSaga";

function getSortSaga(sortType) {
  const lib = {
    [sortTypes.MERGE]: mergeSortSaga,
    [sortTypes.BUBBLE]: bubbleSortSaga,
    [sortTypes.RADIX]: radixSortSaga,
    [sortTypes.QUICK]: quickSortSaga,
    [sortTypes.INSERTION]: insertionSortSaga,
    [sortTypes.SELECTION]: selectionSortSaga,
    [sortTypes.HEAP]: heapSortSaga
  };

  return lib[sortType];
}

export function* watchSortingActions() {
  while (true) {
    const action = yield take(actionTypes.START_SORTING);

    let sortTask = yield fork(getSortSaga(action.payload.sortType), action);

    yield take([
      actionTypes.CREATE_ARRAY,
      actionTypes.START_SORTING,
      actionTypes.CANCEL_SORTING
    ]);

    yield cancel(sortTask);
  }
}
