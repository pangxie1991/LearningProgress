import Stack from '../Stack'

let test = '2.3+{23/12+[(3.14159*0.24*(15+16))+15*(3+2*(15-4))]}';
let testA = '2.3+23/12+(3.14159*0.24*(15+16)+15*(3+2*(15-4)';
let testB = '2.3+23/12+3.14159*0.24*(15+16))+15*3+2*(15-4))';
let testC = '{[((()))))';
const randomBrackets = function (n) {
	const arr = ['(',')','[',']','{','}'];
	let string = '';
	for (let i = 0; i < n; i++) {
		string += arr[Math.floor(Math.random() * 6)];
	}
	
	console.log(string);
	return string;
};

const randomSmallBrackets = function (n) {
	const arr = ['(',')'];
	let string = '';
	for (let i = 0; i < n; i++) {
		string += arr[Math.floor(Math.random() * 2)];
	}

	console.log(string);
	return string;
};

const match = function (s) {
	switch (s) {
		case '{': return '}';
		case '[': return ']';
		case '(': return ')';
	}
};

const valid = function(string) {
	const stack = new Stack();
	let error = false;
	
	for (let i = 0; i < string.length; i++) {
	    let elem = string[i];
		if (elem === '(' || elem === '[' || elem === '{') {
			if (!stack.isEmpty() && (elem === '{' || (elem === '[' && stack.peek().value !== '{'))) {
				console.log(`Validation failed and the order of brackets is wrong at posiont ${i}`);
				error = true;
			}
			stack.push({value: elem, index: i});
		} else if (elem === ')' || elem === ']' || elem === '}') {
		    if (stack.isEmpty() || elem !== match(stack.peek().value)) {
		        console.log(`Validation failed and the bracket at position ${i} need in pairs`);
				error = true;
		    } else {
				stack.pop();
			}
		}
	}
	
	if (stack.isEmpty() && !error) {
	    console.log('Validation Pass!');
		return true;
	}
	if (!stack.isEmpty()) {
	    let arr = [];
		for (let j = 0, l = stack.getLength(); j < l; j++) {
		    arr.push(stack.pop().index);
		}
		console.log(`Validation failed and the brackets at location ${String(arr)} need in pairs`);
	}
	return false;
};
const testD = randomBrackets(100);

const testE = randomSmallBrackets(150);

valid(test);
// valid(testA);
// valid(testB);
// valid(testC);
// valid(testD);
valid(testE);
