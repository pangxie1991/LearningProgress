##Being a lab rat can I?

##Wait and Hope

##1.let&const

块级作用域, 暂时性死区, 无变量声明提升, 不允许重复声明

const声明常量, 声明时必须赋值, 同时针对引用类型的const仍然是引用, 所以并不稳妥

let const class 三个命令声明的全局对象不再是全局对象的属性.

##2.结构赋值

按照一定模式从数组或者对象中提取值

解构时需要一一对应, 解构可以引入默认值, 数组解构的目标只要具有遍历接口就可以.

对象解构赋值的内部机制就是先找到同名属性, 然后再赋值给对应的变量, 真正被赋值的后者, 而不是前者.

`{key: value} = {key: value}`, 真正被赋值的是value而不是key.

解构赋值的声明和赋值是一体的, 注意不能重复声明.

对象的解构赋值也可以添加默认值, 默认值生效的条件是对象的属性值严格等于undefined.

对象的解构赋值可以很方便的将一个对象中的方法赋值到变量.`let {log, sin, cos} = Math`

解构赋值的一个重要作用就是函数参数的解构, 使用解构的方式为函数参数指定默认值有两种不同的形式.

    function move({x: 0, y: 0} = {}) {
        return [x, y];
    }

    move({x:3}) // [3, 0]
    move({})    // [0, 0]
    move()      // [0, 0]

    function move({x, y} = {x: 0, y: 0}) {
        return [x, y];
    }

    move({x:3}) // [3, undefined]
    move({})    // [undefined, undefined]
    move()      // [0, 0]

后一种方式是为函数move的参数指定默认值, 而不是为变量x, y指定默认值

undefined作为参数会触发函数参数的默认值

在解构赋值中不能轻易使用圆括号会引起编译器报错. 只有在解构赋值的非模式部分使用圆括号才可以编译通过.

解构赋值的主要用途:

* 交换变量
* 提取从函数返回的多个值
* 函数参数的定义
* 提取json数据
* 函数参数的默认值
* 遍历map结构, 从map结构中获取数据
* 加载模块的指定方法

## 3.字符串的扩展

\u{********}

对应原有的`String.prototype.charCodeAt()`和`String.prototype.fromCharCode()`等不能识别超过4字节UTF字符的方法,ES6提供了新的
对应方法`String.prototype.codePointAt()`和`String.prototype.fromCodePoint()`

为字符串添加了遍历器接口(Iterator)

对应ES5不能识别超过4字节字符的`charAt()`方法提供了`at()`方法

针对ES5不能很好的处理原生带音调字符和合成版字符相等的问题提供了`normalize()`方法.

一些常见于第三方库的补充方法 `includes()` `startsWith()` `endsWith()` `repeat(num)` `padStart()` `padEnd()`

模版字符串

使用"`"来标志模版字符串, 可以插入变量, 需要将变量名写在${}中, 可以在花括号里插入各种JS表达式, 甚至可以调用函数, 输出返回值

## 4.正则

u修饰符   匹配非标准unicode字符

y修饰符   粘连匹配, 类似g, 但是每次匹配必须从上次匹配剩余的部分的第一个位置开始, 在split方法中使用y修饰符, 原字符串必须以
分隔符开头. 可以不忽视非法字符的从字符串中提取词元.

## 5.数值

新的8进制和2进制写法: 0O(0o) 和0B(0b), 宣告着8进制0****写法的正式废弃

传统的全局方法`isFinite()`和`isNaN()`有了在Number对象上的异化版, 全局方法会先调用`Number()`进行类型转换, 而新方法仅对数值有效,
其他类型的数据均会返回false

全局方法`parseInt()`和`parseFloat()`被移植到了Number对象上, 行为不变. `Number.isInteger()`用来判断是否是整数, 注意浮点和整数
在JS中是同方法储存的, 所以25.0和25等效

## 6.数组

`Array.from()` 将可遍历对象和类数组对象(有length属性)转换成真正的数组(扩展运算符...对某些类型也有效)
这个方法接收第二个参数对遍历进行处理, 类似数组的map方法. 第三个参数可以用来绑定this

`Array.of()` 接收一组值返回生成的数组, 弥合Array构造函数不同参数下行为的差异

`Array.prototype.copyWithin(target, start, end)` 在当前数组内部将指定位置的成员复制到其他位置并覆盖原有成员, 返回新的数组

