const DynFibo = function (n) {
	const r = [];
	for (let i = 0; i < n; i++) {
	    r[i] = 0;
	}

	if (n === 2 || n === 1) {
	    return 1;
	} else {
		r[1] = 1;
		r[2] = 2;
		for (let i = 3; i < n; i++) {
		    r[i] = r[i-1] + r[i-2];
		}
		return r[n-1];
	}
};

const iterFibo = function (n) {
	let last = 1, nextLast = 1, result = 1;
	for (let i = 2; i < n; i++) {
	    result = last + nextLast;
		nextLast = last;
		last = result;
	}
	return result;
};

const matrix = function (m, n, v = 0) {
	const r = new Array(m);
	for (let i = 0; i < m; i++) {
	    r[i] = new Array(n);
		for (let j = 0; j < n; j++) {
		    r[i][j] = v;
		}
	}
	return r
};

const lcs = function (word1, word2) {
	let max = 0, index = 0, lcsarr = matrix(word1.length, word2.length);
	for (let i = 0, l = word1.length; i < l; i++) {
	    for (let j = 0, l = word2.length; j < l; j++) {
	        if (word1[i] === word2[j]) {
	            if (i === 0 || j === 0) {
	                lcsarr[i][j] = 1;
	            } else {
	            	lcsarr[i][j] = lcsarr[i - 1][j - 1] + 1;
				}
	        }
	        if (max < lcsarr[i][j]) {
	            max = lcsarr[i][j];
				index = i + 1;
	        }
	    }
	}

	let str = '';
	if (max === 0) {
		return [0, ''];
	} else {
		for (let i = index - max; i < index; i++) {
			str += word1[i];
		}
		return [max, str];
	}
};

const max = function (a, b) {
	return a > b ? a : b;
};

// 递归版本
const knapsack = function (capacity, size, value, n) {
	if (n ===0 || capacity === 0) {
	    return 0;
	}
	if (size[n - 1] > capacity) {
	    return knapsack(capacity, size, value, n-1);
	} else {
		return max(value[n - 1] + knapsack(capacity - size[n - 1], size, value, n - 1), knapsack(capacity, size, value, n - 1));
	}
};

const dKnapsack = function (capacity, size, value, n) {
	const K = matrix(n, capacity);
	for (let i = 0; i < n; i++) {
		for (let j = 0; j < capacity + 1; j++) {
			if (size[i] <= j) {
				K[i][j] = i === 0 ? max(value[i], 0) : max(value[i] + K[i - 1][j - size[i]], K[i - 1][j]);
			} else if (i > 0) {
				K[i][j] = K[i -1][j];
			}
		}
	}
	return K[n-1][capacity];
};


