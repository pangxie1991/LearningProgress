// *
// 顺序查找适用于元素随机排列的列表
// --------------------------------------------------------------------------------

const seqSearch = {
	hasData(arr, data) {
		for (let i = 0, l = arr.length; i < l; i++) {
			if (arr[i] === data) {
				return true;
			}
		}
		return false;
	},

	getIndex(arr, data) {
		for (let i = 0, l = arr.length; i < l; i++) {
			if (arr[i] === data) {
				return i;
			}
		}
		return -1;
	},

	findMin(arr) {
		let min = arr[0];
		for (let i = 1, l = arr.length; i < l; i++) {
		    if (arr[i] < min) {
		        min = arr[i];
		    }
		}
		return min;
	},

	findMax(arr) {
		let max = arr[0];
		for (let i = 1, l = arr.length; i < l; i++) {
		    if (arr[i] > max) {
		        max = arr[i];
		    }
		}
		return max;
	},

	selfOrgHasNotThatGood(arr, data) {
		for (let i = 0, l = arr.length; i < l; i++) {
			if (arr[i] === data) {
				[arr[i], arr[i - 1]] = [arr[i - 1], arr[i]];
				return true;
			}
		}
		return false;
	},

	selfOrgHas(arr, data) {
		for (let i = 0, l = arr.length; i < l; i++) {
			if (arr[i] === data && i > (arr.length * 0.2)) {
				[arr[i], arr[i - 1]] = [arr[i - 1], arr[i]];
				return true;
			} else if (arr[i] = data) {
			    return true;
			}
		}
		return false;
	}
};