`find()和findIndex()`前者用一个回调函数作为参数, 遍历数组成员执行回调函数. 后者返回第一个符合回调函数条件的数组成员的位置. 这两个
函数都可以发现NaN, 弥补了`indexOf()`的不足

`fill()` 填充数组, 原数组中已有的元素会被抹去

`entries()`, `keys()`, `values()`三个方法可以使用for of循环遍历数组, 三个方法返回一个遍历器对象

`includes()`, 注意区分和map/set结构`has()`方法的区别, map查找键名, set查找值

数组空位的处理规则更新, 但是依然十分不统一

数组推导支持使用简洁的写法基于现有数组生成新的数组. 主要模式是for of循环以及if判断

## 7.函数

函数参数默认值, 注意参数的声明是隐式的, 因此不能再用let或者const声明, 可以和解构默认值配合使用达到两重默认的效果. 通常函数的尾参数
带默认值, 这样可以省略参数, 同时函数的length参数将失真.

函数的作用域问题, 参数的默认值如果为变量, 那么该变量的作用域和其他变量一样都是先函数体再函数体外部. 同样函数的作用域依然指其声明时
所在的作用域, 因此函数的默认值如果是一个匿名函数, 则其作用域实际上为全局作用域, 通过这个方法可以指定某个参数不能省略

rest参数  ...变量名  用于指代除了指定声明以外的参数, 注意length属性同样不包括rest参数

扩展运算符   rest参数的逆运算, 同样使用三个点, 可以用来方便的将数组展开为函数的参数, 取代apply, 可以用来合并数组, 可以和解构赋值
结合, 可以用来读取函数返回的数组, 将字符串转换成数组, 转换类数组对象, 转换map, set, generator函数返回的遍历器对象等

name属性返回函数的名字, 并且可以正确处理被赋值给变量的匿名函数, 同时优先返回具名函数的函数名. bind返回的函数会加上bound前缀,
Function构造函数返回的会加上anonymous.

箭头函数, 函数体多行需要大括号, 返回对象需要小括号, 并常被用来简化回调, 需要注意的是, this值绑定定义时所在的对象并且固定, 不能作为构造函数,
不能使用arguments对象, 不能作为Generator函数. 其this固定的原因并不是因为绑定了this, 而是其根本就没有this.

函数绑定运算符, bind的语法糖. Object::function

尾调用优化, 尾调用递归, 柯里化

## 8.对象

简洁表示法

属性名可以是标识符也可以是表达式, 表达式需要用中括号括起来

`assign(target, source1, source2...)`, 将来源对象的所有可枚举属性复制到目标对象上, 同时只复制自身属性. 对于嵌套的对象, 其行为模
式为替换, 而不是添加.

主要用途: 为对象添加属性

    class Test {
        constructor(x, y) {
            Object.assign(this, {x, y});
        }
    }

克隆对象, 合并对象, 为属性指定默认值

操作中引入继承的属性会让问题复杂化, 所以尽量使用`Object.keys()`

`__proto__`属性, 用来读取或者设置当前对象的prototype对象

对象也可以用扩展运算符, 但是rest执行的是浅复制, 如果一个键值是符合类型的值, 则rest参数复制的是这个值的引用.

## 9.Set Map

Set 非重数组, 接收一个数组或者类数组对象作为初始化参数, 返回一个set, set判断是否重复使用的是严格相等运算符, 所以空对象和空对象不等,
NaN等于NaN, 25和'25'不等..

基本方法 add, delete, has, clear, 遍历使用keys, values, entries, forEach

WeakSet 成员必须是对象, 而且弱引用, 成员不可以被引用, 也就不可遍历

Map 任意键名的键值对, True Hash

set, get has size, delete, clear 以及遍历四件套

WeakMap 只接受对象作为键名, 弱引用

## 10.for of 和 Iterator

Iterator API 不断指向下一个的指针对象. 这个接口部署在Symbol.iterator上. 原生被数组,set, map等支持, 而对象和很多类数组对象
并不支持.

这个接口会在解构赋值, 扩展运算符, yield后接可遍历结构时被默认调用, 可以使用Generator函数创造具有Iterator接口的变量.

for of 循环读取带有Iterator接口的数据的值, 相比for in循环读取键名更接近实际使用.

## 11. Generator

异步解决方案

运行Generator函数返回一个状态机.

## 12.Promise

传递异步消息的对象, 代表了某个未来才会知道结果的事件. 为操作异步提供了统一的API

## 13.异步和Async

回调--generator--thunklify--co--await+async

## 14.Class

class 声明   extends 继承

## 15.模块化

import from

export ...








































