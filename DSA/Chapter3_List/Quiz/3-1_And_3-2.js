import List from '../List'

const bigger = (a, b) => {
	if (typeof a === typeof b) {
		if (typeof a === 'number') {
			return a - b >= 0;
		} else if (typeof a === 'string') {
			return a >= b;
		}
	}
	
	return false;
};

const smaller = (a, b) => {
	if (typeof a === typeof b) {
		if (typeof a === 'number') {
			return a - b <= 0;
		} else if (typeof a === 'string') {
			return a <= b;
		}
	}

	return false;
};

class SpecialList extends List {
	insertMax(element) {
		let filter = this._dataStore.filter(v => bigger(v, element));
		
		if (filter.length === 0) {        
		    this.append(element);
			return this;
		} else {
			return false;
		}
	}
	
	insertMin(element) {
		let filter = this._dataStore.filter(v => smaller(v, element));
		
		if (filter.length === 0) {        
		    this.append(element);
			return this;
		} else {
			return false;
		}
	}
	
}

const test = new SpecialList([1,2,3,5,6]);

console.log(test.insertMin(0));
