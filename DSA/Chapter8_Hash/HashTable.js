class SimpleHash {
	constructor() {
		this._dataStore = new Array(137);
	}

	showDistro() {
		let n = 0;
		for (let i = 0; i < this._dataStore.length; i++) {
			if (this._dataStore[i]) {
				console.log(`${i}: ${this._dataStore[i]}`);
			}
		}
	}

	hornerHash(data) {
		const H = 37;
		let total = 0;
		for (let i = 0; i < data.length; i++) {
			total = H * total + data.charCodeAt(i);
		}
		total = total%this._dataStore.length;
		return parseInt(total);
	}

	put(key, data) {
		let pos = this.hornerHash(key);
		this._dataStore[pos] = data;
		console.log(`${data} -> ${pos}`);
	}
	
	get(key) {
		return this._dataStore[this.hornerHash(key)];
	}
}

export default SimpleHash
