class Stack {
	constructor() {
		this._dataStore = [];
		this._top = 0;
	}
	
	push(element) {
		this._dataStore[this._top++] = element;
	}
	
	pop() {
		return this._dataStore[--this._top];
	}
	
	peek() {
		return this._dataStore[this._top - 1];
	}
	
	getLength() {
		return this._top;
	}
	
	clear() {
		this._top = 0;
	}
	
	isEmpty() {
		return this._top === 0;
	}
}

export default Stack
