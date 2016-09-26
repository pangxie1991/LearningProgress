### 设计模式

设计模式的本质就是对封装/继承/多态/组合等技术的反复使用

### 多态
其实际作用就是把'做什么'和'谁去做'解耦, 把过程化的条件分支语句转化为对象的多态性.

### 封装

其目的是将信息隐藏, 包括隐藏数据, 实现细节, 设计细节以及对象类型等等, 其中最重要的就是封装变化. 主要是考虑如何在不重新设计的前提下进行变化.

### 原型模式和基于原型继承

原型模式是一种编程泛型. 基于原型链的委托机制就是原型继承的本质.
+ 所有的数据都是对象
+ 实例化对象需要找到一个原型并克隆它(引擎内部实现)
+ 对象会记住它的原型
+ 如果对象无法响应某个请求, 它会把请求委托给它的原型

js使用函数作为类型构造器的基本原理

```js
function Person(name) {
    this.name = name;
}

Person.prototype.getName = function() {
    console.log(this.name);
};

var objectFactory = function() {
    var obj = new Object(),
        Constructor = [].shift.call(arguments);
    obj.__proto__ = Constructor.prototype;
    var ret = Constructor.apply(obj, arguments);
    return typeof ret === 'object' ? ret : obj;
}

var a = new Person('test');
var a = objectFactory(Person, 'test');  // 等效于new操作符调用构造器
```
使用语言描述构造器函数, 就是在使用new操作符调用的时候会隐式的将this指向一个新对象, 并且将其原型指向构造函数的原型, 并完成函数处理, 最后隐式的返回this.
