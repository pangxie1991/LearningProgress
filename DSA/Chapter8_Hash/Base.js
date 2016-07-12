// *
// 散列函数是一种从某种数据到数字的映射, 我们希望其返回的索引值尽量均匀. 最常用的就是随机整形键值对散列表长度取余.
// 因此散列表的长度最好是一个质数.(除留余数法)
// --------------------------------------------------------------------------------

const {random, floor} = Math;

class Hash {
	constructor() {
		this._dataStore = new Array(137);
	}

	simpleHash(data) {
		let total = 0;
		for (let i = 0; i < data.length; i++) {
		    total += data.charCodeAt(i);
		}
		return total%this._dataStore.length;
	}

	put(data) {
		let pos = this.simpleHash(data);
		this._dataStore[pos] = data;
		console.log(`${data} -> ${pos}`);
	}

	showDistro() {
		let n = 0;
		for (let i = 0; i < this._dataStore.length; i++) {
		    if (this._dataStore[i]) {
		        console.log(`${i}: ${this._dataStore[i]}`);
		    }
		}
	}

	// *
	// 霍纳算法, 增加一个较小的质数作为乘法因子
	// --------------------------------------------------------------------------------

	betterHash(data) {
		const H = 37;
		let total = 0;
		for (let i = 0; i < data.length; i++) {
		    total = H * total + data.charCodeAt(i);
		}
		total = total%this._dataStore.length;
		return parseInt(total);
	}

	betterPut(data) {
		let pos = this.betterHash(data);
		this._dataStore[pos] = data;
		console.log(`${data} -> ${pos}`);
	}
}


const hash = new Hash();

const test = ['David', 'Jennifer', 'Donnie', 'Raymond', 'Cynthia', 'Mike', 'Clayton', 'Danny', 'Jonathan'];

for (let i = 0; i < test.length; i++) {
    // hash.put(test[i]);
	hash.betterPut(test[i]);
}

hash.showDistro();



const getRandomInt = (min, max) => floor(random() * (max - min + 1)) + min;

const genStuData = (arr) => {
	for (let i = 0, l = arr.length; i < l; i++) {
	    let num = '';
		for (let j = 0; j < 9; j++) {
		    num += floor(random() * 10);
		}

		num += getRandomInt(50, 100);
		arr[i] = num;
	}

	return arr;
};

const students = new Array(10);
const stu = new Hash();
genStuData(students);

console.log('Students data \n');

for (let i = 0; i < students.length; i++) {
    console.log(`code:${students[i].substring(0, 8)} mark: ${students[i].substring(9)}`);
}

console.log('\n\nData distribution: \n');

for (let i = 0; i < students.length; i++) {
	// stu.betterPut(students[i]);
	stu.put(students[i]);
}

stu.showDistro();



