class Node {
	constructor(data, left, right) {
		this.data = data;
		this.left = left;
		this.right = right;
		this.count = 1;
	}

	show() {
		return this.data;
	}
}

class BTS {
	constructor() {
		this._root = null;
	}

	update(data) {
		let grade = this.get(data);
		grade.count++;
		return grade;
	}

	root() {
		return this._root;
	}

	insert(data) {
		let n = new Node(data, null, null);
		if (this._root === null) {
			this._root = n;
		} else {
			let curr = this._root;
			let parent;
			while (true) {
				parent = curr;
				if (data < curr.data) {
					curr = curr.left;
					if (curr === null) {
						parent.left = n;
						break;
					}
				} else {
					curr = curr.right;
					if (curr === null) {
						parent.right = n;
						break;
					}
				}
			}
		}
	}

	inOrder(node) {
		if (node !== null) {
			let left, right, middle;
			left = this.inOrder(node.left);
			middle = [node.show()];
			right = this.inOrder(node.right);
			return [...left, ...middle, ...right];
		} else {
			return [];
		}
	}

	preOrder(node) {
		if (node !== null) {
			let left, right, middle;
			left = this.preOrder(node.left);
			middle = [node.show()];
			right = this.preOrder(node.right);
			return [...middle, ...left, ...right];
		} else {
			return [];
		}
	}

	postOrder(node) {
		if (node !== null) {
			let left, right, middle;
			left = this.postOrder(node.left);
			middle = [node.show()];
			right = this.postOrder(node.right);
			return [...left, ...right, ...middle];
		} else {
			return [];
		}
	}

	getMin(node = this._root) {
		while (node.left !== null) {
			node = node.left;
		}
		return node;
	}

	getMax(node = this._root) {
		while(node.right !== null) {
			node = node.right;
		}
		return node;
	}

	has(data) {
		let curr = this._root;
		while(curr !== null) {
			if (curr.data === data) {
				return true;
			} else if (data < curr.data) {
				curr = curr.left;
			} else {
				curr = curr.right;
			}
		}
		return false;
	}

	get(data) {
		let curr = this._root;
		while(curr !== null) {
			if (curr.data === data) {
				return curr;
			} else if (data < curr.data) {
				curr = curr.left;
			} else {
				curr = curr.right;
			}
		}
		return null;
	}

	remove(data, node = this._root) {
		if (node === null) {
			return null;
		}
		if (data === node.data) {
			if (node.right === null && node.left === null) {
				return null;
			}

			if (node.left === null) {
				return node.right;
			}

			if (node.right === null) {
				return node.left;
			}

			let temp = this.getMin(node.right);
			node.data = temp.data;
			node.right = this.remove(temp.data, node.right);
			return node;
		} else if (data < node.data) {
			node.left = this.remove(data, node.left);
			return node;
		} else {
			node.right = this.remove(data, node.right);
			return node;
		}
	}

	count(node = this._root) {
		return 1 + (node.left === null ? 0 : this.count(node.left)) + (node.right === null ? 0 : this.count(node.right));
	}
	
	edgeNum(node = this._root, direction) {
		if (node.left === null && node.right === null) {        
		    return 0;
		}
		if (node.left !== null && node.right !== null) {        
		    return (direction === undefined ? 2 : 1) + this.edgeNum(node.left, 'left') + this.edgeNum(node.right, 'right');
		}
		if (node.left !== null) {
			return (direction === 'left' ? 0 : 1) + this.edgeNum(node.left, 'left');
		}
		if (node.right !== null) {        
		    return (direction === 'right' ? 0 : 1) + this.edgeNum(node.right, 'right');
		}
	}
}

const prArray = (arr) => {
	let result = '';
	for (let i = 0, l = arr.length; i < l; i++) {
	    result += String(arr[i]) + ' ';
		if ((i + 1) % 10 === 0) {
		    result += '\n';
		}
	}
	return result;
};

const genArr = n => {
	const arr = [];
	for (let i = 0; i < n; i++) {
	    arr.push(Math.floor(Math.random() * 101));
	}
	return arr;
};

const grades = genArr(100);
const string = prArray(grades);
const test = new BTS();

for (let i = 0, l = grades.length; i < l; i++) {
    let g = grades[i];
	if (test.get(g) === null) {
	    test.insert(g);
	} else {
		test.update(g);
	}
}

const occur = (g) => {
	let finding = test.get(g);
	if (finding === null) {
	    console.log(`No occurrence of ${g}`);
	} else {
		console.log(`Occurrence of ${g}: ${finding.count}`);
	}
};

console.log(string);

occur(89);
console.log(grades.indexOf(89));
occur(15);
console.log(grades.indexOf(15));
occur(76);
console.log(grades.indexOf(76));
console.log(test.count());


console.log(test.edgeNum());

const edgeTest = new BTS();

[15, 3, 14, 37, 16, 65].map(x => {edgeTest.insert(x)});

console.log(edgeTest.edgeNum());


