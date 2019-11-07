export function swapItems(givenArray, from, to){
    if (from === to) return givenArray;

    const result = [...givenArray];
    const tmp = result[from];
    result[from] = result[to];
    result[to] = tmp;

    return result
}

export function putAt(givenArray, index, item){
    const result = [...givenArray];
    result[index] = item;

    return result
}

export function updateSequence(actualArray, startingIndex, newPart){
    let newArray = [...actualArray];
    newArray.splice(startingIndex, newPart.length, ...newPart);

    return newArray
}

export function insertAt(actualArray, startingIndex, newPart){
    let newArray = [...actualArray];
    newArray.splice(startingIndex, 0, ...newPart);

    return newArray
}
