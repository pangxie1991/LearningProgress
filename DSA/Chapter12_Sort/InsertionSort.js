import Base from './SelectionSort'

class InsertionSort extends Base {
	
	insertionSort() {
		let temp, inner;
		for (let outer = 1; outer < this.num; outer++) {
		    temp = this._dataStore[outer];
			inner = outer;
			while (inner > 0 && this._dataStore[inner - 1] >= temp) {
				this._dataStore[inner] = this._dataStore[inner - 1];
				--inner;
			}
			this._dataStore[inner] = temp;
			// console.log(this.toString());
		}
		// console.log(this.toString());
	}
}

/*
const test = new InsertionSort(15);
test.setData();
console.log(test.toString());
test.insertionSort();
console.log(test.toString());
*/
