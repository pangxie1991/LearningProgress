import Base from './SimpleSort'

class QuickSort extends Base {

	quickSort(list = this._dataStore) {
		if (list.length == 0) {
		    return [];
		}
		const lesser = [];
		const greater = [];

		// 基准值, pivot
		const p = list[0];
		for (let i = 1, l = list.length; i < l; i++) {
		    if (list[i] < p) {
		        lesser.push(list[i]);
		    } else {
		    	greater.push(list[i]);
			}
		}
		return [...this.quickSort(lesser), p, ...this.quickSort(greater)];
	}
}

const test = new QuickSort(1000);

test.setData();

console.log(test.toString());

console.log(test.quickSort());
