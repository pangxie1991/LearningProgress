import Stack from '../Stack'

const isOption = function () {};

const isOperator = function () {};

const evaluation = function () {};

const transform = function (formula) {
	const op = new Stack();
	const operator = new Stack();
	for (let part of formula) {
		if (isOption(part)) {
		    op.push(part);
		} else if (isOperator(part)) {
		    operator.push(part);
		} else {
			throw {
				message: 'The format of formula is wrong'
			};
		}
	}
	let expression = '';
	for (let i = 0, l = op.getLength(); i < l; i++) {
	    expression += op.pop();
	}
	expression += operator.pop();
	
	return evaluation(expression);
};
