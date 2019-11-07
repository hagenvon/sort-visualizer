import {bubbleSort} from "./bubbleSort";
import {createRandomArray} from "../helper/createRandomArray";
import {getSortedArray} from "./_getSortedArray";


test("sort by value", ()=>{
    const unsortedArray = [{value: 3}, {value: 2}, {value: 1}];

    const gen = bubbleSort(unsortedArray);
    let actual;
    for (let step of gen){
        actual = step.output;
    }
    const expected = [{value: 1}, {value: 2}, {value: 3}];

    expect(actual).toEqual(expected)

});

test("sort stable", ()=>{
    const unsortedArray = [{value: 3, id: "A1"}, {value: 2, id: "B1"}, {value: 3, id: "A2"},{value: 2, id: "B2"}];

    const gen = bubbleSort(unsortedArray);
    let actual;
    for (let step of gen){
        actual = step.output;
    }
    const expected = [{value: 2, id: "B1"},{value: 2, id: "B2"},{value: 3, id: "A1"},{value: 3, id: "A2"}];

    expect(actual).toEqual(expected)
});

describe("step by step", ()=>{
    const unsortedArray = [{value: 3}, {value: 2}, {value: 1}];

    const gen = bubbleSort(unsortedArray);
    let actual, expected;
    test("step 1 - swap", ()=>{
        const { value } = gen.next();
        const actual = value.output;
        expected = [{value: 2}, {value: 3}, {value: 1}];

        expect(actual).toEqual(expected)
    });

    test("step 2 - swap", ()=>{
        const { value } = gen.next();
        const actual = value.output;
        expected = [{value: 2}, {value: 1}, {value: 3}];

        expect(actual).toEqual(expected)
    });

    test("step 3", ()=>{
        const { value } = gen.next();
        const actual = value.from;

        expect(actual).toEqual(2)
    });

    test("step 4 - swap", ()=>{
        const { value } = gen.next();
        const actual = value.output;
        expected = [{value: 1}, {value: 2}, {value: 3}];

        expect(actual).toEqual(expected)
    });

    test("step 5 ", ()=>{
        const { value } = gen.next();
        const actual = value.from;

        expect(actual).toEqual(1)
    });

    test("step 6 ", ()=>{
        const { value } = gen.next();
        const actual = value.from;

        expect(actual).toEqual(2)
    });

    test("step 7 ", ()=>{
        const { value } = gen.next();
        const actual = value.from;

        expect(actual).toEqual(0)
    });

    test("step 8 ", ()=>{
        const { value } = gen.next();
        const actual = value.from;

        expect(actual).toEqual(1)
    });

    test("step 9 ", ()=>{
        const { value } = gen.next();
        const actual = value.from;

        expect(actual).toEqual(2)
    });

    test("step 10 - done", ()=>{
        const { value, done } = gen.next();
        const actual = done;

        expect(actual).toEqual(true)
    });

});
