export function* selectionSort(arr){
    let len = arr.length;
    for (let i = 0; i < len; i++) {
        let min = i;
        for (let j = i + 1; j < len; j++) {
            yield { update: false, from: j };
            if (arr[min].value > arr[j].value) {
                min = j;
            }
        }
        if (min !== i) {
            yield { update: true, from: i, to: min };
            let tmp = arr[i];
            arr[i] = arr[min];
            arr[min] = tmp;
        }
    }
    return arr;
}

let gen = selectionSort([{value: 5}, {value: 1}, {value: 3},{value: 3}, {value: 8}, {value: 2}]);

console.log(gen);


let output;
for (let step of gen){
    if (step.update){
        console.log(step);
    }

};

