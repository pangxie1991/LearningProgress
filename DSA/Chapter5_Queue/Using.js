import Queue from './Queue'
// *
// 方块舞会(Bad Example)
// --------------------------------------------------------------------------------
class Dancer {
	constructor(name, gender) {
		this.name = name;
		this.gender = gender;
	}
}

const getString = function() {};

const getDancer = function (males, females) {
	let dancers = getString('./dancers.txt').split('/n');
	for (let dancer of dancers) {
		dancer = dancer.trim();
		let info = dancer.split('');
		let gender = info[0];
		let name = info[1];
		if (gender === 'M') {
		    males.enqueue(new Dancer(name, gender));
		} else {
			females.enqueue(new Dancer(name, gender));
		}
	}
};

const dance = function (males, females) {
	let male, female;
	console.log('The dance partners are: \n');
	while (!males.isEmpty() && !females.isEmpty()) {
		male = males.dequeue();
		female = females.dequeue();
		console.log(`Female dancer is ${female.name} and the male dancer is ${male.name}`);
	}
};

// *
// Radix Sort(基数排序)
// 按数位扫描, 然后再取出
// --------------------------------------------------------------------------------
const {floor, random, pow} = Math;

const getBaseNumbers = (n, digits) => {
	const result = [];
	for (let i = 0; i < n; i++) {
		let num = '';
	    for (let j = 0; j < digits; j++) {
			num += floor(random() * 10);
	    }
		if (result.indexOf(num) === -1) {
		    result.push(num);
		}
	}
	return result;
};

const collect = function (queues) {
	const result = [];
	for (let i = 0; i < queues.length; i++) {
	    while (!queues[i].isEmpty()) {
			result.push(queues[i].dequeue());
		}
	}
	return result;
};

const radixSort = function (nums, queues, digits, digit = 1) {
	for (let i = 0; i < nums.length; i++) {
	    let index = floor((Number(nums[i])%pow(10,digit))/(pow(10, digit - 1)));
		queues[index].enqueue(nums[i]);
	}

	if (digits === digit) {
	    return collect(queues);
	} else {
		return radixSort(collect(queues), queues, digits, ++digit);
	}
};

const numbers = getBaseNumbers(50, 3);

const boxes = [];

for (let i = 0; i < 10; i++) {
    boxes[i] = new Queue();
}

let r = radixSort(numbers, boxes, 3);

console.log(r);

class Patient {
	constructor(name, code) {
		this.name = name;
		this.code = code;
	}
}

class PriorityQueue extends Queue {
	constructor() {
		super();
	}

	dequeue() {
		let entry = 0;
		for (let i = 0; i < this._dataStore.length; i++) {
		    if (this._dataStore[i].code < this._dataStore[entry].code) {
		        entry = i;
		    }
		}

		return this._dataStore.splice(entry, 1);
	}

}


