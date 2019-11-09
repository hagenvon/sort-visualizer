export function* quickSort(arr, left = 0, right = arr.length - 1) {
    if (left >= right) return;
    const pivot = arr[Math.floor((left + right) / 2)];
    const index = yield* partition(arr, left, right, pivot);
    yield* quickSort(arr, left, index - 1);
    yield* quickSort(arr, index, right);

    return arr;
}
function* partition(arr, left, right, pivot) {
    while (left <= right) {
        while (arr[left].value < pivot.value && left <= right) {
            yield { update: false, from: arr[left], to: arr[right], pivot };
            left++;
        }
        while (arr[right].value > pivot.value) {
            yield { update: false, from: arr[left], to: arr[right], pivot };
            right--;
        }
        if (left <= right) {
            // arr = swap(arr, left, right);
            yield { update: true, from: arr[left], to: arr[right], pivot };
            [arr[left], arr[right]] = [arr[right], arr[left]];
            left++;
            right--;
        }
    }
    return left;
}

function swap(givenArray, index1, index2){
    let arr = [...givenArray];

    let tmp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = tmp;

    return arr
}

// export function* quickSort(givenArray){
//     let arr = [...givenArray];
//     if (arr.length < 2) {
//         // yield { update: false, output: arr, positioner: arr[0] };
//         return arr
//     }
//     const pivot = arr[Math.floor(Math.random() * arr.length)];
//
//     let left = [];
//     let equal = [];
//     let right = [];
//
//     for (let i = 0; i < arr.length; i++){
//         let element = arr[i];
//         if (element.value > pivot.value) {
//             right.push(element);
//             yield { update: false, item: element, pivot }
//         }
//         else if (element.value < pivot.value) {
//             left.push(element);
//             yield { update: false, item: element, pivot }
//         }
//         else {
//             equal.push(element);
//             yield { update: false, item: element, pivot }
//         }
//
//
//     }
//
//
//     const sortedLeft = yield* quickSort(left);
//     const sortedRight = yield* quickSort(right);
//     const output = [...sortedLeft, ...equal, ...sortedRight];
//
//
//     yield { update: true, output: output, sortedLeft, equal, sortedRight, pivot, input: arr  };
//     // console.log(output, arr);
//
//     return output
// };


//
let gen = quickSort([{value: 5}, {value: 1}, {value: 3},{value: 3}, {value: 8}, {value: 2}]);

console.log(gen);


let output;
for (let step of gen){
    if (step.update){
        console.log(step);
    }

};


