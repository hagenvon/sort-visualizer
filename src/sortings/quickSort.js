
export function* quickSort(givenArray){
    let arr = [...givenArray];
    if (arr.length < 2) {
        // yield { update: false, output: arr, positioner: arr[0] };
        return arr
    }
    const pivot = arr[Math.floor(Math.random() * arr.length)];

    let left = [];
    let equal = [];
    let right = [];

    for (let i = 0; i < arr.length; i++){
        let element = arr[i];
        if (element.value > pivot.value) {
            right.push(element);
            yield { update: false, item: element, pivot }
        }
        else if (element.value < pivot.value) {
            left.push(element);
            yield { update: false, item: element, pivot }
        }
        else {
            equal.push(element);
            yield { update: false, item: element, pivot }
        }


    }


    const sortedLeft = yield* quickSort(left);
    const sortedRight = yield* quickSort(right);
    const output = [...sortedLeft, ...equal, ...sortedRight];


    yield { update: true, output: output, sortedLeft, equal, sortedRight, pivot, input: arr  };
    // console.log(output, arr);

    return output
};
//
let gen = quickSort([{value: 5}, {value: 1}, {value: 3},{value: 3}, {value: 8}, {value: 2}]);
let output;
for (let step of gen){
    if (step.update){
        console.log(step);
    }

};


