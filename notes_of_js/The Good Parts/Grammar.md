### Whitespace
```js
var that = this;

// *****

/*
* ***** 
*/
```
### Names

标识符通常作为变量名或者方法/属性名, 参数, 运算符或者标记, 一般以小写字母开头, 也可以使用'_'或者'$'等作为开头

需要绕开保留字, 主体内容可以是字母或者数字.

### Numbers

不分整数和浮点数, 统一表示为64位浮点数, 避免了短整型溢出, 作为基本类型通过包装获得了一系列方法, 有一个和数字相关的专有对象`Math`

### Strings

```js
''
""
``
```
注意JS的字符为16位Unicode字符, 同样存在通过包装类型获得的许多方法, 可以使用 `+`运算符来进行字符串拼接

### Statements

* 声明语句
  `var` `let` `const`
* 条件语句
  `if` `switch`
* 循环语句
  `while` `for` `do`
* 强制跳转语句
  `break` `return` `throw`

### Expressions

基本执行优先级
* literal   `'A', [1,2], {something: someValue}....`
* name  `that`
* (expression)  `(that === this)`
* prefix operator expression    `typeof that`
* expression infix operator expression  `A && B`
* expression ? expression : expression  `A ? B : C`
* expression invocation `thatFunc()`
* expression refinement `Object.prototype`
* new expression invocation `new Instance(***)`
* delete refinement `delete A.B`

### Literals

基本类型

`'abbc'` `12`

对象

`{someAttr: someValue}`

数组

`[1,2,3]`

函数

`function test(a, b) { return a + b }`

正则

`/\s/gi`

### Functions

function(关键字) [name] (para1, para2, ...) { // function body}






