import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./App.css";
import Item from "./Item.js";

import { createRandomArray } from "./helper/createRandomArray";

import {
  createArray,
  startSorting,
  stopSorting,
  resumeSorting
} from "./actions";
import {
  getArray,
  getHighlighted,
  getIsActive,
  getIsSorted,
  getPaused
} from "./selectors";

import { MAX_VALUE, MIN_VALUE, TOTAL_COUNT } from "./_constants";
import * as sortTypes from "./sortings/_sortTypes";

function App({
  array,
  createRandomArray,
  startSorting,
  highlighted,
  resumeSorting,
  stopSorting,
  isActive,
  paused,
  isSorted
}) {
  return (
    <div className="App">
      {"" + isSorted}
      <div className="wrapper">
        <div className="item-container">
          {array.map(({ value, id }, index) => {
            const isHighlighted = highlighted.includes(index);
            // console.log(highlighted);
            return (
              <Item
                value={value}
                id={id}
                index={index}
                key={index}
                total={TOTAL_COUNT}
                isHighlighted={isHighlighted}
              />
            );
          })}
        </div>
      </div>

      <div className="controls">
        <button
          onClick={() => {
            createRandomArray();
          }}
        >
          create new array
        </button>

        <button
          onClick={() => {
            startSorting(array, sortTypes.MERGE);
          }}
        >
          merge sort
        </button>
        <button
          onClick={() => {
            startSorting(array, sortTypes.BUBBLE);
          }}
        >
          bubble sort
        </button>
        <button
          onClick={() => {
            startSorting(array, sortTypes.RADIX);
          }}
        >
          radix sort
        </button>
        <button
          onClick={() => {
            startSorting(array, sortTypes.QUICK);
          }}
        >
          quick sort
        </button>
        <button
          onClick={() => {
            startSorting(array, sortTypes.INSERTION);
          }}
        >
          insertion sort
        </button>
        <button
          onClick={() => {
            startSorting(array, sortTypes.SELECTION);
          }}
        >
          selection sort
        </button>
        <button
          onClick={() => {
            startSorting(array, sortTypes.HEAP);
          }}
        >
          heap sort
        </button>
        <button
          disabled={!isActive}
          onClick={() => {
            paused ? resumeSorting() : stopSorting();
          }}
        >
          pause/play
        </button>
      </div>
    </div>
  );
}

const mapProps = state => ({
  array: getArray(state),
  highlighted: getHighlighted(state),
  paused: getPaused(state),
  isSorted: getIsSorted(state),
  isActive: getIsActive(state)
});

const mapDispatch = (dispatch, ownProps) => {
  return {
    createRandomArray: () => {
      dispatch(
        createArray(createRandomArray(TOTAL_COUNT, MIN_VALUE, MAX_VALUE))
      );
    },
    startSorting: (array, sortType) => {
      dispatch(startSorting({ startingState: array, sortType }));
    },
    stopSorting: () => {
      dispatch(stopSorting());
    },
    resumeSorting: () => {
      dispatch(resumeSorting());
    }
  };
};

export default connect(
  mapProps,
  mapDispatch
)(App);
