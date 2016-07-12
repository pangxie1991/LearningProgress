import Base from './CArray'

class BubbleSort extends Base {
	bubbleSort() {
		// console.log(this.toString());
		for (let outer = this.num; outer > 1; outer--) {
		    for (let inner = 0; inner <= outer; inner++) {
		        if (this._dataStore[inner] > this._dataStore[inner + 1]) {
		            this.swap(inner, inner + 1);
		        }
		    }
			// console.log(this.toString());
		}
		return this.toString();
	}
}

export default BubbleSort

/*
const test = new BubbleSort(10);
test.setData();

console.log(test.bubbleSort());
*/
