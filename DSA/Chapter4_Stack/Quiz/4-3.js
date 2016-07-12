import Stack from '../Stack'

const {floor, random} = Math;

class Candy {
	constructor(color, index) {
		this.color = color;
		this.index = index;
	}
}

const getBox = (n) => {
	const arr = ['red', 'yellow', 'white'];
	const box = new Stack();
	for (let i = 0; i < n; i++) {
	    box.push(new Candy(arr[floor(random() * 3)], i));
	}
	return box;
};

const originalBox = getBox(20);
const transitBox = new Stack();

for (let i = 0, l = originalBox.getLength(); i < l; i++) {
    let temp = originalBox.dequeueFromBack();
	if (temp.color !== 'yellow') {        
	    transitBox.push(temp);
	}
}

const revert = function (stack) {
	const result = new Stack();
	for (let i = 0, l = stack.getLength(); i < l; i++) {
	    result.push(stack.dequeueFromBack());
	}
	return result;
};

const finalBox = revert(transitBox);

console.log(finalBox);
