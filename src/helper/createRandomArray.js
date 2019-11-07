import uuid4 from "uuid4";

export function createRandomArray(length = 10, min, max) {
    const result = [];
    for (let i = 0; i < length; i++) {

        result.push( {
            id: uuid4(),
            value: getRandomInt(min,max)
        } )
    }

    return result
}

function getRandomInt(min = 0, max = 100) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
