function generateRandomArray(length, min, max) {
    return Array.from({ length }, () => Math.floor(Math.random() * (max - min + 1)) + min);
}

let data = generateRandomArray(50, 1, 60);
let chart = document.getElementById('chart');
let speed = 20; 

function updateChart() {
    chart.innerHTML = data.map(value => `<div style="height: ${value * 5}px;">${value}</div>`).join('');
}

document.getElementById('randomize').addEventListener('click', () => {
    data = generateRandomArray(data.length, 1, 60);
    updateChart();
});

document.getElementById('selectionSort').addEventListener('click', async () => {
    for (let i = 0; i < data.length - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < data.length; j++) {
            if (data[j] < data[minIdx]) {
                minIdx = j;
            }
        }
        [data[i], data[minIdx]] = [data[minIdx], data[i]];
        updateChart();
        await new Promise(resolve => setTimeout(resolve, 10000 / speed));
    }
});

document.getElementById('bubbleSort').addEventListener('click', async () => {
    for (let i = 0; i < data.length - 1; i++) {
        for (let j = 0; j < data.length - i - 1; j++) {
            if (data[j] > data[j + 1]) {
             
                [data[j], data[j + 1]] = [data[j + 1], data[j]];
                updateChart();
                await new Promise(resolve => setTimeout(resolve, 10000 / speed));
            }
        }
    }
});

document.getElementById('speed').addEventListener('input', (e) => {
    speed = e.target.value;
});

async function quicksort(low, high) {
    if (low < high) {
        let pivotIndex = await partition(low, high);
        await quicksort(low, pivotIndex - 1);
        await quicksort(pivotIndex + 1, high);
    }
}

async function partition(low, high) {
    let pivot = data[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        if (data[j] < pivot) {
            i++;
            [data[i], data[j]] = [data[j], data[i]];
            updateChart();
            await new Promise(resolve => setTimeout(resolve, 10000 / speed));
        }
    }

    [data[i + 1], data[high]] = [data[high], data[i + 1]];
    updateChart();
    await new Promise(resolve => setTimeout(resolve, 10000 / speed));
    return i + 1;
}

document.getElementById('quicksort').addEventListener('click', async () => {
    await quicksort(0, data.length - 1);
});


async function mergeSort(arr, l, r) {
    if (l < r) {
        const m = Math.floor((l + r) / 2);
        await mergeSort(arr, l, m);
        await mergeSort(arr, m + 1, r);
        await merge(arr, l, m, r);
    }
}

async function merge(arr, l, m, r) {
    const n1 = m - l + 1;
    const n2 = r - m;
    const L = new Array(n1);
    const R = new Array(n2);

    for (let i = 0; i < n1; i++) {
        L[i] = arr[l + i];
    }
    for (let j = 0; j < n2; j++) {
        R[j] = arr[m + 1 + j];
    }

    let i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        updateChart();
        await new Promise(resolve => setTimeout(resolve, 10000 / speed));
        k++;
    }

    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
    }

    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
    }
}


async function insertionSort() {
    for (let i = 1; i < data.length; i++) {
        let current = data[i];
        let j = i - 1;
        while (j >= 0 && data[j] > current) {
            data[j + 1] = data[j];
            j--;
            updateChart();
            await new Promise(resolve => setTimeout(resolve, 10000 / speed));
        }
        data[j + 1] = current;
    }
}

document.getElementById('insertionSort').addEventListener('click', async () => {
    await quicksort(0, data.length - 1);
});


document.getElementById('mergeSort').addEventListener('click', async () => {
    await mergeSort(data, 0, data.length - 1);
});


async function shellSort() {
    const n = data.length;
    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
        for (let i = gap; i < n; i++) {
            const temp = data[i];
            let j;
            for (j = i; j >= gap && data[j - gap] > temp; j -= gap) {
                data[j] = data[j - gap];
            }
            data[j] = temp;
            updateChart();
            await new Promise(resolve => setTimeout(resolve, 1000 / speed));
        }
    }
}


document.getElementById('shellSort').addEventListener('click', async () => {
    await shellSort();
});





updateChart();



