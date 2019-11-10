
export function* insertionSort(inputArr){
    let length = inputArr.length;
    for (let i = 1; i < length; i++) {
        let key = inputArr[i];
        let j = i - 1;
        while (j >= 0 && inputArr[j].value > key.value) {
            yield { update: true, from: j + 1, to: j };
            inputArr[j + 1] = inputArr[j];
            j = j - 1;
        }
        yield { update: true, from: j + 1, to: i, key };
        inputArr[j + 1] = key;
    }
    return inputArr;
};


let gen = insertionSort([{value: 5}, {value: 1}, {value: 3},{value: 3}, {value: 8}, {value: 2}]);

console.log(gen);


let output;
for (let step of gen){
    if (step.update){
        console.log(step);
    }

};

