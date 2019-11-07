import compareFunction from "./compareFunction"

// Split the array into halves and merge them recursively
export function* mergeSort (arr) {
    if (arr.length === 1) {
        // return once we hit an array with a single item
        yield {action: "return", output: arr, input: arr, sortedLeft: arr, sortedRight: [], positioner: arr[0]};
        return arr
    }

    const middle = Math.floor(arr.length / 2) // get the middle item of the array rounded down
    const left = arr.slice(0, middle) // items on the left side
    const right = arr.slice(middle) // items on the right side

    // yield {action: "split", left, right, input: arr};

    const sortedLeft = yield* mergeSort(left);
    const sortedRight = yield* mergeSort(right);

    const output = yield* merge(
        sortedLeft, sortedRight
    );

    yield {type: "return", output, input: arr, positioner: sortedLeft[0], sortedLeft, sortedRight, unsortedLeft: left, unsortedRight: right};

    return output;

}

// compare the arrays item by item and return the concatenated result
function* merge (left, right) {
    let sortedArray = [];

    while (left.length && right.length) {

        const leftElement = left[0];
        const rightElement = right[0];
        let elementToPush;

        // yield {action: "compare", sortedArray, left, right, leftElement, rightElement};

        if ( compareFunction(leftElement, rightElement ) < 0 ) {
            elementToPush = leftElement;
            left = left.slice(1);
        } else {
            elementToPush = rightElement;
            right = right.slice(1);
        }
        sortedArray.push(elementToPush);
        // yield {action: "push", sortedArray, left, right, pushedElement: elementToPush}
    }

    const trail = left.concat(right);

    const result = sortedArray.concat(trail);

    // yield { action: "concat", sortedArray, trail, result};

    return result
}






// console.log(createRandomArray());
