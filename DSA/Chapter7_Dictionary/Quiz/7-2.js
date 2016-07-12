import Dic from '../Dictionary'

const test = 'the brown fox jumped over the blue fox';

const count = function (string) {
	const words = string.split(' ');
	const dic = new Dic();
	words.map(value => {
		if (dic.has(value)) {
			let i = dic.get(value);
		    dic.set(value, ++i);
		} else {
			dic.set(value, 1);
		}
	});
	
	dic.showAll();
};

count(test);
console.log('\n');

const countBySort = (string) => {
	const words = string.split(' ');
	const dic = new Dic();
	words.map(value => {
		if (dic.has(value)) {
			let i = dic.get(value);
			dic.set(value, ++i);
		} else {
			dic.set(value, 1);
		}
	});
	
	dic.specialShowAll = function() {
		const forSort = [];
		for (let key of this.keys()) {
			forSort.push(key);
		}
		const arr = forSort.sort();
		arr.map(value => {
			console.log(`${value}: ${this.get(value)}`);
		});
	};
	
	dic.specialShowAll();
};

countBySort(test);

