import compareFunction from "./sortings/compareFunction"

export const getArray = state => state.array;

export const getPaused = state => state.controller.paused;
export const getIsActive = state => state.controller.active;
export const getHighlighted = state => state.controller.highlighted;
export const getIndexOfItem = (state, item) => state.array.findIndex(it=>it.id === item.id);

export const getSpeed = state => state.speed;



export const getSortedArray = (array)=> {
    const _array = [...array];
    _array.sort(compareFunction);

    return _array
};

export const getIsSorted = (state)=> {
    const sortedArray = getSortedArray(state.array);

    return !sortedArray.some((it, index) => {
        return it.value !== state.array[index].value
    });

};
