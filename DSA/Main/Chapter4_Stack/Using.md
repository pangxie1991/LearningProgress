### 数制之间的相互转换

```js
import Stack from './Stack'
const mulBase = function (num, base) {
	let s = new Stack();
	do {
		s.push(num % base);
		num = math.floor(num /= base);
	} while (num > 0);
	let convert = '';
	while (s.getLength() > 0) {
		convert += s.pop();
	}
	return convert
}
```

### 回文(Palindrome)

```js
const isPalindrome = function (word) {
	let s = new Stack();
	for (let i = 0; i < word.length; i++) {
	    s.push(word[i]);
	}
	let rword = '';
	while (s.getLength() > 0) {
		rword += s.pop();
	}
	return word == rword ? true : false;
}
```

### 演示递归

栈这种结构经常被用来在语言中实现递归

```js
let fact = function (n) {
	let s = new Set();
	while (n > 1) {
		s.push(n--);
	}
	let product = 1;
	while(s.getLength() > 0) {
		product *= s.pop();
	}
	return product;
}
```

