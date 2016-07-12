const A = {
	count(node = this._root) {
		return 1 + (node.left === null ? 0 : this.count(node.left)) + (node.right === null ? 0 : this.count(node.right));
	},

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
};
