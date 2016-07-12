import Node from './Node'

class BinarySearchTree {
	constructor() {
		this._root = null;
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
			} else if (curr.data < data) {        
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
			} else if (curr.data < data) {
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
	
}


export default BinarySearchTree

/*
const nums = new BinarySearchTree();

[23,45,16,37,3,99,22].map(x => {nums.insert(x)});

nums.remove(23);

console.log(nums._root);
*/
