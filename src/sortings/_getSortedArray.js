import compareFunction from "./compareFunction";

export function getSortedArray(array){
    const _array = [...array];
    _array.sort(compareFunction);

    return _array
};
