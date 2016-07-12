import Base from './BubbleSort'

class SelectionSort extends Base {
	
	selectionSort() {
		let min;
		for (let outer = 0; outer < this.num - 1; outer++) {
		    min = outer;
			for (let inner = outer + 1; inner < this.num; inner++) {
			    if (this._dataStore[inner] < this._dataStore[min]) {        
			        min = inner
			    }
			}
			this.swap(outer, min);
			// console.log(this.toString());
		}
	}
}

export default SelectionSort

/*
const test = new SelectionSort(20);

test.setData();
console.log(test.toString());
test.selectionSort();
// console.log(test.toString());
*/
