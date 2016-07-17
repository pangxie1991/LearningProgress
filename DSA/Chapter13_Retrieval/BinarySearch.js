const binSearch = {
	has(arr, data) {
		let upperBound = arr.length - 1;
		let lowerBound = 0;
		while (lowerBound <= upperBound) {
			let mid = Math.floor((upperBound + lowerBound)/2);
			if (arr[mid] < data) {
			    lowerBound = mid + 1;
			} else if (arr[mid] > data) {
			    upperBound = mid - 1;
			} else {
				return true;
			}
		}
		return false;
	},

	getIndex(arr, data) {
		let upperBound = arr.length - 1;
		let lowerBound = 0;
		while (lowerBound <= upperBound) {
			let mid = Math.floor((upperBound + lowerBound)/2);
			if (arr[mid] < data) {
				lowerBound = mid + 1;
			} else if (arr[mid] > data) {
				upperBound = mid - 1;
			} else {
				return mid;
			}
		}
		return -1;
	},

	count(arr, data) {
		let count = 0;
		let index = this.getIndex(arr, data);
		if (index > -1) {
		    count++;
			for (let i = index - 1; index > -1; i--) {
			    if (arr[i] === data) {
			        count++;
			    } else {
			    	break;
				}
			}
			for (let i = index + 1, l = arr.length; i < l; i++) {
			    if (arr[i] === data) {
			        count++;
			    } else {
			    	break;
				}
			}
		}
		return count;
	}
};
