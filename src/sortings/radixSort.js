
export function* radixSort(givenArray){
    let arr = [...givenArray];
    const values = arr.map(it=>it.value);
    const maxNum = Math.max(...values) * 10;
    let divisor = 10;

    while (divisor <= maxNum) {
        let buckets = [...Array(10)].map(() => []);

        for (let i = 0; i < arr.length; i++){
            let item = arr[i];
            buckets[Math.floor((item.value % divisor) / (divisor / 10))].push(item);
            yield { update: false, position: i }
        }

        arr = [].concat.apply([], buckets);
        divisor *= 10;
        yield { update: true, output: arr }
    }
    return arr;
};

