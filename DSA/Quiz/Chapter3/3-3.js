import List from  '../../Main/Chapter3_List/List'

class Person {
	constructor(name, gender) {
		this.name = name;
		this.gender = gender;
	}
}

const a = new Person('fancy', 'male'),
	b = new Person('BQD', 'male'),
	c = new Person('LPZ', 'female'),
	d = new Person('LinFatZ', 'female'),
	e = new Person('fancy', 'male'),
	f = new Person('BQD', 'male'),
	g = new Person('LPZ', 'female'),
	h = new Person('LinFatZ', 'female'),
	i = new Person('fancy', 'male'),
	j = new Person('BQD', 'male'),
	k = new Person('LPZ', 'female'),
	l = new Person('LinFatZ', 'female');

const test = new List([a,b,c,d,e,f,g,h,i,j,k,l]);

const func = function (gender) {
	let result = [];
	test.map((v, i) => {
		if (v.gender === gender) {
			test.moveTo(i);
		    result.push(test.getElement());
		}
	});
	
	return result;
};

console.log(func('male'));
