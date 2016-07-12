import LinearProbe from '../LinearProbe'

const test = 'the brown fox jumped over the blue fox';

// *
// 使用Map做这种操作更加自然..  当然Map的本质也是哈希表, 只是set get的逻辑更好.
// --------------------------------------------------------------------------------

const show = string => {
	const arr = string.split(' ');
	const set = [];
	const hash = new LinearProbe();
	for (let i = 0, l = arr.length; i < l; i++) {
	    if (set.indexOf(arr[i]) === -1) {
	        set.push(arr[i]);
	    }
		if (typeof hash.get(arr[i]) !== 'number') {        
		    hash.put(arr[i], 1);
		} else {
			hash.put(arr[i], hash.get(arr[i]) + 1);
		}
	}
	
	for (let i = 0, l = set.length; i < l; i++) {
	    console.log(`word: ${set[i]}, count: ${hash.get(set[i])}`);
	}
};

show(test);
