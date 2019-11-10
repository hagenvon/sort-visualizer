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



//
let gen = quickSort([{value: 5}, {value: 1}, {value: 3},{value: 3}, {value: 8}, {value: 2}]);

console.log(gen);


let output;
for (let step of gen){
    if (step.update){
        console.log(step);
    }

};


