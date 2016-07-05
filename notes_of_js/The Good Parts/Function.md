### Function Objects

创建函数时会有两个隐藏属性, 上下文和实现行为的代码(调用). 并且会随配有一个prototype属性, 其值拥有一个constructor属性并且指向函数本身.

因为函数本身就是对象, 因此可以作为参数, 可以被返回, 可以拥有方法, 可以被保存在数组, 对象和变量中.

函数的与众不同在于它可以被调用.

### Function Literal

分为关键字/可选函数名/参数/函数体四个部分

内部函数可以通过作用域链访问其祖先函数的参数和变量.

通过函数字面量创建的函数对象包含一个连接到外部上下文的连接, 这被成为闭包, 是JS表现力的来源.

### Invocation

函数被调用时会停止当前函数的执行, 传递控制权和参数给新函数, 除了声明时定义的形参还会接收两个附加的参数, this和arguments,
this的值取决于调用模式(四种, 方法调用/函数调用/构造器调用/apply调用)

参数部分的结构为`(expression, expression, ....)`, 每一个表达式产生一个参数值, 每个参数值被赋予函数声明时的形参名.

JS并不会对参数的多少和类型做检验, 知道ES6才提供了参数的默认值写法, 且只有末尾的参数在有默认值的情况下省略, 
以及通过解构赋值达成的大量可省略有默认值参数的写法.

* 方法调用
  
  作为一个对象的方法被调用时, `this`与这个对象绑定.这个绑定发生在调用发生时, 属于超级延迟绑定, 使得函数可以对`this`进行高度复用.

* 函数调用
  
  将函数保存在一个变量, 或者直接使用字面量进行声明, 再直接调用的方式成为函数调用.此时`this`指向全局对象.

* 构造器调用
  
  构造器函数专属, 使用`new`操作符进行调用, 此时隐式的创建一个连接到该函数prototype的新对象并且绑定在`this`上并返回
  
* apply调用模式
  
  此时`this`的值会通过函数的`apply` `call` `bind`方法的参数进行指定.
  
  `[].map.call(arrayLike, function(value, index) {.....})`

### Arguments

函数被调用的时候会获得隐式传入的参数 arguments, 是一个包含所有传入的实参的类数组对象.

### Return

函数总会返回一个值, 对于在函数体内没有指明返回内容的非构造器函数, 返回undefined.

### Exceptions

```js
function test() {
    if (a !== b) {        
        throw {
            name: '***',
            message: '*******',
        };
    }
    
    // *****
}

try {
    test();
} catch (e) {
    console.log(e.name + e.message);
}
```
### Augmenting Types

直接改写一些类型的prototype, 并不利于维护.

```js
Function.prototype.method = function (name, func) {
    this.prototype[name] = func;
    return this;
}

Number.method('integer', function() {
    return Math[this < 0 ? 'ceil' : 'floor'](this);
});
```
### Recursion

递归是一种编程技术, 分解问题为相似的子问题, 然后每一个都用一个寻常解去解决. 

递归可以非常高效的操作树形结构, 比如DOM.. (jQuery的height方法等.. 需要循环遍历DOM取值的操作)

尾递归优化, 函数返回自身递归调用结果的操作被称为尾递归(这种操作会将递归变成一种循环, 从而解除引用链, 有些类似Generator). JS并未提供尾递归优化.

### Scope

作用域控制着变量与参数的可见性和生命周期(引用). 

在讨论作用域变量覆盖等问题的时候需要注意声明提升和函数提升.

### Closure

闭包实现的基础是内部函数可以访问外部函数的参数和变量(除了隐式的this和arguments), 而且内部函数拥有比外部函数更长的生命周期.

```js
function quo (status) {
    return {
        getStatus: function () {
            return status;
        }
    };
}

var myQuo = quo('message');

console.log(myQuo.getStatus());
```
`getStatus()`方法访问的不是status的副本, 而是其本身, 这种内部函数可以访问它被创建时所处的上下文环境, 就叫做闭包.

理解内部函数无需复制外部函数的参数/变量, 而是可以通过作用域链进行直接访问, 这一点很重要. 同时需要避免在循环中创建函数, 这会浪费资源而且导致混淆.

### Callbacks

回调被用来处理异步, 而在ES6的新标准中为处理异步提供了很多更优雅的解决方式(Generator, Promise, async/await...)

### Module

模块是一个提供接口(API)却隐藏状态与实现的函数或者对象. 

模块模式的一般形式是一个定义了私有变量和函数的函数, 利用闭包创建可以访问私有变量和函数的特权函数.

通常模块模式会结合单例模式进行使用, 类似前面闭包部分的例子(quo)

### Cascade

让方法固定返回this或者操作后的主体, 就可以实现单个语句中一次调用同一个对象的很多个方法. 这就是级联(链式调用)

### Curry

将函数也看作值, 通过把函数和传递给它的参数相结合, 产生一个新的函数.

```js
Function.prototype.curry = function () {
    var args = slice.apply(arguments), that = this;
    return function () {
        return that.apply(null, args.concat(slice.apply(arguments)));
    }
}

var add1 = add.curry(1);

add1(6);    // 7
```
函数的柯里化可以让函数的写的更加优雅(每次只接收一个类型的值作为参数).

### Memoization

```js
var fibo = function () {
    var memo = [0, 1];
    var fib = function (n) {
        var result = memo[n];
        if (typeof result !== 'number') {        
            result = fib(n - 1) + fib(n - 2);
            memo[n] = result;
        }
        return result;
    }
    return fib;
}();
```

```js
var memoizer = function (memo, formula) {
    var recur = function (n) {
        var result = memo[n];
        if (typeof result !== 'number') {        
            result = formula (recur, n);
            memo[n] = result;
        }
        return result;
    }
    return recur;
}
```
