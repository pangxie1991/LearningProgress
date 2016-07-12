class Queue {
	constructor() {
		this._dataStore = [];
	}
	
	enqueue(element) {
		this._dataStore.push(element);
		return this;
	}
	
	dequeue() {
		return this._dataStore.shift();
	}
	
	front() {
		return this._dataStore[0];
	}
	
	back() {
		return this._dataStore[this._dataStore.length - 1];
	}
	
	toString() {
		let string = '';
		for (let i = 0, l = this._dataStore.length; i < l; i++) {
		    string += this._dataStore[i] + '/n';
		}
		return string;
	}
	
	isEmpty() {
		return this._dataStore.length === 0;
	}
	
	getLength() {
		return this._dataStore.length;
	}
}

export default Queue
