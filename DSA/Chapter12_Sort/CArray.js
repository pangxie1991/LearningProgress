class CArray {
	constructor(n) {
		this._dataStore = new Array(n);
		this._pos = 0;
		this.num = n;
	}

	toString() {
		let cl = '';
		for (let i = 0; i < this.num; i++) {
		    cl += ' ' + this._dataStore[i] + ' ';
			if ((i + 1) % 20 === 0) {
			    cl += '\n';
			}
		}
		return cl;
	}

	clear() {
		for (let i = 0; i < this.num; i++) {
		    this._dataStore[i] = null;
		}
	}

	setData() {
		for (let i = 0; i < this.num; i++) {
		    this._dataStore[i] = Math.floor(Math.random() * (2*this.num + 1));
		}
	}

	swap (index1, index2 ,arr = this._dataStore) {
		[arr[index1], arr[index2]] = [arr[index2], arr[index1]];
	}
}

export default CArray

export function runTime (func, n, args = []) {
	const start = new Date().getTime();
	for (let i = 0; i < n; i++) {
	    func(...args);
	}
	const end = new Date().getTime();
	console.log(end - start);
}
/*
const test = new CArray(100);
test.setData();
console.log(test.toString());
*/
