import Base from './CArray'

class Sort extends Base {
	constructor(n) {
		super(n);
		this._gaps = ((n) => {
			let h = 1;
			let arr = [];
			while (h < n / 3) {
				arr = [h, ...arr];
				h = 3 * h + 1;
			}
			return arr;
		})(n);
	}

	bubble(arr = this._dataStore) {
		for (let outer = this.num - 1; outer > 1; outer--) {
		    for (let inner = 0; inner < outer; inner++) {
		        if (arr[inner] > arr[inner + 1]) {
		            this.swap(inner, inner + 1, arr);
		        }
		    }
		}
	}

	selection(arr = this._dataStore) {
		let min;
		for (let outer = 0; outer < this.num; outer++) {
			min = outer;
		    for (let inner = outer + 1; inner < this.num; inner++) {
		        if (arr[inner] < arr[min]) {
		            min = inner;
		        }
		    }
		    this.swap(outer, min, arr);
		}
	}

	insertion(arr = this._dataStore) {
		let inner, temp;
		for (let outer = 1; outer < this.num; outer++) {
		    inner = outer;
			temp = arr[inner];
			while (inner > 0 && arr[inner - 1] >= temp) {
				arr[inner] = arr[inner - 1];
				inner --;
			}
			arr[inner] = temp;
		}
	}

	shell(arr = this._dataStore) {
		let temp, inner, gap;
		for (let g = 0, l = this._gaps.length; g < l; g++) {
			gap = this._gaps[g];
		    for (let outer = gap; outer < this.num; outer += gap) {
		        inner = outer;
				temp = arr[inner];
				while (inner > 0 && arr[inner - gap] >= temp) {
					arr[inner] = arr[inner - gap];
					inner -= gap;
				}
				arr[inner] = temp;
		    }
		}
	}

	topHelper(arr, start, step) {
		const stop = ((start + 2 * step) < arr.length) ? (start + 2 * step) : arr.length;
		const leftArr = new Array(step + 1);
		const rightArr = new Array(stop - start - step + 1);
		let k = start;
		for (let i = 0; i < step; i++) {
		    leftArr[i] = arr[k];
			k++;
		}
		leftArr[step] = Infinity;
		k = start + step;
		for (let i = 0, l = rightArr.length - 1; i < l; i++) {
		    rightArr[i] = arr[k];
			k++;
		}
		rightArr[rightArr.length - 1] = Infinity;

		let m = 0, n = 0;
		for (let i = start; i < stop; i++) {
		    if (leftArr[m] < rightArr[n]) {
		        arr[i] = leftArr[m];
				m++;
		    } else {
		    	arr[i] = rightArr[n];
				n++;
			}
		}
	}

	top(arr = this._dataStore) {
		if (arr.length < 2) {
		    return;
		}

		let step = 1;
		while (2*step <= arr.length) {
			let start = 0;
			while ((start + step) < arr.length) {
				this.topHelper(arr, start, step);
				start += 2 * step;
			}
			step *= 2;
		}
	}

	quick(arr = this._dataStore) {
		if (arr.length === 0) {
		    return [];
		}
		const p = arr[0];
		const lesser = [];
		const greater = [];
		for (let i = 1, l = arr.length; i < l; i++) {
		    if (arr[i] < p) {
		        lesser.push(arr[i]);
		    } else {
		    	greater.push(arr[i]);
			}
		}

		return this.quick(lesser).concat(p, this.quick(greater));
	}
}



const A = new Sort(16);


A.setData();
A.bubble();
console.log(A.toString());
A.setData();
A.selection();
console.log(A.toString());
A.setData();
A.insertion();
console.log(A.toString());

A.setData();
A.shell();
console.log(A.toString());
A.setData();
A.top();
console.log(A.toString());
A.setData();
console.log(A.quick());


import {runTime} from './CArray'

function B (num, n) {
	const test = new Sort(num);

	function B() {
		test.setData();
		test.bubble();
	}

	function I() {
		test.setData();
		test.insertion();
	}

	function S() {
		test.setData();
		test.selection();
	}

	function Shell() {
		test.setData();
		test.shell();
	}

	function T() {
		test.setData();
		test.top();
	}

	function Q() {
		test.setData();
		test.quick();
	}

	console.log('\nBubble time:');
	runTime(B, n);
	console.log('\nSelection time:');
	runTime(S, n);
	console.log('\nInsertion time:');
	runTime(I, n);
	console.log('\nShell time:');
	runTime(Shell, n);
	console.log('\nTop time:');
	runTime(T, n);
	console.log('\nQuick time:');
	runTime(Q, n);
}

B(20000, 20);
