import SimpleHash from './HashTable'

class OpenChain extends SimpleHash {
	
	constructor() {
		super();
		for (let i = 0, l = this._dataStore.length; i < l; i++) {
		    this._dataStore[i] = [];
		}
	}

	put(key, data) {
		// let pos = this.simpleHash(key);
		let pos = this.hornerHash(key);
		let index = 0;
		if (this._dataStore[pos][index] !== undefined) {
			while(this._dataStore[pos][index] !== undefined) {
				++index;
			}
		}
		this._dataStore[pos][index] = key;
		this._dataStore[pos][index + 1] = data;
	}
	
	get(key) {
		let index = 0;
		// let pos = this.simpleHash(key);
		let pos = this.hornerHash(key);
		while (this._dataStore[pos][index] !== key && this._dataStore[pos][index] !== undefined) {
			index += 2;
		}
		return this._dataStore[pos][index] === key ? this._dataStore[pos][index + 1] : null;
	}
	
	showDistro() {
		let n = 0;
		for (let i = 0, l = this._dataStore.length; i < l; i++) {
		    if (this._dataStore[i][0] !== undefined) {        
		        console.log(`${i}: ${this._dataStore[i]}`);
		    }
		}
	}

	simpleHash(data) {
		let total = 0;
		for (let i = 0; i < data.length; i++) {
			total += data.charCodeAt(i);
		}
		return total%this._dataStore.length;
	}
}

const hash = new OpenChain();

const test = ['David', 'Jennifer', 'Donnie', 'Raymond', 'Cynthia', 'Mike', 'Clayton', 'Danny', 'Jonathan'];

for (let i = 0; i < test.length; i++) {
	hash.put(test[i], i);
}

hash.showDistro();
