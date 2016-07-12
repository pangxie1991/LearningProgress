import SimpleSort from './SimpleSort'

class ShellSort extends SimpleSort  {

	constructor(n) {
		super(n);
		this._gaps = ((n) => {
			let h = 1;
			let arr = [];
			while (h < n / 3) {
				arr = [h, ...arr];
				h = 3 * h + 1;
			}
			return arr;
		})(n);
	}

	shellSort() {
		for (let g = 0; g < this._gaps.length; g++) {
			let inner, temp;
			for (let outer = this._gaps[g]; outer < this.num; outer++) {
				inner = outer;
				temp = this._dataStore[inner];
				while (inner > 0 && this._dataStore[inner - this._gaps[g]] >= temp) {
					this._dataStore[inner] = this._dataStore[inner - this._gaps[g]];
					inner -= this._gaps[g];
				}
				this._dataStore[inner] = temp;
			}
		}
	}
}

// *
// 希尔排序的本质是优化后的插入排序, 使用固定gaps序列或者动态gaps序列来对插入操作需要的循环数进行最小化.
// --------------------------------------------------------------------------------

/*
const test= new ShellSort(100);

test.setData();
//
test.shellSort();

console.log(test.toString());
*/
