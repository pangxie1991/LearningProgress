import SimpleHash from './HashTable'

class LinearProbe extends SimpleHash {
	constructor() {
		super();
		this._keys = new Array(137);
	}

	put(key, data) {
		let pos = this.hornerHash(key);
		// let pos = this.simpleHash(key);
		if (this._keys[pos] === key) {        
		    this._dataStore[pos] = data;
		} else {
			while(this._dataStore[pos] !== undefined) {
				pos++;
				if (pos === 137) {
					pos = 0;
				}
			}
			this._dataStore[pos] = data;
			this._keys[pos] = key;
		}
	}

	get(key) {
		let pos = this.hornerHash(key);
		// let pos = this.simpleHash(key);
		let temp = pos;
		if (this._keys[pos] === undefined) {        
		    return null;
		}
		if (this._keys[pos] === key) {
		    return this._dataStore[pos];
		} else {
			do {
				pos++;
				if (pos === 137) {
				    pos = 0;
				}
			} while (pos !== temp);
			return this._keys[pos] === key ? this._dataStore[pos] : null;
		}
	}
	
	set(key, value) {
		
	}

	simpleHash(data) {
		let total = 0;
		for (let i = 0; i < data.length; i++) {
			total += data.charCodeAt(i);
		}
		return total%this._dataStore.length;
	}
}

export default LinearProbe

const hash = new LinearProbe();

const test = ['David', 'Jennifer', 'Donnie', 'Raymond', 'Cynthia', 'Mike', 'Clayton', 'Danny', 'Jonathan'];

for (let i = 0; i < test.length; i++) {
	hash.put(test[i], i);
}

hash.showDistro();
