import compareFunction from "./compareFunction"
import {swapItems} from "../helper/arrayUtils";

// const compareFunction = function isLessThan(a, b){
//     return a.value - b.value
// };

export function* bubbleSort(inputArr){
    let newArray = [...inputArr];
    let len = newArray.length;
    let swapped;
    do {
        swapped = false;
        for (let i = 0; i < len; i++) {
            let swap = false;
            const leftItem = newArray[i];
            const rightItem = newArray[i + 1];
            if (rightItem && compareFunction(leftItem, rightItem) > 0) {
                newArray = swapItems(newArray, i, i + 1);
                swapped = true;
                swap = true;
            }
            yield { output: newArray, swap, from: i, to: i+1 }
        }
    } while (swapped);
    return newArray;
};


