class List {
	constructor(originalArr = []) {
		this._listSize = originalArr.length;
		this._dataStore = originalArr;
		this._pos = 0;
	}

	append(element) {
		this._dataStore[this._listSize++] = element;
		return this;
	}



	clear() {
		delete this._dataStore;
		this._dataStore = [];
		this._listSize = this._pos =  0;
	}

	find(element) {
		if (this.has(element)) {
			let result = [];
			for (let i = 0, l = this._listSize; i < l; i++) {
				if (this._dataStore[i] === element) {
					result.push(i);
				}
			}
			return result;
		} else {
			return [-1];
		}
	}

	getLength() {
		return this._listSize;
	}

	has(element) {
		return this._dataStore.indexOf(element) > -1;
	}

	insert(element, after) {
		if (this.has(after)) {
		    let pos = this.find(after)[0] + 1;
			this._dataStore.splice(pos, 0, element);
			++this._listSize;
			return this;
		} else {
			return false;
		}
	}

	remove(element, deleteAll = false) {
		if (this.has(element)) {
			if (deleteAll) {
				this.find(element).map((value, index) => {
					this._dataStore.splice(value - index, 1);
					--this._listSize;
				});
			} else {
				this._dataStore.splice(this.find(element)[0], 1);
				--this._listSize;
			}
			return this;
		} else {
			return false;
		}
	}

	toString() {
		return String(this._dataStore);
	}

	// *
	// About Move
	// --------------------------------------------------------------------------------
	end() {
		this._pos = this._listSize - 1;
		return this;
	}

	front() {
		this._pos = 0;
		return this;
	}

	getCurrPos() {
		return this._pos;
	}

	getElement() {
		return this._dataStore[this._pos];
	}

	hasNext() {
		return this._pos < this._listSize - 1;
	}
	
	hasPrev() {
		return this._pos > 0;
	}

	moveTo(pos) {
		if (pos >= 0 && pos <= this._listSize - 1) {
		    this._pos = pos;
			return this;
		} else {
			throw {
				message: 'out range'
			}
		}
	}

	next() {
		this._pos = this._pos === this._listSize - 1 ? this._pos : this._pos + 1;
		return this;
	}

	prev() {
		this._pos = this._pos !== 0 ? this._pos - 1 : this._pos;
		return this;
	}
}

export default List

const a = new List();

const b = new List();

console.log(a._dataStore === b._dataStore);
