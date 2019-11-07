import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import './App.css';
import Item from './Item.js';

import {createRandomArray } from "./helper/createRandomArray";

import {createArray, startSorting, stopSorting, resumeSorting} from "./actions";
import {getArray, getHighlighted, getIsActive, getIsSorted, getPaused} from "./selectors";

const TOTAL_COUNT = 50;
const MIN_VALUE = 0;
const MAX_VALUE = 100000;

function App({array, createRandomArray, startMergeSort, startBubbleSort,startRadixSort,  highlighted, resumeSorting, stopSorting,isActive, paused, isSorted}) {

  return (
      <div className="App">
        {"" + isSorted}
        <div className="wrapper">
          <div className="item-container">
            {array.map(({value, id}, index)=> {
              const isHighlighted = highlighted.includes(index);
              // console.log(highlighted);
                return <Item value={value} id={id} index={index} key={index} total={TOTAL_COUNT} isHighlighted={isHighlighted}/>
            } )}
          </div>
        </div>
        <div className="controls">

          <button onClick={()=> {
            createRandomArray()
          } }>
            create new array
          </button>

          <button onClick={()=> {
            startMergeSort(array)
          } }>
            merge sort
          </button>
          <button onClick={()=> {
            startBubbleSort(array)
          } }>
            bubble sort
          </button>
          <button onClick={()=> {
            startRadixSort(array)
          } }>
            radix sort
          </button>
          <button disabled={!isActive} onClick={()=> {
            paused ? resumeSorting() : stopSorting()
          } }>
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
    createRandomArray: ()=> {
      dispatch(createArray(createRandomArray(TOTAL_COUNT, MIN_VALUE, MAX_VALUE)))
    },
    startMergeSort: (array) => {
      dispatch(startSorting({startingState: array, sortType: "mergeSort"}));
    },
    startBubbleSort: (array) => {
      dispatch(startSorting({startingState: array, sortType: "bubbleSort"}));
    },
    startRadixSort: (array) => {
      dispatch(startSorting({startingState: array, sortType: "radixSort"}));
    },
    stopSorting: () => {
      dispatch(stopSorting());
    },
    resumeSorting: () => {
      dispatch(resumeSorting());
    }
  }
};

export default connect(mapProps, mapDispatch)(App);
