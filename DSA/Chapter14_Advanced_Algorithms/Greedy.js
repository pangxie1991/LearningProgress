// *
// 从局部最优到全局最优, 简单算法的累积
// --------------------------------------------------------------------------------

const makeChange = function (origAmt) {
	let remainAmt = 0;
	const coins = [0,0,0,0];
	if (origAmt % .25 < origAmt) {
	    coins[3] = parseInt(origAmt / .25);
		remainAmt = origAmt % .25;
		origAmt = remainAmt;
	}
	if (origAmt % .1 < origAmt) {
	    coins[2] = parseInt(origAmt / .1);
		remainAmt = origAmt % .1;
		origAmt = remainAmt;
	}
	if (origAmt % .05 < origAmt) {
	    coins[1] = parseInt(origAmt / .05);
		remainAmt = origAmt % 0.05;
		origAmt = remainAmt;
	}
	coins[0] = parseInt(origAmt / .01);
	return coins;
};


// *
// 连续背包问题
// --------------------------------------------------------------------------------
const ksack = function (values, weights, capacity) {
	let load = 0;
	let i = 0;
	let w = 0;
	while(load < capacity && i < values.length) {
		if (weights[i] <= (capacity - load)) {
		    w += values[i];
			load += weights[i];
		} else {
			let r = (capacity - load) / weights[i];
			w += r * values[i];
			load += weights[i];
		}
		++i;
	}
	return w;
};
