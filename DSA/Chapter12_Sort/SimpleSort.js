import Base from './CArray'

class SimpleSort extends Base {
	bubble() {
		for (let outer = this.num; outer > 1; outer--) {
			for (let inner = 0; inner <= outer; inner++) {
				if (this._dataStore[inner] > this._dataStore[inner + 1]) {
					this.swap(inner, inner + 1);
				}
			}
		}
	}

	selection() {
		let min;
		for (let outer = 0; outer < this.num; outer++) {
			min = outer;
			for (let inner = outer + 1; inner < this.num; inner++) {
				if (this._dataStore[inner] < this._dataStore[min]) {
					min = inner;
				}
			}
			this.swap(outer, min);
		}
	}

	insertion() {
		let temp, inner;
		for (let outer = 1; outer < this.num; outer++) {
			temp = this._dataStore[outer];
			inner = outer;
			while (inner > 0 && this._dataStore[inner - 1] >= temp) {
				this._dataStore[inner] = this._dataStore[inner - 1];
				--inner;
			}
			this._dataStore[inner] = temp;
		}
	}
}

export default SimpleSort

/*

// *
// Insertion better than Selection better than Bubble
// --------------------------------------------------------------------------------

import {runTime} from './CArray'

const test = new SimpleSort(10000);

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

runTime(B, 10);
runTime(S, 10);
runTime(I, 10);

*/
