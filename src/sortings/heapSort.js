export function* heapSort(givenArray) {
  let result = [...givenArray];
  let arrLength;

  yield* _heapSort(result);

  return result;

  // create max heap
  function* maxHeap(input, i) {
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    let max = i;

    if (left < arrLength && input[left].value > input[max].value) {
      max = left;
    }

    if (right < arrLength && input[right].value > input[max].value) {
      max = right;
    }

    if (max != i) {
      yield* swap(input, i, max);
      yield* maxHeap(input, max);
    }
  }

  function* swap(input, indexA, indexB) {
    const temp = input[indexA];

    input[indexA] = input[indexB];
    input[indexB] = temp;
    yield { update: true, from: indexA, to: indexB };
  }

  function* _heapSort(input) {
    arrLength = input.length;

    for (let i = Math.floor(arrLength / 2); i >= 0; i -= 1) {
      yield* maxHeap(input, i);
    }

    for (let i = input.length - 1; i > 0; i--) {
      yield* swap(input, 0, i);
      arrLength--;

      yield* maxHeap(input, 0);
    }
    return;
  }
}

let gen = heapSort([
  { value: 5 },
  { value: 1 },
  { value: 3 },
  { value: 3 },
  { value: 8 },
  { value: 2 }
]);

console.log(gen);

let output;
for (let step of gen) {
  if (step.update) {
    console.log(step);
  }
}
