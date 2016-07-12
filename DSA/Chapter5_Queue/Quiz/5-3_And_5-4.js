import {Patient, PriorityQueue} from '../Using'

class SpecialQueue extends PriorityQueue {
	dequeue() {
		let entry = 0;
		for (let i = 1, l = this._dataStore.length; i < l; i++) {
		    if (this._dataStore[i].code > this._dataStore[entry].code) {
		        entry = i
		    }
		}

		return this._dataStore.splice(entry, 1);
	}

	toString() {
		let result = ''
		for (let i = 0; i < this.getLength(); i++) {
		    result += `${this._dataStore[i].name} code: ${this._dataStore[i].code} \n`
		}
		return result;
	}
}

const ed = new SpecialQueue();
ed.enqueue(new Patient('fancy', 5)).enqueue(new Patient('xiao', 4)).enqueue(new Patient('lei', 12));

console.log(ed.toString());

ed.dequeue();

console.log(ed.toString());

ed.dequeue();

console.log(ed.toString());

const a = (name, code) => {
	return new Patient(name, code);
};

const b = () => {
	ed.dequeue();
};

const c = () => {
	console.log(ed.toString());
};
