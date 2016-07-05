## Array

### `array.concat(item...)`

with ES6, array.concat(...notArrayItems)           Iterator

### `array.join(separator)`

将数组合并成一个字符串, 每个元素之间插入separator分隔符

### `array.pop()` `array.push()`

组合起来可以让数组像堆栈一样工作.

同时`push`和`concat`的工作方式在输入参数为数组的情况下有比较大的区别, `push`一个参数只会让原数组的length增加1

`array.push(...anotherArray)`

### `array.reverse()`

### `array.shift()`

移除数组的第一个元素, 通常比`pop`慢很多. 组合`push`可以让数组像队列一样工作.

### `array.slice(start, end)`
```js
var a = ['a', 'b', 'c'];
a.slice(1);         // ['b', 'c']
a.slice(0,1);       // ['a']
```

### `array.sort(compareFn)`

需要注意的是排序函数返回的值大于0则不会交换顺序, 反之会将两个元素交换顺序.(近似冒泡)

### `array.splice(start, deleteCount, item)`

会移除指定个数的元素, 并且用指定的元素替换它们. 替换这部分操作是可选的.

### `array.unshift()`

类似push 不过插入位置相反.

## Function

### `function.apply(thisArg, argArray)`

### `bind`
```js
Function.method('bind', function (that) {
    var method = this,
        slice = [].slice,
        args = slice.apply(arguments, [1]);
    return function () {
        return method.apply(that, args.concat(slice.apply(arguments, [0])));
    };
});
```
## Number

### `number.toExponential(fractionDigits)`

转换成指数形式字符串, 有效数字位数应该在0到20之间

### `number.toFixed(fractionDigits)`

转化成十进制字符串, 有效数字位数同样0~20

### `number.toPrecision(precision)`

转化成十进制字符串, 精度值在0~21之间

### `number.toString(radix)`

转化成字符串, 进制数在2~36之间, 通常可以简写为包装形式  即 `String(number)`

## Object

### `object.hasOwnProperty(name)`

## Regexp

### `regexp.exec(string)`

`exec`是正则最强大也最慢的方法, 成功匹配会返回一个数组, 其中第一个元素包含与正则匹配的字符串, 然后是各个分组捕获的文本, 以此类推, 不成功则返回null.

如果有`g`flag, 则会从`regexp.lastIndex`开始匹配, 如果成功则会修改`lastIndex`值并返回结果, 不成功的匹配会重置其为0.

注意循环时退出再进入需要重置`lastIndex`, 而且`^`因子也只匹配其为0的情况.

### `regexp.test(string)`

最快也最简单, 匹配就返回true, 反之返回false.

## String

### `string.charAt(pos)`

返回在pos位置的字符, 如果pos小于0或者大于字符串长度则返回字符串长度.

### `string.charCodeAt()`

返回在pos位置的字符编码

### `string.concat(string...)`

### `string.indexOf(searchString, position)`

### `string.lastIndexOf(searchString, position)`

### `string.localeCompare(that)`

比较两个字符串, 如果string比that小则返回负数

### `string.match(regexp)`

如果没有`g`flag, 则结果和`regexp.exec(string)`结果相同
如果有, 则返回一个包含所有匹配(除捕获分组之外)的数组.

### `string.replace(searchValue, replaceValue)`

如果`replaceValue`是一个字符串, 则字符`$`拥有特殊的含义. 
* `$$`      代表`$`
* `$&`      代表整个匹配的文本
* `$number` 代表分组捕获的文本
*  '$`'     代表匹配之前的文本
* `$'`      代表匹配之后的文本

同时replaceValue可以是一个函数, 同时替换为以这个函数返回的字符串为准.

### `string.search(regexp)`

正则版的`indexOf`

### `string.slice(start, end)`

复制string的一部分来构造一个新的字符串, 如果start是个负数则会与字符串长度相加.

end参数可选, 默认值为`string.length`, 同样如果end为负数, 也会与长度相加(相当于倒数).

### `string.split(separator, limit)`

`separator`可以是正则也可以是字符串, 如果为空则返回单字符数组, 并且元素为前limit个.

如果是正则, 那么需要特别注意的是分组捕获的文本会被包含在分割后的数组中.

### `string.substring(start, end)`

类`slice`, 但是不能处理负参数, 不应该使用

### `string.toLocalLowerCase()`
### `string.toLocalUpperCase()`
### `string.toLowerCase()`
### `string.toUpperCase()`
### `string.fromCharCode(char...)`




