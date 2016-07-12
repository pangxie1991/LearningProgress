// *
// 将一系列排好序的自序列合成为大而完整的序列. 从理论上很容易实现. 但是比较消耗空间.
// 另外对于JS而言自顶向下的递归太深了, 需要使用自底向上的非递归方式进行操作.
// --------------------------------------------------------------------------------

import Base from './SimpleSort'

class MergeSort extends Base {

	mergeSort(arr = this._dataStore) {
		if (arr.length < 2) {
		    return;
		}
		let step = 1;
		while (step < arr.length) {

			/*
			 * Step 代表间隔序列, 是2的n次方, 针对不同间隔进行从左端到右端的分支扫描
			 * 所以循环此时是lnN * N (? 存疑) 而且在N循环是直接对索引值进行赋值.
			 * ========================================================================== */

			let start = 0;
			while (start + 2 * step <= arr.length) {
				this.mergeHelper(arr, start, step);
				start += 2 * step;
			}
			if (start + step < arr.length) {
			    this.mergeHelper(arr, start, step);
			}
			step *= 2;
		}
	}

	mergeHelper (arr, start, step) {
		const stop = ((start + 2 * step) < arr.length) ? (start + 2 * step) : arr.length;
		const leftArr = new Array(step + 1);
		const rightArr = new Array(stop - step - start + 1);

		/*
		 * 按照顺序将原数组的元素压入左右分支数组, 并且使用Infinity作为哨兵值
		 * ========================================================================== */

		let k = start;
		for (let i = 0, l = leftArr.length - 1; i < l; i++) {
		    leftArr[i] = arr[k];
			++k;
		}
		leftArr[step] = Infinity;
		k = start + step;
		for (let i = 0, l = rightArr.length - 1; i < l; i++) {
		    rightArr[i] = arr[k];
			++k;
		}
		rightArr[rightArr.length - 1] = Infinity;

		console.log(`left ----- ${leftArr}`);
		console.log(`right ---- ${rightArr}`);

		/*
		 * 对原数组进行排序的操作, 使用左右两个排序基本OK的数组进行双向递进.
		 * ========================================================================== */
		let m = 0, n = 0;
		for (let j = start; j < stop; j++) {
		    if (leftArr[m] <= rightArr[n]) {
		        arr[j] = leftArr[m];
				m++;
		    } else {
		    	arr[j] = rightArr[n];
				n++;
			}
		}
		console.log(arr);
	}
}


/*
const test= new MergeSort(16);
test.setData();

console.log(test.toString());

//
test.mergeSort();

console.log(test.toString());
*/
