import Queue from '../Queue'

class Deque extends Queue {
	enqueueFromFront(element) {
		return this._dataStore.unshift(element);
	}

	dequeueFromBack() {
		return this._dataStore.pop();
	}
}

const valid = (string) => {
	const temp = new Deque();
	for (let i = 0, l = string.length; i < l; i++) {
	    temp.enqueue(string[i]);
	}

	while(temp.getLength() > 1) {
		let a = temp.dequeueFromBack(), b = temp.dequeue();
		if (a !== b) {
		    return console.log(`It's not a palindrome`);
		}
	}

	console.log(`It's a palindrome`);
};

valid('barab');
